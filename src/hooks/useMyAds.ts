import { CATEGORIES } from "@/config/categoryConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";

export type MyAdStatus = "active" | "deactivated" | "sold" | "deleted";

export type MyAd = {
  id: string;
  categoryId: string;
  subCategoryId: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  coverImage: string;
  location: string;
  contactName: string;
  contactPhone: string;
  hidePhone: boolean;
  details: Record<string, string>;
  status: MyAdStatus;
  createdAt: string;
};

type UseMyAdsResult = {
  ads: MyAd[];
  isLoading: boolean;
  errorMessage: string;
};

export function useMyAds(): UseMyAdsResult {
  const [ads, setAds] = useState<MyAd[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [uid, setUid] = useState(auth.currentUser?.uid || "");

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUid(user?.uid || "");
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!uid) {
      setAds([]);
      setIsLoading(false);
      setErrorMessage("Please login to view your ads.");
      return;
    }

    const postsByCategory = new Map<string, MyAd[]>();
    let pendingFirstSnapshots = CATEGORIES.length;

    function finishFirstSnapshot() {
      pendingFirstSnapshots -= 1;
      if (pendingFirstSnapshots <= 0) {
        setIsLoading(false);
      }
    }

    function mergeAndSort() {
      const merged = Array.from(postsByCategory.values())
        .flat()
        .filter((post) => post.status !== "deleted")
        .sort((a, b) => {
          const aTime = Date.parse(a.createdAt || "") || 0;
          const bTime = Date.parse(b.createdAt || "") || 0;
          return bTime - aTime;
        });

      setAds(merged);
    }

    const unsubscribers = CATEGORIES.map((category) => {
      const postsQuery = query(
        collection(db, "categories", category.id, "posts"),
        where("userId", "==", uid),
      );

      return onSnapshot(
        postsQuery,
        (snapshot) => {
          const mapped: MyAd[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data() as Partial<MyAd>;

            return {
              id: docSnap.id,
              categoryId: category.id,
              subCategoryId: data.subCategoryId || "",
              title: data.title || "Untitled",
              description: data.description || "",
              price:
                typeof data.price === "number" && !Number.isNaN(data.price)
                  ? data.price
                  : 0,
              images: Array.isArray(data.images)
                ? data.images.filter((x): x is string => typeof x === "string")
                : [],
              coverImage: data.coverImage || "",
              location: data.location || "",
              contactName: data.contactName || "",
              contactPhone: data.contactPhone || "",
              hidePhone: Boolean(data.hidePhone),
              details:
                data.details && typeof data.details === "object"
                  ? (data.details as Record<string, string>)
                  : {},
              status: (data.status as MyAdStatus) || "active",
              createdAt: data.createdAt || "",
            };
          });

          postsByCategory.set(category.id, mapped);
          mergeAndSort();
          setErrorMessage("");
          if (pendingFirstSnapshots > 0) finishFirstSnapshot();
        },
        (error) => {
          console.error("useMyAds snapshot error:", error);
          setErrorMessage("Unable to load some ads right now.");
          postsByCategory.set(category.id, []);
          mergeAndSort();
          if (pendingFirstSnapshots > 0) finishFirstSnapshot();
        },
      );
    });

    if (CATEGORIES.length === 0) {
      setIsLoading(false);
    }

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, [uid]);

  return { ads, isLoading, errorMessage };
}
