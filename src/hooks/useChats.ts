import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

import { auth, db } from "../../firebaseConfig";

export type ChatPreview = {
  id: string;
  postId: string;
  postTitle: string;
  postImageUri: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  lastMessage: string;
  lastMessageAt: string | null;
  unreadCount: number;
};

export function useChats() {
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) {
      setChats([]);
      setIsLoading(false);
      return;
    }

    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", uid),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: ChatPreview[] = snapshot.docs
          .map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              postId: data.postId || "",
              postTitle: data.postTitle || "Untitled",
              postImageUri: data.postImageUri || "",
              buyerId: data.buyerId || "",
              buyerName: data.buyerName || "",
              sellerId: data.sellerId || "",
              sellerName: data.sellerName || "",
              lastMessage: data.lastMessage || "",
              lastMessageAt:
                data.lastMessageAt?.toDate?.()?.toISOString() || null,
              unreadCount: data.unreadCounts?.[uid] || 0,
            };
          })
          .sort((a, b) => {
            if (!a.lastMessageAt && !b.lastMessageAt) return 0;
            if (!a.lastMessageAt) return 1;
            if (!b.lastMessageAt) return -1;
            return (
              new Date(b.lastMessageAt).getTime() -
              new Date(a.lastMessageAt).getTime()
            );
          });

        setChats(items);
        setIsLoading(false);
      },
      (error) => {
        console.error("useChats error:", error);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [uid]);

  return { chats, isLoading };
}
