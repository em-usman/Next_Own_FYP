import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
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

export const useUserData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeSnapshot: any = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser?.uid) {
        setLoading(false);
        return;
      }

      const userRef = doc(db, "users", firebaseUser.uid);

      unsubscribeSnapshot = onSnapshot(
        userRef,
        (snap) => {
          if (snap.exists()) {
            const data = snap.data();

            setUserData({
              email: data.email || firebaseUser.email || "",
              displayName: data.displayName || firebaseUser.displayName || "",
              phoneNumber: data.phoneNumber || firebaseUser.phoneNumber || "",
              imageUri: data.imageUri || firebaseUser.photoURL || "",
              address: data.address || "",
              expoPushToken: data.expoPushToken || null,
              createdAt: data.createdAt || "",
            });
          }

          setLoading(false);
        },
        (error) => {
          console.error("User fetch error:", error);
          setLoading(false);
        },
      );
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  return { userData, loading };
};
