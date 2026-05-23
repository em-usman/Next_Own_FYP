import {
  addDoc,
  collection,
  doc,
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
  sellerId: string;
  sellerName: string;
};

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

      // Create or update chat document
      await setDoc(
        chatRef,
        {
          postId: chatInfo.postId,
          postTitle: chatInfo.postTitle,
          postImageUri: chatInfo.postImageUri,
          buyerId: chatInfo.buyerId,
          buyerName: chatInfo.buyerName,
          sellerId: chatInfo.sellerId,
          sellerName: chatInfo.sellerName,
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
