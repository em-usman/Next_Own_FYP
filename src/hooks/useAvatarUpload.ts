import * as ImagePicker from "expo-image-picker";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Platform } from "react-native"; // Android check ke liye zaroori
import Toast from "react-native-toast-message";
import { auth, db } from "../../firebaseConfig";

const CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "df3y6jl0q";
const UPLOAD_PRESET =
  process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "next_Own_avatars";

type UseAvatarUploadReturn = {
  isUploading: boolean;
  pickAndUploadAvatar: () => Promise<void>;
};

export const useAvatarUpload = (): UseAvatarUploadReturn => {
  const [isUploading, setIsUploading] = useState(false);

  async function pickAndUploadAvatar(): Promise<void> {
    try {
      // 1. Permissions Check
      const { granted, canAskAgain } =
        await ImagePicker.getMediaLibraryPermissionsAsync();

      if (!granted) {
        if (canAskAgain) {
          const { granted: newGrant } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (!newGrant) {
            showToast(
              "error",
              "Permission Denied",
              "Gallery access is required.",
            );
            return;
          }
        } else {
          showToast(
            "error",
            "Permission Required",
            "Please enable gallery access from settings.",
          );
          return;
        }
      }

      // 2. Launch Image Library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.4,
      });

      if (result.canceled || !result.assets[0]) return;

      const asset = result.assets[0];

      // 3. Size Check (5MB)
      if (asset.fileSize && asset.fileSize > 100 * 1024) {
        showToast(
          "error",
          "File Too Large",
          "Please select an image under 100KB.",
        );
        return;
      }

      setIsUploading(true);

      // 4. Prepare FormData (Android Fixes Included)
      const formData = new FormData();

      // Android par URI handle karne ka sahi tareeqa
      const imageUri =
        Platform.OS === "android"
          ? asset.uri
          : asset.uri.replace("file://", "");

      formData.append("file", {
        uri: imageUri,
        type: asset.mimeType || "image/jpeg", // mimeType better hai 'type' se
        name: asset.fileName || `avatar_${Date.now()}.jpg`,
      } as any);

      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("cloud_name", CLOUD_NAME);
      formData.append("folder", "avatars");

      // 5. Cloudinary Upload Request
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const data = await response.json();

      if (!response.ok || !data.secure_url) {
        console.error("Cloudinary Error Data:", data);
        throw new Error(data.error?.message || "Upload failed");
      }

      // 6. Firebase Firestore Update
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error("User not found");

      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, { imageUri: data.secure_url });

      showToast(
        "success",
        "Avatar Updated!",
        "Your profile picture has been changed.",
      );
    } catch (e: any) {
      console.error("Avatar upload error:", e);
      showToast("error", "Upload Failed", e.message || "Something went wrong.");
    } finally {
      setIsUploading(false);
    }
  }

  // Helper function for Toasts
  const showToast = (type: string, text1: string, text2: string) => {
    Toast.show({
      type,
      text1,
      text2,
      position: "bottom",
      visibilityTime: 4000,
    });
  };

  return { isUploading, pickAndUploadAvatar };
};
