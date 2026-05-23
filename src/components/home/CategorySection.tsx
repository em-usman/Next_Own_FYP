import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
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
  listings,
  maxItems = 5,
}: Props) {
  const theme = useTheme();
  const latest = listings.slice(0, maxItems);

  return (
    <View style={{ marginBottom: 28 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          marginBottom: 12,
        }}
      >
        <ThemedText type="subtitle" style={{ fontSize: 18, fontWeight: "700" }}>
          {title}
        </ThemedText>
        <TouchableOpacity
          onPress={() => router.push(`/category/${categoryId}` as any)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
            paddingHorizontal: 12,
            paddingVertical: 5,
            borderRadius: 20,
            backgroundColor: theme.backgroundSelected,
          }}
        >
          <ThemedText style={{ fontSize: 12, color: theme.primary, fontWeight: "600" }}>
            See All
          </ThemedText>
          <Ionicons name="chevron-forward" size={12} color={theme.primary} />
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
