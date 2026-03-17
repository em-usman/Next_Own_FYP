import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import useGoogleSignIn from "@/hooks/useGoogleSignIn";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../../../firebaseConfig";

export default function SignupScreen() {
  const theme = useTheme();
  const { signIn, loading } = useGoogleSignIn();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { expoPushToken } = usePushNotifications();

  const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value);
  const validateFullName = (value: string) =>
    /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/.test(value.trim());

  const handleManualSignup = async () => {
    setFullNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setGeneralError("");

    let valid = true;

    if (!fullName.trim()) {
      setFullNameError("Full name is required.");
      valid = false;
    } else if (!validateFullName(fullName)) {
      setFullNameError("Full name can contain only letters (A-Z).");
      valid = false;
    }

    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password.");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      valid = false;
    }

    if (!valid) return;

    try {
      setIsSubmitting(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      const user = userCredential.user;

      await sendEmailVerification(user);
      await setDoc(doc(db, "users", user.uid), {
        email: user.email || "",
        displayName: fullName.trim() || "",
        phoneNumber: "",
        imageUri: "",
        expoPushToken: expoPushToken?.data || null,
        createdAt: new Date().toISOString(),
      });

      await signOut(auth);

      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTermsChecked(false);

      Alert.alert(
        "Verify your email",
        "A verification link has been sent to your inbox. Please verify before logging in.",
        [{ text: "OK", onPress: () => router.replace("/(auth)") }],
      );
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setEmailError("Email is already in use.");
      } else if (error.code === "auth/invalid-email") {
        setEmailError("Invalid email address.");
      } else if (error.code === "auth/weak-password") {
        setPasswordError("Password is too weak.");
      } else {
        setGeneralError(error.message || "Failed to sign up.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemedView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Black Header */}
          <ThemedView
            type="backgroundHeader"
            className="px-6 pt-14 pb-16 items-center justify-end"
          >
            <Image
              source={require("@/assets/new/splash-icon.png")}
              className="w-16 h-16"
              resizeMode="contain"
            />
            <ThemedText type="title" themeColor="textInverse" className="mt-3">
              Sign Up
            </ThemedText>
          </ThemedView>

          {/* Form */}
          <ThemedView className="flex-1 rounded-t-[40px] -mt-8 px-6 pt-8 pb-24 gap-4">
            {/* Full Name */}
            <View className="gap-1">
              <ThemedText type="smallBold" className="mb-1">
                Full Name
              </ThemedText>
              <ThemedView
                type="backgroundElement"
                style={{
                  borderColor: fullNameError ? theme.borderError : theme.border,
                }}
                className="flex-row items-center border rounded-2xl px-4"
              >
                <MaterialIcons name="person" size={20} color={theme.icon} />
                <TextInput
                  className="flex-1 ml-3 h-12 text-base"
                  style={{ color: theme.text }}
                  placeholder="Enter your full name"
                  placeholderTextColor={theme.textMuted}
                  autoCapitalize="words"
                  value={fullName}
                  onChangeText={(text) => {
                    setFullName(text);
                    if (!text.trim()) {
                      setFullNameError("Full name is required.");
                    } else if (!validateFullName(text)) {
                      setFullNameError(
                        "Full name can contain only letters (A-Z).",
                      );
                    } else {
                      setFullNameError("");
                    }
                  }}
                />
              </ThemedView>
              {fullNameError ? (
                <ThemedText themeColor="error" className="text-xs ml-1">
                  {fullNameError}
                </ThemedText>
              ) : null}
            </View>

            {/* Email */}
            <View className="gap-1">
              <ThemedText type="smallBold" className="mb-1">
                Email Address
              </ThemedText>
              <ThemedView
                type="backgroundElement"
                style={{
                  borderColor: emailError ? theme.borderError : theme.border,
                }}
                className="flex-row items-center border rounded-2xl px-4"
              >
                <MaterialIcons name="email" size={20} color={theme.icon} />
                <TextInput
                  className="flex-1 ml-3 h-12 text-base"
                  style={{ color: theme.text }}
                  placeholder="example@gmail.com"
                  placeholderTextColor={theme.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setEmailError("");
                  }}
                />
              </ThemedView>
              {emailError ? (
                <ThemedText themeColor="error" className="text-xs ml-1">
                  {emailError}
                </ThemedText>
              ) : null}
            </View>

            {/* Password */}
            <View className="gap-1">
              <ThemedText type="smallBold" className="mb-1">
                Password
              </ThemedText>
              <ThemedView
                type="backgroundElement"
                style={{
                  borderColor: passwordError ? theme.borderError : theme.border,
                }}
                className="flex-row items-center border rounded-2xl px-4"
              >
                <MaterialIcons name="lock" size={20} color={theme.icon} />
                <TextInput
                  className="flex-1 ml-3 h-12 text-base"
                  style={{ color: theme.text }}
                  placeholder="Enter your password"
                  placeholderTextColor={theme.textMuted}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setPasswordError("");
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={20}
                    color={theme.icon}
                  />
                </TouchableOpacity>
              </ThemedView>
              {passwordError ? (
                <ThemedText themeColor="error" className="text-xs ml-1">
                  {passwordError}
                </ThemedText>
              ) : null}
            </View>

            {/* Confirm Password */}
            <View className="gap-1">
              <ThemedText type="smallBold" className="mb-1">
                Confirm Password
              </ThemedText>
              <ThemedView
                type="backgroundElement"
                style={{
                  borderColor: confirmPasswordError
                    ? theme.borderError
                    : theme.border,
                }}
                className="flex-row items-center border rounded-2xl px-4"
              >
                <MaterialIcons name="lock" size={20} color={theme.icon} />
                <TextInput
                  className="flex-1 ml-3 h-12 text-base"
                  style={{ color: theme.text }}
                  placeholder="Confirm your password"
                  placeholderTextColor={theme.textMuted}
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    setConfirmPasswordError("");
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <MaterialIcons
                    name={showConfirmPassword ? "visibility" : "visibility-off"}
                    size={20}
                    color={theme.icon}
                  />
                </TouchableOpacity>
              </ThemedView>
              {confirmPasswordError ? (
                <ThemedText themeColor="error" className="text-xs ml-1">
                  {confirmPasswordError}
                </ThemedText>
              ) : null}
            </View>

            {/* General Error */}
            {generalError ? (
              <ThemedText themeColor="error" className="text-xs ml-1">
                {generalError}
              </ThemedText>
            ) : null}

            {/* OR Divider */}
            <View className="flex-row items-center gap-3 my-2">
              <View
                style={{ backgroundColor: theme.divider }}
                className="flex-1 h-px"
              />
              <ThemedText type="small" themeColor="textMuted">
                Or Sign Up With
              </ThemedText>
              <View
                style={{ backgroundColor: theme.divider }}
                className="flex-1 h-px"
              />
            </View>

            {/* Google Button */}
            <TouchableOpacity
              style={{
                borderColor: theme.border,
                backgroundColor: theme.backgroundElement,
              }}
              className={`flex-row items-center justify-center border rounded-2xl py-3 ${
                loading ? "opacity-60" : "opacity-100"
              }`}
              onPress={signIn}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#4285F4" size="small" />
              ) : (
                <>
                  <Image
                    source={require("@/assets/new/googleIcon.png")}
                    className="w-5 h-5"
                    resizeMode="contain"
                  />
                  <ThemedText
                    type="small"
                    themeColor="textSecondary"
                    className="ml-2"
                  >
                    Continue with Google
                  </ThemedText>
                </>
              )}
            </TouchableOpacity>

            {/* Terms & Conditions */}
            <TouchableOpacity
              className="flex-row items-center mt-2"
              onPress={() => setTermsChecked((prev) => !prev)}
              activeOpacity={0.7}
            >
              <View
                style={{
                  backgroundColor: termsChecked
                    ? theme.primary
                    : theme.backgroundElement,
                  borderColor: termsChecked
                    ? theme.primary
                    : theme.borderStrong,
                }}
                className="w-5 h-5 rounded border items-center justify-center mr-3"
              >
                {termsChecked && (
                  <MaterialIcons name="check" size={14} color={theme.white} />
                )}
              </View>
              <ThemedText type="small" themeColor="textSecondary">
                I Accept{" "}
                <ThemedText
                  type="small"
                  themeColor="primary"
                  style={{ fontWeight: "600" }}
                >
                  Terms & Conditions
                </ThemedText>
              </ThemedText>
            </TouchableOpacity>

            {/* Create Account Button */}
            <TouchableOpacity
              style={{ backgroundColor: theme.black }}
              className={`rounded-full py-4 items-center justify-center mt-2 ${
                !termsChecked || isSubmitting ? "opacity-50" : "opacity-100"
              }`}
              onPress={handleManualSignup}
              disabled={!termsChecked || isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color={theme.white} size="small" />
              ) : (
                <ThemedText
                  type="default"
                  themeColor="textInverse"
                  style={{ fontWeight: "700" }}
                >
                  Create Account
                </ThemedText>
              )}
            </TouchableOpacity>

            {/* Sign In Link */}
            <View className="flex-row items-center justify-center mt-2">
              <ThemedText type="small" themeColor="textSecondary">
                Already have an account?{" "}
              </ThemedText>
              <TouchableOpacity onPress={() => router.push("/(auth)")}>
                <ThemedText type="smallBold" themeColor="primary">
                  Sign In
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
