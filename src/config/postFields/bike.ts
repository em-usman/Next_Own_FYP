import type { Field } from "@/config/postFields/types";

const COMMON_BIKE_VEHICLE_FIELDS: Field[] = [
  { key: "make", label: "Make", type: "select", required: true },
  {
    key: "year",
    label: "Year",
    type: "number",
    required: true,
    placeholder: "e.g. 2021",
  },
  {
    key: "km_driven",
    label: "KM's driven",
    type: "number",
    required: true,
    placeholder: "e.g. 12000",
  },
  { key: "fuel_type", label: "Fuel Type", type: "chips" },
  { key: "engine_type", label: "Engine Type", type: "chips", required: true },
  {
    key: "engine_capacity",
    label: "Engine Capacity",
    type: "select",
    required: true,
  },
  { key: "registration_city", label: "Registration City", type: "select" },
  { key: "condition", label: "Condition", type: "chips", required: true },
];

const COMMON_BIKE_ACCESSORY_FIELDS: Field[] = [
  { key: "type", label: "Type", type: "select", required: true },
  { key: "condition", label: "Condition", type: "chips", required: true },
  { key: "brand", label: "Brand", type: "text" },
  { key: "material", label: "Material", type: "select" },
  { key: "compatible_with", label: "Compatible With", type: "select" },
  { key: "features", label: "Features", type: "multi-select" },
];

const COMMON_BIKE_SPARE_PART_FIELDS: Field[] = [
  { key: "part_type", label: "Part Type", type: "select", required: true },
  { key: "condition", label: "Condition", type: "chips", required: true },
  { key: "brand", label: "Brand", type: "text" },
  { key: "compatible_with", label: "Compatible With", type: "select" },
  { key: "warranty", label: "Warranty", type: "chips" },
  { key: "features", label: "Features", type: "multi-select" },
];

const COMMON_BIKE_CARE_FIELDS: Field[] = [
  {
    key: "service_type",
    label: "Service Type",
    type: "select",
    required: true,
  },
  { key: "condition", label: "Condition", type: "chips", required: true },
  { key: "brand", label: "Brand", type: "text" },
  {
    key: "quantity",
    label: "Quantity",
    type: "text",
    placeholder: "e.g. 1L, 2 pcs",
  },
  { key: "features", label: "Features", type: "multi-select" },
];

const mapSubcategories = (
  ids: string[],
  fields: Field[],
): Record<string, Field[]> =>
  Object.fromEntries(ids.map((id) => [id, fields])) as Record<string, Field[]>;

const MOTORCYCLE_IDS = [
  "standard",
  "sports-heavy-bikes",
  "cafe-racers",
  "electric-bikes",
  "other-motorcycles",
  "cruisers",
  "trail",
  "scooty-electric",
  "scooty-petrol",
  "other-bicycles",
  "road-bikes",
  "mountain-bikes",
  "bmx-bikes",
  "hybrid-bikes",
  "folding-bikes",
  "electric-bicycles",
];

const BIKE_ACCESSORY_IDS = [
  "helmets",
  "other-bike-accessories",
  "bike-covers",
  "bicycle-air-pumps",
  "bike-safety-security",
  "bike-jackets",
  "safe-guards",
  "bike-gloves",
  "tail-boxes",
  "oils-lubricants",
  "mobile-chargers-bike",
  "bike-locks",
  "bluetooth-headsets-bike",
  "sticker-emblems",
  "bike-shoes",
];

const BIKE_SPARE_PART_IDS = [
  "other-spare-parts-bike",
  "lighting-bike",
  "fuel-tanks",
  "tyres-tubes",
  "silencer",
  "exhausts",
  "carburetors",
  "seats",
  "speedometers",
  "bearings",
  "side-mirrors-bike",
  "motorcycle-batteries",
  "handle-bars-grips",
  "chain-covers-sprockets",
  "horns",
  "cylinders",
  "steering-suspension",
  "body-frame",
  "switches",
  "plugs",
  "stands",
  "air-filters-bike",
  "brakes",
  "clutches",
  "pistons",
  "levers",
  "transmission-bike",
];

export const BIKE_POST_FIELDS_BY_SUBCATEGORY: Record<string, Field[]> = {
  "atv-quads": COMMON_BIKE_VEHICLE_FIELDS,
  ...mapSubcategories(MOTORCYCLE_IDS, COMMON_BIKE_VEHICLE_FIELDS),
  ...mapSubcategories(BIKE_ACCESSORY_IDS, COMMON_BIKE_ACCESSORY_FIELDS),
  ...mapSubcategories(BIKE_SPARE_PART_IDS, COMMON_BIKE_SPARE_PART_FIELDS),
  "cleaning-tools": COMMON_BIKE_CARE_FIELDS,
};
