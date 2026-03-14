import { ThemedView } from "@/components/themed-view";
import useGoogleSignIn from "@/hooks/useGoogleSignIn";
import { useRouter } from "expo-router";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../../firebaseConfig";

const height = Dimensions.get("window").height;

export default function Index() {
  const { signIn, loading } = useGoogleSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [isSendingReset, setIsSendingReset] = useState(false);

  const validateEmail = (value: string) => {
    return /\S+@\S+\.\S+/.test(value);
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
        Alert.alert(
          "Email Not Verified",
          "Please verify your email before signing in.",
        );
        setIsSubmitting(false);
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
      <View style={styles.formContainer}>
        <View style={{ gap: 5 }}>
          <Text style={styles.title}>Sign In With</Text>

          {/* Email Input Field */}
          <TextInput
            style={styles.input}
            placeholder="Email Address"
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

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError("");
              setGeneralError("");
            }}
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}

          {generalError ? (
            <Text style={styles.errorText}>{generalError}</Text>
          ) : null}

          <TouchableOpacity
            onPress={handleForgotPassword}
            disabled={isSendingReset}
            style={styles.forgotLinkWrap}
          >
            {isSendingReset ? (
              <ActivityIndicator size="small" color="#32CACD" />
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
            style={[
              styles.googleButton,
              loading && { opacity: 0.6 }, // Optional: dim the button when loading
            ]}
            onPress={signIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#4285F4" size="small" />
            ) : (
              <Image
                // source={require("@/assets/images/googleLogo.png")}
                style={styles.googleIcon}
              />
            )}
          </TouchableOpacity>
        </View>

        <View>
          {/* Next Button */}
          <TouchableOpacity
            style={[styles.nextButton]}
            onPress={handleManualLogin}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.nextButtonText}>Next</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  topLogo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    position: "relative",
    top: height * 0.055,
  },
  reactLogo: {
    alignSelf: "center",
    position: "relative",
    top: 65,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingTop: 10,
  },
  formContainer: {
    width: "100%",
    height: height * 0.6,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
    marginBottom: 3,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginTop: 5,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    paddingHorizontal: 10,
    color: "#666",
    fontSize: 14,
  },
  googleButton: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#32CACD",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  nextButton: {
    backgroundColor: "#000",
    width: "100%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
    marginBottom: 2,
    marginLeft: 2,
  },
  forgotLinkWrap: {
    alignSelf: "flex-start",
    marginTop: 6,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  forgotLinkText: {
    color: "#32CACD",
    fontSize: 14,
    fontWeight: "500",
  },
});
