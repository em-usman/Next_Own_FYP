import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const screens = [
  {
    id: 1,
    title: "Welcome to Next Own",
    //     image: require("../assets/images/NavigoGroupIcon.png"),
    buttonText: "Get Started",
    showDots: false,
    isStartScreen: true,
  },
  {
    id: 2,
    title: "Enable Location Access",
    description: "Allow location to get near",
    //     image: require("../assets/images/img1.png"),
    buttonText: "Allow",
    showDots: true,
    currentDot: 0,
  },
  {
    id: 3,
    title: "Easy and hustle free ride bookings",
    description:
      "Booking a ride is quick and straightforward, with just a few taps on your phone. No waiting, no confusion—just seamless travel planning at your fingertips.",
    //     image: require("../assets/images/img2.png"),
    buttonText: "Next",
    showDots: true,
    currentDot: 1,
  },
  {
    id: 4,
    title: "Book in Seconds",
    description:
      "No more waiting or calling — just tap and go.Our app makes ride booking simple and instant.Your time matters, and we keep things moving.",
    //     image: require("../assets/images/img3.png"),
    buttonText: "Next",
    showDots: true,
    currentDot: 2,
  },
  {
    id: 5,
    title: "Safety is our priority",
    description:
      "Your wellbeing comes first on every trip. All drivers are background-checked and vehicles are regularly inspected. With real-time tracking and support, you’re never alone on the road.",
    //     image: require("../assets/images/img4.png"),
    buttonText: "Next",
    showDots: true,
    currentDot: 3,
  },
  {
    id: 6,
    title: "Rides for Every Occasion",
    description:
      "Heading to work, a night out, or the airport? \nWe’ve got a ride that fits your schedule and style. Choose the ride that suits you best.",
    //     image: require("../assets/images/img5.png"),
    buttonText: "Next",
    showDots: true,
    currentDot: 4,
  },
];

const WelcomeScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const router = useRouter();

  const removeItemsFromAsyncStorage = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("userData");
  };

  // Preload images on mount
  //   useEffect(() => {
  //     removeItemsFromAsyncStorage();

  //     const loadImages = async () => {
  //       const imageAssets = screens.map((screen) =>
  //         Asset.loadAsync(screen.image),
  //       );
  //       await Promise.all(imageAssets);
  //       setIsImagesLoaded(true);
  //     };

  //     loadImages();
  //   }, []);

  const handleNext = async () => {
    if (currentIndex < screens.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  // Add a function to handle skip
  const handleSkip = () => {
    setCurrentIndex(screens.length - 1);
  };

  const currentScreen = screens[currentIndex];
  const isStartScreen = currentScreen.isStartScreen;

  // Render the dots for pagination
  const renderDots = () => {
    if (!currentScreen.showDots) return null;

    return (
      <View style={styles.dotsContainer}>
        {[0, 1, 2, 3, 4].map((dot) => (
          <View
            key={dot}
            style={[
              styles.dot,
              currentScreen.currentDot === dot
                ? styles.activeDot
                : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        isStartScreen ? styles.startScreenContainer : null,
      ]}
    >
      <StatusBar
        backgroundColor={isStartScreen ? "#03BABB" : "#FFFFFF"}
        barStyle={isStartScreen ? "light-content" : "dark-content"}
      />

      {isStartScreen ? (
        // First screen with centered logo and "Welcome to Navigo Ride" text
        <View style={styles.startScreenContent}>
          {/* <Image source={currentScreen.image} style={styles.logoLarge} /> */}
          <Text style={styles.startScreenTitle}>{currentScreen.title}</Text>
        </View>
      ) : (
        // Other onboarding screens
        <View style={styles.content}>
          {/* Logo at the top left corner for non-start screens */}
          <View style={styles.headerLogo}>
            <Image
              // source={require("../assets/images/NavigoLg.png")}
              style={styles.logo}
            />
          </View>

          {/* <Image source={currentScreen.image} style={styles.image} /> */}

          {renderDots()}

          <ScrollView style={styles.textContainer}>
            <Text style={styles.title}>{currentScreen.title}</Text>
            <Text style={styles.description}>{currentScreen.description}</Text>
          </ScrollView>
        </View>
      )}

      {/* Button at the bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            isStartScreen ? styles.startScreenButton : null,
          ]}
          onPress={handleNext}
        >
          <Text
            style={[
              styles.buttonText,
              isStartScreen ? styles.startScreenButtonText : null,
            ]}
          >
            {currentScreen.buttonText}
          </Text>
        </TouchableOpacity>

        {/* Add Skip button for screens 3,4,5 */}
        {(currentIndex === 2 || currentIndex === 3 || currentIndex === 4) && (
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  startScreenContainer: {
    backgroundColor: "#03BABB",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerLogo: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
  },
  startScreenContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logoLarge: {
    width: "50%",
    height: "80%",
    resizeMode: "contain",
    marginBottom: 20,
  },
  startScreenTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: "auto",
    marginBottom: 10,
    lineHeight: 40,
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: "contain",
    marginBottom: 20,
    marginTop: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: "#03BABB",
  },
  inactiveDot: {
    backgroundColor: "#FF5E77",
  },
  textContainer: {
    marginTop: "40%",
    paddingHorizontal: 24,
    marginBottom: "10%",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#141414",
    marginBottom: 16,
    lineHeight: 32,
  },
  description: {
    fontSize: 15,
    color: "#141414",
    lineHeight: 24,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    width: "100%",
    paddingBottom: 32,
    gap: 12,
  },
  button: {
    backgroundColor: "#03BABB",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#03BABB",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  startScreenButton: {
    backgroundColor: "#FFFFFF",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  startScreenButtonText: {
    color: "#03BABB",
  },
  skipText: {
    fontSize: 14,
    color: "#141414",
    textAlign: "center",
    marginTop: 8,
    fontWeight: "500",
  },
});
