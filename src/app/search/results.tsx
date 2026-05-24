import { AppIcon } from "@/components/Icons/AppIcon";
import { CategoryListItem } from "@/components/home/CategoryListItem";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { useSearch } from "@/hooks/useSearch";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  TouchableOpacity,
  View,
} from "react-native";

type SortOption = "relevant" | "newest" | "price-low" | "price-high";

const SORT_OPTIONS: { key: SortOption; label: string }[] = [
  { key: "relevant", label: "Most relevant" },
  { key: "newest", label: "Newly listed" },
  { key: "price-low", label: "Lowest price" },
  { key: "price-high", label: "Highest price" },
];

function parsePriceNum(priceText: string): number {
  const n = Number(priceText.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export default function SearchResultsScreen() {
  const theme = useTheme();
  const { q } = useLocalSearchParams<{ q?: string }>();
  const query = Array.isArray(q) ? q[0] : q || "";

  const { results, isLoading } = useSearch(query);

  const [sortOption, setSortOption] = useState<SortOption>("relevant");
  const [sortModalVisible, setSortModalVisible] = useState(false);

  const sorted = useMemo(() => {
    if (sortOption === "relevant" || sortOption === "newest") return results;
    return [...results].sort((a, b) => {
      const pa = parsePriceNum(a.price);
      const pb = parsePriceNum(b.price);
      return sortOption === "price-low" ? pa - pb : pb - pa;
    });
  }, [results, sortOption]);

  const activeSortLabel =
    SORT_OPTIONS.find((o) => o.key === sortOption)?.label ?? "Sort";

  return (
    <>
      <ThemedView className="flex-1">
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 56,
            paddingHorizontal: 16,
            paddingBottom: 12,
            gap: 12,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
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

          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: theme.backgroundElement,
                borderWidth: 1,
                borderColor: theme.border,
                borderRadius: 12,
                paddingHorizontal: 12,
                height: 42,
                gap: 8,
              }}
            >
              <AppIcon
                family="ion"
                name="search-outline"
                size={16}
                color={theme.textMuted}
              />
              <ThemedText
                style={{
                  flex: 1,
                  fontSize: 15,
                  color: query ? theme.text : theme.textMuted,
                }}
                numberOfLines={1}
              >
                {query || "Search listings..."}
              </ThemedText>
            </View>
          </TouchableOpacity>
        </View>

        {/* Sort + count row */}
        {!isLoading && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              paddingVertical: 10,
            }}
          >
            <ThemedText type="small" themeColor="textSecondary">
              {sorted.length} result{sorted.length !== 1 ? "s" : ""} for{" "}
              <ThemedText type="smallBold">"{query}"</ThemedText>
            </ThemedText>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: theme.border,
                backgroundColor: theme.backgroundElement,
              }}
              onPress={() => setSortModalVisible(true)}
            >
              <AppIcon
                family="ion"
                name="options-outline"
                size={14}
                color={theme.primary}
              />
              <ThemedText
                style={{
                  fontSize: 13,
                  color: theme.primary,
                  fontWeight: "600",
                }}
              >
                {activeSortLabel}
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}

        {/* Loading */}
        {isLoading && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <ActivityIndicator size="large" color={theme.primary} />
            <ThemedText type="small" themeColor="textSecondary">
              Searching across all categories...
            </ThemedText>
          </View>
        )}

        {/* Empty */}
        {!isLoading && sorted.length === 0 && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              paddingHorizontal: 32,
            }}
          >
            <AppIcon
              family="ion"
              name="search-outline"
              size={44}
              color={theme.textMuted}
            />
            <ThemedText
              type="subtitle"
              style={{ fontSize: 18, textAlign: "center" }}
            >
              No results found
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ textAlign: "center" }}
            >
              No listings matched "{query}". Try different keywords.
            </ThemedText>
          </View>
        )}

        {/* Results */}
        {!isLoading && sorted.length > 0 && (
          <FlatList
            data={sorted}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
            renderItem={({ item }) => <CategoryListItem listing={item} />}
          />
        )}
      </ThemedView>

      {/* Sort modal */}
      <Modal
        visible={sortModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.45)" }}
          activeOpacity={1}
          onPress={() => setSortModalVisible(false)}
        />
        <ThemedView
          type="backgroundElement"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            paddingBottom: 32,
          }}
        >
          <View
            style={{ alignItems: "center", paddingTop: 10, paddingBottom: 4 }}
          >
            <View
              style={{
                width: 44,
                height: 4,
                borderRadius: 99,
                backgroundColor: theme.border,
              }}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 14,
              borderBottomWidth: 1,
              borderBottomColor: theme.border,
            }}
          >
            <ThemedText type="subtitle" style={{ fontSize: 20 }}>
              Sort by
            </ThemedText>
          </View>
          {SORT_OPTIONS.map((option) => {
            const isSelected = option.key === sortOption;
            return (
              <TouchableOpacity
                key={option.key}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.border,
                }}
                onPress={() => {
                  setSortOption(option.key);
                  setSortModalVisible(false);
                }}
              >
                <ThemedText
                  style={{
                    fontSize: 15,
                    fontWeight: isSelected ? "700" : "400",
                  }}
                >
                  {option.label}
                </ThemedText>
                {isSelected && (
                  <AppIcon
                    family="ion"
                    name="checkmark"
                    size={20}
                    color={theme.primary}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </ThemedView>
      </Modal>
    </>
  );
}
