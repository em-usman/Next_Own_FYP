import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
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
    <View style={{ paddingHorizontal: 16 }}>
      <View
        style={{
          borderRadius: 20,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: theme.border,
          backgroundColor: theme.backgroundElement,
        }}
      >
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => { if (item.route) router.push(item.route as any); }}
            activeOpacity={0.7}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 14,
              paddingHorizontal: 16,
              borderBottomWidth: index < menuItems.length - 1 ? 1 : 0,
              borderBottomColor: theme.divider,
            }}
          >
            {/* Icon */}
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 13,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.backgroundSelected,
                marginRight: 14,
              }}
            >
              <AppIcon
                family={item.icon.family}
                name={item.icon.name}
                color={theme.primary}
                size={22}
              />
            </View>

            {/* Text */}
            <View style={{ flex: 1 }}>
              <ThemedText style={{ fontSize: 15, fontWeight: "600" }}>
                {item.title}
              </ThemedText>
              <ThemedText
                themeColor="textSecondary"
                style={{ fontSize: 12, marginTop: 1 }}
              >
                {item.description}
              </ThemedText>
            </View>

            <AppIcon name="chevron-forward" size={16} color={theme.textMuted} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout */}
      <TouchableOpacity
        onPress={handleLogout}
        activeOpacity={0.8}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 16,
          padding: 16,
          borderRadius: 20,
          backgroundColor: theme.errorBackground,
          borderWidth: 1,
          borderColor: theme.borderError,
        }}
      >
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 13,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(239,68,68,0.12)",
            marginRight: 14,
          }}
        >
          <AppIcon family="material-community" name="logout" color={theme.error} size={22} />
        </View>

        <View style={{ flex: 1 }}>
          <ThemedText style={{ fontSize: 15, fontWeight: "600", color: theme.error }}>
            Logout
          </ThemedText>
          <ThemedText style={{ fontSize: 12, marginTop: 1, color: theme.error, opacity: 0.7 }}>
            Sign out of your account
          </ThemedText>
        </View>

        <AppIcon name="chevron-forward" size={16} color={theme.error} />
      </TouchableOpacity>
    </View>
  );
}
