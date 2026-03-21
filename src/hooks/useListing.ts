import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { auth, db } from "../../firebaseConfig";

export type ListingStatus = "active" | "sold" | "deleted";

export type Listing = {
  id: string;
  userId: string;
  categoryId: string;
  subCategoryId: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  location: string;
  contactName: string;
  contactPhone: string;
  hidePhone: boolean;
  details: Record<string, string>;
  status: ListingStatus;
  createdAt: string;
};

export type CreateListingData = Omit<
  Listing,
  "id" | "userId" | "status" | "createdAt"
>;

type UseListingsReturn = {
  listings: Listing[];
  myListings: Listing[];
  loading: boolean;
  isSubmitting: boolean;
  uploadImages: (uris: string[]) => Promise<string[]>;
  createListing: (data: CreateListingData) => Promise<boolean>;
  markAsSold: (listingId: string) => Promise<void>;
  deleteListing: (listingId: string) => Promise<void>;
};

export const useListings = (): UseListingsReturn => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [myListings, setMyListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const storage = getStorage();
  const uid = auth.currentUser?.uid;

  // ── Upload images to Firebase Storage ───────────────────────
  async function uploadImages(uris: string[]): Promise<string[]> {
    const uploadedUrls: string[] = [];

    for (const uri of uris) {
      try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const filename = `listings/${uid}/${Date.now()}_${Math.random()
          .toString(36)
          .slice(2)}.jpg`;
        const storageRef = ref(storage, filename);
        await uploadBytes(storageRef, blob);
        const downloadUrl = await getDownloadURL(storageRef);
        uploadedUrls.push(downloadUrl);
      } catch (e) {
        console.error("Image upload error:", e);
      }
    }

    return uploadedUrls;
  }

  // ── Create listing ───────────────────────────────────────────
  async function createListing(data: CreateListingData): Promise<boolean> {
    if (!uid) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please login to post a listing.",
        position: "bottom",
      });
      return false;
    }

    try {
      setIsSubmitting(true);

      await addDoc(collection(db, "listings"), {
        ...data,
        userId: uid,
        status: "active",
        createdAt: new Date().toISOString(),
      });

      Toast.show({
        type: "success",
        text1: "Posted!",
        text2: "Your listing is now live.",
        position: "bottom",
      });

      return true;
    } catch (e: any) {
      console.error("Create listing error:", e);

      let message = "Failed to post listing. Please try again.";
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
      setIsSubmitting(false);
    }
  }

  // ── Mark as sold ─────────────────────────────────────────────
  async function markAsSold(listingId: string): Promise<void> {
    try {
      await updateDoc(doc(db, "listings", listingId), {
        status: "sold",
      });
      Toast.show({
        type: "success",
        text1: "Marked as Sold",
        position: "bottom",
      });
    } catch (e) {
      console.error("Mark sold error:", e);
    }
  }

  // ── Delete listing ───────────────────────────────────────────
  async function deleteListing(listingId: string): Promise<void> {
    try {
      await updateDoc(doc(db, "listings", listingId), {
        status: "deleted",
      });
      Toast.show({
        type: "success",
        text1: "Deleted",
        text2: "Listing has been removed.",
        position: "bottom",
      });
    } catch (e) {
      console.error("Delete listing error:", e);
    }
  }

  return {
    listings,
    myListings,
    loading,
    isSubmitting,
    uploadImages,
    createListing,
    markAsSold,
    deleteListing,
  };
};
