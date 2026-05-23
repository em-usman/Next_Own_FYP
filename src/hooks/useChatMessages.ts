import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
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

// Helper function to fetch user data (displayName and imageUri)
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
  const [isSending, setIsSending] = useState(false);
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
        const items: ChatMessage[] = snapshot.docs.map((docSnap) => {
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
          };
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
  }, [chatId]);

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

    // Create optimistic message
    const optimisticMessage: ChatMessage = {
      id: tempId,
      senderId: uid,
      senderName: displayName,
      text: trimmed,
      createdAt: now,
      status: "sending",
    };

    // Add optimistic message to state immediately
    setMessages((prev) => [optimisticMessage, ...prev]);

    try {
      const chatRef = doc(db, "chats", chatId);

      // Fetch buyer data if missing
      let buyerName = chatInfo.buyerName;
      let buyerImageUri = chatInfo.buyerImageUri;
      if ((!buyerName || !buyerImageUri) && chatInfo.buyerId) {
        const buyerData = await fetchUserData(chatInfo.buyerId);
        buyerName = buyerData.displayName;
        buyerImageUri = buyerData.imageUri;
      }

      // Fetch seller data if missing
      let sellerName = chatInfo.sellerName;
      let sellerImageUri = chatInfo.sellerImageUri;
      if ((!sellerName || !sellerImageUri) && chatInfo.sellerId) {
        const sellerData = await fetchUserData(chatInfo.sellerId);
        sellerName = sellerData.displayName;
        sellerImageUri = sellerData.imageUri;
      }

      // Create or update chat document
      await setDoc(
        chatRef,
        {
          postId: chatInfo.postId,
          postTitle: chatInfo.postTitle,
          postImageUri: chatInfo.postImageUri,
          buyerId: chatInfo.buyerId,
          buyerName: buyerName,
          buyerImageUri: buyerImageUri,
          sellerId: chatInfo.sellerId,
          sellerName: sellerName,
          sellerImageUri: sellerImageUri,
          participants: [chatInfo.buyerId, chatInfo.sellerId],
          lastMessage: trimmed,
          lastMessageAt: serverTimestamp(),
        },
        { merge: true },
      );

      // Update unread counts
      await updateDoc(chatRef, {
        [`unreadCounts.${otherParticipantId}`]: increment(1),
        [`unreadCounts.${uid}`]: 0,
      });

      // Add message to subcollection with status "sent"
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

      // Replace temp message with real message from Firestore
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId
            ? {
                ...msg,
                id: messageRef.id,
                status: "sent",
              }
            : msg,
        ),
      );
    } catch (e) {
      console.error("sendMessage error:", e);
    }
  }

  async function markMessagesAsSeen(): Promise<void> {
    if (!chatId || !uid) return;

    try {
      const messagesRef = collection(db, "chats", chatId, "messages");
      const q = query(messagesRef, where("senderId", "!=", uid));
      const querySnapshot = await getDocs(q);

      const batch: Promise<void>[] = [];
      querySnapshot.forEach((docSnap) => {
        const messageData = docSnap.data() as ChatMessage;
        // Only update if status is not already "seen"
        if (messageData.status !== "seen") {
          batch.push(
            updateDoc(doc(db, "chats", chatId, "messages", docSnap.id), {
              status: "seen",
            }),
          );
        }
      });

      await Promise.all(batch);
    } catch (error) {
      console.error("markMessagesAsSeen error:", error);
    }
  }

  async function deleteMessages(messageIds: string[]): Promise<void> {
    if (!chatId || messageIds.length === 0) return;

    try {
      // Delete the messages
      for (const msgId of messageIds) {
        await deleteDoc(doc(db, "chats", chatId, "messages", msgId));
      }

      // Fetch the new last message after deletion
      const messagesRef = collection(db, "chats", chatId, "messages");
      const q = query(messagesRef, orderBy("createdAt", "desc"), limit(1));
      const querySnapshot = await getDocs(q);

      const chatRef = doc(db, "chats", chatId);

      if (querySnapshot.empty) {
        // No messages left, clear the last message fields
        await updateDoc(chatRef, {
          lastMessage: "",
          lastMessageAt: null,
        });
      } else {
        // Update with new last message
        const lastMsg = querySnapshot.docs[0].data();
        await updateDoc(chatRef, {
          lastMessage: lastMsg.text || "",
          lastMessageAt: lastMsg.createdAt || null,
        });
      }
    } catch (error) {
      console.error("deleteMessages error:", error);
      throw error;
    }
  }

  return {
    messages,
    isLoading,
    isSending,
    sendMessage,
    deleteMessages,
    markMessagesAsSeen,
  };
}
