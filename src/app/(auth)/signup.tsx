import { ThemedView } from "@/components/themed-view";
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
import { auth, db } from "../../../firebaseConfig";

const height = Dimensions.get("window").height;

export default function SignupScreen() {
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

  const router = useRouter();
  const { expoPushToken } = usePushNotifications();

  const validateEmail = (value: string) => {
    return /\S+@\S+\.\S+/.test(value);
  };

  const validateFullName = (value: string) => {
    return /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/.test(value.trim());
  };

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
        [
          {
            text: "OK",
            onPress: () => router.replace("/(auth)"),
          },
        ],
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
          <View style={styles.formContainer}>
            <View style={{ gap: 12 }}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join us to start your journey</Text>

              {/* Full Name Input Field */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={[styles.input, fullNameError && styles.inputError]}
                  placeholder="Enter your full name"
                  placeholderTextColor="#999"
                  keyboardType="default"
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
                {fullNameError ? (
                  <Text style={styles.errorText}>{fullNameError}</Text>
                ) : null}
              </View>

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

              {/* Confirm Password Input Field with Eye Icon */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={[
                      styles.passwordInput,
                      confirmPasswordError && styles.inputError,
                    ]}
                    placeholder="Confirm your password"
                    placeholderTextColor="#999"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={(text) => {
                      setConfirmPassword(text);
                      setConfirmPasswordError("");
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeIcon}
                  >
                    <MaterialIcons
                      name={
                        showConfirmPassword ? "visibility" : "visibility-off"
                      }
                      size={20}
                      color="#60646C"
                    />
                  </TouchableOpacity>
                </View>
                {confirmPasswordError ? (
                  <Text style={styles.errorText}>{confirmPasswordError}</Text>
                ) : null}
              </View>

              {generalError ? (
                <Text style={styles.errorText}>{generalError}</Text>
              ) : null}

              {/* OR Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>Or Sign Up With</Text>
                <View style={styles.divider} />
              </View>

              {/* Google Sign Up Button */}
              <TouchableOpacity
                style={styles.googleButton}
                onPress={signIn}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#4285F4" size="small" />
                ) : (
                  <>
                    <Image
                      // source={require("@/assets/images/googleLogo.png")}
                      style={styles.googleIcon}
                    />
                    <Text style={styles.googleButtonText}>Google</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            {/* Terms & Conditions Clickable Container */}
            <TouchableOpacity
              style={styles.termsContainer}
              onPress={() => setTermsChecked((prev) => !prev)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.checkbox,
                  termsChecked && {
                    backgroundColor: "#0A66D9",
                    borderColor: "#0A66D9",
                  },
                ]}
              >
                {termsChecked && (
                  <MaterialIcons name="check" size={16} color="#fff" />
                )}
              </View>
              <Text style={styles.termsText}>
                I Accept{" "}
                <Text style={styles.highlightedText}>Terms & Conditions</Text>
              </Text>
            </TouchableOpacity>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[
                styles.signupButton,
                !termsChecked && styles.buttonDisabled,
              ]}
              onPress={handleManualSignup}
              disabled={!termsChecked}
            >
              <Text style={styles.signupButtonText}>Create Account</Text>
            </TouchableOpacity>

            {/* Sign In Link */}
            <View style={styles.signinPrompt}>
              <Text style={styles.signinText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)")}>
                <Text style={styles.signinLink}>Sign In</Text>
              </TouchableOpacity>
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
    backgroundColor: "#FFFFFF",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#60646C",
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#D1D1D6",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000000",
    backgroundColor: "#F8F8F9",
  },
  inputError: {
    borderColor: "#FF3B30",
    backgroundColor: "#FFE5E1",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D1D6",
    borderRadius: 10,
    backgroundColor: "#F8F8F9",
    paddingRight: 12,
  },
  passwordInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000000",
  },
  eyeIcon: {
    padding: 8,
  },
  errorText: {
    fontSize: 12,
    color: "#FF3B30",
    marginTop: 6,
    fontWeight: "500",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#D1D1D6",
  },
  dividerText: {
    paddingHorizontal: 12,
    color: "#60646C",
    fontSize: 13,
    fontWeight: "500",
  },
  googleButton: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#D1D1D6",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F9",
    flexDirection: "row",
    gap: 8,
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  googleButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 12,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: "#D1D1D6",
    borderRadius: 4,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F9",
  },
  termsText: {
    fontSize: 14,
    color: "#60646C",
  },
  highlightedText: {
    color: "#0A66D9",
    fontWeight: "600",
  },
  signupButton: {
    backgroundColor: "#0A66D9",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0A66D9",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  signinPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signinText: {
    fontSize: 14,
    color: "#60646C",
  },
  signinLink: {
    fontSize: 14,
    color: "#0A66D9",
    fontWeight: "600",
  },
});
