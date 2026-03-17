import { router } from "expo-router";
import { FlatList, Image, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
const mobileCategoryImage = require("../../../assets/categories/mobile.png");
export type Category = {
  id: string;
  label: string;
  image: any;
  href: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "mobiles",
    label: "Mobiles",
    image: mobileCategoryImage,
    href: "/category/mobiles",
  },
  {
    id: "vehicles",
    label: "Vehicles",
    image: mobileCategoryImage,
    href: "/category/vehicles",
  },
  {
    id: "property-sale",
    label: "Property for Sale",
    image: mobileCategoryImage,
    href: "/category/property-sale",
  },
  {
    id: "property-rent",
    label: "Property for Rent",
    image: mobileCategoryImage,
    href: "/category/property-rent",
  },
  {
    id: "electronics",
    label: "Electro & Home",
    image: mobileCategoryImage,
    href: "/category/electronics",
  },
  {
    id: "services",
    label: "Services",
    image: mobileCategoryImage,
    href: "/category/services",
  },
  {
    id: "jobs",
    label: "Jobs",
    image: mobileCategoryImage,
    href: "/category/jobs",
  },
  {
    id: "animals",
    label: "Animals",
    image: mobileCategoryImage,
    href: "/category/animals",
  },
  {
    id: "furniture",
    label: "Furniture & Decor",
    image: mobileCategoryImage,
    href: "/category/furniture",
  },
  {
    id: "fashion",
    label: "Fashion",
    image: mobileCategoryImage,
    href: "/category/fashion",
  },
];

export function CategorySlider() {
  const theme = useTheme();

  return (
    <FlatList
      data={CATEGORIES}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        paddingHorizontal: 16,
        gap: 12,
        paddingVertical: 8,
      }}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="items-center gap-1.5"
          style={{ width: 72 }}
          onPress={() => router.push(item.href as any)}
        >
          <View
            className="w-14 h-14 rounded-2xl items-center justify-center overflow-hidden border"
            style={{
              backgroundColor: theme.backgroundElement,
              borderColor: theme.border,
            }}
          >
            <Image
              source={item.image}
              className="w-10 h-10"
              resizeMode="contain"
            />
          </View>
          <ThemedText
            type="small"
            themeColor="textSecondary"
            className="text-center"
            style={{ fontSize: 11 }}
            numberOfLines={2}
          >
            {item.label}
          </ThemedText>
        </TouchableOpacity>
      )}
    />
  );
}
