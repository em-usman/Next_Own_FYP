import { CATEGORIES } from "@/config/categoryConfig";
import { onAuthStateChanged } from "firebase/auth";
import {
       collection,
       deleteDoc,
       doc,
       getDoc,
       getDocs,
       onSnapshot,
       setDoc,
       writeBatch,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import Toast from "react-native-toast-message";

import { auth, db } from "../../firebaseConfig";

export type FavouriteItem = {
  postId: string;
  addedAt: string;
  title: string;
  price: string;
  location: string;
  imageUri: string;
  imageUrls?: string[];
  timeAgo?: string;
  description?: string;
  category?: string;
  brand?: string;
  model?: string;
  color?: string;
  condition?: string;
  sellerName?: string;
  sellerPhone?: string;
  hidePhone?: boolean;
  isFeatured?: boolean;
  details?: Record<string, string>;
  status: "active" | "deactivated" | "sold";
};

type AddToFavouritesPayload = {
  postId: string;
  title: string;
  price: string;
  location: string;
  imageUri: string;
  imageUrls?: string[];
  timeAgo?: string;
  description?: string;
  category?: string;
  brand?: string;
  model?: string;
  color?: string;
  condition?: string;
  sellerName?: string;
  sellerPhone?: string;
  hidePhone?: boolean;
  isFeatured?: boolean;
  details?: Record<string, string>;
  status?: "active" | "deactivated" | "sold";
};

type UseFavouritesReturn = {
  favouriteItems: FavouriteItem[];
  favouriteCount: number;
  isLoading: boolean;
  isUpdating: boolean;
  addToFavourites: (payload: AddToFavouritesPayload) => Promise<boolean>;
  removeFromFavourites: (postId: string) => Promise<boolean>;
  isFavourite: (postId: string) => boolean;
  clearFavourites: () => Promise<boolean>;
  syncItemStatuses: () => Promise<void>;
};

function normalizeStatus(status?: string): FavouriteItem["status"] {
  const normalized = (status || "").toLowerCase().trim();
  if (normalized === "sold") return "sold";
  if (normalized === "deactivated" || normalized === "deactivate") {
    return "deactivated";
  }
  return "active";
}

export function useFavourites(): UseFavouritesReturn {
  const [uid, setUid] = useState(auth.currentUser?.uid || "");
  const [favouriteItems, setFavouriteItems] = useState<FavouriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const favouriteCount = useMemo(() => favouriteItems.length, [favouriteItems]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUid(user?.uid || "");
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!uid) {
      setFavouriteItems([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const favouritesRef = collection(db, "users", uid, "favourites");

    const unsubscribe = onSnapshot(
      favouritesRef,
      (snapshot) => {
        const mapped = snapshot.docs
          .map((docSnap) => {
            const data = docSnap.data() as Partial<FavouriteItem>;
            return {
              postId: docSnap.id,
              addedAt: data.addedAt || "",
              title: data.title || "Untitled listing",
              price: data.price || "Price not set",
              location: data.location || "Location not set",
              imageUri: data.imageUri || "",
              imageUrls: Array.isArray(data.imageUrls)
                ? data.imageUrls.filter((item): item is string => !!item)
                : [],
              timeAgo: data.timeAgo || "",
              description: data.description || "",
              category: data.category || "",
              brand: data.brand || "",
              model: data.model || "",
              color: data.color || "",
              condition: data.condition || "",
              sellerName: data.sellerName || "",
              sellerPhone: data.sellerPhone || "",
              hidePhone: Boolean(data.hidePhone),
              isFeatured: Boolean(data.isFeatured),
              details:
                data.details && typeof data.details === "object"
                  ? (data.details as Record<string, string>)
                  : {},
              status: normalizeStatus(data.status),
            } as FavouriteItem;
          })
          .sort((a, b) => {
            const aTime = Date.parse(a.addedAt || "") || 0;
            const bTime = Date.parse(b.addedAt || "") || 0;
            return bTime - aTime;
          });

        setFavouriteItems(mapped);
        setIsLoading(false);
      },
      (error) => {
        console.error("useFavourites snapshot error:", error);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [uid]);

  async function addToFavourites(
    payload: AddToFavouritesPayload,
  ): Promise<boolean> {
    if (!uid) {
      Toast.show({
        type: "error",
        text1: "Login Required",
        text2: "Please login to save favourites.",
        position: "bottom",
      });
      return false;
    }

    try {
      setIsUpdating(true);
      const itemRef = doc(db, "users", uid, "favourites", payload.postId);
      const existing = await getDoc(itemRef);

      if (existing.exists()) {
        Toast.show({
          type: "success",
          text1: "Already Saved",
          position: "bottom",
        });
        return true;
      }

      await setDoc(
        itemRef,
        {
          postId: payload.postId,
          addedAt: new Date().toISOString(),
          title: payload.title,
          price: payload.price,
          location: payload.location,
          imageUri: payload.imageUri,
          imageUrls: payload.imageUrls || [],
          timeAgo: payload.timeAgo || "",
          description: payload.description || "",
          category: payload.category || "",
          brand: payload.brand || "",
          model: payload.model || "",
          color: payload.color || "",
          condition: payload.condition || "",
          sellerName: payload.sellerName || "",
          sellerPhone: payload.sellerPhone || "",
          hidePhone: Boolean(payload.hidePhone),
          isFeatured: Boolean(payload.isFeatured),
          details: payload.details || {},
          status: normalizeStatus(payload.status),
        },
        { merge: true },
      );

      Toast.show({
        type: "success",
        text1: "Saved",
        text2: "Added to favourites.",
        position: "bottom",
      });
      return true;
    } catch (e) {
      console.error("addToFavourites error:", e);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Unable to save favourite.",
        position: "bottom",
      });
      return false;
    } finally {
      setIsUpdating(false);
    }
  }

  async function removeFromFavourites(postId: string): Promise<boolean> {
    if (!uid) return false;
    try {
      setIsUpdating(true);
      await deleteDoc(doc(db, "users", uid, "favourites", postId));
      return true;
    } catch (e) {
      console.error("removeFromFavourites error:", e);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Unable to remove favourite.",
        position: "bottom",
      });
      return false;
    } finally {
      setIsUpdating(false);
    }
  }

  function isFavourite(postId: string): boolean {
    return favouriteItems.some((item) => item.postId === postId);
  }

  async function clearFavourites(): Promise<boolean> {
    if (!uid) return false;

    try {
      setIsUpdating(true);
      const favouritesRef = collection(db, "users", uid, "favourites");
      const snapshot = await getDocs(favouritesRef);
      const batch = writeBatch(db);

      snapshot.docs.forEach((docSnap) => {
        batch.delete(docSnap.ref);
      });

      await batch.commit();
      Toast.show({
        type: "success",
        text1: "Cleared",
        text2: "Favourites cleared.",
        position: "bottom",
      });
      return true;
    } catch (e) {
      console.error("clearFavourites error:", e);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Unable to clear favourites.",
        position: "bottom",
      });
      return false;
    } finally {
      setIsUpdating(false);
    }
  }

  async function syncItemStatuses(): Promise<void> {
    if (!uid || favouriteItems.length === 0) return;

    const batch = writeBatch(db);
    let hasChanges = false;

    for (const item of favouriteItems) {
      let latestStatus: FavouriteItem["status"] = "active";
      for (const category of CATEGORIES) {
        const postRef = doc(
          db,
          "categories",
          category.id,
          "posts",
          item.postId,
        );
        const snap = await getDoc(postRef);
        if (snap.exists()) {
          latestStatus = normalizeStatus(
            (snap.data() as { status?: string }).status,
          );
          break;
        }
      }

      if (latestStatus !== item.status) {
        batch.set(
          doc(db, "users", uid, "favourites", item.postId),
          { status: latestStatus },
          { merge: true },
        );
        hasChanges = true;
      }
    }

    if (hasChanges) {
      await batch.commit();
    }
  }

  return {
    favouriteItems,
    favouriteCount,
    isLoading,
    isUpdating,
    addToFavourites,
    removeFromFavourites,
    isFavourite,
    clearFavourites,
    syncItemStatuses,
  };
}
