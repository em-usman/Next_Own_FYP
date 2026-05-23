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

export type CartItem = {
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
  sellerId?: string;
};

type AddToCartPayload = {
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
  sellerId?: string;
};

type UseCartReturn = {
  cartItems: CartItem[];
  cartCount: number;
  isLoading: boolean;
  isUpdating: boolean;
  addToCart: (payload: AddToCartPayload) => Promise<boolean>;
  removeFromCart: (postId: string) => Promise<boolean>;
  isInCart: (postId: string) => boolean;
  clearCart: () => Promise<boolean>;
  syncItemStatuses: () => Promise<void>;
};

function normalizeStatus(status?: string): CartItem["status"] {
  const normalized = (status || "").toLowerCase().trim();
  if (normalized === "sold") return "sold";
  if (normalized === "deactivated" || normalized === "deactivate") {
    return "deactivated";
  }
  return "active";
}

export function useCart(): UseCartReturn {
  const [uid, setUid] = useState(auth.currentUser?.uid || "");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const cartCount = useMemo(() => cartItems.length, [cartItems]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUid(user?.uid || "");
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!uid) {
      setCartItems([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const cartRef = collection(db, "users", uid, "cart");

    const unsubscribe = onSnapshot(
      cartRef,
      (snapshot) => {
        const mapped = snapshot.docs
          .map((docSnap) => {
            const data = docSnap.data() as Partial<CartItem>;
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
            } as CartItem;
          })
          .sort((a, b) => {
            const aTime = Date.parse(a.addedAt || "") || 0;
            const bTime = Date.parse(b.addedAt || "") || 0;
            return bTime - aTime;
          });

        setCartItems(mapped);
        setIsLoading(false);
      },
      (error) => {
        console.error("useCart snapshot error:", error);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [uid]);

  async function addToCart(payload: AddToCartPayload): Promise<boolean> {
    if (!uid) {
      Toast.show({
        type: "error",
        text1: "Login Required",
        text2: "Please login to add items to cart.",
        position: "bottom",
      });
      return false;
    }

    if (normalizeStatus(payload.status) !== "active") {
      Toast.show({
        type: "error",
        text1: "Unavailable",
        text2: "Only active ads can be added to cart.",
        position: "bottom",
      });
      return false;
    }

    try {
      setIsUpdating(true);
      const itemRef = doc(db, "users", uid, "cart", payload.postId);
      const existing = await getDoc(itemRef);

      if (existing.exists()) {
        Toast.show({
          type: "success",
          text1: "Already in Cart",
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
        text1: "Added to Cart",
        position: "bottom",
      });
      return true;
    } catch (e) {
      console.error("addToCart error:", e);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Unable to add item to cart.",
        position: "bottom",
      });
      return false;
    } finally {
      setIsUpdating(false);
    }
  }

  async function removeFromCart(postId: string): Promise<boolean> {
    if (!uid) return false;
    try {
      setIsUpdating(true);
      await deleteDoc(doc(db, "users", uid, "cart", postId));
      return true;
    } catch (e) {
      console.error("removeFromCart error:", e);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Unable to remove item.",
        position: "bottom",
      });
      return false;
    } finally {
      setIsUpdating(false);
    }
  }

  function isInCart(postId: string): boolean {
    return cartItems.some((item) => item.postId === postId);
  }

  async function clearCart(): Promise<boolean> {
    if (!uid) return false;

    try {
      setIsUpdating(true);
      const cartRef = collection(db, "users", uid, "cart");
      const snapshot = await getDocs(cartRef);
      const batch = writeBatch(db);

      snapshot.docs.forEach((docSnap) => {
        batch.delete(docSnap.ref);
      });

      await batch.commit();
      Toast.show({
        type: "success",
        text1: "Cart Cleared",
        position: "bottom",
      });
      return true;
    } catch (e) {
      console.error("clearCart error:", e);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Unable to clear cart.",
        position: "bottom",
      });
      return false;
    } finally {
      setIsUpdating(false);
    }
  }

  async function syncItemStatuses(): Promise<void> {
    if (!uid || cartItems.length === 0) return;

    const batch = writeBatch(db);
    let hasChanges = false;

    for (const item of cartItems) {
      let latestStatus: CartItem["status"] = "active";
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
          doc(db, "users", uid, "cart", item.postId),
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
    cartItems,
    cartCount,
    isLoading,
    isUpdating,
    addToCart,
    removeFromCart,
    isInCart,
    clearCart,
    syncItemStatuses,
  };
}
