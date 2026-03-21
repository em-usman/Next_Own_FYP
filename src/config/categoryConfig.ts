export type SubCategory = {
  id: string;
  label: string;
  icon: string;
  children?: SubCategory[];
};

export type CategoryData = {
  id: string;
  label: string;
  icon: string;
  subCategories: SubCategory[];
};

export const CATEGORIES: CategoryData[] = [
  {
    id: "mobiles",
    label: "Mobiles",
    icon: "phone-portrait-outline",
    subCategories: [
      { id: "mobile-phones", label: "Mobile Phones", icon: "phone-portrait-outline" },
      { id: "tablets", label: "Tablets", icon: "tablet-portrait-outline" },
      { id: "accessories", label: "Accessories", icon: "headset-outline" },
    ],
  },
  {
    id: "cars",
    label: "Cars",
    icon: "car-sport-outline",
    subCategories: [
      { id: "used-cars", label: "Used Cars", icon: "car-outline" },
      { id: "new-cars", label: "New Cars", icon: "car-sport-outline" },
      { id: "car-accessories", label: "Car Accessories", icon: "construct-outline" },
    ],
  },
  {
    id: "bikes",
    label: "Bikes & Motorcycles",
    icon: "bicycle-outline",
    subCategories: [
      { id: "motorcycles", label: "Motorcycles", icon: "bicycle-outline" },
      { id: "bicycles", label: "Bicycles", icon: "bicycle" },
      { id: "bike-accessories", label: "Accessories", icon: "build-outline" },
    ],
  },
  {
    id: "electronics",
    label: "Electronics & Appliances",
    icon: "tv-outline",
    subCategories: [
      { id: "computers", label: "Computers & Laptops", icon: "laptop-outline" },
      { id: "tvs", label: "TVs & Video", icon: "tv-outline" },
      { id: "cameras", label: "Cameras & Lenses", icon: "camera-outline" },
    ],
  },
];
