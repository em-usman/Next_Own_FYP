import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../../firebaseConfig";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialTopTabNavigator();
const MaterialTopTabs = withLayoutContext(Navigator);

export default function AuthLayout() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Reload user to get latest emailVerified status
        await user.reload();

        if (user.emailVerified) {
          // User is signed in and email verified
          console.log("User is authenticated and email verified:", user.uid);
          router.replace("/(tabs)");
        } else {
          // User signed in but email NOT verified - stay on auth
          console.log("User signed in but email not verified");
          setIsCheckingAuth(false);
        }
      } else {
        // No user → stay on auth screens
        setIsCheckingAuth(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  // Show loading until we know auth state
  if (isCheckingAuth) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <ActivityIndicator size="large" color="#32CACD" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
      <MaterialTopTabs
        screenOptions={{
          tabBarStyle: { backgroundColor: "#000000" },
          tabBarLabelStyle: {
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
            textTransform: "capitalize",
          },
          tabBarIndicatorStyle: { backgroundColor: "#32CACD", height: 7 },
        }}
      >
        <MaterialTopTabs.Screen name="index" options={{ title: "Sign In" }} />
        <MaterialTopTabs.Screen name="signup" options={{ title: "Sign Up" }} />
      </MaterialTopTabs>
    </SafeAreaView>
  );
}
