import { Stack, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
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
  } = useCategoryListings(categoryId);

  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const sortedListings = useMemo(() => {
    const sorted = [...filteredListings];
    if (sortOrder === "oldest") {
      sorted.reverse();
    }
    return sorted;
  }, [filteredListings, sortOrder]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: categoryLabel,
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          headerShadowVisible: false,
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
              onPress={() =>
                setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
              }
            >
              <AppIcon
                name="swap-horizontal-outline"
                size={16}
                color={theme.primary}
              />
              <ThemedText type="small" themeColor="primary">
                {sortOrder === "newest" ? "Newest" : "Oldest"}
              </ThemedText>
            </TouchableOpacity>
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
                : `No active posts in ${categoryLabel}.`}
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
      </ThemedView>
    </>
  );
}
