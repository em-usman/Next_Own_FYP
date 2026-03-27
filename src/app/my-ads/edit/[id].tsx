import { AppIcon } from "@/components/Icons/AppIcon";
import CommonListingForm, {
    type CommonFormData,
} from "@/components/post/postForm";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CATEGORIES } from "@/config/categoryConfig";
import { getPostFields } from "@/config/postFields";
import { useTheme } from "@/hooks/use-theme";
import { useCloudinary } from "@/hooks/useCloudnary";
import { usePost } from "@/hooks/usePost";
import * as ImagePicker from "expo-image-picker";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Modal,
    ScrollView,
    TouchableOpacity,
    View,
} from "react-native";
import { db } from "../../../../firebaseConfig";

const LOCATIONS = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
  "Other",
];

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
  hidePhone: boolean;
  details: Record<string, string>;
  categoryId: string;
  subCategoryId: string;
};

function stripPhonePrefix(phone: string): string {
  if (phone.startsWith("+92")) return phone.slice(3);
  if (phone.startsWith("92")) return phone.slice(2);
  if (phone.startsWith("0")) return phone.slice(1);
  return phone;
}

function findSubCategoryLabel(
  categoryId: string,
  subCategoryId: string,
): string {
  const category = CATEGORIES.find((item) => item.id === categoryId);
  if (!category) return "";

  type Item = (typeof category.subCategories)[number];
  function search(items: Item[]): string {
    for (const item of items) {
      if (item.id === subCategoryId) return item.label;
      if (item.children?.length) {
        const child = search(item.children);
        if (child) return child;
      }
    }
    return "";
  }

  return search(category.subCategories);
}

