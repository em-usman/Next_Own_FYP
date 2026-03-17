import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { logout } from "../../../firebaseConfig";

export default function Account() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      await logout();
      router.replace("/(auth)");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Logout failed", "Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <ThemedView className="flex-1 items-center justify-center">
      <SafeAreaView className="w-full max-w-xl items-center justify-center gap-2 px-4 pb-16">
        <ThemedText type="subtitle">Profile</ThemedText>

        <ThemedText themeColor="textSecondary" className="text-center">
          Manage your account details, settings, and preferences here.
        </ThemedText>

        <Pressable
          onPress={handleLogout}
          disabled={isLoggingOut}
          style={{ backgroundColor: theme.tabActive }}
          className={`mt-3 min-w-40 rounded-[10px] items-center justify-center px-4 py-3 ${
            isLoggingOut ? "opacity-65" : "opacity-100"
          }`}
        >
          <ThemedText className="text-white font-bold">
            {isLoggingOut ? "Logging out..." : "Logout"}
          </ThemedText>
        </Pressable>
      </SafeAreaView>
    </ThemedView>
  );
}
