import { CATEGORIES } from "@/config/categoryConfig";
import type { Listing } from "@/types/listing";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";
import { db } from "../../firebaseConfig";

function formatPrice(price?: number): string {
  if (typeof price !== "number" || Number.isNaN(price)) return "Price not set";
  return `Rs ${price.toLocaleString("en-PK")}`;
}

function toTimeAgo(createdAt?: string): string {
  if (!createdAt) return "Just now";
  const created = new Date(createdAt);
  if (Number.isNaN(created.getTime())) return "Just now";
  const diffMs = Date.now() - created.getTime();
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (diffMs < minute) return "Just now";
  if (diffMs < hour)
    return `${Math.max(1, Math.floor(diffMs / minute))} min ago`;
  if (diffMs < day) return `${Math.max(1, Math.floor(diffMs / hour))} hr ago`;
  const days = Math.max(1, Math.floor(diffMs / day));
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

function docToListing(
  postId: string,
  data: Record<string, any>,
  categoryLabel: string,
): Listing {
  const coverUrl = data.coverImage || data.images?.[0] || "";
  return {
    id: postId,
    title: data.title?.trim() || "Untitled",
    price: formatPrice(data.price),
    location: data.location || data.city || "Location not set",
    province: data.province || "",
    district: data.district || "",
    city: data.city || "",
    address: data.address || "",
    timeAgo: toTimeAgo(data.createdAt),
    createdAt: data.createdAt,
    image: coverUrl ? { uri: coverUrl } : null,
    images: (data.images || []).map((url: string) => ({ uri: url })),
    description: data.description || "",
    category: categoryLabel,
    hidePhone: data.hidePhone || false,
    status: data.status || "active",
    sellerId: data.userId || "",
    details: data.details || {},
    isFeatured: data.isFeatured || false,
  };
}

const DOCS_PER_CATEGORY = 60;

async function fetchAllActiveListings(): Promise<Listing[]> {
  const results = await Promise.allSettled(
    CATEGORIES.map(async (category) => {
      const q = query(
        collection(db, "categories", category.id, "posts"),
        orderBy("createdAt", "desc"),
        limit(DOCS_PER_CATEGORY),
      );
      const snap = await getDocs(q);
      return snap.docs
        .map((d) =>
          docToListing(d.id, d.data() as Record<string, any>, category.label),
        )
        .filter((l) => l.status === "active");
    }),
  );

  return results
    .filter(
      (r): r is PromiseFulfilledResult<Listing[]> => r.status === "fulfilled",
    )
    .flatMap((r) => r.value);
}

function buildCorpus(listing: Listing): string {
  return [
    listing.title,
    listing.description,
    listing.category,
    listing.city,
    listing.district,
    listing.province,
    listing.address,
    ...Object.values(listing.details || {}),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function scoreMatch(listing: Listing, q: string): number {
  const lower = q.toLowerCase();
  const title = listing.title.toLowerCase();

  if (title === lower) return 4;
  if (title.startsWith(lower)) return 3;
  if (title.includes(lower)) return 2;
  if (buildCorpus(listing).includes(lower)) return 1;
  return 0;
}

// Shared cache so both search screen and results screen use same fetch
let cachedListings: Listing[] | null = null;
let cacheTime = 0;
const CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutes

async function getListings(): Promise<Listing[]> {
  if (cachedListings && Date.now() - cacheTime < CACHE_TTL_MS) {
    return cachedListings;
  }
  const listings = await fetchAllActiveListings();
  cachedListings = listings;
  cacheTime = Date.now();
  return listings;
}

// ─── useSearch — for results screen ──────────────────────────────────────────

export function useSearch(query: string) {
  const [results, setResults] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef(false);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      return;
    }

    abortRef.current = false;
    setIsLoading(true);

    getListings()
      .then((listings) => {
        if (abortRef.current) return;
        const matched = listings
          .map((l) => ({ listing: l, score: scoreMatch(l, trimmed) }))
          .filter(({ score }) => score > 0)
          .sort((a, b) => b.score - a.score)
          .map(({ listing }) => listing);
        setResults(matched);
      })
      .catch(() => {
        if (!abortRef.current) setResults([]);
      })
      .finally(() => {
        if (!abortRef.current) setIsLoading(false);
      });

    return () => {
      abortRef.current = true;
    };
  }, [query]);

  return { results, isLoading };
}

// ─── useSuggestions — for search input screen ─────────────────────────────

export function useSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const compute = useCallback((q: string) => {
    const trimmed = q.trim();
    if (!trimmed) {
      setSuggestions([]);
      return;
    }
    getListings()
      .then((listings) => {
        const lower = trimmed.toLowerCase();
        const seenTitles = new Set<string>();
        const seenCategories = new Set<string>();
        const titleMatches: string[] = [];
        const categoryMatches: string[] = [];

        for (const l of listings) {
          // Title suggestions
          if (
            l.title.toLowerCase().includes(lower) &&
            !seenTitles.has(l.title)
          ) {
            seenTitles.add(l.title);
            titleMatches.push(l.title);
          }
          // Category suggestions (e.g. "mobile" → "Mobiles")
          const cat = l.category || "";
          if (cat.toLowerCase().includes(lower) && !seenCategories.has(cat)) {
            seenCategories.add(cat);
            categoryMatches.push(cat);
          }
        }

        // Title matches first, then category matches — max 8 total
        const combined = [...titleMatches, ...categoryMatches].slice(0, 8);
        setSuggestions(combined);
      })
      .catch(() => setSuggestions([]));
  }, []);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    timerRef.current = setTimeout(() => compute(query), 300);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, compute]);

  return suggestions;
}
