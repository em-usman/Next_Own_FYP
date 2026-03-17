import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, logout } from "../../../firebaseConfig";

export default function Account() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const router = useRouter();
  const theme = useTheme();

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!auth.currentUser) return;

        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setAvatarUri(data.imageUri || null);
          setDisplayName(data.displayName || null);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        Alert.alert("Error", "Could not load user profile.");
      }
    };

    fetchUserData();
  }, []);

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
      <SafeAreaView className="w-full max-w-xl items-center justify-center gap-4 px-4 pb-16">
        {avatarUri && (
          <Image
            source={{ uri: avatarUri }}
            style={{
              width: 128,
              height: 128,
              borderRadius: 64,
              marginBottom: 10,
            }}
          />
        )}

        {displayName && <ThemedText type="subtitle">{displayName}</ThemedText>}

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
