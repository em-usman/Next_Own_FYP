import { AppIcon } from "@/components/Icons/AppIcon";
import CommonListingForm, {
  CommonFormData,
} from "@/components/listing/commonListingForm";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CATEGORIES } from "@/config/categoryConfig";
import { useTheme } from "@/hooks/use-theme";
import { useListings } from "@/hooks/useListing";
import { useUserData } from "@/hooks/useUserData";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
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

// ── Strip +92 prefix ────────────────────────────────────────────
function stripPhonePrefix(phone: string): string {
  if (phone.startsWith("+92")) return phone.slice(3);
  if (phone.startsWith("92")) return phone.slice(2);
  if (phone.startsWith("0")) return phone.slice(1);
  return phone;
}

// ── Find subcategory recursively ────────────────────────────────
function findSubCategoryFields(categoryId: string, subCategoryId: string) {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return { fields: [], label: "" };

  type SubCategoryItem = (typeof category.subCategories)[number];

  function search(
    items: SubCategoryItem[],
  ): { fields: any[]; label: string } | null {
    for (const item of items) {
      if (item.id === subCategoryId) {
        return { fields: item.fields ?? [], label: item.label };
      }
      if (item.children && item.children.length > 0) {
        const found = search(item.children);
        if (found) return found;
      }
    }
    return null;
  }

  return search(category.subCategories) ?? { fields: [], label: "" };
}

