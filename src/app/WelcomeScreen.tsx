import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  Keyframe,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
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

// Enhanced animation keyframes
const emojiBounceKeyframe = new Keyframe({
  0: {
    transform: [{ scale: 0 }, { rotateZ: "-45deg" }],
    opacity: 0,
  },
  60: {
    transform: [{ scale: 1.25 }, { rotateZ: "0deg" }],
    opacity: 1,
  },
  100: {
    transform: [{ scale: 1 }, { rotateZ: "0deg" }],
    opacity: 1,
  },
});

const titleSlideKeyframe = new Keyframe({
  0: {
    transform: [{ translateY: 60 }],
    opacity: 0,
  },
  100: {
    transform: [{ translateY: 0 }],
    opacity: 1,
  },
});

const descriptionFadeKeyframe = new Keyframe({
  0: {
    opacity: 0,
    transform: [{ translateY: 40 }],
  },
  100: {
    opacity: 1,
    transform: [{ translateY: 0 }],
  },
});

const buttonPressKeyframe = new Keyframe({
  0: {
    transform: [{ scale: 0.75 }],
    opacity: 0,
  },
  70: {
    transform: [{ scale: 1.08 }],
  },
  100: {
    transform: [{ scale: 1 }],
    opacity: 1,
  },
});

const skipFadeKeyframe = new Keyframe({
  0: {
    opacity: 0,
    transform: [{ translateY: -15 }],
  },
  100: {
    opacity: 1,
    transform: [{ translateY: 0 }],
  },
});

const slideContainerKeyframe = new Keyframe({
  0: {
    opacity: 0.7,
    transform: [{ translateX: 100 }],
  },
  100: {
    opacity: 1,
    transform: [{ translateX: 0 }],
  },
});

export default function WelcomeScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatRef = useRef<FlatList>(null);
  const [key, setKey] = useState(0);
  const pulseScale = useSharedValue(1);

  // Pulse animation effect
  React.useEffect(() => {
    pulseScale.value = withRepeat(
      withTiming(1.15, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, []);

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  function handleNext() {
    if (activeIndex < SLIDES.length - 1) {
      const next = activeIndex + 1;
      flatRef.current?.scrollToIndex({ index: next, animated: true });
      setActiveIndex(next);
      setKey((prev) => prev + 1);
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

      {/* Skip Button with Animation */}
      {!isLast && (
        <Animated.View
          entering={skipFadeKeyframe.duration(600).delay(700)}
          layout={LinearTransition.springify()}
        >
          <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </Animated.View>
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
          <Animated.View
            key={`slide-${item.id}-${key}`}
            entering={slideContainerKeyframe.duration(700)}
            style={[
              styles.slideContainer,
              {
                width,
              },
            ]}
          >
            {/* Emoji bubble with pulse effect wrapper */}
            <View style={styles.emojiBubbleWrapper}>
              {/* Animated Emoji */}
              <Animated.View
                style={styles.emojiBubble}
                entering={emojiBounceKeyframe.duration(800)}
              >
                <Text style={styles.emoji}>{item.emoji}</Text>
              </Animated.View>

              {/* Pulsing Ring Effect */}
              <Animated.View style={[styles.pulseRing, pulseAnimatedStyle]} />
            </View>

            {/* Title with Animation */}
            <Animated.Text
              style={styles.title}
              entering={titleSlideKeyframe.duration(900).delay(150)}
            >
              {item.title}
            </Animated.Text>

            {/* Description with Animation */}
            <Animated.Text
              style={styles.description}
              entering={descriptionFadeKeyframe.duration(900).delay(350)}
            >
              {item.description}
            </Animated.Text>
          </Animated.View>
        )}
      />

      {/* Animated Dots */}
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              i === activeIndex ? styles.dotActive : styles.dotInactive,
            ]}
            layout={LinearTransition.springify().damping(80)}
          />
        ))}
      </View>

      {/* Animated Button */}
      <View style={styles.btnContainer}>
        <Animated.View
          entering={buttonPressKeyframe.duration(900).delay(550)}
          layout={LinearTransition.springify()}
        >
          <TouchableOpacity
            style={styles.btn}
            onPress={handleNext}
            activeOpacity={0.7}
          >
            <Text style={styles.btnText}>
              {isLast ? "Get Started" : "Next"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
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
    marginBottom: 10,
  },
  skipText: {
    fontSize: 14,
    color: DARK,
    fontWeight: "600",
    opacity: 0.6,
  },
  slideContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 36,
  },
  emojiBubbleWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  emojiBubble: {
    width: 130,
    height: 130,
    borderRadius: 45,
    backgroundColor: `rgba(0,153,168,0.12)`,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: `rgba(0,153,168,0.25)`,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 5,
  },
  pulseRing: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: `rgba(0,153,168,0.4)`,
    backgroundColor: "transparent",
  },
  emoji: {
    fontSize: 64,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: DARK,
    textAlign: "center",
    lineHeight: 42,
    marginBottom: 20,
    letterSpacing: -0.6,
  },
  description: {
    fontSize: 16,
    color: "#5A7280",
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 20,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 32,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 32,
    backgroundColor: PRIMARY,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  dotInactive: {
    width: 8,
    backgroundColor: `rgba(0,153,168,0.3)`,
  },
  btnContainer: {
    paddingHorizontal: 24,
    paddingBottom: 28,
  },
  btn: {
    backgroundColor: PRIMARY,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  btnText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
});
