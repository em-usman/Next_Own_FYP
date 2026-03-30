import * as ExpoLinking from "expo-linking";
import { router } from "expo-router";
import { Image, Share, TouchableOpacity, View } from "react-native";

import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { useFavourites } from "@/hooks/useFavourites";
import type { Listing } from "@/types/listing";

const placeholderImage = require("../../../assets/categories/mobile.png");

export function CategoryListItem({ listing }: { listing: Listing }) {
  const theme = useTheme();
  const { addToFavourites, removeFromFavourites, isFavourite, isUpdating } =
    useFavourites();

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

  async function handleFavouritePress() {
    const postId = String(listing.id);
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

    if (isFavourite(postId)) {
      await removeFromFavourites(postId);
      return;
    }

    await addToFavourites({
      postId,
      title: listing.title,
      price: listing.price,
      location: listing.location,
      imageUri,
      imageUrls,
      timeAgo: listing.timeAgo,
      description: listing.description,
      category: listing.category,
      brand: listing.brand,
      model: listing.model,
      color: listing.color,
      condition: listing.condition,
      sellerName: listing.sellerName,
      sellerPhone: listing.sellerPhone,
      hidePhone: listing.hidePhone,
      isFeatured: listing.isFeatured,
      details: listing.details,
      status: listing.status,
    });
  }

  async function handleSharePress() {
    const productUrl = ExpoLinking.createURL(`/listing/${listing.id}`, {
      queryParams: { ref: "share" },
    });

    try {
      await Share.share({
        title: listing.title,
        message: `${listing.title}\n${listing.price}\n${productUrl}\nAd ID: ${listing.id}`,
      });
    } catch (error) {
      console.error("Share launch error:", error);
    }
  }

  const liked = isFavourite(String(listing.id));

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
              style={{ backgroundColor: "#7BF7CF" }}
            >
              <ThemedText
                style={{ fontSize: 9, fontWeight: "700", color: "#141414" }}
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

        {/* Actions */}
        <View className="justify-start pt-1 gap-2">
          <TouchableOpacity
            className="w-6 h-6 rounded-full items-center justify-center"
            style={{ backgroundColor: theme.backgroundElement }}
            onPress={handleSharePress}
          >
            <AppIcon name="share-social-outline" size={13} color={theme.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-6 h-6 rounded-full items-center justify-center"
            style={{ backgroundColor: theme.backgroundElement }}
            onPress={handleFavouritePress}
            disabled={isUpdating}
          >
            <AppIcon
              name={liked ? "heart" : "heart-outline"}
              size={14}
              color={liked ? "#FF3B59" : theme.icon}
            />
          </TouchableOpacity>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}
