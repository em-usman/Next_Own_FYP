import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { auth, db } from "../../firebaseConfig";

export type ChatMessage = {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  createdAt: string;
  status: "sending" | "sent" | "seen";
  deletedForEveryone?: boolean;
  deletedFor?: string[];
  edited?: boolean;
};

export type ChatInfo = {
  postId: string;
  postTitle: string;
  postImageUri: string;
  buyerId: string;
  buyerName: string;
  buyerImageUri: string;
  sellerId: string;
  sellerName: string;
  sellerImageUri: string;
};

async function fetchUserData(
  userId: string,
): Promise<{ displayName: string; imageUri: string }> {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        displayName: data?.displayName || "User",
        imageUri: data?.imageUri || "",
      };
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
  return { displayName: "User", imageUri: "" };
}

export function useChatMessages(chatId: string, chatInfo: ChatInfo) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending] = useState(false);
  const uid = auth.currentUser?.uid || "";
  const displayName = auth.currentUser?.displayName || "User";

  // Real-time listener on messages (descending for inverted FlatList)
  useEffect(() => {
    if (!chatId) {
      setIsLoading(false);
      return;
    }

    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: ChatMessage[] = snapshot.docs
          .map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              senderId: data.senderId || "",
              senderName: data.senderName || "",
              text: data.text || "",
              createdAt:
                data.createdAt?.toDate?.()?.toISOString() ||
                new Date().toISOString(),
              status: data.status || "sent",
              deletedForEveryone: data.deletedForEveryone ?? false,
              deletedFor: data.deletedFor ?? [],
              edited: data.edited ?? false,
            };
          })
          .filter((msg) => {
            // Always keep deletedForEveryone messages (shown as placeholder)
            if (msg.deletedForEveryone) return true;
            // Hide messages this user soft-deleted for themselves
            return !msg.deletedFor?.includes(uid);
          });
        setMessages(items);
        setIsLoading(false);
      },
      (error) => {
        console.error("useChatMessages error:", error);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [chatId, uid]);

  // Reset own unread count when chat is opened
  useEffect(() => {
    if (!chatId || !uid) return;
    updateDoc(doc(db, "chats", chatId), {
      [`unreadCounts.${uid}`]: 0,
    }).catch(() => {
      // Doc doesn't exist yet; ignore
    });
  }, [chatId, uid]);

  async function sendMessage(text: string): Promise<void> {
    if (!text.trim() || !uid || !chatId) return;

    const trimmed = text.trim();
    const otherParticipantId =
      uid === chatInfo.buyerId ? chatInfo.sellerId : chatInfo.buyerId;
    const tempId = `temp_${Date.now()}`;
    const now = new Date().toISOString();

    // Optimistic message appears instantly with "sending" status
    const optimisticMessage: ChatMessage = {
      id: tempId,
      senderId: uid,
      senderName: displayName,
      text: trimmed,
      createdAt: now,
      status: "sending",
    };
    setMessages((prev) => [optimisticMessage, ...prev]);

    try {
      const chatRef = doc(db, "chats", chatId);

      let buyerName = chatInfo.buyerName;
      let buyerImageUri = chatInfo.buyerImageUri;
      if ((!buyerName || !buyerImageUri) && chatInfo.buyerId) {
        const buyerData = await fetchUserData(chatInfo.buyerId);
        buyerName = buyerData.displayName;
        buyerImageUri = buyerData.imageUri;
      }

      let sellerName = chatInfo.sellerName;
      let sellerImageUri = chatInfo.sellerImageUri;
      if ((!sellerName || !sellerImageUri) && chatInfo.sellerId) {
        const sellerData = await fetchUserData(chatInfo.sellerId);
        sellerName = sellerData.displayName;
        sellerImageUri = sellerData.imageUri;
      }

      await setDoc(
        chatRef,
        {
          postId: chatInfo.postId,
          postTitle: chatInfo.postTitle,
          postImageUri: chatInfo.postImageUri,
          buyerId: chatInfo.buyerId,
          buyerName,
          buyerImageUri,
          sellerId: chatInfo.sellerId,
          sellerName,
          sellerImageUri,
          participants: [chatInfo.buyerId, chatInfo.sellerId],
          lastMessage: trimmed,
          lastMessageAt: serverTimestamp(),
        },
        { merge: true },
      );

      await updateDoc(chatRef, {
        [`unreadCounts.${otherParticipantId}`]: increment(1),
        [`unreadCounts.${uid}`]: 0,
      });

      const messageRef = await addDoc(
        collection(db, "chats", chatId, "messages"),
        {
          senderId: uid,
          senderName: displayName,
          text: trimmed,
          createdAt: serverTimestamp(),
          status: "sent",
        },
      );

      // Promote temp message to real ID + "sent" status
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId ? { ...msg, id: messageRef.id, status: "sent" } : msg,
        ),
      );
    } catch (e) {
      console.error("sendMessage error:", e);
    }
  }

  // Mark all messages sent by the other participant as "seen"
  async function markMessagesAsSeen(): Promise<void> {
    if (!chatId || !uid) return;
    try {
      const q = query(
        collection(db, "chats", chatId, "messages"),
        where("senderId", "!=", uid),
      );
      const snapshot = await getDocs(q);
      const updates: Promise<void>[] = [];
      snapshot.forEach((docSnap) => {
        if (docSnap.data().status !== "seen") {
          updates.push(
            updateDoc(doc(db, "chats", chatId, "messages", docSnap.id), {
              status: "seen",
            }),
          );
        }
      });
      await Promise.all(updates);
    } catch (error) {
      console.error("markMessagesAsSeen error:", error);
    }
  }

  // WhatsApp-style soft delete
  // forEveryone=true  → sets deletedForEveryone flag (placeholder shown to both sides)
  // forEveryone=false → adds uid to deletedFor (only hidden for current user)
  async function deleteMessage(
    messageId: string,
    forEveryone: boolean,
  ): Promise<void> {
    if (!uid || !chatId) return;
    try {
      const msgRef = doc(db, "chats", chatId, "messages", messageId);
      if (forEveryone) {
        await updateDoc(msgRef, { deletedForEveryone: true, text: "" });
      } else {
        await updateDoc(msgRef, { deletedFor: arrayUnion(uid) });
      }
    } catch (e) {
      console.error("deleteMessage error:", e);
    }
  }

  async function editMessage(
    messageId: string,
    newText: string,
  ): Promise<void> {
    if (!uid || !chatId || !newText.trim()) return;
    try {
      await updateDoc(doc(db, "chats", chatId, "messages", messageId), {
        text: newText.trim(),
        edited: true,
      });
    } catch (e) {
      console.error("editMessage error:", e);
    }
  }

  return {
    messages,
    isLoading,
    isSending,
    sendMessage,
    markMessagesAsSeen,
    deleteMessage,
    editMessage,
  };
}
