import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Linking,
    ScrollView,
    TouchableOpacity,
    View,
} from "react-native";

import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";

const { width } = Dimensions.get("window");

const placeholderImage = require("@/assets/categories/mobile.png");

type ListingDetailsPayload = {
  id: string;
  title: string;
  price: string;
  location: string;
  timeAgo: string;
  description?: string;
  category?: string;
  brand?: string;
  model?: string;
  color?: string;
  condition?: string;
  sellerName?: string;
  sellerPhone?: string;
  hidePhone?: boolean;
  isFeatured?: boolean;
  details?: Record<string, string>;
  imageUri?: string;
  imageUrls?: string[];
};

function formatDetailLabel(key: string): string {
  return key
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function DetailRow({ label, value }: { label: string; value: string }) {
  const theme = useTheme();
  return (
    <View
      className="flex-row justify-between items-center py-3"
      style={{ borderBottomWidth: 1, borderBottomColor: theme.border }}
    >
      <ThemedText type="small" themeColor="textSecondary" className="flex-1">
        {label}
      </ThemedText>
      <ThemedText type="smallBold" className="flex-1 text-right">
        {value}
      </ThemedText>
    </View>
  );
}

export default function ListingDetailScreen() {
  const theme = useTheme();
  const { data } = useLocalSearchParams<{ data?: string | string[] }>();
  const rawData = Array.isArray(data) ? data[0] : data;
  let listing: ListingDetailsPayload | null = null;

  try {
    listing = rawData
      ? (JSON.parse(decodeURIComponent(rawData)) as ListingDetailsPayload)
      : null;
  } catch {
    listing = null;
  }

  const imageUrls =
    listing?.imageUrls?.filter((item) => !!item) ||
    (listing?.imageUri ? [listing.imageUri] : []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const renderedFixedDetailKeys = new Set([
    "category",
    "brand",
    "model",
    "color",
    "condition",
  ]);

  const dynamicDetails = listing?.details
    ? Object.entries(listing.details).filter(
        ([key, value]) =>
          typeof value === "string" &&
          value.trim().length > 0 &&
          !renderedFixedDetailKeys.has(key.toLowerCase()),
      )
    : [];

  function handleCallPress() {
    if (!listing?.sellerPhone) return;
    Linking.openURL(`tel:${listing.sellerPhone}`).catch((error) => {
      console.error("Call launch error:", error);
    });
  }

  function handleWhatsAppPress() {
    if (!listing?.sellerPhone) return;
    let phoneNumber = listing.sellerPhone.trim();

    // Remove spaces, hyphens, and parentheses but keep +
    phoneNumber = phoneNumber.replace(/[\s\-\(\)]/g, "");

    // If phone doesn't start with +, assume it's Pakistan (+92)
    if (!phoneNumber.startsWith("+")) {
      // If starts with 0, remove it and add +92
      if (phoneNumber.startsWith("0")) {
        phoneNumber = "+92" + phoneNumber.slice(1);
      } else {
        phoneNumber = "+92" + phoneNumber;
      }
    }

    // WhatsApp URL scheme: whatsapp://send?phone=<phone_number>
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(whatsappUrl).catch((error) => {
      console.error("WhatsApp launch error:", error);
      // Fallback: open web version if app not installed
      Linking.openURL(`https://wa.me/${phoneNumber}`).catch((err) => {
        console.error("Fallback error:", err);
      });
    });
  }

  if (!listing) {
    return (
      <ThemedView className="flex-1 items-center justify-center px-6">
        <ThemedText type="subtitle" style={{ fontSize: 18 }}>
          Listing not found
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary" className="mt-2">
          Please go back and open the listing again.
        </ThemedText>
        <TouchableOpacity
          className="mt-6 px-5 py-3 rounded-full"
          style={{ backgroundColor: theme.black }}
          onPress={() => router.back()}
        >
          <ThemedText type="smallBold" style={{ color: theme.white }}>
            Go Back
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Ad Details",
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
          headerTitleStyle: { fontSize: 18, fontWeight: "700" },
        }}
      />

      <ThemedView className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Image Slider */}
          <View>
            <FlatList
              data={imageUrls.length > 0 ? imageUrls : [""]}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, i) => `${item}-${i}`}
              onMomentumScrollEnd={(e) => {
                setActiveIndex(
                  Math.round(e.nativeEvent.contentOffset.x / width),
                );
              }}
              renderItem={({ item }) => (
                <Image
                  source={item ? { uri: item } : placeholderImage}
                  style={{ width, height: 300 }}
                  resizeMode="cover"
                />
              )}
            />

            {/* Wishlist Button */}
            <TouchableOpacity
              className="absolute top-12 right-4 w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: theme.background }}
              onPress={() => setIsWishlisted((prev) => !prev)}
            >
              <AppIcon
                name={isWishlisted ? "heart" : "heart-outline"}
                size={20}
                color={isWishlisted ? "#EF4444" : theme.icon}
              />
            </TouchableOpacity>

            {/* Featured Badge */}
            {listing.isFeatured && (
              <View
                className="absolute bottom-3 left-4 px-3 py-1 rounded-lg"
                style={{ backgroundColor: "#FBBC05" }}
              >
                <ThemedText
                  style={{ fontSize: 12, fontWeight: "700", color: "#000" }}
                >
                  Featured
                </ThemedText>
              </View>
            )}

            {/* Dot Indicators */}
            {(imageUrls.length > 1 || imageUrls.length === 0) && (
              <View className="absolute bottom-3 right-0 left-0 flex-row justify-center gap-1.5">
                {(imageUrls.length > 0 ? imageUrls : [""]).map((_, i) => (
                  <View
                    key={i}
                    style={{
                      width: i === activeIndex ? 16 : 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor:
                        i === activeIndex ? theme.primary : theme.border,
                    }}
                  />
                ))}
              </View>
            )}
          </View>

          {/* Content */}
          <View className="px-4 pt-4 gap-4">
            {/* Title + Price */}
            <View className="gap-1">
              <ThemedText type="subtitle" style={{ fontSize: 22 }}>
                {listing.price}
              </ThemedText>
              <ThemedText type="default">{listing.title}</ThemedText>
            </View>

            {/* Location + Time */}
            <View className="flex-row items-center gap-1">
              <AppIcon
                name="location-sharp"
                size={14}
                color={theme.textSecondary}
              />
              <ThemedText type="small" themeColor="textSecondary">
                {listing.location}
              </ThemedText>
              <ThemedText type="small" themeColor="textMuted">
                · {listing.timeAgo}
              </ThemedText>
            </View>

            {/* Divider */}
            <View style={{ height: 1, backgroundColor: theme.divider }} />

            {/* Details Section */}
            <ThemedText type="smallBold" style={{ fontSize: 16 }}>
              Details
            </ThemedText>

            <ThemedView
              type="backgroundElement"
              className="rounded-2xl px-4"
              style={{ borderWidth: 1, borderColor: theme.border }}
            >
              {listing.category && (
                <DetailRow label="Category" value={listing.category} />
              )}
              {listing.brand && (
                <DetailRow label="Brand" value={listing.brand} />
              )}
              {listing.model && (
                <DetailRow label="Model" value={listing.model} />
              )}
              {listing.color && (
                <DetailRow label="Color" value={listing.color} />
              )}
              {listing.condition && (
                <DetailRow label="Condition" value={listing.condition} />
              )}
              {dynamicDetails.map(([key, value]) => (
                <DetailRow
                  key={key}
                  label={formatDetailLabel(key)}
                  value={value}
                />
              ))}
            </ThemedView>

            {/* Description */}
            {listing.description && (
              <View className="gap-2">
                <ThemedText type="smallBold" style={{ fontSize: 16 }}>
                  Description
                </ThemedText>
                <ThemedText
                  type="small"
                  themeColor="textSecondary"
                  style={{ lineHeight: 22 }}
                >
                  {listing.description}
                </ThemedText>
              </View>
            )}

            {/* Seller Info */}
            {listing.sellerName && (
              <View className="gap-2">
                <ThemedText type="smallBold" style={{ fontSize: 16 }}>
                  Seller
                </ThemedText>
                <ThemedView
                  type="backgroundElement"
                  className="flex-row items-center gap-3 p-4 rounded-2xl border"
                  style={{ borderColor: theme.border }}
                >
                  <View
                    className="w-12 h-12 rounded-full items-center justify-center"
                    style={{ backgroundColor: theme.backgroundSelected }}
                  >
                    <AppIcon
                      name="person"
                      size={24}
                      color={theme.textSecondary}
                    />
                  </View>
                  <View className="flex-1">
                    <ThemedText type="smallBold">
                      {listing.sellerName}
                    </ThemedText>
                    {listing.sellerPhone && (
                      <ThemedText type="small" themeColor="textSecondary">
                        {listing.sellerPhone}
                      </ThemedText>
                    )}
                  </View>
                  <AppIcon
                    name="chevron-forward"
                    size={18}
                    color={theme.textSecondary}
                  />
                </ThemedView>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Bottom CTA */}
        <ThemedView
          className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-3 flex-row gap-3"
          style={{ borderTopWidth: 1, borderTopColor: theme.border }}
        >
          {/* Call Button */}
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center gap-2 py-3.5 rounded-full border"
            style={{ borderColor: theme.primary }}
            onPress={handleCallPress}
            disabled={!listing.sellerPhone}
          >
            <AppIcon name="call-outline" size={18} color={theme.primary} />
            <ThemedText type="smallBold" themeColor="primary">
              Call
            </ThemedText>
          </TouchableOpacity>

          {/* WhatsApp Button */}
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center gap-2 py-3.5 rounded-full"
            style={{ backgroundColor: theme.black }}
            onPress={handleWhatsAppPress}
            disabled={!listing.sellerPhone}
          >
            <AppIcon name="chatbubble-outline" size={18} color={theme.white} />
            <ThemedText type="smallBold" style={{ color: theme.white }}>
              WhatsApp
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </>
  );
}
