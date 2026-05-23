import { CATEGORIES } from "@/config/categoryConfig";
import type { Listing } from "@/types/listing";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";

import { db } from "../../firebaseConfig";

type FirestorePost = {
  title?: string;
  price?: number;
  location?: string;
  province?: string;
  district?: string;
  city?: string;
  address?: string;
  coverImage?: string;
  images?: string[];
  status?: string;
  createdAt?: string;
  description?: string;
  contactName?: string;
  contactPhone?: string;
  hidePhone?: boolean;
  details?: Record<string, string>;
  userId?: string;
};

export type HomeCategorySection = {
  categoryId: string;
  title: string;
  listings: Listing[];
};

type UseHomeCategorySectionsResult = {
  sections: HomeCategorySection[];
  isLoading: boolean;
  errorMessage: string;
  refresh: () => void;
};

function normalizeStatus(status?: string): NonNullable<Listing["status"]> {
  const normalized = (status || "").toLowerCase().trim();
  if (normalized === "sold") return "sold";
  if (normalized === "deactivated" || normalized === "deactivate") {
    return "deactivated";
  }
  return "active";
}

function formatPrice(price?: number): string {
  if (typeof price !== "number" || Number.isNaN(price)) return "Price not set";
  return `Rs ${price.toLocaleString("en-PK")}`;
}

function toTimeAgo(createdAt?: string): string {
  if (!createdAt) return "Just now";

  const createdDate = new Date(createdAt);
  if (Number.isNaN(createdDate.getTime())) return "Just now";

  const diffMs = Date.now() - createdDate.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < minute) return "Just now";
  if (diffMs < hour) {
    const minutes = Math.max(1, Math.floor(diffMs / minute));
    return `${minutes} min ago`;
  }
  if (diffMs < day) {
    const hours = Math.max(1, Math.floor(diffMs / hour));
    return `${hours} hr ago`;
  }

  const days = Math.max(1, Math.floor(diffMs / day));
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

function toListing(
  postId: string,
  post: FirestorePost,
  categoryLabel: string,
): Listing {
  const coverUrl = post.coverImage || post.images?.[0] || "";
  const details = post.details || {};

  return {
    id: postId,
    title: post.title?.trim() || "Untitled listing",
    price: formatPrice(post.price),
    location: post.location || post.city || "Location not set",
    province: post.province || "",
    district: post.district || "",
    city: post.city || "",
    address: post.address || "",
    timeAgo: toTimeAgo(post.createdAt),
    image: coverUrl ? { uri: coverUrl } : null,
    images: post.images?.map((url) => ({ uri: url })) || [],
    description: post.description || "",
    category: categoryLabel,
    sellerName: post.contactName || "",
    sellerPhone: post.contactPhone || "",
    hidePhone: post.hidePhone || false,
    status: normalizeStatus(post.status),
    sellerId: post.userId || "",
    brand: details.brand || "",
    model: details.model || "",
    color: details.color || "",
    condition: details.condition as Listing["condition"],
    details,
  };
}

export function useHomeCategorySections(
  postsPerCategory = 5,
): UseHomeCategorySectionsResult {
  const [sections, setSections] = useState<HomeCategorySection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [refreshTick, setRefreshTick] = useState(0);

  const mainCategories = useMemo(
    () =>
      CATEGORIES.map((category) => ({
        id: category.id,
        label: category.label,
      })),
    [],
  );

  const refresh = useCallback(() => {
    setRefreshTick((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const initializedCategories = new Set<string>();
    const sectionsByCategoryId: Record<string, HomeCategorySection> = {};

    setIsLoading(true);
    setErrorMessage("");

    const unsubscribers = mainCategories.map((category) => {
      const postRef = collection(db, "categories", category.id, "posts");
      const postsQuery = query(
        postRef,
        orderBy("createdAt", "desc"),
        limit(postsPerCategory * 3),
      );

      return onSnapshot(
        postsQuery,
        (snap) => {
          const activeListings = snap.docs
            .map((doc) => ({ id: doc.id, ...(doc.data() as FirestorePost) }))
            .filter((doc) => normalizeStatus(doc.status) === "active")
            .slice(0, postsPerCategory)
            .map((doc) => toListing(doc.id, doc, category.label));

          sectionsByCategoryId[category.id] = {
            categoryId: category.id,
            title: category.label,
            listings: activeListings,
          };

          initializedCategories.add(category.id);

          const orderedSections = mainCategories
            .map((item) => sectionsByCategoryId[item.id])
            .filter(Boolean)
            .filter((section) => section.listings.length > 0);

          setSections(orderedSections);

          if (initializedCategories.size === mainCategories.length) {
            setIsLoading(false);
          }
        },
        (error) => {
          console.error("Load home sections error:", error);
          setErrorMessage("Unable to load posts right now.");
          setIsLoading(false);
        },
      );
    });

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, [mainCategories, postsPerCategory, refreshTick]);

  return { sections, isLoading, errorMessage, refresh };
}
