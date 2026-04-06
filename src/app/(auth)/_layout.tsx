import { Slot, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { auth } from "../../../firebaseConfig";

export default function AuthLayout() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload();

        if (user.emailVerified) {
          console.log("User is authenticated and email verified:", user.uid);
          router.replace("/(tabs)");
        } else {
          console.log("User signed in but email not verified");
          setIsCheckingAuth(false);
        }
      } else {
        setIsCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (isCheckingAuth) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#03BABB" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Slot />
    </View>
  );
}
