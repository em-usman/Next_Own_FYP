import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { auth, db } from "../../firebaseConfig";
import { usePushNotifications } from "./usePushNotifications";

const useGoogleSignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { expoPushToken } = usePushNotifications();
  const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

  useEffect(() => {
    if (!webClientId) {
      console.warn(
        "EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID is missing. Google Sign-In is disabled.",
      );
      return;
    }

    GoogleSignin.configure({
      webClientId,
    });
  }, [webClientId]);

  const updateUserPushToken = async (userId: string) => {
    if (expoPushToken?.data) {
      try {
        const riderRef = doc(db, "users", userId);
        await updateDoc(riderRef, { expoPushToken: expoPushToken.data });
        console.log("Push token updated successfully");
      } catch (error) {
        console.error("Error updating push token:", error);
      }
    }
  };

  const createNewRider = async (user: any) => {
    try {
      const riderData = {
        email: user.email || "",
        displayName: user.displayName || "",
        phoneNumber: user.phoneNumber || "",
        imageUri: user.photoURL || "",
        expoPushToken: expoPushToken?.data || null,
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "users", user.uid), riderData);
      console.log("New rider profile created successfully");
      return true;
    } catch (error) {
      console.error("Error creating new rider:", error);
      return false;
    }
  };

  const signIn = async () => {
    if (!webClientId) {
      Alert.alert(
        "Google Sign-In unavailable",
        "Missing EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID in your .env file.",
      );
      return;
    }

    if (loading) return;

    try {
      setLoading(true);
      console.log("Signing in with Google...");
      const response = await GoogleSignin.signIn();

      if (!isSuccessResponse(response)) {
        console.log("Sign-in cancelled or failed");
        return;
      }

      const { idToken } = response.data;
      const googleCredential = GoogleAuthProvider.credential(idToken);

      const userCredential = await signInWithCredential(auth, googleCredential);
      const user = userCredential.user;

      console.log("Firebase auth successful:", user.uid);

      // Check if user exists in Firestore
      const ridersRef = collection(db, "users");
      const q = query(ridersRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Existing user - update push token if needed
        console.log("Existing user found, updating data if needed");
        await updateUserPushToken(user.uid);
      } else {
        // New user - create profile
        console.log("New user, creating profile");
        const creationSuccess = await createNewRider(user);

        if (!creationSuccess) {
          Alert.alert(
            "Account Error",
            "Failed to create your profile. Please try again or contact support.",
          );
          return; // Don't navigate if profile creation failed
        }
      }

      // ✅ Wait for Firebase persistence to complete before navigating
      console.log("Waiting for persistence...");
      await new Promise((resolve) => setTimeout(resolve, 300));

      console.log("Navigating to home...");
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Error during Google sign-in:", error);

      let errorMessage = "An unknown error occurred during sign in.";

      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            console.log("User cancelled sign-in");
            return; // Don't show error for user cancellation
          case statusCodes.IN_PROGRESS:
            errorMessage = "Sign-in is already in progress";
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            errorMessage =
              "Google Play Services are not available or need to be updated";
            break;
          default:
            errorMessage = `Error: ${error.message || "Unknown error"}`;
        }
      }

      Alert.alert("Sign-in Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading };
};

export default useGoogleSignIn;
