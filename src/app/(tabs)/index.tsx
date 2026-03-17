import { View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { CategorySection } from "@/components/home/CategorySection";
import { CategorySlider } from "@/components/home/CategorySlider";
import { SearchBar } from "@/components/home/SearchBar";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import type { Listing } from "@/types/listing";

const mobileCategoryImage = require("../../../assets/categories/mobile.png");

const MOBILE_LISTINGS: Listing[] = [
  {
    id: "m1",
    title: "Honor 400 Pro 12GB 512GB",
    price: "Rs 1.6 Lacs",
    location: "Baizo Kharki, Malakand",
    timeAgo: "1 day ago",
    description:
      "Brand new Honor 400 Pro in excellent condition. Box packed with all accessories included. Serious buyers only.",
    brand: "Honor",
    model: "400 Pro",
    color: "Silver",
    condition: "New",
    category: "Mobiles",
    sellerName: "Ali Khan",
    sellerPhone: "+92 300 1234567",
    image: mobileCategoryImage,
    isFeatured: true,
  },
  {
    id: "m2",
    title: "Honor 400 Pro 12GB 512GB",
    price: "Rs 1.6 Lacs",
    location: "Baizo Kharki, Malakand",
    timeAgo: "1 day ago",
    description:
      "Brand new Honor 400 Pro in excellent condition. Box packed with all accessories included. Serious buyers only.",
    brand: "Honor",
    model: "400 Pro",
    color: "Silver",
    condition: "New",
    category: "Mobiles",
    sellerName: "Ali Khan",
    sellerPhone: "+92 300 1234567",
    image: mobileCategoryImage,
    isFeatured: true,
  },
  {
    id: "m3",
    title: "Honor 400 Pro 12GB 512GB",
    price: "Rs 1.6 Lacs",
    location: "Baizo Kharki, Malakand",
    timeAgo: "1 day ago",
    description:
      "Brand new Honor 400 Pro in excellent condition. Box packed with all accessories included. Serious buyers only.",
    brand: "Honor",
    model: "400 Pro",
    color: "Silver",
    condition: "New",
    category: "Mobiles",
    sellerName: "Ali Khan",
    sellerPhone: "+92 300 1234567",
    image: mobileCategoryImage,
  },
  {
    id: "m4",
    title: "Honor 400 Pro 12GB 512GB",
    price: "Rs 1.6 Lacs",
    location: "Baizo Kharki, Malakand",
    timeAgo: "1 day ago",
    description:
      "Brand new Honor 400 Pro in excellent condition. Box packed with all accessories included. Serious buyers only.",
    brand: "Honor",
    model: "400 Pro",
    color: "Silver",
    condition: "New",
    category: "Mobiles",
    sellerName: "Ali Khan",
    sellerPhone: "+92 300 1234567",
    image: mobileCategoryImage,
  },
];

const CAR_LISTINGS: Listing[] = [
  {
    id: "c1",
    title: "Google Pixel 6 Pro",
    price: "Rs 54,000",
    location: "Federal B Area, Karachi",
    timeAgo: "1 day ago",
    description:
      "Used Google Pixel 6 Pro in good condition. Minor scratches on back. All functions working perfectly.",
    brand: "Google",
    model: "Pixel 6 Pro",
    color: "Black",
    condition: "Used",
    category: "Mobiles",
    sellerName: "Usman Raza",
    sellerPhone: "+92 311 9876543",
    image: mobileCategoryImage,
    isFeatured: true,
  },
  {
    id: "c2",
    title: "Google Pixel 6 Pro",
    price: "Rs 54,000",
    location: "Federal B Area, Karachi",
    timeAgo: "1 day ago",
    description:
      "Used Google Pixel 6 Pro in good condition. Minor scratches on back. All functions working perfectly.",
    brand: "Google",
    model: "Pixel 6 Pro",
    color: "Black",
    condition: "Used",
    category: "Mobiles",
    sellerName: "Usman Raza",
    sellerPhone: "+92 311 9876543",
    image: mobileCategoryImage,
    isFeatured: true,
  },
  {
    id: "c3",
    title: "Google Pixel 6 Pro",
    price: "Rs 54,000",
    location: "Federal B Area, Karachi",
    timeAgo: "1 day ago",
    description:
      "Used Google Pixel 6 Pro in good condition. Minor scratches on back. All functions working perfectly.",
    brand: "Google",
    model: "Pixel 6 Pro",
    color: "Black",
    condition: "Used",
    category: "Mobiles",
    sellerName: "Usman Raza",
    sellerPhone: "+92 311 9876543",
    image: mobileCategoryImage,
  },
  {
    id: "c4",
    title: "Google Pixel 6 Pro",
    price: "Rs 54,000",
    location: "Federal B Area, Karachi",
    timeAgo: "1 day ago",
    description:
      "Used Google Pixel 6 Pro in good condition. Minor scratches on back. All functions working perfectly.",
    brand: "Google",
    model: "Pixel 6 Pro",
    color: "Black",
    condition: "Used",
    category: "Mobiles",
    sellerName: "Usman Raza",
    sellerPhone: "+92 311 9876543",
    image: mobileCategoryImage,
  },
];

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
            shadowColor: "#000",
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
        <CategorySection
          title="Mobile Phones"
          categoryHref="/category/mobiles"
          listings={MOBILE_LISTINGS}
        />
        <CategorySection
          title="Cars"
          categoryHref="/category/vehicles"
          listings={CAR_LISTINGS}
        />
      </Animated.ScrollView>
    </ThemedView>
  );
}
