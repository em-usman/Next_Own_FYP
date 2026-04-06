import type { Field } from "@/config/postFields/types";

const COMMON_KIDS_FIELDS: Field[] = [
  {
    key: "condition",
    label: "Condition",
    type: "chips",
    required: true,
  },
  {
    key: "age_group",
    label: "Age Group",
    type: "chips",
    required: true,
  },
  {
    key: "brand",
    label: "Brand",
    type: "text",
    placeholder: "e.g. Fisher Price, LEGO, Chicco",
  },
  {
    key: "features",
    label: "Features",
    type: "multi-select",
  },
];

export const KIDS_POST_FIELDS_BY_SUBCATEGORY: Record<string, Field[]> = {
  toys: [
    ...COMMON_KIDS_FIELDS,
    {
      key: "toy_type",
      label: "Toy Type",
      type: "select",
      required: true,
    },
    {
      key: "material",
      label: "Material",
      type: "select",
    },
  ],

  "swing-slides": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "equipment_type",
      label: "Equipment Type",
      type: "select",
      required: true,
    },
    {
      key: "material",
      label: "Material",
      type: "select",
    },
    {
      key: "size",
      label: "Size",
      type: "select",
    },
  ],

  "kids-accessories": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "accessory_type",
      label: "Accessory Type",
      type: "select",
      required: true,
    },
    {
      key: "size",
      label: "Size",
      type: "select",
    },
  ],

  "kids-furniture": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "furniture_type",
      label: "Furniture Type",
      type: "select",
      required: true,
    },
    {
      key: "material",
      label: "Material",
      type: "select",
    },
    {
      key: "color",
      label: "Color",
      type: "text",
    },
  ],

  "bath-diapers": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "product_type",
      label: "Product Type",
      type: "select",
      required: true,
    },
    {
      key: "size",
      label: "Size",
      type: "select",
    },
  ],

  "kids-clothes": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "clothing_type",
      label: "Clothing Type",
      type: "select",
      required: true,
    },
    { key: "size", label: "Size", type: "select" },
    { key: "gender", label: "Gender", type: "chips" },
    { key: "season", label: "Season", type: "chips" },
  ],

  "kids-shoes": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "shoe_type",
      label: "Shoe Type",
      type: "select",
      required: true,
    },
    { key: "size", label: "Size", type: "select" },
    { key: "gender", label: "Gender", type: "chips" },
    { key: "closure_type", label: "Closure Type", type: "chips" },
  ],

  "kids-clothing-others": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "item_name",
      label: "Item Name",
      type: "text",
      required: true,
      placeholder: "e.g. Winter cape, dance outfit",
    },
    { key: "category", label: "Category", type: "select" },
    { key: "size", label: "Size", type: "select" },
  ],

  "kids-costumes": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "costume_type",
      label: "Costume Type",
      type: "select",
      required: true,
    },
    { key: "size", label: "Size", type: "select" },
    { key: "occasion", label: "Occasion", type: "chips" },
  ],

  "kids-uniforms": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "uniform_type",
      label: "Uniform Type",
      type: "select",
      required: true,
    },
    { key: "size", label: "Size", type: "select" },
    { key: "institution_type", label: "Institution Type", type: "chips" },
  ],

  "prams-walkers": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "gear_type",
      label: "Gear Type",
      type: "select",
      required: true,
    },
    { key: "weight_capacity", label: "Weight Capacity", type: "select" },
    { key: "foldable", label: "Foldable", type: "chips" },
  ],

  "baby-cots": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "cot_type",
      label: "Cot Type",
      type: "select",
      required: true,
    },
    { key: "material", label: "Material", type: "select" },
    { key: "size", label: "Size", type: "select" },
  ],

  "baby-swings": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "swing_type",
      label: "Swing Type",
      type: "select",
      required: true,
    },
    { key: "power_source", label: "Power Source", type: "chips" },
    { key: "safety_harness", label: "Safety Harness", type: "chips" },
  ],

  "other-baby-gear": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "item_name",
      label: "Item Name",
      type: "text",
      required: true,
      placeholder: "e.g. Baby monitor, bottle warmer",
    },
    { key: "gear_category", label: "Gear Category", type: "select" },
  ],

  "high-chairs": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "chair_type",
      label: "Chair Type",
      type: "select",
      required: true,
    },
    { key: "material", label: "Material", type: "select" },
    { key: "foldable", label: "Foldable", type: "chips" },
  ],

  "baby-carriers": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "carrier_type",
      label: "Carrier Type",
      type: "select",
      required: true,
    },
    { key: "carry_position", label: "Carry Position", type: "chips" },
    { key: "weight_capacity", label: "Weight Capacity", type: "select" },
  ],

  "car-seats": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "seat_type",
      label: "Seat Type",
      type: "select",
      required: true,
    },
    { key: "group_stage", label: "Group/Stage", type: "select" },
    { key: "isofix", label: "ISOFIX", type: "chips" },
  ],

  "baby-bouncers": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "bouncer_type",
      label: "Bouncer Type",
      type: "select",
      required: true,
    },
    { key: "power_source", label: "Power Source", type: "chips" },
    { key: "weight_capacity", label: "Weight Capacity", type: "select" },
  ],

  "kids-cars": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "vehicle_type",
      label: "Vehicle Type",
      type: "select",
      required: true,
    },
    { key: "power_type", label: "Power Type", type: "chips" },
    { key: "battery_life", label: "Battery Life", type: "select" },
  ],

  "kids-cycles": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "cycle_type",
      label: "Cycle Type",
      type: "select",
      required: true,
    },
    { key: "wheel_size", label: "Wheel Size", type: "select" },
    { key: "training_wheels", label: "Training Wheels", type: "chips" },
  ],

  "kids-bikes": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "bike_type",
      label: "Bike Type",
      type: "select",
      required: true,
    },
    { key: "engine_capacity", label: "Engine Capacity", type: "chips" },
    { key: "safety_features", label: "Safety Features", type: "multi-select" },
  ],

  "kids-scooties": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "scooty_type",
      label: "Scooty Type",
      type: "select",
      required: true,
    },
    { key: "power_type", label: "Power Type", type: "chips" },
    { key: "battery_life", label: "Battery Life", type: "select" },
  ],
};
