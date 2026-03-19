import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { auth, db } from "../../firebaseConfig";

type UserData = {
  email: string;
  displayName: string;
  phoneNumber: string;
  imageUri: string;
  address: string;
  expoPushToken: string | null;
  createdAt: string;
};

type Status = "idle" | "loading" | "success" | "error";

type UseUserDataReturn = {
  userData: UserData | null;
  loading: boolean;
  isSaving: boolean;
  status: Status;
  updateUser: (data: Partial<UserData>) => Promise<boolean>;
};

export const useUserData = (): UseUserDataReturn => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [isSaving, setIsSaving] = useState(false);

  async function updateUser(data: Partial<UserData>): Promise<boolean> {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "User not found. Please login again.",
        position: "bottom",
      });
      return false;
    }

    try {
      setIsSaving(true);
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, data);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Profile updated successfully.",
        position: "bottom",
      });
      return true;
    } catch (e: any) {
      console.error("Update error:", e);

      let message = "Failed to save changes. Please try again.";
      if (e.code === "unavailable") {
        message = "No internet connection. Please check your network.";
      } else if (e.code === "permission-denied") {
        message = "Access denied. Please login again.";
      }

      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
        position: "bottom",
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  }

  useEffect(() => {
    let unsubscribeSnapshot: any = null;

    setStatus("loading");

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser?.uid) {
        setStatus("error");
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "User not logged in. Please login again.",
          position: "bottom",
        });
        return;
      }

      const userRef = doc(db, "users", firebaseUser.uid);

      unsubscribeSnapshot = onSnapshot(
        userRef,
        (snap) => {
          if (snap.exists()) {
            const data = snap.data();

            const hasRequiredFields =
              data.email || data.displayName || data.phoneNumber;

            if (!hasRequiredFields) {
              setStatus("error");
              Toast.show({
                type: "error",
                text1: "Incomplete Profile",
                text2: "Please update your profile.",
                position: "bottom",
              });
              setUserData(null);
              return;
            }

            setUserData({
              email: data.email || firebaseUser.email || "",
              displayName: data.displayName || firebaseUser.displayName || "",
              phoneNumber: data.phoneNumber || firebaseUser.phoneNumber || "",
              imageUri: data.imageUri || firebaseUser.photoURL || "",
              address: data.address || "",
              expoPushToken: data.expoPushToken || null,
              createdAt: data.createdAt || "",
            });

            setStatus("success");
          } else {
            setStatus("error");
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Profile not found. Please contact support.",
              position: "bottom",
            });
            setUserData(null);
          }
        },
        (error) => {
          console.error("User fetch error:", error);
          setStatus("error");

          let message = "Failed to load profile. Please try again.";
          if (error.code === "permission-denied") {
            message = "Access denied. Please login again.";
          } else if (error.code === "unavailable") {
            message = "No internet connection. Please check your network.";
          }

          Toast.show({
            type: "error",
            text1: "Error",
            text2: message,
            position: "bottom",
          });
        },
      );
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  return {
    userData,
    loading: status === "loading",
    isSaving,
    status,
    updateUser,
  };
};
