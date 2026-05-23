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

  const liked = isFavourite(String(listing.id));

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.85}>
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          padding: 12,
          borderRadius: 18,
          marginBottom: 10,
          backgroundColor: theme.backgroundElement,
          borderWidth: 1,
          borderColor: theme.border,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 6,
          elevation: 2,
        }}
      >
        {/* Image */}
        <View style={{ width: 96, height: 96, borderRadius: 14, overflow: "hidden" }}>
          <Image
            source={
              typeof listing.image === "object" && listing.image?.uri
                ? listing.image
                : placeholderImage
            }
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
          {listing.isFeatured && (
            <View
              style={{
                position: "absolute",
                top: 6,
                left: 6,
                paddingHorizontal: 7,
                paddingVertical: 2,
                borderRadius: 6,
                backgroundColor: theme.primary,
              }}
            >
              <ThemedText style={{ fontSize: 9, fontWeight: "700", color: "#FFFFFF" }}>
                Featured
              </ThemedText>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View style={{ gap: 2 }}>
            <ThemedText style={{ fontSize: 15, fontWeight: "700", color: theme.primary }}>
              {listing.price}
            </ThemedText>
            <ThemedText style={{ fontSize: 13, fontWeight: "500", color: theme.text }} numberOfLines={2}>
              {listing.title}
            </ThemedText>
          </View>

          <View style={{ gap: 2 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
              <AppIcon name="location-sharp" size={11} color={theme.textMuted} />
              <ThemedText style={{ fontSize: 11, color: theme.textMuted }} numberOfLines={1}>
                {listing.location}
              </ThemedText>
            </View>
            <ThemedText style={{ fontSize: 11, color: theme.textMuted }}>
              {listing.timeAgo}
            </ThemedText>
          </View>
        </View>

        {/* Actions */}
        <View style={{ justifyContent: "flex-start", paddingTop: 2, gap: 8 }}>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.backgroundSelected,
            }}
            onPress={handleSharePress}
          >
            <AppIcon name="share-social-outline" size={13} color={theme.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: liked ? "rgba(239,68,68,0.1)" : theme.backgroundSelected,
            }}
            onPress={handleFavouritePress}
            disabled={isUpdating}
          >
            <AppIcon
              name={liked ? "heart" : "heart-outline"}
              size={14}
              color={liked ? "#EF4444" : theme.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
