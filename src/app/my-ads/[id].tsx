import { AppIcon } from "@/components/Icons/AppIcon";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CATEGORIES } from "@/config/categoryConfig";
import { useTheme } from "@/hooks/use-theme";
import { usePost, type ManagedPostStatus } from "@/hooks/usePost";
import { router, useLocalSearchParams } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../../../firebaseConfig";

import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

type PostRecord = {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  coverImage: string;
  location: string;
  contactName: string;
  contactPhone: string;
  details: Record<string, string>;
  status: ManagedPostStatus;
  createdAt: string;
  categoryId: string;
  subCategoryId: string;
};

function formatPrice(price: number): string {
  if (!Number.isFinite(price)) return "Price not set";
  return `Rs ${price.toLocaleString("en-PK")}`;
}

function statusLabel(status: ManagedPostStatus) {
  if (status === "deactivated") return "Deactivated";
  if (status === "sold") return "Sold";
  return "Active";
}

function toTimeAgo(createdAt?: string): string {
  if (!createdAt) return "Just now";
  const created = new Date(createdAt);
  if (Number.isNaN(created.getTime())) return "Just now";
  const diffMs = Date.now() - created.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < minute) return "Just now";
  if (diffMs < hour)
    return `${Math.max(1, Math.floor(diffMs / minute))} min ago`;
  if (diffMs < day) return `${Math.max(1, Math.floor(diffMs / hour))} hr ago`;

  const days = Math.max(1, Math.floor(diffMs / day));
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

