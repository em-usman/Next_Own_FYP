import { router } from "expo-router";
import { Image, Share, TouchableOpacity, View } from "react-native";

import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
import { useFavourites } from "@/hooks/useFavourites";
import type { Listing } from "@/types/listing";

export function ListingCard({ listing }: { listing: Listing }) {
  const theme = useTheme();
  const { addToFavourites, removeFromFavourites, isFavourite, isUpdating } = useFavourites();

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

    router.push({
      pathname: "/listing/[id]",
      params: {
        id: String(listing.id),
        data: encodeURIComponent(JSON.stringify({ ...listing, imageUri, imageUrls })),
      },
    });
  }

  async function handleSharePress() {
    const productUrl = `https://next-own.web.app/listing/${listing.id}`;
    try {
      await Share.share({
        title: listing.title,
        message: `${listing.title}\n${listing.price}\n${productUrl}\nAd ID: ${listing.id}`,
      });
    } catch (error) {
      console.error("Share launch error:", error);
    }
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
    <TouchableOpacity
      style={{ width: 200 }}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View
        style={{
          borderRadius: 20,
          overflow: "hidden",
          backgroundColor: theme.backgroundElement,
          borderWidth: 1,
          borderColor: theme.border,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 4,
        }}
      >
        {/* Image */}
        <View style={{ position: "relative" }}>
          <Image
            source={listing.image}
            style={{ width: "100%", height: 148 }}
            resizeMode="cover"
          />

          {/* Share button */}
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: "rgba(255,255,255,0.92)",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
            }}
            onPress={handleSharePress}
          >
            <AppIcon name="share-social-outline" size={15} color={theme.icon} />
          </TouchableOpacity>

          {/* Featured badge */}
          {listing.isFeatured && (
            <View
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                paddingHorizontal: 10,
                paddingVertical: 3,
                borderRadius: 8,
                backgroundColor: theme.primary,
              }}
            >
              <ThemedText style={{ fontSize: 10, fontWeight: "700", color: "#FFFFFF" }}>
                Featured
              </ThemedText>
            </View>
          )}

          {/* Favourite button */}
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: "rgba(255,255,255,0.92)",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
            }}
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
        <View style={{ padding: 12, gap: 3 }}>
          <ThemedText style={{ fontSize: 15, fontWeight: "700", color: theme.primary }}>
            {listing.price}
          </ThemedText>
          <ThemedText
            style={{ fontSize: 13, fontWeight: "500", color: theme.text }}
            numberOfLines={1}
          >
            {listing.title}
          </ThemedText>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 3, marginTop: 2 }}>
            <AppIcon name="location-sharp" size={11} color={theme.textMuted} />
            <ThemedText
              style={{ fontSize: 11, color: theme.textMuted }}
              numberOfLines={1}
            >
              {listing.location}
            </ThemedText>
          </View>
          <ThemedText style={{ fontSize: 11, color: theme.textMuted, marginTop: 1 }}>
            {listing.timeAgo}
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
