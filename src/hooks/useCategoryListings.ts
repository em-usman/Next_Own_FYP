import {
    collection,
    limit,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";

import { CATEGORIES } from "@/config/categoryConfig";
import type { Listing } from "@/types/listing";
import { db } from "../../firebaseConfig";

type FirestorePost = {
  title?: string;
  price?: number;
  location?: string;
  coverImage?: string;
  images?: string[];
  status?: string;
  createdAt?: string;
  description?: string;
  contactName?: string;
  contactPhone?: string;
  hidePhone?: boolean;
  details?: Record<string, string>;
};

type UseCategoryListingsResult = {
  listings: Listing[];
  filteredListings: Listing[];
  categoryLabel: string;
  isLoading: boolean;
  errorMessage: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const FALLBACK_IMAGE = require("../../assets/categories/mobile.png");

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
    location: post.location || "Location not set",
    timeAgo: toTimeAgo(post.createdAt),
    image: coverUrl ? { uri: coverUrl } : FALLBACK_IMAGE,
    images: post.images?.map((url) => ({ uri: url })) || [],
    description: post.description || "",
    category: categoryLabel,
    sellerName: post.contactName || "",
    sellerPhone: post.contactPhone || "",
    hidePhone: post.hidePhone || false,
    brand: details.brand || "",
    model: details.model || "",
    color: details.color || "",
    condition: details.condition as Listing["condition"],
    details,
  };
}

export function useCategoryListings(
  categoryId: string,
): UseCategoryListingsResult {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const categoryLabel = useMemo(() => {
    const category = CATEGORIES.find((c) => c.id === categoryId);
    return category?.label || categoryId;
  }, [categoryId]);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage("");

    const postRef = collection(db, "categories", categoryId, "posts");
    const postsQuery = query(postRef, orderBy("createdAt", "desc"), limit(100));

    const unsubscribe = onSnapshot(
      postsQuery,
      (snap) => {
        const activeListings = snap.docs
          .map((doc) => ({ id: doc.id, ...(doc.data() as FirestorePost) }))
          .filter((doc) => doc.status === "active")
          .map((doc) => toListing(doc.id, doc, categoryLabel));

        setListings(activeListings);
        setIsLoading(false);
      },
      (error) => {
        console.error("Load category listings error:", error);
        setErrorMessage("Unable to load category posts right now.");
        setIsLoading(false);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [categoryId, categoryLabel]);

  const filteredListings = useMemo(() => {
    if (!searchQuery.trim()) return listings;

    const query = searchQuery.toLowerCase().trim();
    return listings.filter(
      (listing) =>
        listing.title.toLowerCase().includes(query) ||
        listing.location.toLowerCase().includes(query) ||
        listing.price.toLowerCase().includes(query) ||
        (listing.brand || "").toLowerCase().includes(query) ||
        (listing.model || "").toLowerCase().includes(query),
    );
  }, [listings, searchQuery]);

  return {
    listings,
    filteredListings,
    categoryLabel,
    isLoading,
    errorMessage,
    searchQuery,
    setSearchQuery,
  };
}
