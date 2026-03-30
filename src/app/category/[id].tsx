import { Stack, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { AppIcon } from "@/components/Icons/AppIcon";
import { CategoryListItem } from "@/components/home/CategoryListItem";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { useCategoryListings } from "@/hooks/useCategoryListings";

type SortOption =
  | "most-relevant"
  | "newly-listed"
  | "lowest-price"
  | "highest-price";

const SORT_OPTIONS: Array<{ key: SortOption; label: string }> = [
  { key: "most-relevant", label: "Most relevant" },
  { key: "newly-listed", label: "Newly listed" },
  { key: "lowest-price", label: "Lowest price" },
  { key: "highest-price", label: "Highest price" },
];

function parsePriceValue(priceText: string): number {
  const normalized = priceText.toLowerCase().trim();
  const numeric = Number(normalized.replace(/[^0-9.]/g, ""));

  if (!Number.isFinite(numeric) || numeric <= 0) {
    return Number.NaN;
  }

  if (/lac|lakh/.test(normalized)) {
    return numeric * 100_000;
  }

  if (/crore/.test(normalized)) {
    return numeric * 10_000_000;
  }

  return numeric;
}

function StatusFilterChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      className="px-3 py-2 rounded-full border"
      style={{
        borderColor: selected ? theme.primary : theme.border,
        backgroundColor: selected
          ? `${theme.primary}1A`
          : theme.backgroundElement,
      }}
      onPress={onPress}
    >
      <ThemedText
        type="small"
        style={{ color: selected ? theme.primary : theme.textSecondary }}
      >
        {label}
      </ThemedText>
    </TouchableOpacity>
  );
}

export default function CategoryListingScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const categoryId = id || "";

  const {
    filteredListings,
    categoryLabel,
    isLoading,
    errorMessage,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
  } = useCategoryListings(categoryId);

  const [sortOption, setSortOption] = useState<SortOption>("most-relevant");
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);

  const sortedListings = useMemo(() => {
    if (sortOption === "most-relevant") {
      return filteredListings;
    }

    if (sortOption === "newly-listed") {
      // Firestore query is already loaded as createdAt desc; keep the natural order.
      return filteredListings;
    }

    const sorted = [...filteredListings].sort((left, right) => {
      const leftPrice = parsePriceValue(left.price);
      const rightPrice = parsePriceValue(right.price);

      const leftValid = Number.isFinite(leftPrice);
      const rightValid = Number.isFinite(rightPrice);

      if (!leftValid && !rightValid) return 0;
      if (!leftValid) return 1;
      if (!rightValid) return -1;

      return sortOption === "lowest-price"
        ? leftPrice - rightPrice
        : rightPrice - leftPrice;
    });

    return sorted;
  }, [filteredListings, sortOption]);

  const activeSortLabel =
    SORT_OPTIONS.find((option) => option.key === sortOption)?.label ||
    "Most relevant";

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: categoryLabel,
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
          headerTitleStyle: { fontSize: 18, fontWeight: "700" },
        }}
      />

      <ThemedView className="flex-1">
        {/* Search Bar */}
        <View className="px-4 py-3 gap-3">
          <View
            className="flex-row items-center px-3 py-2 rounded-xl border"
            style={{
              backgroundColor: theme.backgroundElement,
              borderColor: theme.border,
            }}
          >
            <AppIcon
              name="search-outline"
              size={18}
              color={theme.textSecondary}
            />
            <TextInput
              placeholder="Search in this category..."
              placeholderTextColor={theme.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 ml-2"
              style={{ color: theme.text }}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <AppIcon name="close" size={18} color={theme.textSecondary} />
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Sort Button */}
          <View className="flex-row gap-2">
            <TouchableOpacity
              className="flex-row items-center gap-1 px-3 py-2 rounded-full border"
              style={{
                backgroundColor: theme.backgroundElement,
                borderColor: theme.border,
              }}
              onPress={() => setIsSortModalVisible(true)}
            >
              <AppIcon name="options-outline" size={16} color={theme.primary} />
              <ThemedText type="small" themeColor="primary">
                Sort: {activeSortLabel}
              </ThemedText>
            </TouchableOpacity>
          </View>

          <View className="flex-row gap-2">
            <StatusFilterChip
              label="Active"
              selected={statusFilter === "active"}
              onPress={() => setStatusFilter("active")}
            />
            <StatusFilterChip
              label="Sold"
              selected={statusFilter === "sold"}
              onPress={() => setStatusFilter("sold")}
            />
            <StatusFilterChip
              label="All"
              selected={statusFilter === "all"}
              onPress={() => setStatusFilter("all")}
            />
          </View>
        </View>

        {/* Content */}
        {isLoading && (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color={theme.primary} />
          </View>
        )}

        {!isLoading && !!errorMessage && (
          <View className="flex-1 items-center justify-center px-4 gap-2">
            <ThemedText type="subtitle" style={{ color: theme.error }}>
              Error
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {errorMessage}
            </ThemedText>
          </View>
        )}

        {!isLoading && !errorMessage && sortedListings.length === 0 && (
          <View className="flex-1 items-center justify-center px-4 gap-2">
            <ThemedText type="subtitle">No listings found</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {searchQuery
                ? "Try adjusting your search."
                : `No ${statusFilter === "all" ? "matching" : statusFilter} posts in ${categoryLabel}.`}
            </ThemedText>
          </View>
        )}

        {!isLoading && sortedListings.length > 0 && (
          <FlatList
            data={sortedListings}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 16, gap: 8, paddingBottom: 20 }}
            renderItem={({ item }) => <CategoryListItem listing={item} />}
          />
        )}

        <Modal
          visible={isSortModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setIsSortModalVisible(false)}
        >
          <TouchableOpacity
            className="flex-1"
            activeOpacity={1}
            style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
            onPress={() => setIsSortModalVisible(false)}
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
              paddingBottom: 20,
            }}
          >
            <View className="items-center pt-2 pb-1">
              <View
                style={{
                  width: 44,
                  height: 4,
                  borderRadius: 999,
                  backgroundColor: theme.border,
                }}
              />
            </View>

            <View
              className="px-5 py-4"
              style={{ borderBottomWidth: 1, borderBottomColor: theme.border }}
            >
              <ThemedText type="subtitle" style={{ fontSize: 34 }}>
                Sort
              </ThemedText>
            </View>

            {SORT_OPTIONS.map((option) => {
              const isSelected = option.key === sortOption;
              return (
                <TouchableOpacity
                  key={option.key}
                  className="flex-row items-center justify-between px-5 py-4"
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: theme.border,
                  }}
                  onPress={() => {
                    setSortOption(option.key);
                    setIsSortModalVisible(false);
                  }}
                >
                  <ThemedText
                    type="default"
                    style={{ fontWeight: isSelected ? "700" : "500" }}
                  >
                    {option.label}
                  </ThemedText>
                  {isSelected ? (
                    <AppIcon name="checkmark" size={22} color={theme.primary} />
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </ThemedView>
        </Modal>
      </ThemedView>
    </>
  );
}
