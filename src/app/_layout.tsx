import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import "../global.css";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { registerPushToken } from "@/utils/pushNotifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import { auth } from "../../firebaseConfig";
import WelcomeScreen from "./WelcomeScreen";

// Show notifications even when app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [showWelcome, setShowWelcome] = useState<boolean | null>(null);
  const colorScheme = useColorScheme();
  // const [loaded] = useFonts({
  //   SourceSans3Regular: require("../assets/fonts/SourceSans3-Regular.ttf"),
  // });

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasSeenWelcome = await AsyncStorage.getItem("hasSeenWelcome");
      setShowWelcome(hasSeenWelcome ? false : true);
      await SplashScreen.hideAsync();
    };
    checkFirstLaunch();
  }, []);

  // Register push token whenever a user signs in
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) registerPushToken().catch(console.error);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    console.log("showWelcome:", showWelcome);
  }, [showWelcome]);

  if (showWelcome === null) {
    <ActivityIndicator />;
  }

  if (showWelcome) {
    return (
      <WelcomeScreen
        onComplete={async () => {
          await AsyncStorage.setItem("hasSeenWelcome", "true");

          setShowWelcome(false);
        }}
      />
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider
        value={colorScheme === "dark" ? DefaultTheme : DefaultTheme}
        // value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <Stack initialRouteName="(auth)">
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="my-ads" options={{ headerShown: false }} />
          <Stack.Screen name="profile" options={{ headerShown: false }} />
          <Stack.Screen name="feedback" options={{ headerShown: false }} />
          <Stack.Screen name="listing" options={{ headerShown: false }} />
          <Stack.Screen name="chat" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
      <Toast />
    </GestureHandlerRootView>
  );
}
