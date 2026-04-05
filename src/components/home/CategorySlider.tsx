import { router } from "expo-router";
import { FlatList, Image, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";
const mobile = require("../../../assets/categories/mobileIcon.webp");
const vehicle = require("../../../assets/categories/vehicleIcon.webp");
const rentProperty = require("../../../assets/categories/rentPropertyIcon.webp");
const saleProperty = require("../../../assets/categories/salePropertyIcon.webp");
const service = require("../../../assets/categories/serviceIcon.webp");
const electronics = require("../../../assets/categories/electronicsIcon.webp");
const business = require("../../../assets/categories/businessIcon.webp");
const bike = require("../../../assets/categories/bikeIcon.webp");
const job = require("../../../assets/categories/jobIcon.webp");
const furniture = require("../../../assets/categories/furnitureIcon.webp");
const fashion = require("../../../assets/categories/fashionBeautyIcon.webp");
const book = require("../../../assets/categories/booksIcon.webp");
const kid = require("../../../assets/categories/kidIcon.webp");
const animal = require("../../../assets/categories/animalIcon.webp");

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
    image: mobile,
    href: "/category/mobiles",
  },
  {
    id: "vehicles",
    label: "Vehicles",
    image: vehicle,
    href: "/category/vehicles",
  },
  {
    id: "property-for-sale",
    label: "Property for Sale",
    image: saleProperty,
    href: "/category/property-for-sale",
  },
  {
    id: "property-for-rent",
    label: "Property for Rent",
    image: rentProperty,
    href: "/category/property-for-rent",
  },
  {
    id: "services",
    label: "Services",
    image: service,
    href: "/category/services",
  },
  {
    id: "electronics-home-appliances",
    label: "Electro & Home Appliances",
    image: electronics,
    href: "/category/electronics-home-appliances",
  },
  {
    id: "bike",
    label: "Bikes",
    image: bike,
    href: "/category/bike",
  },
  {
    id: "business-industries-agriculture",
    label: "Business, Industry & Agriculture",
    image: business,
    href: "/category/business-industries-agriculture",
  },
  {
    id: "jobs",
    label: "Jobs",
    image: job,
    href: "/category/jobs",
  },
  {
    id: "furniture-home-decor",
    label: "Furniture & Decor",
    image: furniture,
    href: "/category/furniture-home-decor",
  },
  {
    id: "fashion-beauty",
    label: "Fashion & Beauty",
    image: fashion,
    href: "/category/fashion-beauty",
  },
  {
    id: "books-sports-hobbies",
    label: "Books, Sports & Hobbies",
    image: book,
    href: "/category/books-sports-hobbies",
  },
  {
    id: "animals",
    label: "Animals",
    image: animal,
    href: "/category/animals",
  },
  {
    id: "kids",
    label: "Kids & Toys",
    image: kid,
    href: "/category/kids",
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
      removeClippedSubviews={false}
      scrollEventThrottle={16}
      initialNumToRender={6}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
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
