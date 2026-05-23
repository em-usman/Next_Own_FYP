import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useMemo, useRef, useState } from "react";

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

export function useChats(
  searchQuery: string = "",
  filterType: "all" | "read" | "unread" = "all",
) {
  const [allChats, setAllChats] = useState<ChatPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const uid = auth.currentUser?.uid;

  // In-memory cache so repeated snapshots don't re-fetch the same user docs
  const userCache = useRef<Map<string, { displayName: string; imageUri: string }>>(
    new Map(),
  );

  async function fetchCached(userId: string) {
    if (userCache.current.has(userId)) return userCache.current.get(userId)!;
    const data = await fetchUserData(userId);
    userCache.current.set(userId, data);
    return data;
  }

  // Subscribe once — only re-subscribes when the logged-in user changes
  useEffect(() => {
    if (!uid) {
      setAllChats([]);
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

        items = await Promise.all(
          items.map(async (item) => {
            const updated = { ...item };
            if (updated.buyerId) {
              const d = await fetchCached(updated.buyerId);
              updated.buyerName = d.displayName;
              updated.buyerImageUri = d.imageUri;
            }
            if (updated.sellerId) {
              const d = await fetchCached(updated.sellerId);
              updated.sellerName = d.displayName;
              updated.sellerImageUri = d.imageUri;
            }
            return updated;
          }),
        );

        // Sort once here; filtering is done in useMemo below
        items.sort((a, b) => {
          if (!a.lastMessageAt && !b.lastMessageAt) return 0;
          if (!a.lastMessageAt) return 1;
          if (!b.lastMessageAt) return -1;
          return (
            new Date(b.lastMessageAt).getTime() -
            new Date(a.lastMessageAt).getTime()
          );
        });

        setAllChats(items);
        setIsLoading(false);
      },
      (error) => {
        console.error("useChats error:", error);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [uid]); // filterType / searchQuery no longer cause a re-subscribe

  // Filtering and searching are pure in-memory operations — instant
  const chats = useMemo(() => {
    let filtered = allChats;

    if (filterType === "read") {
      filtered = filtered.filter((c) => c.unreadCount === 0);
    } else if (filterType === "unread") {
      filtered = filtered.filter((c) => c.unreadCount > 0);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((c) => {
        const otherName = uid === c.buyerId ? c.sellerName : c.buyerName;
        return (
          otherName.toLowerCase().includes(q) ||
          c.lastMessage.toLowerCase().includes(q)
        );
      });
    }

    return filtered;
  }, [allChats, filterType, searchQuery, uid]);

  return { chats, isLoading };
}
