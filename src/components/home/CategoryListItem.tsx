import { router } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";

import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import type { Listing } from "@/types/listing";

const placeholderImage = require("../../../assets/categories/mobile.png");

export function CategoryListItem({ listing }: { listing: Listing }) {
  const theme = useTheme();

  function handlePress() {
    const imageUri =
      typeof listing.image === "object" && listing.image?.uri
        ? String(listing.image.uri)
        : "";
    const imageUrls = (listing.images || [])
      .map((item) => {
        if (typeof item === "string") return item;
        if (typeof item === "object" && item?.uri) return String(item.uri);
        return "";
      })
      .filter(Boolean);

    const payload = {
      ...listing,
      imageUri,
      imageUrls,
    };

    router.push({
      pathname: "/listing/[id]",
      params: {
        id: String(listing.id),
        data: encodeURIComponent(JSON.stringify(payload)),
      },
    });
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <ThemedView
        type="backgroundElement"
        className="flex-row gap-3 p-3 rounded-xl border mb-2"
        style={{ borderColor: theme.border }}
      >
        {/* Image */}
        <View
          className="relative rounded-lg overflow-hidden"
          style={{ width: 100, height: 100 }}
        >
          <Image
            source={
              typeof listing.image === "object" && listing.image?.uri
                ? listing.image
                : placeholderImage
            }
            className="w-full h-full"
            resizeMode="cover"
          />
          {listing.isFeatured && (
            <View
              className="absolute top-1 left-1 px-1.5 py-0.5 rounded"
              style={{ backgroundColor: "#FBBC05" }}
            >
              <ThemedText
                style={{ fontSize: 9, fontWeight: "700", color: "#000" }}
              >
                Featured
              </ThemedText>
            </View>
          )}
        </View>

        {/* Content */}
        <View className="flex-1 justify-between">
          <View className="gap-0.5">
            <ThemedText type="smallBold" style={{ fontSize: 14 }}>
              {listing.price}
            </ThemedText>
            <ThemedText type="small" numberOfLines={2}>
              {listing.title}
            </ThemedText>
          </View>

          <View className="gap-0.5">
            <View className="flex-row items-center gap-1">
              <AppIcon
                name="location-sharp"
                size={12}
                color={theme.textSecondary}
              />
              <ThemedText
                type="small"
                themeColor="textSecondary"
                numberOfLines={1}
              >
                {listing.location}
              </ThemedText>
            </View>
            <ThemedText
              type="small"
              themeColor="textMuted"
              style={{ fontSize: 11 }}
            >
              {listing.timeAgo}
            </ThemedText>
          </View>
        </View>

        {/* Wishlist */}
        <View className="justify-start pt-1">
          <TouchableOpacity
            className="w-6 h-6 rounded-full items-center justify-center"
            style={{ backgroundColor: theme.backgroundElement }}
          >
            <AppIcon name="heart-outline" size={14} color={theme.icon} />
          </TouchableOpacity>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}