export default function MyAdDetailScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const postId = Array.isArray(id) ? id[0] : id || "";

  const { updatePostStatus, deletePost } = usePost();
  const [post, setPost] = useState<PostRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusSaving, setStatusSaving] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!postId) {
      setIsLoading(false);
      return;
    }

    let foundCategoryId = "";
    const initialized = new Set<string>();

    function finalizeIfNotFound() {
      if (initialized.size === CATEGORIES.length && !foundCategoryId) {
        setPost(null);
        setIsLoading(false);
      }
    }

    const unsubscribers = CATEGORIES.map((category) => {
      const postRef = doc(db, "categories", category.id, "posts", postId);

      return onSnapshot(
        postRef,
        (docSnap) => {
          initialized.add(category.id);

          if (!docSnap.exists()) {
            finalizeIfNotFound();
            return;
          }

          const data = docSnap.data() as Partial<PostRecord>;
          foundCategoryId = category.id;

          setPost({
            id: docSnap.id,
            title: data.title || "Untitled",
            description: data.description || "",
            price:
              typeof data.price === "number" && !Number.isNaN(data.price)
                ? data.price
                : 0,
            images: Array.isArray(data.images)
              ? data.images.filter((x): x is string => typeof x === "string")
              : [],
            coverImage: data.coverImage || "",
            location: data.location || "",
            contactName: data.contactName || "",
            contactPhone: data.contactPhone || "",
            details:
              data.details && typeof data.details === "object"
                ? (data.details as Record<string, string>)
                : {},
            status: (data.status as ManagedPostStatus) || "active",
            createdAt: data.createdAt || "",
            categoryId: category.id,
            subCategoryId: data.subCategoryId || "",
          });
          setIsLoading(false);
        },
        () => {
          initialized.add(category.id);
          finalizeIfNotFound();
        },
      );
    });

    if (CATEGORIES.length === 0) {
      setIsLoading(false);
    }

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, [postId]);

  const categoryLabel = useMemo(() => {
    if (!post?.categoryId) return "";
    return CATEGORIES.find((item) => item.id === post.categoryId)?.label || "";
  }, [post?.categoryId]);

  async function changeStatus(status: ManagedPostStatus) {
    if (!post) return;
    setStatusSaving(true);
    await updatePostStatus(post.id, status);
    setStatusSaving(false);
  }

  function handleDelete() {
    if (!post) return;

    Alert.alert("Delete Ad", "Are you sure you want to delete this ad?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          setStatusSaving(true);
          await deletePost(post.id);
          setStatusSaving(false);
          router.back();
        },
      },
    ]);
  }

  const imageUrls =
    post?.images?.filter((item) => !!item) ||
    (post?.coverImage ? [post.coverImage] : []);

  return (
    <>
      <ScreenHeader title="My Ad" />

      <ThemedView
        className="flex-1"
        style={{ backgroundColor: theme.background }}
      >
        {isLoading ? (
          <View className="flex-1 items-center justify-center gap-3">
            <ActivityIndicator size="large" color={theme.primary} />
            <ThemedText type="small" themeColor="textSecondary">
              Loading ad...
            </ThemedText>
          </View>
        ) : !post ? (
          <View className="flex-1 items-center justify-center px-6 gap-2">
            <ThemedText type="subtitle">Ad not found</ThemedText>
            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{ textAlign: "center" }}
            >
              This post may have been removed.
            </ThemedText>
          </View>
        ) : (
          <>
            <ScrollView
              contentContainerStyle={{
                padding: 16,
                gap: 14,
                paddingBottom: 120,
              }}
            >
              <View>
                <FlatList
                  data={imageUrls.length > 0 ? imageUrls : [""]}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, i) => `${item}-${i}`}
                  onMomentumScrollEnd={(e) => {
                    setActiveIndex(
                      Math.round(e.nativeEvent.contentOffset.x / width),
                    );
                  }}
                  renderItem={({ item }) => (
                    <Image
                      source={
                        item
                          ? { uri: item }
                          : require("@/assets/categories/mobile.png")
                      }
                      style={{
                        width: width - 32,
                        height: 230,
                        borderRadius: 16,
                      }}
                      resizeMode="cover"
                    />
                  )}
                />

                {(imageUrls.length > 1 || imageUrls.length === 0) && (
                  <View className="absolute bottom-3 right-0 left-0 flex-row justify-center gap-1.5">
                    {(imageUrls.length > 0 ? imageUrls : [""]).map((_, i) => (
                      <View
                        key={i}
                        style={{
                          width: i === activeIndex ? 16 : 6,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor:
                            i === activeIndex ? theme.primary : theme.border,
                        }}
                      />
                    ))}
                  </View>
                )}
              </View>

              <ThemedText type="subtitle" style={{ fontSize: 22 }}>
                {formatPrice(post.price)}
              </ThemedText>
              <ThemedText type="default">{post.title}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {post.location} · {toTimeAgo(post.createdAt)}
              </ThemedText>

              <ThemedView
                type="backgroundElement"
                className="rounded-2xl p-4 border gap-2"
                style={{ borderColor: theme.border }}
              >
                <ThemedText type="smallBold">
                  Status: {statusLabel(post.status)}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  Category: {categoryLabel || "N/A"}
                </ThemedText>
              </ThemedView>

              {post.description ? (
                <View className="gap-1">
                  <ThemedText type="smallBold">Description</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {post.description}
                  </ThemedText>
                </View>
              ) : null}

              {Object.keys(post.details).length > 0 ? (
                <ThemedView
                  type="backgroundElement"
                  className="rounded-2xl p-4 border gap-2"
                  style={{ borderColor: theme.border }}
                >
                  <ThemedText type="smallBold">Details</ThemedText>
                  {Object.entries(post.details).map(([key, value]) => (
                    <View key={key} className="flex-row justify-between gap-3">
                      <ThemedText
                        type="small"
                        themeColor="textSecondary"
                        style={{ flex: 1 }}
                      >
                        {key}
                      </ThemedText>
                      <ThemedText
                        type="smallBold"
                        style={{ flex: 1, textAlign: "right" }}
                      >
                        {value}
                      </ThemedText>
                    </View>
                  ))}
                </ThemedView>
              ) : null}
            </ScrollView>

            <ThemedView
              className="absolute bottom-0 left-0 right-0 p-4 gap-2"
              style={{ borderTopWidth: 1, borderTopColor: theme.border }}
            >
              <TouchableOpacity
                className="rounded-xl py-3 items-center flex-row justify-center gap-2 border"
                style={{ borderColor: theme.border }}
                onPress={() =>
                  router.push({
                    pathname: "/my-ads/edit/[id]",
                    params: { id: post.id },
                  })
                }
              >
                <AppIcon
                  family="material-community"
                  name="pencil-outline"
                  size={18}
                  color={theme.text}
                />
                <ThemedText type="smallBold">Edit Ad</ThemedText>
              </TouchableOpacity>

              <View className="flex-row gap-2 items-center">
                <TouchableOpacity
                  className="flex-1 rounded-xl py-2.5 items-center border"
                  style={{ borderColor: theme.border }}
                  onPress={() => changeStatus("active")}
                >
                  <ThemedText type="small">Active</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 rounded-xl py-2.5 items-center border"
                  style={{ borderColor: theme.border }}
                  onPress={() => changeStatus("deactivated")}
                >
                  <ThemedText type="small">Deactivate</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 rounded-xl py-2.5 items-center border"
                  style={{ borderColor: theme.border }}
                  onPress={() => changeStatus("sold")}
                >
                  <ThemedText type="small">Sold</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 rounded-xl py-2.5 items-center border"
                  style={{ borderColor: theme.error }}
                  onPress={handleDelete}
                >
                  <AppIcon
                    family="material-community"
                    name="trash-can-outline"
                    size={18}
                    color={theme.error}
                  />
                </TouchableOpacity>
                {statusSaving ? (
                  <ActivityIndicator size="small" color={theme.primary} />
                ) : null}
              </View>
            </ThemedView>
          </>
        )}
      </ThemedView>
    </>
  );
}
