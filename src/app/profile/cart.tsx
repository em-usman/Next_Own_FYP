import { router, Stack } from "expo-router";
import { useEffect } from "react";
import {
       ActivityIndicator,
       Alert,
       Image,
       ScrollView,
       TouchableOpacity,
       View,
} from "react-native";

import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { useCart } from "@/hooks/useCart";

const FALLBACK_IMAGE = require("@/assets/categories/mobile.png");

function statusText(status: "active" | "deactivated" | "sold") {
  if (status === "sold") return "Sold";
  if (status === "deactivated") return "Deactivated";
  return "Active";
}

export default function CartScreen() {
  const theme = useTheme();
  const {
    cartItems,
    cartCount,
    isLoading,
    isUpdating,
    removeFromCart,
    clearCart,
    syncItemStatuses,
  } = useCart();

  useEffect(() => {
    syncItemStatuses().catch((error) => {
      console.error("Cart status sync error:", error);
    });
  }, [syncItemStatuses]);

  function handleClearCart() {
    Alert.alert("Clear cart", "Remove all items from your cart?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: () => {
          clearCart().catch((error) => {
            console.error("Clear cart error:", error);
          });
        },
      },
    ]);
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Cart",
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
          headerTitleStyle: { fontSize: 18, fontWeight: "700" },
        }}
      />

      <ThemedView
        className="flex-1"
        style={{ backgroundColor: theme.background }}
      >
        {isLoading ? (
          <View className="flex-1 items-center justify-center gap-3">
            <ActivityIndicator size="large" color={theme.primary} />
            <ThemedText type="small" themeColor="textSecondary">
              Loading cart...
            </ThemedText>
          </View>
        ) : cartItems.length === 0 ? (
          <View className="flex-1 items-center justify-center px-6 gap-3">
            <AppIcon
              family="material-community"
              name="cart-outline"
              size={36}
              color={theme.textMuted}
            />
            <ThemedText type="subtitle">Your cart is empty</ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ textAlign: "center" }}
            >
              Add items from listing details to see them here.
            </ThemedText>
          </View>
        ) : (
          <>
            <ScrollView
              contentContainerStyle={{
                padding: 16,
                gap: 10,
                paddingBottom: 120,
              }}
            >
              <View className="flex-row justify-between items-center">
                <ThemedText type="smallBold">Items: {cartCount}</ThemedText>
                <TouchableOpacity
                  className="px-3 py-1.5 rounded-full border"
                  style={{ borderColor: theme.error }}
                  onPress={handleClearCart}
                  disabled={isUpdating}
                >
                  <AppIcon
                    family="material-community"
                    name="trash-can-outline"
                    size={16}
                    color={theme.error}
                  />
                </TouchableOpacity>
              </View>

              {cartItems.map((item) => {
                const unavailable = item.status !== "active";

                return (
                  <ThemedView
                    key={item.postId}
                    type="backgroundElement"
                    className="rounded-2xl border p-3 gap-3"
                    style={{ borderColor: theme.border }}
                  >
                    <View className="flex-row gap-3">
                      <Image
                        source={
                          item.imageUri
                            ? { uri: item.imageUri }
                            : FALLBACK_IMAGE
                        }
                        style={{ width: 88, height: 88, borderRadius: 12 }}
                        resizeMode="cover"
                      />

                      <View className="flex-1 gap-1">
                        <ThemedText type="smallBold" numberOfLines={2}>
                          {item.title}
                        </ThemedText>
                        <ThemedText type="smallBold">{item.price}</ThemedText>
                        <ThemedText
                          type="small"
                          themeColor="textSecondary"
                          numberOfLines={1}
                        >
                          {item.location}
                        </ThemedText>
                        <ThemedText
                          type="small"
                          style={{
                            color: unavailable ? theme.error : theme.primary,
                            fontWeight: "600",
                          }}
                        >
                          {statusText(item.status)}
                        </ThemedText>
                      </View>
                    </View>

                    <View className="flex-row items-center justify-end gap-2">
                      <View className="flex-row gap-2">
                        <TouchableOpacity
                          className="px-3 py-2 rounded-full border"
                          style={{ borderColor: theme.border }}
                          onPress={() =>
                            router.push({
                              pathname: "/listing/[id]",
                              params: {
                                id: item.postId,
                                data: encodeURIComponent(
                                  JSON.stringify({
                                    id: item.postId,
                                    title: item.title,
                                    price: item.price,
                                    location: item.location,
                                    timeAgo: item.timeAgo || "",
                                    description: item.description,
                                    category: item.category,
                                    brand: item.brand,
                                    model: item.model,
                                    color: item.color,
                                    condition: item.condition,
                                    sellerName: item.sellerName,
                                    sellerPhone: item.sellerPhone,
                                    hidePhone: item.hidePhone,
                                    isFeatured: item.isFeatured,
                                    details: item.details,
                                    status: item.status,
                                    imageUri: item.imageUri,
                                    imageUrls:
                                      item.imageUrls &&
                                      item.imageUrls.length > 0
                                        ? item.imageUrls
                                        : item.imageUri
                                          ? [item.imageUri]
                                          : [],
                                  }),
                                ),
                              },
                            })
                          }
                        >
                          <ThemedText type="small">View</ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity
                          className="px-3 py-2 rounded-full border"
                          style={{ borderColor: theme.error }}
                          onPress={() => removeFromCart(item.postId)}
                          disabled={isUpdating}
                        >
                          <AppIcon
                            family="material-community"
                            name="trash-can-outline"
                            size={16}
                            color={theme.error}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ThemedView>
                );
              })}
            </ScrollView>
          </>
        )}
      </ThemedView>
    </>
  );
}
