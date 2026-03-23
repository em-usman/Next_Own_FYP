import { useState } from "react";
import Toast from "react-native-toast-message";

const CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

type UseCloudinaryReturn = {
  isUploading: boolean;
  uploadImages: (uris: string[]) => Promise<string[]>;
};

export const useCloudinary = (): UseCloudinaryReturn => {
  const [isUploading, setIsUploading] = useState(false);

  async function uploadSingleImage(uri: string): Promise<string | null> {
    try {
      const formData = new FormData();

      // React Native mein file append karne ka tarika
      formData.append("file", {
        uri,
        type: "image/jpeg",
        name: `listing_${Date.now()}.jpg`,
      } as any);

      formData.append("upload_preset", UPLOAD_PRESET || "");
      formData.append("folder", "listings");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (data.secure_url) {
        return data.secure_url;
      }

      console.error("Cloudinary upload failed:", data);
      return null;
    } catch (e) {
      console.error("Upload error:", e);
      return null;
    }
  }

  async function uploadImages(uris: string[]): Promise<string[]> {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      Toast.show({
        type: "error",
        text1: "Config Error",
        text2: "Cloudinary not configured.",
        position: "bottom",
      });
      return [];
    }

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const uri of uris) {
        const url = await uploadSingleImage(uri);
        if (url) uploadedUrls.push(url);
      }
    } finally {
      setIsUploading(false);
    }

    return uploadedUrls;
  }

  return { isUploading, uploadImages };
};
