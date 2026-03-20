import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { useAvatarUpload } from "@/hooks/useAvatarUpload";
import { useUserData } from "@/hooks/useUserData";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const FIELDS = [
  {
    label: "Name",
    key: "displayName",
    editable: true,
    placeholder: "Enter your name",
  },
  {
    label: "Email",
    key: "email",
    editable: false,
    placeholder: "Email",
  },
  {
    label: "Phone",
    key: "phoneNumber",
    editable: true,
    placeholder: "3212345678", // ✅ format placeholder
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
  const { userData, loading, isSaving, updateUser } = useUserData();
  const { isUploading, pickAndUploadAvatar } = useAvatarUpload();

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
  });

  // ✅ +92 hata ke sirf 10 digits show karo
  function stripPhonePrefix(phone: string): string {
    if (phone.startsWith("+92")) return phone.slice(3);
    if (phone.startsWith("92")) return phone.slice(2);
    if (phone.startsWith("0")) return phone.slice(1);
    return phone;
  }

  useEffect(() => {
    if (userData) {
      setForm({
        displayName: userData.displayName || "",
        email: userData.email || "",
        phoneNumber: stripPhonePrefix(userData.phoneNumber || ""), // ✅ sirf 10 digits
        address: userData.address || "",
        dateOfBirth: userData.dateOfBirth || "",
      });
    }
  }, [userData]);

  function handleEdit() {
    setIsEditing(true);
    setErrors({});
  }

  function handleCancel() {
    setIsEditing(false);
    setErrors({});
    setShowDatePicker(false);
    if (userData) {
      setForm({
        displayName: userData.displayName || "",
        email: userData.email || "",
        phoneNumber: stripPhonePrefix(userData.phoneNumber || ""), // ✅
        address: userData.address || "",
        dateOfBirth: userData.dateOfBirth || "",
      });
    }
  }

  function validate() {
    const newErrors: Record<string, string> = {};

    if (!form.displayName.trim()) {
      newErrors.displayName = "Name cannot be empty.";
    }

    // ✅ Phone validation
    if (form.phoneNumber.trim()) {
      const cleaned = stripPhonePrefix(form.phoneNumber.replace(/[\s\-]/g, ""));
      if (!/^3[0-9]{9}$/.test(cleaned)) {
        newErrors.phoneNumber = "Enter valid number e.g. 3217168912";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSave() {
    if (!validate()) return;

    // ✅ +92 prefix attach karke store karo
    const cleaned = stripPhonePrefix(form.phoneNumber.replace(/[\s\-]/g, ""));
    const formattedPhone = cleaned ? `+92${cleaned}` : "";

    const success = await updateUser({
      displayName: form.displayName.trim(),
      phoneNumber: formattedPhone,
      address: form.address.trim(),
      dateOfBirth: form.dateOfBirth,
    });

    if (success) {
      setIsEditing(false);
      setErrors({});
    }
  }

  function formatDateForDisplay(dateStr: string): string {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <ThemedText
              type="smallBold"
              style={{ fontSize: 20, fontWeight: "700" }}
            >
              My Profile
            </ThemedText>
          ),
          headerShown: true,
          headerBackVisible: false,
          headerStyle: { backgroundColor: theme.background },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} className="ml-1">
              <AppIcon
                family="ion"
                name="chevron-back-circle"
                color={theme.text}
                size={28}
              />
            </TouchableOpacity>
          ),
        }}
      />

      {loading || !userData ? (
        <ThemedView className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={theme.primary} />
        </ThemedView>
      ) : (
        <ThemedView className="flex-1">
          <KeyboardAwareScrollView
            contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
            enableOnAndroid
            keyboardShouldPersistTaps="handled"
            extraScrollHeight={20}
            enableAutomaticScroll
          >
            {/* Avatar + Name + Edit Button */}
            <View className="items-center mb-8">
              <View style={{ position: "relative", marginBottom: 4 }}>
                <Image
                  source={{
                    uri:
                      userData.imageUri || "https://i.pravatar.cc/150?img=12",
                  }}
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: 48,
                    borderWidth: 3,
                    borderColor: theme.primary,
                    opacity: isUploading ? 0.6 : 1,
                  }}
                />
                <TouchableOpacity
                  onPress={pickAndUploadAvatar}
                  disabled={isUploading}
                  style={{
                    position: "absolute",
                    bottom: 6,
                    right: 6,
                    backgroundColor: theme.primary,
                    borderRadius: 12,
                    padding: 5,
                    borderWidth: 2,
                    borderColor: theme.background,
                    zIndex: 10,
                  }}
                >
                  {isUploading ? (
                    <ActivityIndicator size={12} color="#fff" />
                  ) : (
                    <AppIcon
                      family="ion"
                      name="camera"
                      size={14}
                      color="#fff"
                    />
                  )}
                </TouchableOpacity>
              </View>

              <ThemedText
                type="smallBold"
                style={{ fontSize: 20, marginTop: 10 }}
              >
                {userData.displayName || "No Name"}
              </ThemedText>
              <ThemedText
                type="small"
                themeColor="textSecondary"
                className="mt-0.5"
              >
                {userData.email || ""}
              </ThemedText>

              <TouchableOpacity
                onPress={isEditing ? handleCancel : handleEdit}
                style={{
                  marginTop: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  paddingHorizontal: 16,
                  paddingVertical: 6,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: isEditing ? theme.error : theme.primary,
                  backgroundColor: isEditing
                    ? `${theme.error}15`
                    : `${theme.primary}15`,
                }}
              >
                <AppIcon
                  family="material-community"
                  name={isEditing ? "close" : "pencil-outline"}
                  color={isEditing ? theme.error : theme.primary}
                  size={16}
                />
                <ThemedText
                  type="small"
                  style={{
                    color: isEditing ? theme.error : theme.primary,
                    fontSize: 13,
                  }}
                >
                  {isEditing ? "Cancel Editing" : "Edit Profile"}
                </ThemedText>
              </TouchableOpacity>
            </View>

            {/* Fields */}
            <View className="gap-3">
              {FIELDS.map((item) => {
                const hasError = !!errors[item.key];
                const isFieldEditable = isEditing && item.editable;
                const isPhone = item.key === "phoneNumber"; // ✅

                return (
                  <View key={item.key}>
                    <ThemedView
                      type="backgroundElement"
                      className="rounded-2xl px-4 py-3"
                      style={{
                        borderWidth: 1,
                        borderColor: hasError
                          ? theme.borderError
                          : isFieldEditable
                            ? theme.primary
                            : theme.border,
                      }}
                    >
                      {/* Label row */}
                      <View className="flex-row items-center gap-1 mb-1">
                        <ThemedText
                          type="small"
                          themeColor={hasError ? "error" : "textMuted"}
                          style={{ fontSize: 11 }}
                        >
                          {item.label}
                        </ThemedText>
                        {/* ✅ +92 badge phone field mein */}
                        {isPhone && (
                          <ThemedText
                            type="small"
                            style={{
                              fontSize: 11,
                              color: isFieldEditable
                                ? theme.primary
                                : theme.textMuted,
                            }}
                          >
                            +92
                          </ThemedText>
                        )}
                        {!item.editable && (
                          <AppIcon
                            name="lock-closed"
                            size={10}
                            color={theme.textMuted}
                          />
                        )}
                      </View>

                      {/* ✅ Phone field ke liye prefix + input side by side */}
                      {isPhone ? (
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <ThemedText
                            style={{
                              fontSize: 15,
                              color: isFieldEditable
                                ? theme.text
                                : theme.textMuted,
                              marginRight: 4,
                            }}
                          >
                            +92
                          </ThemedText>
                          <TextInput
                            value={form.phoneNumber}
                            editable={isFieldEditable}
                            placeholder={item.placeholder}
                            keyboardType="number-pad"
                            maxLength={10}
                            onChangeText={(text) => {
                              const numeric = text.replace(/[^0-9]/g, "");
                              setForm({ ...form, phoneNumber: numeric });
                              if (errors.phoneNumber) {
                                setErrors({ ...errors, phoneNumber: "" });
                              }
                            }}
                            style={{
                              flex: 1,
                              fontSize: 15,
                              color: isFieldEditable
                                ? theme.text
                                : theme.textMuted,
                              paddingVertical: 0,
                            }}
                            placeholderTextColor={theme.textMuted}
                          />
                        </View>
                      ) : (
                        <TextInput
                          value={form[item.key as keyof typeof form]}
                          editable={isFieldEditable}
                          placeholder={item.placeholder}
                          onChangeText={(text) => {
                            setForm({ ...form, [item.key]: text });
                            if (errors[item.key]) {
                              setErrors({ ...errors, [item.key]: "" });
                            }
                          }}
                          style={{
                            fontSize: 15,
                            color: isFieldEditable
                              ? theme.text
                              : theme.textMuted,
                            paddingVertical: 0,
                          }}
                          placeholderTextColor={theme.textMuted}
                        />
                      )}
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

              {/* Date of Birth Field */}
              <View>
                <TouchableOpacity
                  onPress={() => isEditing && setShowDatePicker(true)}
                  activeOpacity={isEditing ? 0.7 : 1}
                >
                  <ThemedView
                    type="backgroundElement"
                    className="rounded-2xl px-4 py-3"
                    style={{
                      borderWidth: 1,
                      borderColor: isEditing ? theme.primary : theme.border,
                    }}
                  >
                    <View className="flex-row items-center gap-1 mb-1">
                      <ThemedText
                        type="small"
                        themeColor="textMuted"
                        style={{ fontSize: 11 }}
                      >
                        Date of Birth
                      </ThemedText>
                    </View>
                    <ThemedText
                      style={{
                        fontSize: 15,
                        color: form.dateOfBirth
                          ? isEditing
                            ? theme.text
                            : theme.textMuted
                          : theme.textMuted,
                        paddingVertical: 0,
                      }}
                    >
                      {form.dateOfBirth
                        ? formatDateForDisplay(form.dateOfBirth)
                        : "Enter date of birth"}
                    </ThemedText>
                  </ThemedView>
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    value={
                      form.dateOfBirth
                        ? new Date(form.dateOfBirth)
                        : new Date(2000, 0, 1)
                    }
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    maximumDate={new Date()}
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(Platform.OS === "ios");
                      if (event.type === "set" && selectedDate) {
                        setForm({
                          ...form,
                          dateOfBirth: selectedDate.toISOString(),
                        });
                      }
                    }}
                  />
                )}
              </View>
            </View>

            {/* Save Button */}
            {isEditing && (
              <TouchableOpacity
                onPress={handleSave}
                disabled={isSaving}
                style={{
                  backgroundColor: theme.primary,
                  borderRadius: 16,
                  paddingVertical: 14,
                  alignItems: "center",
                  marginTop: 24,
                }}
              >
                {isSaving ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <ThemedText
                    type="smallBold"
                    style={{ color: "#fff", fontSize: 16 }}
                  >
                    Save Changes
                  </ThemedText>
                )}
              </TouchableOpacity>
            )}

            {/* Account Info Card */}
            <ThemedView
              type="backgroundElement"
              style={{
                marginTop: 32,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: theme.border,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  paddingHorizontal: 14,
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.border,
                }}
              >
                <AppIcon
                  family="ion"
                  name="information-circle-outline"
                  size={15}
                  color={theme.textMuted}
                />
                <ThemedText
                  type="small"
                  themeColor="textMuted"
                  style={{ fontSize: 11, letterSpacing: 0.5 }}
                >
                  ACCOUNT INFO
                </ThemedText>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  borderBottomWidth: userData.updatedAt ? 1 : 0,
                  borderBottomColor: theme.border,
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <AppIcon
                    family="ion"
                    name="calendar-outline"
                    size={15}
                    color={theme.textMuted}
                  />
                  <ThemedText
                    type="small"
                    themeColor="textMuted"
                    style={{ fontSize: 13 }}
                  >
                    Member since
                  </ThemedText>
                </View>
                <ThemedText type="smallBold" style={{ fontSize: 13 }}>
                  {userData.createdAt
                    ? formatDateForDisplay(userData.createdAt)
                    : "—"}
                </ThemedText>
              </View>

              {userData.updatedAt ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 14,
                    paddingVertical: 12,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <AppIcon
                      family="ion"
                      name="time-outline"
                      size={15}
                      color={theme.textMuted}
                    />
                    <ThemedText
                      type="small"
                      themeColor="textMuted"
                      style={{ fontSize: 13 }}
                    >
                      Last updated
                    </ThemedText>
                  </View>
                  <ThemedText type="smallBold" style={{ fontSize: 13 }}>
                    {formatDateForDisplay(userData.updatedAt)}
                  </ThemedText>
                </View>
              ) : null}
            </ThemedView>
          </KeyboardAwareScrollView>
        </ThemedView>
      )}
    </>
  );
}
