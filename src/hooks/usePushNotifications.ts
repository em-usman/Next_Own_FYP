import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as React from "react";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export interface PushNotificationState {
  notification?: Notifications.Notification;
  expoPushToken?: Notifications.ExpoPushToken;
}

export const usePushNotifications = (): PushNotificationState => {
  const [expoPushToken, setExpoPushToken] = React.useState<
    Notifications.ExpoPushToken | undefined
  >();

  const [notification, setNotification] = React.useState<
    Notifications.Notification | undefined
  >();

  const notificationListener =
    React.useRef<Notifications.EventSubscription | null>(null);
  const responseListener = React.useRef<Notifications.EventSubscription | null>(
    null,
  );

  async function registerForPushNotificationsAsync(): Promise<
    Notifications.ExpoPushToken | undefined
  > {
    let token: Notifications.ExpoPushToken | undefined;

    try {
      // Skip push notifications on Android due to Firebase native initialization issues
      if (Platform.OS === "android") {
        console.log(
          "Push notifications not available on Android (Expo managed workflow)",
        );
        return undefined;
      }

      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          console.warn("Push notification permissions not granted");
          return undefined;
        }

        token = await Notifications.getExpoPushTokenAsync({
          projectId:
            Constants.expoConfig?.extra?.eas?.projectId ??
            Constants.easConfig?.projectId,
        });

        return token;
      }

      console.log(
        "Warning: Please use a physical device for push notifications",
      );
      return undefined;
    } catch (error: any) {
      console.warn("Error registering for push notifications:", error?.message);
      return undefined;
    }
  }

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();

      notificationListener.current = null;
      responseListener.current = null;
    };
  }, []);

  return {
    expoPushToken,
    notification,
  };
};
