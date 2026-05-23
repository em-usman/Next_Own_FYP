import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "recentSearches";
const MAX_ITEMS = 8;

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setRecentSearches(JSON.parse(raw) as string[]);
      })
      .catch(() => {});
  }, []);

  const addSearch = useCallback(async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => {
      const deduped = [trimmed, ...prev.filter((s) => s.toLowerCase() !== trimmed.toLowerCase())].slice(0, MAX_ITEMS);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(deduped)).catch(() => {});
      return deduped;
    });
  }, []);

  const removeSearch = useCallback(async (query: string) => {
    setRecentSearches((prev) => {
      const updated = prev.filter((s) => s !== query);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  }, []);

  const clearAll = useCallback(async () => {
    setRecentSearches([]);
    await AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
  }, []);

  return { recentSearches, addSearch, removeSearch, clearAll };
}
