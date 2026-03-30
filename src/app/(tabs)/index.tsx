import { ActivityIndicator, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { CategorySection } from "@/components/home/CategorySection";
import { CategorySlider } from "@/components/home/CategorySlider";
import { SearchBar } from "@/components/home/SearchBar";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import { useHomeCategorySections } from "@/hooks/useHomeCategorySections";

// function getDevMenuHint() {
//   if (Platform.OS === "web") {
//     return <ThemedText type="small">use browser devtools</ThemedText>;
//   }
//   if (Device.isDevice) {
//     return (
//       <ThemedText type="small">
//         shake device or press <ThemedText type="code">m</ThemedText> in terminal
//       </ThemedText>
//     );
//   }
//   const shortcut = Platform.OS === "android" ? "cmd+m (or ctrl+m)" : "cmd+d";
//   return (
//     <ThemedText type="small">
//       press <ThemedText type="code">{shortcut}</ThemedText>
//     </ThemedText>
//   );
// }

export default function HomeScreen() {
  const theme = useTheme();
  const { sections, isLoading, errorMessage } = useHomeCategorySections(5);
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => ({
    shadowOpacity: withTiming(scrollY.value > 10 ? 0.15 : 0, { duration: 200 }),
    elevation: scrollY.value > 10 ? 6 : 0,
  }));

  return (
    <ThemedView className="flex-1">
      {/* Fixed Header */}
      <Animated.View
        style={[
          headerStyle,
          {
            zIndex: 10,
            backgroundColor: theme.background,
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            paddingTop: 52,
          },
        ]}
      >
        <SearchBar />
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 12 }}
      >
        <CategorySlider />
        <View className="h-4" />
        {isLoading && (
          <View
            className="items-center justify-center"
            style={{ minHeight: 220 }}
          >
            <ActivityIndicator size="large" color={theme.primary} />
          </View>
        )}

        {!isLoading && !!errorMessage && (
          <View className="px-4 py-2">
            <ThemedText type="small" style={{ color: theme.error }}>
              {errorMessage}
            </ThemedText>
          </View>
        )}

        {!isLoading && !errorMessage && sections.length === 0 && (
          <View className="px-4 py-6 gap-2">
            <ThemedText type="subtitle">No active posts yet</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              New ads will appear here by category when users post them.
            </ThemedText>
          </View>
        )}

        {sections.map((section) => (
          <CategorySection
            key={section.categoryId}
            categoryId={section.categoryId}
            title={section.title}
            listings={section.listings}
          />
        ))}
      </Animated.ScrollView>
    </ThemedView>
  );
}
