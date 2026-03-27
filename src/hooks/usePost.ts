import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import Toast from "react-native-toast-message";

import { CATEGORIES } from "@/config/categoryConfig";
import { auth, db } from "../../firebaseConfig";

export type PostStatus = "active" | "deactivated" | "sold" | "deleted";
export type ManagedPostStatus = "active" | "deactivated" | "sold";

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
  updatePost: (
    postId: string,
    data: Partial<CreatePostData>,
  ) => Promise<boolean>;
  updatePostStatus: (
    postId: string,
    status: ManagedPostStatus,
  ) => Promise<boolean>;
  markAsSold: (postId: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
};

export const usePost = (): UsePostReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const uid = auth.currentUser?.uid;

  async function getPostDocRef(postId: string) {
    // Resolve by direct category path to avoid collectionGroup/documentId path errors.
    for (const category of CATEGORIES) {
      const postRef = doc(db, "categories", category.id, "posts", postId);
      const snap = await getDoc(postRef);
      if (snap.exists()) return postRef;
    }

    return null;
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
    await updatePostStatus(postId, "sold");
  }

  async function updatePostStatus(
    postId: string,
    status: ManagedPostStatus,
  ): Promise<boolean> {
    try {
      const postRef = await getPostDocRef(postId);
      if (!postRef) {
        Toast.show({
          type: "error",
          text1: "Post not found",
          text2: "Unable to mark this post as sold.",
          position: "bottom",
        });
        return false;
      }

      await updateDoc(postRef, { status });
      Toast.show({
        type: "success",
        text1: "Status Updated",
        position: "bottom",
      });
      return true;
    } catch (e) {
      console.error("Mark sold error:", e);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update status.",
        position: "bottom",
      });
      return false;
    }
  }

  async function updatePost(
    postId: string,
    data: Partial<CreatePostData>,
  ): Promise<boolean> {
    try {
      const postRef = await getPostDocRef(postId);
      if (!postRef) {
        Toast.show({
          type: "error",
          text1: "Post not found",
          text2: "Unable to edit this post.",
          position: "bottom",
        });
        return false;
      }

      await updateDoc(postRef, {
        ...data,
      });

      Toast.show({
        type: "success",
        text1: "Updated",
        text2: "Your ad has been updated.",
        position: "bottom",
      });
      return true;
    } catch (e) {
      console.error("Update post error:", e);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update ad.",
        position: "bottom",
      });
      return false;
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

      await deleteDoc(postRef);
      Toast.show({
        type: "success",
        text1: "Deleted",
        text2: "Post removed.",
        position: "bottom",
      });
    } catch (e: any) {
      console.error("Delete post error:", e);
      let message = "Failed to delete this post.";
      if (e?.code === "permission-denied") {
        message = "Permission denied. Check Firestore delete rules.";
      } else if (e?.code === "unavailable") {
        message = "No internet connection.";
      }

      Toast.show({
        type: "error",
        text1: "Delete Failed",
        text2: message,
        position: "bottom",
      });
    }
  }

  return {
    isSubmitting,
    createPost,
    updatePost,
    updatePostStatus,
    markAsSold,
    deletePost,
  };
};
