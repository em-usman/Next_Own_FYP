// app/feedback.tsx
import { AppIcon } from "@/components/Icons/AppIcon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { FeedbackCategory, useFeedback } from "@/hooks/useFeedback";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const CATEGORIES: { label: string; value: FeedbackCategory; icon: string }[] = [
  { label: "General", value: "general", icon: "chatbox-outline" },
  { label: "Bug", value: "bug", icon: "bug-outline" },
  { label: "Suggestion", value: "suggestion", icon: "bulb-outline" },
  { label: "Complaint", value: "complaint", icon: "warning-outline" },
];

export default function FeedbackScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { isSubmitting, submitFeedback } = useFeedback();

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState<FeedbackCategory>("general");

  const activeRating = hoveredRating || rating;

  const STAR_LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  async function handleSubmit() {
    const success = await submitFeedback({ rating, message, category });
    if (success) {
      setRating(0);
      setMessage("");
      setCategory("general");
    }
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
              Feedback
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

      <ThemedView className="flex-1">
        <KeyboardAwareScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={20}
          enableAutomaticScroll
        >
          {/* Star Rating */}
          <ThemedView
            type="backgroundElement"
            style={{
              borderRadius: 16,
              borderWidth: 1,
              borderColor: theme.border,
              padding: 20,
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <ThemedText
              type="smallBold"
              style={{ fontSize: 15, marginBottom: 16 }}
            >
              How would you rate your experience?
            </ThemedText>

            <View style={{ flexDirection: "row", gap: 10, marginBottom: 8 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                  activeOpacity={0.7}
                >
                  <AppIcon
                    family="ion"
                    name={activeRating >= star ? "star" : "star-outline"}
                    size={36}
                    color={activeRating >= star ? "#F59E0B" : theme.textMuted}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* Star Label */}
            <ThemedText
              type="small"
              style={{
                fontSize: 13,
                color: rating > 0 ? "#F59E0B" : theme.textMuted,
                fontWeight: rating > 0 ? "600" : "400",
                minHeight: 18,
              }}
            >
              {STAR_LABELS[rating] || "Tap a star to rate"}
            </ThemedText>
          </ThemedView>

          {/* Category Selector */}
          <ThemedView
            type="backgroundElement"
            style={{
              borderRadius: 16,
              borderWidth: 1,
              borderColor: theme.border,
              padding: 16,
              marginBottom: 12,
            }}
          >
            <ThemedText
              type="small"
              themeColor="textMuted"
              style={{ fontSize: 11, marginBottom: 12, letterSpacing: 0.5 }}
            >
              CATEGORY
            </ThemedText>

            <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
              {CATEGORIES.map((cat) => {
                const isActive = category === cat.value;
                return (
                  <TouchableOpacity
                    key={cat.value}
                    onPress={() => setCategory(cat.value)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      paddingHorizontal: 12,
                      paddingVertical: 7,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: isActive ? theme.primary : theme.border,
                      backgroundColor: isActive
                        ? `${theme.primary}18`
                        : "transparent",
                    }}
                  >
                    <AppIcon
                      family="ion"
                      name={cat.icon}
                      size={13}
                      color={isActive ? theme.primary : theme.textMuted}
                    />
                    <ThemedText
                      type="small"
                      style={{
                        fontSize: 13,
                        color: isActive ? theme.primary : theme.textMuted,
                        fontWeight: isActive ? "600" : "400",
                      }}
                    >
                      {cat.label}
                    </ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ThemedView>

          {/* Message Input */}
          <ThemedView
            type="backgroundElement"
            style={{
              borderRadius: 16,
              borderWidth: 1,
              borderColor: message.length > 0 ? theme.primary : theme.border,
              padding: 16,
              marginBottom: 24,
            }}
          >
            <ThemedText
              type="small"
              themeColor="textMuted"
              style={{ fontSize: 11, marginBottom: 8, letterSpacing: 0.5 }}
            >
              MESSAGE
            </ThemedText>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Share your thoughts, suggestions or report an issue..."
              placeholderTextColor={theme.textMuted}
              multiline
              numberOfLines={5}
              maxLength={500}
              style={{
                fontSize: 14,
                color: theme.text,
                textAlignVertical: "top",
                minHeight: 100,
                paddingVertical: 0,
              }}
            />
            {/* Character counter */}
            <ThemedText
              type="small"
              themeColor="textMuted"
              style={{ fontSize: 11, textAlign: "right", marginTop: 8 }}
            >
              {message.length}/500
            </ThemedText>
          </ThemedView>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isSubmitting}
            style={{
              backgroundColor: theme.primary,
              borderRadius: 16,
              paddingVertical: 14,
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
                Submit Feedback
              </ThemedText>
            )}
          </TouchableOpacity>

          {/* Note */}
          <ThemedText
            type="small"
            themeColor="textMuted"
            style={{ fontSize: 11, textAlign: "center", marginTop: 12 }}
          >
            You can submit feedback once every 24 hours
          </ThemedText>
        </KeyboardAwareScrollView>
      </ThemedView>
    </>
  );
}
