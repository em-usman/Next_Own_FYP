import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
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
    <TouchableOpacity onPress={() => router.push("/(profile)/manageProfile")}>
      <ThemedView
        type="backgroundElement"
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderRadius: 16,
          marginHorizontal: 16,
          borderWidth: 1,
          borderColor: theme.border,
          gap: 16,
        }}
      >
        {/* Avatar */}
        {loading ? (
          // Skeleton Avatar
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: theme.backgroundSelected,
              opacity: 0.5,
            }}
          />
        ) : imageURL ? (
          <Image
            source={{ uri: imageURL }}
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              borderWidth: 2,
              borderColor: theme.primary,
            }}
            resizeMode="cover"
          />
        ) : (
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: theme.backgroundSelected,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
              borderColor: theme.primary,
            }}
          >
            <ThemedText
              style={{ fontSize: 24, fontWeight: "700", color: theme.primary }}
            >
              {displayName.charAt(0).toUpperCase()}
            </ThemedText>
          </View>
        )}

        {/* Name */}
        <View style={{ flex: 1 }}>
          {loading ? (
            // Skeleton Text
            <View
              style={{
                height: 16,
                width: "60%",
                borderRadius: 6,
                backgroundColor: theme.backgroundSelected,
                opacity: 0.5,
              }}
            />
          ) : (
            <ThemedText type="smallBold" style={{ fontSize: 17 }}>
              {displayName}
            </ThemedText>
          )}
        </View>

        {/* Chevron */}
        <AppIcon name="chevron-forward" size={20} color={theme.textMuted} />
      </ThemedView>
    </TouchableOpacity>
  );
}
