import { router } from "expo-router";
import { FlatList, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import type { Listing } from "@/types/listing";

import { ListingCard } from "./ListingCard";

type Props = {
  title: string;
  categoryId: string;
  categoryHref?: string;
  listings: Listing[];
  maxItems?: number;
};

export function CategorySection({
  title,
  categoryId,
  categoryHref,
  listings,
  maxItems = 5,
}: Props) {
  const latest = listings.slice(0, maxItems);

  function handleSeeAll() {
    router.push(`/category/${categoryId}` as any);
  }

  return (
    <View className="gap-3 mb-6">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4">
        <ThemedText type="subtitle" style={{ fontSize: 20 }}>
          {title}
        </ThemedText>
        <TouchableOpacity
          onPress={handleSeeAll}
          className="flex-row items-center gap-0.5"
        >
          <ThemedText type="small" themeColor="primary">
            See All
          </ThemedText>
          <ThemedText type="small" themeColor="primary">
            {" "}
            ›
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Cards */}
      <FlatList
        data={latest}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
        renderItem={({ item }) => <ListingCard listing={item} />}
      />
    </View>
  );
}
