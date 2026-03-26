import type { ChipsFieldOptionsMap } from "@/config/chipsOptions/types";

const CONDITION_OPTIONS = ["New", "Like New", "Used"];
const MATERIAL_OPTIONS = [
  "Wood",
  "Metal",
  "Plastic",
  "Fabric",
  "Glass",
  "Steel",
  "Ceramic",
  "Stainless Steel",
];

const FEATURES_OPTIONS = [
  "Durable",
  "Lightweight",
  "Waterproof",
  "Foldable",
  "Adjustable",
  "Stackable",
  "Compact",
  "Multi-purpose",
];

export const FURNITURE_HOME_DECOR_FIELD_OPTIONS_BY_SUBCATEGORY: Record<
  string,
  ChipsFieldOptionsMap
> = {
  "other-household-items": {
    type: [
      "Cabinets",
      "Charpai",
      "Cloth Stands",
      "Door Locks",
      "Drawers",
      "Dustbins",
      "Iron Stands",
      "Ladders",
      "Shelves",
      "Shoe Racks",
      "Showcases",
      "Storage & Organizers",
      "Tool Kits",
      "Water Tanks",
      "Kitchen Fittings",
      "Others",
    ],
    condition: CONDITION_OPTIONS,
    material: MATERIAL_OPTIONS,
    features: FEATURES_OPTIONS,
  },
  "home-diy-renovation": {
    type: [
      "Paint",
      "Wallpaper",
      "Tiles",
      "Flooring",
      "Hinges",
      "Handles",
      "Locks",
      "Nails",
      "Screws",
      "Adhesives",
      "Solvents",
      "Brushes & Rollers",
      "Sandpaper",
      "Grout",
      "Sealants",
      "Others",
    ],
    condition: CONDITION_OPTIONS,
    features: FEATURES_OPTIONS,
  },
};
