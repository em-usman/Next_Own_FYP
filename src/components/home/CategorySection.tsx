import { router } from "expo-router";
import { FlatList, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import type { Listing } from "@/types/listing";

import { ListingCard } from "./ListingCard";

type Props = {
  title: string;
  categoryHref: string;
  listings: Listing[];
};

export function CategorySection({ title, categoryHref, listings }: Props) {
  const latest = listings.slice(0, 4);

  return (
    <View className="gap-3 mb-6">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4">
        <ThemedText type="subtitle" style={{ fontSize: 20 }}>
          {title}
        </ThemedText>
        <TouchableOpacity
          className="flex-row items-center gap-0.5"
          onPress={() => router.push(categoryHref as any)}
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
