import * as Notifications from "expo-notifications";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Platform } from "react-native";

import { auth, db } from "../../firebaseConfig";

const EXPO_PROJECT_ID = "2da10844-8cca-495c-9b72-688f3d55bf9d";

export async function registerPushToken(): Promise<void> {
  const uid = auth.currentUser?.uid;
  if (!uid) return;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Messages",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#0099A8",
    });
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  const finalStatus =
    existing === "granted"
      ? existing
      : (await Notifications.requestPermissionsAsync()).status;

  if (finalStatus !== "granted") return;

  try {
    const { data: token } = await Notifications.getExpoPushTokenAsync({
      projectId: EXPO_PROJECT_ID,
    });
    await updateDoc(doc(db, "users", uid), { expoPushToken: token });
  } catch (e) {
    console.error("registerPushToken error:", e);
  }
}

export async function sendPushNotification(
  recipientId: string,
  senderName: string,
  messageText: string,
  chatId: string,
): Promise<void> {
  try {
    const snap = await getDoc(doc(db, "users", recipientId));
    const token = snap.data()?.expoPushToken as string | undefined;
    if (!token?.startsWith("ExponentPushToken")) return;

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        to: token,
        title: senderName,
        body: messageText,
        sound: "default",
        data: { chatId },
        priority: "high",
      }),
    });
  } catch (e) {
    console.error("sendPushNotification error:", e);
  }
}
