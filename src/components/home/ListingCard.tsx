import { router } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";

import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import type { Listing } from "@/types/listing";

export function ListingCard({ listing }: { listing: Listing }) {
  const theme = useTheme();

  function handlePress() {
    router.push({
      pathname: "/(tabs)/listing/[id]",
      params: {
        id: String(listing.id),
        // Keep it URL-safe on web (raw JSON in query params can break navigation).
        data: encodeURIComponent(JSON.stringify(listing)),
      },
    });
  }

  return (
    <TouchableOpacity style={{ width: 200 }} onPress={handlePress}>
      <ThemedView
        type="backgroundElement"
        className="rounded-2xl overflow-hidden border"
        style={{ borderColor: theme.border }}
      >
        {/* Image */}
        <View className="relative">
          <Image
            source={listing.image}
            className="w-full h-36"
            resizeMode="cover"
          />
          {listing.isFeatured && (
            <View
              className="absolute top-2 left-2 px-2 py-0.5 rounded-md"
              style={{ backgroundColor: "#FBBC05" }}
            >
              <ThemedText
                style={{ fontSize: 11, fontWeight: "700", color: "#000" }}
              >
                Featured
              </ThemedText>
            </View>
          )}
          <TouchableOpacity
            className="absolute bottom-2 right-2 rounded-full p-1"
            style={{ backgroundColor: theme.background }}
          >
            <AppIcon name="heart-outline" size={16} color={theme.icon} />
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View className="p-2.5 gap-0.5">
          <ThemedText type="smallBold">{listing.price}</ThemedText>
          <ThemedText type="small" numberOfLines={1}>
            {listing.title}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
            {listing.location}
          </ThemedText>
          <ThemedText type="small" themeColor="textMuted">
            {listing.timeAgo}
          </ThemedText>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}
