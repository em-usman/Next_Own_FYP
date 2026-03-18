import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { useUserData } from "@/hooks/useUserData";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Stack, useRouter } from "expo-router";
import { doc, updateDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { auth, db } from "../../../../firebaseConfig";

const FIELDS = [
  {
    label: "Name",
    key: "displayName",
    editable: true,
    placeholder: "Enter your name",
  },
  { label: "Email", key: "email", editable: false, placeholder: "Email" },
  {
    label: "Phone",
    key: "phoneNumber",
    editable: true,
    placeholder: "Enter phone number",
  },
  {
    label: "Address",
    key: "address",
    editable: true,
    placeholder: "Enter your address",
  },
];

export default function ProfileScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { userData, loading } = useUserData();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    if (userData) {
      setForm({
        displayName: userData.displayName || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
        address: userData.address || "",
      });
    }
  }, [userData]);

  function openSheet() {
    bottomSheetRef.current?.expand();
  }

  function closeSheet() {
    bottomSheetRef.current?.close();
    setErrors({});
    if (userData) {
      setForm({
        displayName: userData.displayName || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
        address: userData.address || "",
      });
    }
  }

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!form.displayName.trim()) {
      newErrors.displayName = "Name cannot be empty.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSave() {
    if (!validate()) return;

    const uid = auth.currentUser?.uid;
    if (!uid) {
      Alert.alert("Error", "User not found. Please login again.");
      return;
    }

    try {
      setIsSaving(true);
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        displayName: form.displayName.trim(),
        phoneNumber: form.phoneNumber.trim(),
        address: form.address.trim(),
      });
      setErrors({});
      bottomSheetRef.current?.close();
    } catch (e) {
      console.error("Update error:", e);
      Alert.alert("Error", "Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        onPress={closeSheet}
      />
    ),
    [],
  );

  const headerTitle = useCallback(
    () => (
      <ThemedText type="smallBold" style={{ fontSize: 18 }}>
        My Profile
      </ThemedText>
    ),
    [],
  );

  const headerLeft = useCallback(
    () => (
      <TouchableOpacity onPress={() => router.back()} className="ml-1">
        <AppIcon
          family="ion"
          name="chevron-back-circle"
          color={theme.text}
          size={28}
        />
      </TouchableOpacity>
    ),
    [theme.text],
  );

  const headerRight = useCallback(
    () => (
      <TouchableOpacity
        onPress={openSheet}
        className="mr-1 flex-row items-center gap-1"
      >
        <AppIcon
          family="material-community"
          name="pencil-outline"
          color={theme.primary}
          size={22}
        />
        <ThemedText type="small" themeColor="primary">
          Edit
        </ThemedText>
      </TouchableOpacity>
    ),
    [theme.primary],
  );

  if (loading || !userData) return null;

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle,
          headerShown: true,
          headerBackVisible: false,
          headerStyle: { backgroundColor: theme.background },
          headerShadowVisible: false,
          headerLeft,
          headerRight,
        }}
      />

      {/* Profile View */}
      <ThemedView className="flex-1 px-4 pt-6">
        {/* Avatar + Name */}
        <View className="items-center mb-8">
          {userData.imageUri ? (
            <Image
              source={{ uri: userData.imageUri }}
              style={{
                width: 96,
                height: 96,
                borderRadius: 48,
                borderWidth: 3,
                borderColor: theme.primary,
              }}
            />
          ) : (
            <View
              style={{
                width: 96,
                height: 96,
                borderRadius: 48,
                borderWidth: 3,
                borderColor: theme.primary,
                backgroundColor: theme.backgroundSelected,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ThemedText
                style={{
                  fontSize: 36,
                  fontWeight: "700",
                  color: theme.primary,
                }}
              >
                {(userData.displayName || "U").charAt(0).toUpperCase()}
              </ThemedText>
            </View>
          )}

          <ThemedText type="smallBold" style={{ fontSize: 20, marginTop: 10 }}>
            {userData.displayName || "No Name"}
          </ThemedText>
          <ThemedText
            type="small"
            themeColor="textSecondary"
            className="mt-0.5"
          >
            {userData.email || ""}
          </ThemedText>
        </View>

        {/* Read-only display fields */}
        <View className="gap-3">
          {FIELDS.map((item) => (
            <ThemedView
              key={item.key}
              type="backgroundElement"
              className="rounded-2xl px-4 py-3"
              style={{ borderWidth: 1, borderColor: theme.border }}
            >
              <ThemedText
                type="small"
                themeColor="textMuted"
                style={{ fontSize: 11, marginBottom: 2 }}
              >
                {item.label}
              </ThemedText>
              <ThemedText
                type="small"
                themeColor={
                  form[item.key as keyof typeof form] ? "text" : "textMuted"
                }
                style={{ fontSize: 15 }}
              >
                {form[item.key as keyof typeof form] || item.placeholder}
              </ThemedText>
            </ThemedView>
          ))}
        </View>
      </ThemedView>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enableDynamicSizing
        enablePanDownToClose
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: theme.background }}
        handleIndicatorStyle={{ backgroundColor: theme.border }}
        onClose={closeSheet}
      >
        <BottomSheetView style={{ paddingHorizontal: 20, paddingBottom: 40 }}>
          <KeyboardAwareScrollView
            contentContainerStyle={{ paddingBottom: 40 }}
            enableOnAndroid
            keyboardShouldPersistTaps="handled"
          >
            {/* Sheet Header */}
            <View
              className="flex-row items-center justify-between py-4 mb-2"
              style={{ borderBottomWidth: 1, borderBottomColor: theme.border }}
            >
              <TouchableOpacity onPress={closeSheet}>
                <ThemedText type="small" themeColor="textSecondary">
                  Cancel
                </ThemedText>
              </TouchableOpacity>

              <ThemedText type="smallBold" style={{ fontSize: 16 }}>
                Edit Profile
              </ThemedText>

              <TouchableOpacity onPress={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <ActivityIndicator color={theme.primary} size="small" />
                ) : (
                  <ThemedText type="smallBold" themeColor="primary">
                    Save
                  </ThemedText>
                )}
              </TouchableOpacity>
            </View>

            {/* Input Fields */}
            <View className="gap-3 pt-2">
              {FIELDS.map((item) => {
                const hasError = !!errors[item.key];
                return (
                  <View key={item.key}>
                    <ThemedView
                      type="backgroundElement"
                      className="rounded-2xl px-4 py-3"
                      style={{
                        borderWidth: 1,
                        borderColor: hasError
                          ? theme.borderError
                          : theme.border,
                      }}
                    >
                      <View className="flex-row items-center gap-1 mb-1">
                        <ThemedText
                          type="small"
                          themeColor={hasError ? "error" : "textMuted"}
                          style={{ fontSize: 11 }}
                        >
                          {item.label}
                        </ThemedText>
                        {!item.editable && (
                          <AppIcon
                            name="lock-closed"
                            size={10}
                            color={theme.textMuted}
                          />
                        )}
                      </View>

                      <TextInput
                        value={form[item.key as keyof typeof form]}
                        editable={item.editable}
                        placeholder={item.placeholder}
                        onChangeText={(text) => {
                          setForm({ ...form, [item.key]: text });
                          if (errors[item.key]) {
                            setErrors({ ...errors, [item.key]: "" });
                          }
                        }}
                        style={{
                          fontSize: 15,
                          color: item.editable ? theme.text : theme.textMuted,
                          paddingVertical: 0,
                        }}
                        placeholderTextColor={theme.textMuted}
                      />
                    </ThemedView>

                    {hasError && (
                      <ThemedText
                        type="small"
                        themeColor="error"
                        className="ml-2 mt-1"
                        style={{ fontSize: 12 }}
                      >
                        {errors[item.key]}
                      </ThemedText>
                    )}
                  </View>
                );
              })}
            </View>
          </KeyboardAwareScrollView>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
