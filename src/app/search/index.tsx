import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import { useSuggestions } from "@/hooks/useSearch";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, TextInput, TouchableOpacity, View } from "react-native";

export default function SearchScreen() {
  const theme = useTheme();
  const [query, setQuery] = useState("");
  const inputRef = useRef<TextInput>(null);
  const { recentSearches, addSearch, removeSearch, clearAll } =
    useRecentSearches();
  const suggestions = useSuggestions(query);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  function goToResults(q: string) {
    const trimmed = q.trim();
    if (!trimmed) return;
    addSearch(trimmed);
    router.push({
      pathname: "/search/results",
      params: { q: trimmed },
    });
  }

  const showSuggestions = query.trim().length > 0;
  const showRecent = !showSuggestions && recentSearches.length > 0;

  return (
    <ThemedView className="flex-1" style={{ paddingTop: 56 }}>
      {/* Search Input Row */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingBottom: 12,
          gap: 10,
        }}
      >
        <TouchableOpacity onPress={() => router.back()} hitSlop={10}>
          <AppIcon
            family="ion"
            name="chevron-back-circle"
            size={30}
            color={theme.primary}
          />
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.backgroundElement,
            borderWidth: 1.5,
            borderColor: theme.primary,
            borderRadius: 14,
            paddingHorizontal: 12,
            paddingVertical: 2,
            height: 46,
          }}
        >
          <AppIcon
            family="ion"
            name="search-outline"
            size={18}
            color={theme.primary}
          />
          <TextInput
            ref={inputRef}
            value={query}
            onChangeText={setQuery}
            placeholder="Search listings..."
            placeholderTextColor={theme.textMuted}
            returnKeyType="search"
            onSubmitEditing={() => goToResults(query)}
            style={{
              flex: 1,
              marginLeft: 8,
              fontSize: 15,
              color: theme.text,
              paddingVertical: 0,
            }}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")} hitSlop={8}>
              <AppIcon
                family="ion"
                name="close-circle"
                size={18}
                color={theme.textMuted}
              />
            </TouchableOpacity>
          )}
        </View>

        {query.trim().length > 0 && (
          <TouchableOpacity onPress={() => goToResults(query)}>
            <ThemedText
              style={{ color: theme.primary, fontWeight: "600", fontSize: 15 }}
            >
              Search
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ height: 1, backgroundColor: theme.border }} />

      {/* Suggestions */}
      {showSuggestions && (
        <FlatList
          data={suggestions}
          keyExtractor={(item, i) => `${item}-${i}`}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 14,
                gap: 12,
                borderBottomWidth: 1,
                borderBottomColor: theme.border,
              }}
              onPress={() => goToResults(item)}
            >
              <AppIcon
                family="ion"
                name="search-outline"
                size={16}
                color={theme.textMuted}
              />
              <ThemedText style={{ flex: 1, fontSize: 14 }} numberOfLines={1}>
                {item}
              </ThemedText>
              <TouchableOpacity hitSlop={10} onPress={() => setQuery(item)}>
                <AppIcon
                  family="ion"
                  name="arrow-up-back-outline"
                  size={16}
                  color={theme.textMuted}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={{ padding: 20, alignItems: "center" }}>
              <ThemedText type="small" themeColor="textMuted">
                No suggestions found
              </ThemedText>
            </View>
          }
        />
      )}

      {/* Recent Searches */}
      {showRecent && (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
          >
            <ThemedText type="smallBold" themeColor="textSecondary">
              Recent searches
            </ThemedText>
            <TouchableOpacity onPress={clearAll}>
              <ThemedText style={{ fontSize: 13, color: theme.error }}>
                Clear all
              </ThemedText>
            </TouchableOpacity>
          </View>

          <FlatList
            data={recentSearches}
            keyExtractor={(item, i) => `${item}-${i}`}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 13,
                  gap: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.border,
                }}
                onPress={() => goToResults(item)}
              >
                <AppIcon
                  family="ion"
                  name="time-outline"
                  size={16}
                  color={theme.textMuted}
                />
                <ThemedText style={{ flex: 1, fontSize: 14 }}>
                  {item}
                </ThemedText>
                <TouchableOpacity
                  hitSlop={10}
                  onPress={() => removeSearch(item)}
                >
                  <AppIcon
                    family="ion"
                    name="close"
                    size={16}
                    color={theme.textMuted}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Empty state — nothing typed, no recents */}
      {!showSuggestions && !showRecent && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <AppIcon
            family="ion"
            name="search-outline"
            size={44}
            color={theme.textMuted}
          />
          <ThemedText type="subtitle" style={{ fontSize: 18 }}>
            Search anything
          </ThemedText>
          <ThemedText
            type="small"
            themeColor="textSecondary"
            style={{ textAlign: "center", paddingHorizontal: 40 }}
          >
            Find mobiles, cars, property, jobs and more across Pakistan
          </ThemedText>
        </View>
      )}
    </ThemedView>
  );
}
