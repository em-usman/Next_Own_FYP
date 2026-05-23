import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
import { useUserData } from "@/hooks/useUserData";
import { useRouter } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

export default function UserHeader() {
  const theme = useTheme();
  const router = useRouter();
  const { userData, loading } = useUserData();

  const displayName = userData?.displayName || "User";
  const imageURL = userData?.imageUri || null;

  return (
    <TouchableOpacity
      onPress={() => router.push("/profile")}
      activeOpacity={0.85}
      style={{ paddingHorizontal: 16, marginTop: 8, marginBottom: 4 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          borderRadius: 20,
          backgroundColor: theme.backgroundElement,
          borderWidth: 1,
          borderColor: theme.border,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 3,
          gap: 14,
        }}
      >
        {/* Avatar */}
        {loading ? (
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: theme.backgroundSelected,
            }}
          />
        ) : imageURL ? (
          <Image
            source={{ uri: imageURL }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              borderWidth: 2.5,
              borderColor: theme.primary,
            }}
            resizeMode="cover"
          />
        ) : (
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: theme.backgroundSelected,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2.5,
              borderColor: theme.primary,
            }}
          >
            <ThemedText style={{ fontSize: 22, fontWeight: "700", color: theme.primary }}>
              {displayName.charAt(0).toUpperCase()}
            </ThemedText>
          </View>
        )}

        {/* Info */}
        <View style={{ flex: 1 }}>
          {loading ? (
            <View
              style={{
                height: 14,
                width: "55%",
                borderRadius: 6,
                backgroundColor: theme.backgroundSelected,
              }}
            />
          ) : (
            <>
              <ThemedText style={{ fontSize: 16, fontWeight: "700" }}>
                {displayName}
              </ThemedText>
              <ThemedText
                themeColor="textSecondary"
                style={{ fontSize: 12, marginTop: 2 }}
              >
                View & edit profile
              </ThemedText>
            </>
          )}
        </View>

        <AppIcon name="chevron-forward" size={18} color={theme.textMuted} />
      </View>
    </TouchableOpacity>
  );
}
