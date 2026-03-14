import { ThemedView } from "@/components/themed-view";
import useGoogleSignIn from "@/hooks/useGoogleSignIn";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
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
      setFullNameError("Full name can contain only letters (A-Z). ");
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
        email,
        password,
      );
      const user = userCredential.user;

      await sendEmailVerification(user).then(() => {
        Alert.alert(
          "Verify your email",
          "A verification link has been sent to your inbox. Please verify before logging in.",
        );
      });

      await setDoc(doc(db, "users", user.uid), {
        fullName: fullName || "",
        email: user.email || "",
        displayName: user.displayName || "",
        phoneNumber: user.phoneNumber || "",
        imageUri: user.photoURL || "",
        expoPushToken: expoPushToken?.data || null,
        createdAt: new Date().toISOString(),
      });

      router.replace("/(auth)");
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

    setConfirmPassword("");
    setEmail("");
    setPassword("");
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={{ gap: 5 }}>
          <Text style={styles.title}>Sign Up With</Text>

          {/* Full Name Input Field */}
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#999"
            keyboardType="default"
            autoCapitalize="words"
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              if (!text.trim()) {
                setFullNameError("Full name is required.");
              } else if (!validateFullName(text)) {
                setFullNameError("Full name can contain only letters (A-Z).");
              } else {
                setFullNameError("");
              }
            }}
          />
          {fullNameError ? (
            <Text style={styles.errorText}>{fullNameError}</Text>
          ) : null}

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
            }}
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setConfirmPasswordError("");
            }}
          />
          {confirmPasswordError ? (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          ) : null}

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
            {" "}
            <Image
              // source={require("@/assets/images/googleLogo.png")}
              style={styles.googleIcon}
            />
          </TouchableOpacity>
        </View>
        <View>
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
                  backgroundColor: "#000",
                  borderColor: "#000",
                },
              ]}
            >
              {termsChecked && (
                <MaterialIcons name="check" size={16} color="#fff" />
              )}
            </View>
            <Text style={styles.termsText}>
              Accept{" "}
              <Text style={styles.highlightedText}>Terms & Conditions</Text>
            </Text>
          </TouchableOpacity>
          {/* Next Button */}
          <TouchableOpacity
            style={[
              styles.nextButton,
              !termsChecked && { backgroundColor: "#ccc" },
            ]}
            onPress={handleManualSignup}
            disabled={!termsChecked}
          >
            <Text style={styles.nextButtonText}>Next</Text>
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
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  termsText: {
    fontSize: 14,
    color: "#666",
  },
  highlightedText: {
    color: "#2377CF",
  },
  nextButton: {
    backgroundColor: "#000",
    width: "100%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
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
});
