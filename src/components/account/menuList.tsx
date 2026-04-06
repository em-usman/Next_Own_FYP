import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { auth } from "../../../firebaseConfig";

interface MenuItem {
  id: string;
  icon: {
    family:
      | "material-community"
      | "fontisto"
      | "entypo"
      | "ion"
      | "fa5"
      | "feather"
      | "material";
    name: string;
  };
  title: string;
  description: string;
  route?: string;
  disabled?: boolean;
}

const menuItems: MenuItem[] = [
  {
    id: "profile",
    icon: { family: "material-community", name: "account-circle-outline" },
    title: "Profile",
    description: "Manage your personal information",
    route: "/profile",
  },
  {
    id: "feedback",
    icon: { family: "material-community", name: "message-draw" },
    title: "Feedback",
    description: "Share your thoughts and suggestions",
    route: "/feedback",
  },
  {
    id: "settings",
    icon: { family: "material-community", name: "cog-outline" },
    title: "Settings",
    description: "App preferences and notifications",
    route: "/profile/settings/SettingsHelp",
  },
  // Payment and Address — disabled for now
  // {
  //   id: "payment",
  //   icon: { family: "material-community", name: "credit-card-outline" },
  //   title: "Payment Methods",
  //   description: "Manage your saved payment options",
  //   route: "/profile/payment",
  // },
  // {
  //   id: "address",
  //   icon: { family: "material-community", name: "map-marker-outline" },
  //   title: "Saved Addresses",
  //   description: "View and manage your addresses",
  //   route: "/profile/address",
  // },
];

export default function SettingsMenu() {
  const router = useRouter();
  const theme = useTheme();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      await signOut(auth);
      router.replace("/(auth)");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <ThemedView style={{ marginTop: 24, paddingHorizontal: 16 }}>
      {/* Menu Items */}
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => {
            if (item.route) router.push(item.route as any);
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 14,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
          }}
        >
          {/* Icon Container */}
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 14,
              backgroundColor: theme.backgroundElement,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <AppIcon
              family={item.icon.family}
              name={item.icon.name}
              color={theme.primary}
              size={24}
            />
          </View>

          {/* Text */}
          <View style={{ flex: 1 }}>
            <ThemedText type="smallBold" style={{ fontSize: 15 }}>
              {item.title}
            </ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ fontSize: 12, marginTop: 1 }}
            >
              {item.description}
            </ThemedText>
          </View>

          {/* Chevron */}
          <AppIcon
            family="material-community"
            name="chevron-right"
            color={theme.textMuted}
            size={22}
          />
        </TouchableOpacity>
      ))}

      {/* Logout */}
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 14,
          marginTop: 8,
          borderRadius: 16,
          paddingHorizontal: 12,
          backgroundColor: theme.errorBackground,
          borderWidth: 1,
          borderColor: theme.borderError,
        }}
      >
        {/* Icon */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 14,
            backgroundColor: theme.background,
            borderWidth: 1,
            borderColor: theme.borderError,
          }}
        >
          <AppIcon
            family="material-community"
            name="logout"
            color={theme.error}
            size={24}
          />
        </View>

        {/* Text */}
        <View style={{ flex: 1 }}>
          <ThemedText
            type="smallBold"
            style={{ fontSize: 15, color: theme.error }}
          >
            Logout
          </ThemedText>
          <ThemedText
            type="small"
            style={{
              fontSize: 12,
              marginTop: 1,
              color: theme.error,
              opacity: 0.7,
            }}
          >
            Sign out of your account
          </ThemedText>
        </View>

        {/* Chevron */}
        <AppIcon
          family="material-community"
          name="chevron-right"
          color={theme.error}
          size={22}
        />
      </TouchableOpacity>
    </ThemedView>
  );
}
