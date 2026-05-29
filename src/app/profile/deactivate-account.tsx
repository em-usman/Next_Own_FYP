import { AppIcon } from "@/components/Icons/AppIcon";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { emailJSConfig, validateEmailJSConfig } from "@/config/emailConfig";
import { useTheme } from "@/hooks/use-theme";
import { useUserData } from "@/hooks/useUserData";
import emailjs from "@emailjs/react-native";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

if (emailJSConfig.publicKey) {
  emailjs.init({
    publicKey: emailJSConfig.publicKey,
  });
}

export default function DeactivateAccountScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { userData } = useUserData();

  const [name, setName] = useState(userData?.displayName || "");
  const [email, setEmail] = useState(userData?.email || "");
  // ✅ Reason has its own separate state — no full re-render
  const [reason, setReason] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ✅ useRef to keep latest reason without causing re-renders
  const reasonRef = useRef(reason);

  useEffect(() => {
    reasonRef.current = reason;
  }, [reason]);

  useEffect(() => {
    if (userData) {
      setName(userData.displayName || "");
      setEmail(userData.email || "");
    }
  }, [userData]);

  // ✅ useCallback — stable function reference, no re-render
  const handleReasonChange = useCallback((text: string) => {
    setReason(text);
    reasonRef.current = text;
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Name is required";

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!reason.trim()) {
      newErrors.reason = "Please tell us why you're deactivating";
    } else if (reason.trim().length < 30) {
      newErrors.reason = "Please provide at least 30 characters Reason";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getFormattedDate = () => {
    return new Date().toLocaleString("en-PK", {
      timeZone: "Asia/Karachi",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please fill all fields correctly");
      return;
    }

    if (!validateEmailJSConfig()) {
      Alert.alert(
        "Configuration Error",
        "EmailJS is not properly configured. Please check your environment variables.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await emailjs.send(
        emailJSConfig.serviceId,
        emailJSConfig.templateId,
        {
          to_email: emailJSConfig.receiverEmail,
          user_name: name,
          user_email: email,
          deactivation_reason: reason,
          request_date: getFormattedDate(),
        },
      );

      if (response.status === 200) {
        setSuccessModalVisible(true);
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      Alert.alert(
        "Error",
        "Failed to submit your request. Please try again or contact support.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ScreenHeader title="Deactivate Account" />
      <ThemedView className="flex-1">
        <KeyboardAwareScrollView
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={20}
          enableAutomaticScroll
        >
          {/* Warning Banner */}
          <View
            style={{
              backgroundColor: `${theme.error}15`,
              borderWidth: 1,
              borderColor: theme.error,
              borderRadius: 12,
              padding: 12,
              marginBottom: 20,
              flexDirection: "row",
              gap: 10,
            }}
          >
            <AppIcon
              family="ion"
              name="warning-outline"
              size={20}
              color={theme.error}
            />
            <View style={{ flex: 1 }}>
              <ThemedText
                type="smallBold"
                style={{ fontSize: 13, color: theme.error }}
              >
                Permanent Deactivation
              </ThemedText>
              <ThemedText
                type="small"
                themeColor="textSecondary"
                style={{ fontSize: 12, marginTop: 4 }}
              >
                Once deactivated, your account cannot be reactivated. All
                listings and account data will be permanently deleted.
              </ThemedText>
            </View>
          </View>

          {/* Form Section */}
          <View
            style={{
              backgroundColor: theme.backgroundElement,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: theme.border,
              padding: 16,
            }}
          >
            <ThemedText
              type="smallBold"
              style={{ fontSize: 14, marginBottom: 16 }}
            >
              Account Deactivation Request
            </ThemedText>

            {/* Full Name */}
            <View style={{ marginBottom: 16 }}>
              <ThemedText
                type="smallBold"
                style={{ fontSize: 14, marginBottom: 6 }}
              >
                Full Name
              </ThemedText>
              <TextInput
                style={{
                  backgroundColor: theme.backgroundElement,
                  borderWidth: 1,
                  borderColor: errors.name ? theme.error : theme.border,
                  borderRadius: 12,
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  color: theme.text,
                  fontSize: 14,
                  minHeight: 48,
                }}
                value={name}
                editable={false}
                placeholder="Enter your full name"
                placeholderTextColor={theme.textMuted}
              />
            </View>

            {/* Email */}
            <View style={{ marginBottom: 16 }}>
              <ThemedText
                type="smallBold"
                style={{ fontSize: 14, marginBottom: 6 }}
              >
                Account Email
              </ThemedText>
              <TextInput
                style={{
                  backgroundColor: theme.backgroundElement,
                  borderWidth: 1,
                  borderColor: errors.email ? theme.error : theme.border,
                  borderRadius: 12,
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  color: theme.text,
                  fontSize: 14,
                  minHeight: 48,
                }}
                value={email}
                editable={false}
                placeholder="Enter your email"
                placeholderTextColor={theme.textMuted}
              />
            </View>

            {/* ✅ Reason — completely isolated TextInput */}
            <View style={{ marginBottom: 16 }}>
              <ThemedText
                type="smallBold"
                style={{ fontSize: 14, marginBottom: 6 }}
              >
                Reason For Deactivation
              </ThemedText>
              <TextInput
                style={{
                  backgroundColor: theme.backgroundElement,
                  borderWidth: 1,
                  borderColor: errors.reason ? theme.error : theme.border,
                  borderRadius: 12,
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  color: theme.text,
                  fontSize: 14,
                  minHeight: 100,
                  textAlignVertical: "top",
                }}
                placeholder="Please tell us why you want to deactivate your account..."
                placeholderTextColor={theme.textMuted}
                value={reason}
                onChangeText={handleReasonChange}
                multiline={true}
                scrollEnabled={true}
                blurOnSubmit={false}
              />
              {errors.reason && (
                <ThemedText
                  type="small"
                  style={{ color: theme.error, fontSize: 12, marginTop: 4 }}
                >
                  {errors.reason}
                </ThemedText>
              )}
            </View>
          </View>

          {/* Info Box */}
          <View
            style={{
              marginTop: 20,
              padding: 12,
              backgroundColor: `${theme.primary}15`,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: `${theme.primary}30`,
            }}
          >
            <ThemedText type="smallBold" style={{ fontSize: 13 }}>
              What Happens Next?
            </ThemedText>
            <View style={{ marginTop: 8, gap: 6 }}>
              {[
                "Your account will be immediately deactivated",
                "All your listings and data will be permanently deleted",
                `You'll receive a confirmation email at ${email || "your email"}`,
              ].map((text, i) => (
                <View key={i} style={{ flexDirection: "row", gap: 8 }}>
                  <ThemedText type="smallBold" style={{ color: theme.primary }}>
                    {i + 1}.
                  </ThemedText>
                  <ThemedText
                    type="small"
                    themeColor="textSecondary"
                    style={{ fontSize: 12, flex: 1 }}
                  >
                    {text}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>

          {/* Action Button */}
          <View style={{ gap: 12, marginTop: 24 }}>
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isSubmitting}
              activeOpacity={0.8}
              style={{
                backgroundColor: theme.error,
                borderRadius: 12,
                paddingVertical: 14,
                alignItems: "center",
                justifyContent: "center",
                opacity: isSubmitting ? 0.6 : 1,
              }}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <ThemedText
                  type="smallBold"
                  style={{ fontSize: 15, color: "#FFFFFF" }}
                >
                  Submit Deactivation Request
                </ThemedText>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </ThemedView>

      {/* Success Modal */}
      <Modal
        visible={successModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setSuccessModalVisible(false)}
        >
          <View
            style={{
              backgroundColor: theme.backgroundElement,
              borderRadius: 20,
              padding: 24,
              alignItems: "center",
              width: "85%",
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: `${theme.primary}20`,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <AppIcon
                family="ion"
                name="checkmark-circle"
                size={40}
                color={theme.primary}
              />
            </View>

            <ThemedText
              type="subtitle"
              style={{ fontSize: 18, marginBottom: 8, textAlign: "center" }}
            >
              Request Received!
            </ThemedText>

            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{
                fontSize: 13,
                textAlign: "center",
                marginBottom: 4,
                lineHeight: 20,
              }}
            >
              Your deactivation request has been submitted successfully.
            </ThemedText>

            <ThemedText
              type="small"
              themeColor="textSecondary"
              style={{
                fontSize: 13,
                textAlign: "center",
                marginBottom: 16,
                lineHeight: 20,
              }}
            >
              After deactivating your account, you will receive a confirmation
              email regarding your account deactivation at{" "}
              <ThemedText type="smallBold">{email}</ThemedText>.
            </ThemedText>

            <TouchableOpacity
              onPress={() => {
                setSuccessModalVisible(false);
                router.back();
              }}
              style={{
                backgroundColor: theme.primary,
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 24,
              }}
            >
              <ThemedText
                type="smallBold"
                style={{ color: "#FFFFFF", fontSize: 14 }}
              >
                Got It
              </ThemedText>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
