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
  { id: "mobiles", label: "Mobiles", image: mobile, href: "/category/mobiles" },
  { id: "vehicles", label: "Vehicles", image: vehicle, href: "/category/vehicles" },
  { id: "property-for-sale", label: "For Sale", image: saleProperty, href: "/category/property-for-sale" },
  { id: "property-for-rent", label: "For Rent", image: rentProperty, href: "/category/property-for-rent" },
  { id: "services", label: "Services", image: service, href: "/category/services" },
  { id: "electronics-home-appliances", label: "Electronics", image: electronics, href: "/category/electronics-home-appliances" },
  { id: "bike", label: "Bikes", image: bike, href: "/category/bike" },
  { id: "business-industries-agriculture", label: "Business", image: business, href: "/category/business-industries-agriculture" },
  { id: "jobs", label: "Jobs", image: job, href: "/category/jobs" },
  { id: "furniture-home-decor", label: "Furniture", image: furniture, href: "/category/furniture-home-decor" },
  { id: "fashion-beauty", label: "Fashion", image: fashion, href: "/category/fashion-beauty" },
  { id: "books-sports-hobbies", label: "Books", image: book, href: "/category/books-sports-hobbies" },
  { id: "animals", label: "Animals", image: animal, href: "/category/animals" },
  { id: "kids", label: "Kids", image: kid, href: "/category/kids" },
];

export function CategorySlider() {
  const theme = useTheme();

  return (
    <FlatList
      data={CATEGORIES}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 10, paddingVertical: 4 }}
      removeClippedSubviews={false}
      scrollEventThrottle={16}
      initialNumToRender={7}
      maxToRenderPerBatch={10}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{ alignItems: "center", gap: 6, width: 68 }}
          onPress={() => router.push(item.href as any)}
          activeOpacity={0.75}
        >
          <View
            style={{
              width: 58,
              height: 58,
              borderRadius: 18,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.backgroundSelected,
              borderWidth: 1.5,
              borderColor: theme.border,
              shadowColor: theme.primary,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Image source={item.image} style={{ width: 34, height: 34 }} resizeMode="contain" />
          </View>
          <ThemedText
            themeColor="textSecondary"
            style={{ fontSize: 11, fontWeight: "500", textAlign: "center" }}
            numberOfLines={1}
          >
            {item.label}
          </ThemedText>
        </TouchableOpacity>
      )}
    />
  );
}
