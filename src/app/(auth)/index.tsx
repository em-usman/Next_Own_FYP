import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
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
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../../firebaseConfig";

const height = Dimensions.get("window").height;
const RESEND_COOLDOWN_SECONDS = 60;

export default function Index() {
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
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/new/splash-icon.png")}
              style={styles.logo}
            />
          </View>
          <View style={styles.formContainer}>
            <View style={{ gap: 12 }}>
              {/* Email Input Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={[styles.input, emailError && styles.inputError]}
                  placeholder="Enter your email"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setEmailError("");
                    setGeneralError("");
                  }}
                />
                {emailError ? (
                  <Text style={styles.errorText}>{emailError}</Text>
                ) : null}
              </View>

              {/* Password Input Field with Eye Icon */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={[
                      styles.passwordInput,
                      passwordError && styles.inputError,
                    ]}
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
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
                    style={styles.eyeIcon}
                  >
                    <MaterialIcons
                      name={showPassword ? "visibility" : "visibility-off"}
                      size={20}
                      color="#60646C"
                    />
                  </TouchableOpacity>
                </View>
                {passwordError ? (
                  <Text style={styles.errorText}>{passwordError}</Text>
                ) : null}
              </View>

              {generalError ? (
                <Text style={styles.errorText}>{generalError}</Text>
              ) : null}

              <TouchableOpacity
                onPress={handleForgotPassword}
                disabled={isSendingReset}
                style={styles.forgotLinkWrap}
              >
                {isSendingReset ? (
                  <ActivityIndicator size="small" color="#0A66D9" />
                ) : (
                  <Text style={styles.forgotLinkText}>Forgot password?</Text>
                )}
              </TouchableOpacity>

              {/* OR Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>Or Sign In With</Text>
                <View style={styles.divider} />
              </View>

              {/* Google Sign In Button */}
              <TouchableOpacity
                style={[styles.googleButton, loading && { opacity: 0.6 }]}
                onPress={signIn}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#4285F4" size="small" />
                ) : (
                  <Image
                    source={require("@/assets/new/googleIcon.png")}
                    style={styles.googleIcon}
                  />
                )}
              </TouchableOpacity>

              {/* Sign In Button */}
              <TouchableOpacity
                style={[
                  styles.nextButton,
                  isSubmitting && styles.buttonDisabled,
                ]}
                onPress={handleManualLogin}
                disabled={isSubmitting || isResendingVerification}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.nextButtonText}>Sign In</Text>
                )}
              </TouchableOpacity>

              {/* Sign Up Prompt */}
              <View style={styles.signupPrompt}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
                  <Text style={styles.signupLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: Colors.light.background,
  },
  logoContainer: {
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: Colors.light.black,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 100,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.light.text,
    backgroundColor: Colors.light.inputBackground,
  },
  inputError: {
    borderColor: Colors.light.error,
    backgroundColor: Colors.light.errorBackground,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 10,
    backgroundColor: Colors.light.inputBackground,
    paddingRight: 12,
  },
  passwordInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.light.text,
  },
  eyeIcon: {
    padding: 8,
  },
  errorText: {
    fontSize: 12,
    color: Colors.light.error,
    marginTop: 6,
    fontWeight: "500",
  },
  forgotLinkWrap: {
    alignSelf: "flex-end",
    paddingVertical: 8,
  },
  forgotLinkText: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.light.divider,
  },
  dividerText: {
    paddingHorizontal: 12,
    color: Colors.light.textSecondary,
    fontSize: 13,
    fontWeight: "500",
  },
  googleButton: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.inputBackground,
  },
  googleIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  nextButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.light.primary,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.background,
  },
  signupPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  signupLink: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: "600",
  },
});
