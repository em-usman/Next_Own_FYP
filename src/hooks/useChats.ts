import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { auth, db } from "../../firebaseConfig";

export type ChatPreview = {
  id: string;
  postId: string;
  buyerId: string;
  buyerName: string;
  buyerImageUri: string;
  sellerId: string;
  sellerName: string;
  sellerImageUri: string;
  lastMessage: string;
  lastMessageAt: string | null;
  unreadCount: number;
};

export function useChats(
  searchQuery: string = "",
  filterType: "all" | "read" | "unread" = "all",
) {
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const uid = auth.currentUser?.uid;

  // Fetch user data (displayName and imageUri) by ID
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
      async (snapshot) => {
        let items: ChatPreview[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            postId: data.postId || "",
            buyerId: data.buyerId || "",
            buyerName: data.buyerName || "",
            buyerImageUri: "",
            sellerId: data.sellerId || "",
            sellerName: data.sellerName || "",
            sellerImageUri: "",
            lastMessage: data.lastMessage || "",
            lastMessageAt:
              data.lastMessageAt?.toDate?.()?.toISOString() || null,
            unreadCount: data.unreadCounts?.[uid] || 0,
          };
        });

        // Fetch buyer and seller data
        items = await Promise.all(
          items.map(async (item) => {
            let updatedItem = { ...item };

            // Fetch buyer data
            if (updatedItem.buyerId) {
              const buyerData = await fetchUserData(updatedItem.buyerId);
              updatedItem.buyerName = buyerData.displayName;
              updatedItem.buyerImageUri = buyerData.imageUri;
            }

            // Fetch seller data
            if (updatedItem.sellerId) {
              const sellerData = await fetchUserData(updatedItem.sellerId);
              updatedItem.sellerName = sellerData.displayName;
              updatedItem.sellerImageUri = sellerData.imageUri;
            }

            return updatedItem;
          }),
        );

        // Apply filters
        let filtered = items;

        if (filterType === "read") {
          filtered = items.filter((chat) => chat.unreadCount === 0);
        } else if (filterType === "unread") {
          filtered = items.filter((chat) => chat.unreadCount > 0);
        }

        // Apply search
        if (searchQuery.trim()) {
          const searchLower = searchQuery.toLowerCase();
          filtered = filtered.filter((chat) => {
            const otherName =
              uid === chat.buyerId ? chat.sellerName : chat.buyerName;
            return (
              otherName.toLowerCase().includes(searchLower) ||
              chat.lastMessage.toLowerCase().includes(searchLower)
            );
          });
        }

        // Sort by last message time
        filtered.sort((a, b) => {
          if (!a.lastMessageAt && !b.lastMessageAt) return 0;
          if (!a.lastMessageAt) return 1;
          if (!b.lastMessageAt) return -1;
          return (
            new Date(b.lastMessageAt).getTime() -
            new Date(a.lastMessageAt).getTime()
          );
        });

        setChats(filtered);
        setIsLoading(false);
      },
      (error) => {
        console.error("useChats error:", error);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [uid, searchQuery, filterType]);

  return { chats, isLoading };
}
