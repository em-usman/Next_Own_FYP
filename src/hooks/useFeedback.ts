// hooks/useFeedback.ts
import Constants from "expo-constants";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { Alert, Platform } from "react-native";
import Toast, { ToastShowParams } from "react-native-toast-message";
import { auth, db } from "../../firebaseConfig";

export type FeedbackCategory = "general" | "bug" | "suggestion" | "complaint";

type FeedbackPayload = {
  rating: number;
  message: string;
  category: FeedbackCategory;
};

type UseFeedbackReturn = {
  isSubmitting: boolean;
  submitFeedback: (payload: FeedbackPayload) => Promise<boolean>;
};

// Safely show toast or fallback to Alert
const showNotification = (options: ToastShowParams) => {
  try {
    if (Toast && typeof Toast.show === "function") {
      Toast.show(options);
    } else {
      // Fallback to Alert if Toast is not available
      Alert.alert(options.text1 || "Notification", options.text2 || "");
    }
  } catch (error) {
    console.error("Toast notification error:", error);
    // Final fallback to Alert
    Alert.alert(options.text1 || "Notification", options.text2 || "");
  }
};

export const useFeedback = (): UseFeedbackReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function checkCanSubmit(uid: string): Promise<boolean> {
    const twentyFourHoursAgo = new Date(
      Date.now() - 24 * 60 * 60 * 1000,
    ).toISOString();

    const q = query(
      collection(db, "feedbacks"),
      where("userId", "==", uid),
      where("createdAt", ">", twentyFourHoursAgo),
      limit(1),
    );

    const snapshot = await getDocs(q);
    return snapshot.empty;
  }

  async function submitFeedback(payload: FeedbackPayload): Promise<boolean> {
    const uid = auth.currentUser?.uid;

    if (!uid) {
      showNotification({
        type: "error",
        text1: "Error",
        text2: "Please login to submit feedback.",
        position: "bottom",
      });
      return false;
    }

    if (!payload.message.trim()) {
      showNotification({
        type: "error",
        text1: "Empty Message",
        text2: "Please write something before submitting.",
        position: "bottom",
      });
      return false;
    }

    if (payload.rating === 0) {
      showNotification({
        type: "error",
        text1: "Rating Required",
        text2: "Please select a star rating.",
        position: "bottom",
      });
      return false;
    }

    try {
      setIsSubmitting(true);

      const canSubmit = await checkCanSubmit(uid);
      if (!canSubmit) {
        showNotification({
          type: "error",
          text1: "Too Soon",
          text2: "You can submit feedback once every 24 hours.",
          position: "bottom",
        });
        return false;
      }

      await addDoc(collection(db, "feedbacks"), {
        userId: uid, // dashboard join karega /users/{userId} se
        rating: payload.rating,
        message: payload.message.trim(),
        category: payload.category,
        platform: Platform.OS,
        appVersion: Constants.expoConfig?.version || "1.0.0",
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      showNotification({
        type: "success",
        text1: "Thank you!",
        text2: "Your feedback has been submitted.",
        position: "bottom",
      });

      return true;
    } catch (e: any) {
      console.error("Feedback error:", e);

      let message = "Failed to submit feedback. Please try again.";
      if (e.code === "unavailable") {
        message = "No internet connection. Please check your network.";
      } else if (e.code === "permission-denied") {
        message = "Access denied. Please login again.";
      }

      showNotification({
        type: "error",
        text1: "Error",
        text2: message,
        position: "bottom",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  return { isSubmitting, submitFeedback };
};