export default function EditMyAdScreen() {
  const theme = useTheme();
  const { updatePost, isSubmitting } = usePost();
  const { isUploading, uploadImages } = useCloudinary();
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const postId = Array.isArray(id) ? id[0] : id || "";

  const [post, setPost] = useState<PostRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [locationModal, setLocationModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [images, setImages] = useState<string[]>([]);
  const [form, setForm] = useState<CommonFormData>({
    title: "",
    description: "",
    price: "",
    location: "",
    contactName: "",
    contactPhone: "",
    hidePhone: false,
    details: {},
  });

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

          const parsed: PostRecord = {
            id: docSnap.id,
            title: data.title || "",
            description: data.description || "",
            price:
              typeof data.price === "number" && !Number.isNaN(data.price)
                ? data.price
                : 0,
            images: Array.isArray((data as any).images)
              ? (data as any).images.filter(
                  (x: unknown): x is string => typeof x === "string",
                )
              : [],
            coverImage: (data as any).coverImage || "",
            location: data.location || "",
            contactName: data.contactName || "",
            contactPhone: data.contactPhone || "",
            hidePhone: Boolean(data.hidePhone),
            details:
              data.details && typeof data.details === "object"
                ? (data.details as Record<string, string>)
                : {},
            categoryId: category.id,
            subCategoryId: data.subCategoryId || "",
          };

          setPost(parsed);
          setImages(
            parsed.images.length > 0
              ? parsed.images
              : parsed.coverImage
                ? [parsed.coverImage]
                : [],
          );
          setForm({
            title: parsed.title,
            description: parsed.description,
            price: String(parsed.price || ""),
            location: parsed.location,
            contactName: parsed.contactName,
            contactPhone: stripPhonePrefix(parsed.contactPhone),
            hidePhone: parsed.hidePhone,
            details: parsed.details,
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

  const dynamicFields = useMemo(() => {
    if (!post?.categoryId || !post?.subCategoryId) return [];
    return getPostFields(post.categoryId, post.subCategoryId, "");
  }, [post?.categoryId, post?.subCategoryId]);

  const categoryLabel = useMemo(() => {
    if (!post?.categoryId || !post?.subCategoryId) return "Ad";
    return findSubCategoryLabel(post.categoryId, post.subCategoryId) || "Ad";
  }, [post?.categoryId, post?.subCategoryId]);

  function handleFormChange(updated: Partial<CommonFormData>) {
    setForm((prev) => ({
      ...prev,
      ...updated,
      details: updated.details
        ? { ...prev.details, ...updated.details }
        : prev.details,
    }));
  }

  function validate(): boolean {
    const nextErrors: Record<string, string> = {};

    if (!form.title.trim()) nextErrors.title = "Title is required.";
    if (!form.price.trim()) nextErrors.price = "Price is required.";
    if (!form.location.trim()) nextErrors.location = "Location is required.";
    if (!form.contactName.trim()) nextErrors.contactName = "Name is required.";
    if (!form.contactPhone.trim()) {
      nextErrors.contactPhone = "Phone number is required.";
    } else if (!/^3[0-9]{9}$/.test(form.contactPhone)) {
      nextErrors.contactPhone = "Enter valid number e.g. 3217168912";
    }
    if (images.length === 0)
      nextErrors.images = "Please add at least one image.";

    dynamicFields.forEach((field) => {
      if (field.type === "brand-model") {
        if (!form.details["brand"]) {
          nextErrors["details_brand_model"] = "Brand & Model is required.";
        }
      } else if (field.required && !form.details[field.key]?.trim()) {
        nextErrors[`details_${field.key}`] = `${field.label} is required.`;
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handlePickImages() {
    if (images.length >= 5) return;

    const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
      selectionLimit: 5 - images.length,
    });

    if (!result.canceled) {
      const validAssets = result.assets.filter(
        (asset) =>
          typeof asset.fileSize !== "number" ||
          asset.fileSize <= MAX_IMAGE_SIZE_BYTES,
      );

      const hasOversized = validAssets.length !== result.assets.length;
      if (hasOversized) {
        setErrors((prev) => ({
          ...prev,
          images: "Each image must be less than or equal to 5MB.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, images: "" }));
      }

      if (validAssets.length === 0) return;

      const uris = validAssets.map((asset) => asset.uri);
      setImages((prev) => [...prev, ...uris].slice(0, 5));
    }
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    if (!post || !validate()) return;

    const existingUrls = images.filter((uri) => /^https?:\/\//i.test(uri));
    const localUris = images.filter((uri) => !/^https?:\/\//i.test(uri));
    const uploadedUrls =
      localUris.length > 0 ? await uploadImages(localUris) : [];
    const finalImageUrls = [...existingUrls, ...uploadedUrls].slice(0, 5);

    if (finalImageUrls.length === 0) {
      setErrors((prev) => ({
        ...prev,
        images: "Please add at least one image.",
      }));
      return;
    }

    const ok = await updatePost(post.id, {
      title: form.title.trim(),
      description: form.description.trim(),
      price: parseFloat(form.price),
      images: finalImageUrls,
      coverImage: finalImageUrls[0],
      location: form.location,
      contactName: form.contactName.trim(),
      contactPhone: `+92${form.contactPhone}`,
      hidePhone: form.hidePhone,
      details: form.details,
    });

    if (ok) router.back();
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Edit Ad",
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: "minimal",
          headerTitleStyle: { fontSize: 18, fontWeight: "700" },
        }}
      />

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
              Unable to load this ad for editing.
            </ThemedText>
          </View>
        ) : (
          <>
            <ScrollView
              contentContainerStyle={{ padding: 16, paddingBottom: 110 }}
            >
              <ThemedText
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  marginBottom: 12,
                  paddingBottom: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.border,
                }}
              >
                Photos
              </ThemedText>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 10, marginBottom: 4 }}
              >
                {images.length < 5 && (
                  <TouchableOpacity
                    onPress={handlePickImages}
                    className="items-center justify-center rounded-xl"
                    style={{
                      width: 90,
                      height: 90,
                      borderWidth: 1.5,
                      borderStyle: "dashed",
                      borderColor: errors.images ? theme.error : theme.primary,
                      backgroundColor: `${theme.primary}08`,
                    }}
                  >
                    <AppIcon
                      family="ion"
                      name="camera-outline"
                      size={26}
                      color={theme.primary}
                    />
                    <ThemedText
                      style={{
                        fontSize: 11,
                        color: theme.primary,
                        marginTop: 4,
                      }}
                    >
                      {images.length}/5
                    </ThemedText>
                  </TouchableOpacity>
                )}

                {images.map((uri, index) => (
                  <View
                    key={`${uri}-${index}`}
                    style={{ position: "relative" }}
                  >
                    <Image
                      source={{ uri }}
                      className="rounded-xl"
                      style={{
                        width: 90,
                        height: 90,
                        borderWidth: index === 0 ? 2 : 1,
                        borderColor: index === 0 ? theme.primary : theme.border,
                      }}
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      onPress={() => removeImage(index)}
                      className="absolute items-center justify-center"
                      style={{
                        top: -6,
                        right: -6,
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: theme.error,
                      }}
                    >
                      <AppIcon
                        family="ion"
                        name="close"
                        size={12}
                        color="#fff"
                      />
                    </TouchableOpacity>
                    {index === 0 && (
                      <View
                        className="absolute bottom-1 left-1 rounded px-1"
                        style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
                      >
                        <ThemedText style={{ fontSize: 10, color: "#fff" }}>
                          Cover
                        </ThemedText>
                      </View>
                    )}
                  </View>
                ))}
              </ScrollView>

              {errors.images && (
                <ThemedText
                  style={{
                    fontSize: 12,
                    color: theme.error,
                    marginTop: 6,
                    marginLeft: 4,
                    marginBottom: 6,
                  }}
                >
                  {errors.images}
                </ThemedText>
              )}

              <CommonListingForm
                categoryId={post.categoryId}
                subCategoryId={post.subCategoryId}
                form={form}
                dynamicFields={dynamicFields}
                errors={errors}
                categoryLabel={categoryLabel}
                onChange={handleFormChange}
                onSelectLocation={() => setLocationModal(true)}
              />
            </ScrollView>

            <ThemedView
              className="absolute bottom-0 left-0 right-0 p-4"
              style={{ borderTopWidth: 1, borderTopColor: theme.border }}
            >
              <TouchableOpacity
                className="rounded-2xl py-4 items-center"
                style={{ backgroundColor: theme.primary }}
                disabled={isSubmitting || isUploading}
                onPress={handleSave}
              >
                {isSubmitting || isUploading ? (
                  <View className="flex-row items-center gap-2">
                    <ActivityIndicator color="#fff" size="small" />
                    <ThemedText
                      style={{ color: "#fff", fontSize: 15, fontWeight: "600" }}
                    >
                      {isUploading ? "Uploading images..." : "Saving..."}
                    </ThemedText>
                  </View>
                ) : (
                  <ThemedText
                    style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}
                  >
                    Save Changes
                  </ThemedText>
                )}
              </TouchableOpacity>
            </ThemedView>
          </>
        )}
      </ThemedView>

      <Modal
        visible={locationModal}
        transparent
        animationType="slide"
        onRequestClose={() => setLocationModal(false)}
      >
        <TouchableOpacity
          className="flex-1"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          activeOpacity={1}
          onPress={() => setLocationModal(false)}
        />
        <ThemedView
          type="backgroundElement"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: "60%",
            paddingBottom: 30,
          }}
        >
          <View
            className="flex-row items-center justify-between px-5 py-4"
            style={{ borderBottomWidth: 1, borderBottomColor: theme.border }}
          >
            <ThemedText style={{ fontSize: 16, fontWeight: "700" }}>
              Location
            </ThemedText>
            <TouchableOpacity onPress={() => setLocationModal(false)}>
              <AppIcon family="ion" name="close" size={22} color={theme.text} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={LOCATIONS}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              const isSelected = form.location === item;
              return (
                <TouchableOpacity
                  onPress={() => {
                    setForm((prev) => ({ ...prev, location: item }));
                    setErrors((prev) => ({ ...prev, location: "" }));
                    setLocationModal(false);
                  }}
                  className="flex-row items-center justify-between px-5 py-4"
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: theme.border,
                  }}
                >
                  <ThemedText
                    style={{
                      fontSize: 15,
                      color: isSelected ? theme.primary : theme.text,
                      fontWeight: isSelected ? "600" : "400",
                    }}
                  >
                    {item}
                  </ThemedText>
                  {isSelected ? (
                    <AppIcon
                      family="ion"
                      name="checkmark"
                      size={18}
                      color={theme.primary}
                    />
                  ) : null}
                </TouchableOpacity>
              );
            }}
          />
        </ThemedView>
      </Modal>
    </>
  );
}
