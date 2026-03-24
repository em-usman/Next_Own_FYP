import {
  addDoc,
  collection,
  collectionGroup,
  documentId,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { auth, db } from "../../firebaseConfig";

export type PostStatus = "active" | "sold" | "deleted";

export type Post = {
  id: string;
  userId: string;
  categoryId: string;
  subCategoryId: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  coverImage: string;
  location: string;
  contactName: string;
  contactPhone: string;
  hidePhone: boolean;
  details: Record<string, string>;
  status: PostStatus;
  createdAt: string;
};

export type CreatePostData = Omit<
  Post,
  "id" | "userId" | "status" | "createdAt"
>;

type UsePostReturn = {
  isSubmitting: boolean;
  createPost: (data: CreatePostData) => Promise<boolean>;
  markAsSold: (postId: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
};

export const usePost = (): UsePostReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const uid = auth.currentUser?.uid;

  async function getPostDocRef(postId: string) {
    const groupedPosts = query(
      collectionGroup(db, "posts"),
      where(documentId(), "==", postId),
      limit(1),
    );
    const snapshot = await getDocs(groupedPosts);
    return snapshot.docs[0]?.ref ?? null;
  }

  async function createPost(data: CreatePostData): Promise<boolean> {
    if (!uid) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please login to post an ad.",
        position: "bottom",
      });
      return false;
    }

    try {
      setIsSubmitting(true);
      await addDoc(collection(db, "categories", data.categoryId, "posts"), {
        ...data,
        userId: uid,
        status: "active",
        createdAt: new Date().toISOString(),
      });
      Toast.show({
        type: "success",
        text1: "Posted!",
        text2: "Your ad is now live.",
        position: "bottom",
      });
      return true;
    } catch (e: any) {
      console.error("Create post error:", e);
      let message = "Failed to post ad. Please try again.";
      if (e.code === "unavailable") message = "No internet connection.";
      else if (e.code === "permission-denied")
        message = "Access denied. Please login again.";
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

  async function markAsSold(postId: string): Promise<void> {
    try {
      const postRef = await getPostDocRef(postId);
      if (!postRef) {
        Toast.show({
          type: "error",
          text1: "Post not found",
          text2: "Unable to mark this post as sold.",
          position: "bottom",
        });
        return;
      }

      await updateDoc(postRef, { status: "sold" });
      Toast.show({
        type: "success",
        text1: "Marked as Sold",
        position: "bottom",
      });
    } catch (e) {
      console.error("Mark sold error:", e);
    }
  }

  async function deletePost(postId: string): Promise<void> {
    try {
      const postRef = await getPostDocRef(postId);
      if (!postRef) {
        Toast.show({
          type: "error",
          text1: "Post not found",
          text2: "Unable to delete this post.",
          position: "bottom",
        });
        return;
      }

      await updateDoc(postRef, { status: "deleted" });
      Toast.show({
        type: "success",
        text1: "Deleted",
        text2: "Post removed.",
        position: "bottom",
      });
    } catch (e) {
      console.error("Delete post error:", e);
    }
  }

  return { isSubmitting, createPost, markAsSold, deletePost };
};
