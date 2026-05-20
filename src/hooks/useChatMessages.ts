import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { auth, db } from "../../firebaseConfig";

export type ChatMessage = {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  createdAt: string;
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

    setIsSending(true);
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

      // Add message to subcollection
      await addDoc(collection(db, "chats", chatId, "messages"), {
        senderId: uid,
        senderName: displayName,
        text: trimmed,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("sendMessage error:", e);
    } finally {
      setIsSending(false);
    }
  }

  return { messages, isLoading, isSending, sendMessage };
}
