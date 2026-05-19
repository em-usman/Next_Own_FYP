import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const SLIDES = [
  {
    id: "1",
    emoji: "🛍️",
    title: "Buy & Sell\nWith Ease",
    description:
      "Discover thousands of listings near you. Find great deals on mobiles, cars, property, and more.",
  },
  {
    id: "2",
    emoji: "📍",
    title: "Local Deals\nNear You",
    description:
      "Browse ads in your city or neighbourhood. Connect with buyers and sellers just around the corner.",
  },
  {
    id: "3",
    emoji: "⚡",
    title: "Post Your Ad\nIn Seconds",
    description:
      "Selling is simple. Add photos, set your price, and reach thousands of buyers instantly.",
  },
];

const PRIMARY = "#0099A8";
const DARK = "#0D1B2A";

export default function WelcomeScreen({ onComplete }: { onComplete: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatRef = useRef<FlatList>(null);
  const router = useRouter();

  function handleNext() {
    if (activeIndex < SLIDES.length - 1) {
      const next = activeIndex + 1;
      flatRef.current?.scrollToIndex({ index: next, animated: true });
      setActiveIndex(next);
    } else {
      onComplete();
    }
  }

  function handleSkip() {
    onComplete();
  }

  const isLast = activeIndex === SLIDES.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={PRIMARY} barStyle="light-content" />

      {/* Skip */}
      {!isLast && (
        <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Slides */}
      <FlatList
        ref={flatRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ width, flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 36 }}>
            {/* Emoji bubble */}
            <View style={styles.emojiBubble}>
              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>

            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />

      {/* Dots */}
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === activeIndex ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>

      {/* Button */}
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={handleNext} activeOpacity={0.85}>
          <Text style={styles.btnText}>
            {isLast ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  skipBtn: {
    alignSelf: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  skipText: {
    fontSize: 14,
    color: DARK,
    fontWeight: "500",
    opacity: 0.5,
  },
  emojiBubble: {
    width: 120,
    height: 120,
    borderRadius: 40,
    backgroundColor: `rgba(0,153,168,0.1)`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    borderWidth: 1.5,
    borderColor: `rgba(0,153,168,0.2)`,
  },
  emoji: {
    fontSize: 56,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: DARK,
    textAlign: "center",
    lineHeight: 40,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 16,
    color: "#4D6575",
    textAlign: "center",
    lineHeight: 26,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 28,
    backgroundColor: PRIMARY,
  },
  dotInactive: {
    width: 8,
    backgroundColor: `rgba(0,153,168,0.25)`,
  },
  btnContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  btn: {
    backgroundColor: PRIMARY,
    borderRadius: 18,
    paddingVertical: 17,
    alignItems: "center",
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  btnText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
});
