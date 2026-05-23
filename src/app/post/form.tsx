import { AppIcon } from "@/components/Icons/AppIcon";
import CommonListingForm, { CommonFormData } from "@/components/post/postForm";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CATEGORIES } from "@/config/categoryConfig";
import { getPostFields } from "@/config/postFields";
import { useTheme } from "@/hooks/use-theme";
import { useCloudinary } from "@/hooks/useCloudnary";
import { usePost } from "@/hooks/usePost";
import { useUserData } from "@/hooks/useUserData";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScreenHeader } from "@/components/ScreenHeader";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function stripPhonePrefix(phone: string): string {
  if (phone.startsWith("+92")) return phone.slice(3);
  if (phone.startsWith("92")) return phone.slice(2);
  if (phone.startsWith("0")) return phone.slice(1);
  return phone;
}

function findSubCategoryLabel(categoryId: string, subCategoryId: string) {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return "";
  type Item = (typeof category.subCategories)[number];
  function search(items: Item[]): string | null {
    for (const item of items) {
      if (item.id === subCategoryId) return item.label;
      if (item.children?.length) {
        const found = search(item.children);
        if (found) return found;
      }
    }
    return null;
  }
  return search(category.subCategories) ?? "";
}

function findNestedLabels(
  categoryId: string,
  subCategoryId: string,
  subSubCategoryId?: string,
) {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return { subCategoryLabel: "", subSubCategoryLabel: "" };

  type Item = (typeof category.subCategories)[number];
  function search(items: Item[]): Item | null {
    for (const item of items) {
      if (item.id === subCategoryId) return item;
      if (item.children?.length) {
        const found = search(item.children);
        if (found) return found;
      }
    }
    return null;
  }

  const matched = search(category.subCategories);
  const subCategoryLabel = matched?.label || "";

  if (!subSubCategoryId || !matched?.children?.length) {
    return { subCategoryLabel, subSubCategoryLabel: "" };
  }

  const subSubCategoryLabel =
    matched.children.find((child) => child.id === subSubCategoryId)?.label ||
    "";

  return { subCategoryLabel, subSubCategoryLabel };
}

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

export default function PostFormScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { userData } = useUserData();
  const { isSubmitting, createPost } = usePost();
  const { isUploading, uploadImages } = useCloudinary();

  const params = useLocalSearchParams();
  const categoryId = Array.isArray(params.categoryId)
    ? params.categoryId[0]
    : (params.categoryId as string) || "";
  const subCategoryId = Array.isArray(params.subCategoryId)
    ? params.subCategoryId[0]
    : (params.subCategoryId as string) || "";
  const subSubCategoryId = Array.isArray(params.subSubCategoryId)
    ? params.subSubCategoryId[0]
    : (params.subSubCategoryId as string) || "";

  const dynamicFields = getPostFields(
    categoryId,
    subCategoryId,
    subSubCategoryId,
  );
  const { subCategoryLabel, subSubCategoryLabel } = findNestedLabels(
    categoryId,
    subCategoryId,
    subSubCategoryId,
  );
  const selectedLabel = subSubCategoryLabel || subCategoryLabel;

  const [images, setImages] = useState<string[]>([]);
  const [locationModal, setLocationModal] = useState(false);
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (userData) {
      setForm((prev) => ({
        ...prev,
        contactName: userData.displayName || "",
        contactPhone: stripPhonePrefix(userData.phoneNumber || ""),
      }));
    }
  }, [userData]);

  // ✅ details ko deep merge karo — brand select karne ke baad model bhi baki rahe
  function handleFormChange(updated: Partial<CommonFormData>) {
    setForm((prev) => ({
      ...prev,
      ...updated,
      details: updated.details
        ? { ...prev.details, ...updated.details }
        : prev.details,
    }));
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

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.price.trim()) newErrors.price = "Price is required.";
    if (!form.location.trim()) newErrors.location = "Location is required.";
    if (!form.contactName.trim()) newErrors.contactName = "Name is required.";
    if (form.contactPhone.trim() && !/^3[0-9]{9}$/.test(form.contactPhone)) {
      newErrors.contactPhone = "Enter valid number e.g. 3217168912";
    }
    if (images.length === 0)
      newErrors.images = "Please add at least one image.";

    dynamicFields.forEach((field) => {
      if (field.type === "brand-model") {
        if (!form.details["brand"]) {
          newErrors["details_brand_model"] = "Brand & Model is required.";
        }
      } else if (field.required && !form.details[field.key]?.trim()) {
        newErrors[`details_${field.key}`] = `${field.label} is required.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    const uploadedUrls = await uploadImages(images);
    if (uploadedUrls.length === 0) return;

    const success = await createPost({
      categoryId,
      subCategoryId,
      title: form.title.trim(),
      description: form.description.trim(),
      price: parseFloat(form.price),
      images: uploadedUrls,
      coverImage: uploadedUrls[0],
      location: form.location,
      hidePhone: form.hidePhone,
      details: form.details,
    });

    if (success) router.dismissAll();
  }

  const isBusy = isSubmitting || isUploading;

  return (
    <>
      <ScreenHeader title="Post Ad for" titleAccent={selectedLabel} closeIcon />

      <ThemedView className="flex-1">
        <KeyboardAwareScrollView
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={20}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Photos ── */}
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
                  style={{ fontSize: 11, color: theme.primary, marginTop: 4 }}
                >
                  {images.length}/5
                </ThemedText>
              </TouchableOpacity>
            )}

            {images.map((uri, index) => (
              <View key={index} style={{ position: "relative" }}>
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
                  <AppIcon family="ion" name="close" size={12} color="#fff" />
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
              }}
            >
              {errors.images}
            </ThemedText>
          )}

          {/* ── Form ── */}
          <CommonListingForm
            categoryId={categoryId}
            subCategoryId={subCategoryId}
            subSubCategoryId={subSubCategoryId}
            form={form}
            dynamicFields={dynamicFields}
            errors={errors}
            categoryLabel={selectedLabel}
            onChange={handleFormChange}
            onSelectLocation={() => setLocationModal(true)}
          />
        </KeyboardAwareScrollView>

        {/* ── Post Now ── */}
        <View
          className="absolute bottom-0 left-0 right-0 p-4"
          style={{
            backgroundColor: theme.background,
            borderTopWidth: 1,
            borderTopColor: theme.border,
          }}
        >
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isBusy}
            className="rounded-2xl py-4 items-center"
            style={{ backgroundColor: theme.primary }}
          >
            {isBusy ? (
              <View className="flex-row items-center gap-2">
                <ActivityIndicator color="#fff" size="small" />
                <ThemedText
                  style={{ color: "#fff", fontSize: 15, fontWeight: "600" }}
                >
                  {isUploading ? "Uploading images..." : "Posting..."}
                </ThemedText>
              </View>
            ) : (
              <ThemedText
                style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}
              >
                Post Now
              </ThemedText>
            )}
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* ── Location Modal ── */}
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
            showsVerticalScrollIndicator={false}
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
                  {isSelected && (
                    <AppIcon
                      family="ion"
                      name="checkmark"
                      size={18}
                      color={theme.primary}
                    />
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </ThemedView>
      </Modal>
    </>
  );
}
