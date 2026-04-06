import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import useGoogleSignIn from "@/hooks/useGoogleSignIn";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../../firebaseConfig";
const height = Dimensions.get("window").height;
const RESEND_COOLDOWN_SECONDS = 60;

export default function Index() {
  const theme = useTheme();
  const { signIn, loading } = useGoogleSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [isResendingVerification, setIsResendingVerification] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setTimeout(() => {
      setResendCooldown((previous) => previous - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const validateEmail = (value: string) => {
    return /\S+@\S+\.\S+/.test(value);
  };

  const handleResendVerification = async (user: User) => {
    if (isResendingVerification || resendCooldown > 0) return;

    try {
      setIsResendingVerification(true);
      await sendEmailVerification(user);
      setResendCooldown(RESEND_COOLDOWN_SECONDS);

      Alert.alert(
        "Verification email sent",
        "A new verification email was sent. Please use the latest verification link from your inbox.",
      );
    } catch (error: any) {
      if (error.code === "auth/too-many-requests") {
        setResendCooldown(RESEND_COOLDOWN_SECONDS);
        Alert.alert(
          "Too many requests",
          "Please wait a bit before requesting another verification email.",
        );
      } else {
        Alert.alert(
          "Resend failed",
          error.message || "Could not resend verification email.",
        );
      }
    } finally {
      try {
        await signOut(auth);
      } catch {
        // Ignore sign-out error here because we still need to keep the user on auth flow.
      }
      setIsResendingVerification(false);
    }
  };

  const handleForgotPassword = async () => {
    setEmailError("");
    setGeneralError("");

    if (!email) {
      setEmailError("Enter your e-mail first.");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid e-mail address.");
      return;
    }

    setIsSendingReset(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Reset e-mail sent",
        "We’ve sent a password-reset link to\n" + email,
        [{ text: "OK" }],
      );
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        /* Do NOT leak whether the address exists */
        Alert.alert(
          "Reset e-mail sent",
          "If an account exists with that address, you will receive a reset link.",
        );
      } else {
        setGeneralError(err.message || "Could not send reset e-mail.");
      }
    } finally {
      setIsSendingReset(false);
    }
  };

  const handleManualLogin = async () => {
    setEmailError("");
    setPasswordError("");
    setGeneralError("");
    setIsSubmitting(true);

    let valid = true;
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
    }
    if (!valid) {
      setIsSubmitting(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;
      console.log("Login successful:", user.uid);

      await user.reload();

      if (!user.emailVerified) {
        const canResend = !isResendingVerification && resendCooldown === 0;

        Alert.alert(
          "Email Not Verified",
          canResend
            ? "Please verify your email before signing in.\n\nDid not get the email? Tap Resend Email and use the latest link sent to your inbox."
            : `Please verify your email before signing in.\n\nYou can request another email in ${resendCooldown}s.`,
          [
            {
              text: canResend ? "Resend Email" : `Resend in ${resendCooldown}s`,
              onPress: () => {
                if (canResend) {
                  void handleResendVerification(user);
                } else {
                  void signOut(auth);
                }
              },
            },
            {
              text: "OK",
              style: "cancel",
              onPress: () => {
                void signOut(auth);
              },
            },
          ],
          { cancelable: false },
        );
        return;
      }

      // ❌ REMOVE THIS LINE - Firebase handles persistence automatically
      // await AsyncStorage.setItem("user", JSON.stringify(userCredential.user));

      // ✅ ADD: Wait a bit to ensure Firebase persistence completes
      console.log("Waiting for persistence...");
      await new Promise((resolve) => setTimeout(resolve, 300));

      console.log("Navigating to home...");
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error("Login error:", error);

      // Firebase error codes
      if (error.code === "auth/user-not-found") {
        setEmailError("No user found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setPasswordError("Incorrect password.");
      } else if (error.code === "auth/invalid-email") {
        setEmailError("Invalid email address.");
      } else if (error.code === "auth/invalid-credential") {
        setGeneralError("Invalid email or password.");
      } else if (error.code === "auth/too-many-requests") {
        setGeneralError("Too many attempts. Please try again later.");
      } else {
        setGeneralError(error.message || "Failed to sign in.");
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
              Login
            </ThemedText>
          </ThemedView>

          {/* Form Section */}
          <ThemedView className="flex-1 rounded-t-[40px] -mt-8 px-6 pt-8 pb-24 gap-4">
            {/* Email Field */}
            <View className="gap-1">
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
                    setGeneralError("");
                  }}
                />
              </ThemedView>
              {emailError ? (
                <ThemedText themeColor="error" className="text-xs ml-1">
                  {emailError}
                </ThemedText>
              ) : null}
            </View>

            {/* Password Field */}
            <View className="gap-1">
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
                    setGeneralError("");
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

            {/* General Error */}
            {generalError ? (
              <ThemedText themeColor="error" className="text-xs ml-1">
                {generalError}
              </ThemedText>
            ) : null}

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={handleForgotPassword}
              disabled={isSendingReset}
              className="items-end"
            >
              {isSendingReset ? (
                <ActivityIndicator size="small" color={theme.primary} />
              ) : (
                <ThemedText type="small" themeColor="primary">
                  Forget password?
                </ThemedText>
              )}
            </TouchableOpacity>

            {/* OR Divider */}
            <View className="flex-row items-center gap-3 my-2">
              <View
                style={{ backgroundColor: theme.divider }}
                className="flex-1 h-px"
              />
              <ThemedText type="small" themeColor="textMuted">
                Or Sign In With
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
                <ActivityIndicator color="#03BABB" size="small" />
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

            {/* Login Button */}
            <TouchableOpacity
              style={{ backgroundColor: theme.black }}
              className={`rounded-full py-4 items-center justify-center mt-2 ${
                isSubmitting ? "opacity-60" : "opacity-100"
              }`}
              onPress={handleManualLogin}
              disabled={isSubmitting || isResendingVerification}
            >
              {isSubmitting ? (
                <ActivityIndicator color={theme.white} />
              ) : (
                <ThemedText
                  type="default"
                  themeColor="textInverse"
                  style={{ fontWeight: "700" }}
                >
                  Login
                </ThemedText>
              )}
            </TouchableOpacity>

            {/* Sign Up Prompt */}
            <View className="flex-row items-center justify-center mt-2">
              <ThemedText type="small" themeColor="textSecondary">
                New user?{" "}
              </ThemedText>
              <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
                <ThemedText type="smallBold" themeColor="primary">
                  Signup
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