export default function PostFormScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { userData } = useUserData();
  const { isSubmitting, uploadImages, createListing } = useListings();

  const { categoryId, subCategoryId } = useLocalSearchParams<{
    categoryId: string;
    subCategoryId: string;
  }>();

  // Get dynamic fields for this subcategory
  const { fields: dynamicFields, label: subCategoryLabel } =
    findSubCategoryFields(categoryId, subCategoryId);

  // Get category label
  const categoryLabel =
    CATEGORIES.find((c) => c.id === categoryId)?.label || "";

  // ── Image state ─────────────────────────────────────────────
  const [images, setImages] = useState<string[]>([]);

  // ── Select modal state ──────────────────────────────────────
  const [selectModal, setSelectModal] = useState<{
    visible: boolean;
    fieldKey: string;
    options: string[];
    label: string;
  }>({ visible: false, fieldKey: "", options: [], label: "" });

  // ── Form state ──────────────────────────────────────────────
  const [form, setForm] = useState<CommonFormData>({
    title: "",
    description: "",
    price: "",
    location: "",
    contactName: userData?.displayName || "",
    contactPhone: stripPhonePrefix(userData?.phoneNumber || ""),
    hidePhone: false,
    details: {},
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto fill contact info from user profile
  useEffect(() => {
    if (userData) {
      setForm((prev) => ({
        ...prev,
        contactName: userData.displayName || "",
        contactPhone: stripPhonePrefix(userData.phoneNumber || ""),
      }));
    }
  }, [userData]);

  // ── Pick images ─────────────────────────────────────────────
  async function handlePickImages() {
    if (images.length >= 10) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
      selectionLimit: 10 - images.length,
    });

    if (!result.canceled) {
      const uris = result.assets.map((a) => a.uri);
      setImages((prev) => [...prev, ...uris].slice(0, 10));
    }
  }

  function handleRemoveImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  // ── Validate ─────────────────────────────────────────────────
  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.price.trim()) newErrors.price = "Price is required.";
    if (!form.location.trim()) newErrors.location = "Location is required.";
    if (!form.contactName.trim()) newErrors.contactName = "Name is required.";

    if (!form.contactPhone.trim()) {
      newErrors.contactPhone = "Phone number is required.";
    } else if (!/^3[0-9]{9}$/.test(form.contactPhone)) {
      newErrors.contactPhone = "Enter valid number e.g. 3217168912";
    }

    if (images.length === 0) {
      newErrors.images = "Please add at least one image.";
    }

    // Dynamic fields validation
    dynamicFields.forEach((field) => {
      if (field.required && !form.details[field.key]?.trim()) {
        newErrors[`details_${field.key}`] = `${field.label} is required.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ── Submit ───────────────────────────────────────────────────
  async function handleSubmit() {
    if (!validate()) return;

    // Upload images first
    const uploadedUrls = await uploadImages(images);

    const success = await createListing({
      categoryId,
      subCategoryId,
      title: form.title.trim(),
      description: form.description.trim(),
      price: parseFloat(form.price),
      images: uploadedUrls,
      location: form.location,
      contactName: form.contactName.trim(),
      contactPhone: `+92${form.contactPhone}`,
      hidePhone: form.hidePhone,
      details: form.details,
    });

    if (success) {
      // Go back to home
      router.dismissAll();
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackVisible: false,
          headerStyle: { backgroundColor: theme.background },
          headerShadowVisible: false,
          headerTitle: () => (
            <ThemedText
              type="smallBold"
              style={{ fontSize: 16, fontWeight: "700" }}
              numberOfLines={1}
            >
              Post your Ad for{" "}
              <ThemedText
                type="smallBold"
                style={{ color: theme.primary, fontSize: 16 }}
              >
                {subCategoryLabel}
              </ThemedText>
            </ThemedText>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} className="ml-1">
              <AppIcon family="ion" name="close" color={theme.text} size={24} />
            </TouchableOpacity>
          ),
        }}
      />

      <ThemedView className="flex-1">
        <KeyboardAwareScrollView
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={20}
          enableAutomaticScroll
          showsVerticalScrollIndicator={false}
        >
          {/* ── Images Section ── */}
          <ThemedText
            type="smallBold"
            style={{
              fontSize: 16,
              marginBottom: 12,
              paddingBottom: 8,
              borderBottomWidth: 1,
              borderBottomColor: theme.border,
            }}
          >
            Photos
          </ThemedText>

          <View style={{ marginBottom: 8 }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 10 }}
            >
              {/* Add Image Button */}
              {images.length < 10 && (
                <TouchableOpacity
                  onPress={handlePickImages}
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 12,
                    borderWidth: 1.5,
                    borderStyle: "dashed",
                    borderColor: errors.images ? theme.error : theme.primary,
                    justifyContent: "center",
                    alignItems: "center",
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
                    {images.length}/10
                  </ThemedText>
                </TouchableOpacity>
              )}

              {/* Image previews */}
              {images.map((uri, index) => (
                <View key={index} style={{ position: "relative" }}>
                  <Image
                    source={{ uri }}
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: theme.border,
                    }}
                    resizeMode="cover"
                  />
                  {/* Remove button */}
                  <TouchableOpacity
                    onPress={() => handleRemoveImage(index)}
                    style={{
                      position: "absolute",
                      top: -6,
                      right: -6,
                      backgroundColor: theme.error,
                      borderRadius: 10,
                      width: 20,
                      height: 20,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AppIcon family="ion" name="close" size={12} color="#fff" />
                  </TouchableOpacity>
                  {/* First image = cover badge */}
                  {index === 0 && (
                    <View
                      style={{
                        position: "absolute",
                        bottom: 4,
                        left: 4,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        borderRadius: 4,
                        paddingHorizontal: 5,
                        paddingVertical: 2,
                      }}
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
                themeColor="error"
                style={{ fontSize: 12, marginTop: 6, marginLeft: 4 }}
              >
                {errors.images}
              </ThemedText>
            )}
          </View>

          {/* ── Common + Dynamic Form ── */}
          <CommonListingForm
            form={form}
            dynamicFields={dynamicFields}
            errors={errors}
            categoryLabel={subCategoryLabel}
            onChange={(updated) => setForm((prev) => ({ ...prev, ...updated }))}
            onSelectOption={(fieldKey, options, label) => {
              setSelectModal({
                visible: true,
                fieldKey,
                options,
                label,
              });
            }}
          />
        </KeyboardAwareScrollView>

        {/* ── Post Now Button — fixed bottom ── */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 16,
            backgroundColor: theme.background,
            borderTopWidth: 1,
            borderTopColor: theme.border,
          }}
        >
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isSubmitting}
            style={{
              backgroundColor: theme.primary,
              borderRadius: 14,
              paddingVertical: 15,
              alignItems: "center",
            }}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <ThemedText
                type="smallBold"
                style={{ color: "#fff", fontSize: 16 }}
              >
                Post Now
              </ThemedText>
            )}
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* ── Select Options Modal ── */}
      <Modal
        visible={selectModal.visible}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setSelectModal((prev) => ({ ...prev, visible: false }))
        }
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }}
          activeOpacity={1}
          onPress={() =>
            setSelectModal((prev) => ({ ...prev, visible: false }))
          }
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
          {/* Modal Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              paddingVertical: 16,
              borderBottomWidth: 1,
              borderBottomColor: theme.border,
            }}
          >
            <ThemedText type="smallBold" style={{ fontSize: 16 }}>
              {selectModal.label}
            </ThemedText>
            <TouchableOpacity
              onPress={() =>
                setSelectModal((prev) => ({ ...prev, visible: false }))
              }
            >
              <AppIcon family="ion" name="close" size={22} color={theme.text} />
            </TouchableOpacity>
          </View>

          {/* Options list */}
          <FlatList
            data={selectModal.options}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const isSelected =
                selectModal.fieldKey === "location"
                  ? form.location === item
                  : form.details[selectModal.fieldKey] === item;

              return (
                <TouchableOpacity
                  onPress={() => {
                    if (selectModal.fieldKey === "location") {
                      setForm((prev) => ({ ...prev, location: item }));
                      if (errors.location) {
                        setErrors((prev) => ({ ...prev, location: "" }));
                      }
                    } else {
                      setForm((prev) => ({
                        ...prev,
                        details: {
                          ...prev.details,
                          [selectModal.fieldKey]: item,
                        },
                      }));
                      const errKey = `details_${selectModal.fieldKey}`;
                      if (errors[errKey]) {
                        setErrors((prev) => ({ ...prev, [errKey]: "" }));
                      }
                    }
                    setSelectModal((prev) => ({ ...prev, visible: false }));
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    paddingVertical: 15,
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
