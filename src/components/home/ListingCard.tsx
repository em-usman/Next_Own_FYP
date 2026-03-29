import { router } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";

import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { useFavourites } from "@/hooks/useFavourites";
import type { Listing } from "@/types/listing";

export function ListingCard({ listing }: { listing: Listing }) {
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

  const liked = isFavourite(String(listing.id));

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
            onPress={handleFavouritePress}
            disabled={isUpdating}
          >
            <AppIcon
              name={liked ? "heart" : "heart-outline"}
              size={16}
              color={liked ? "#EF4444" : theme.icon}
            />
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
