import type { Field } from "@/config/postFields/types";

const COMMON_BOOKS_SPORTS_HOBBIES_FIELDS: Field[] = [
  {
    key: "condition",
    label: "Condition",
    type: "chips",
    required: true,
  },
  {
    key: "type",
    label: "Type",
    type: "select",
    required: true,
  },
  {
    key: "brand",
    label: "Brand",
    type: "text",
    placeholder: "e.g. Yonex, Adidas, Decathlon",
  },
  {
    key: "features",
    label: "Features",
    type: "multi-select",
  },
];

const COMMON_BOOKS_FIELDS: Field[] = [
  ...COMMON_BOOKS_SPORTS_HOBBIES_FIELDS,
  { key: "language", label: "Language", type: "select" },
];

const COMMON_ARTS_CRAFTS_FIELDS: Field[] = [
  ...COMMON_BOOKS_SPORTS_HOBBIES_FIELDS,
  { key: "material", label: "Material", type: "select" },
  { key: "pack_size", label: "Pack Size", type: "select" },
];

const COMMON_CAMPING_FIELDS: Field[] = [
  ...COMMON_BOOKS_SPORTS_HOBBIES_FIELDS,
  { key: "capacity", label: "Capacity", type: "select" },
  { key: "material", label: "Material", type: "select" },
];

const COMMON_COLLECTABLE_FIELDS: Field[] = [
  {
    key: "condition",
    label: "Condition",
    type: "chips",
    required: true,
  },
  {
    key: "category",
    label: "Category",
    type: "select",
    required: true,
  },
  { key: "year", label: "Year", type: "text" },
  { key: "origin", label: "Origin", type: "chips" },
  {
    key: "features",
    label: "Features",
    type: "multi-select",
  },
];

export const BOOKS_SPORTS_HOBBIES_POST_FIELDS_BY_SUBCATEGORY: Record<
  string,
  Field[]
> = {
  "gym-fitness": [
    ...COMMON_BOOKS_SPORTS_HOBBIES_FIELDS,
    {
      key: "equipment_type",
      label: "Equipment Type",
      type: "select",
      required: true,
    },
    {
      key: "weight_capacity",
      label: "Weight/Capacity",
      type: "text",
      placeholder: "e.g. 20kg dumbbell, 120kg max load",
    },
    {
      key: "usage",
      label: "Usage",
      type: "chips",
    },
  ],

  "sports-equipment": [
    ...COMMON_BOOKS_SPORTS_HOBBIES_FIELDS,
    {
      key: "sport_type",
      label: "Sport Type",
      type: "select",
      required: true,
    },
    {
      key: "size",
      label: "Size",
      type: "select",
    },
    {
      key: "material",
      label: "Material",
      type: "select",
    },
  ],

  "other-hobbies": [
    ...COMMON_BOOKS_SPORTS_HOBBIES_FIELDS,
    {
      key: "hobby_category",
      label: "Hobby Category",
      type: "select",
      required: true,
    },
    {
      key: "age_group",
      label: "Age Group",
      type: "chips",
    },
  ],

  calendars: [
    ...COMMON_BOOKS_SPORTS_HOBBIES_FIELDS,
    {
      key: "year",
      label: "Year",
      type: "number",
      required: true,
    },
    {
      key: "format",
      label: "Format",
      type: "chips",
    },
    {
      key: "theme",
      label: "Theme",
      type: "select",
    },
  ],

  books: [
    ...COMMON_BOOKS_FIELDS,
    { key: "book_type", label: "Book Type", type: "select", required: true },
    { key: "author", label: "Author", type: "text" },
  ],
  "stationery-items": [
    ...COMMON_BOOKS_FIELDS,
    {
      key: "stationery_type",
      label: "Stationery Type",
      type: "select",
      required: true,
    },
    { key: "pack_size", label: "Pack Size", type: "select" },
  ],
  calculators: [
    ...COMMON_BOOKS_FIELDS,
    {
      key: "calculator_type",
      label: "Calculator Type",
      type: "select",
      required: true,
    },
    { key: "power_source", label: "Power Source", type: "chips" },
  ],
  magazines: [
    ...COMMON_BOOKS_FIELDS,
    {
      key: "magazine_type",
      label: "Magazine Type",
      type: "select",
      required: true,
    },
    { key: "frequency", label: "Frequency", type: "chips" },
  ],
  dictionaries: [
    ...COMMON_BOOKS_FIELDS,
    {
      key: "dictionary_type",
      label: "Dictionary Type",
      type: "select",
      required: true,
    },
    { key: "language_level", label: "Language Level", type: "chips" },
  ],

  "party-supplies": [
    ...COMMON_ARTS_CRAFTS_FIELDS,
    {
      key: "supply_type",
      label: "Supply Type",
      type: "select",
      required: true,
    },
    { key: "event_type", label: "Event Type", type: "chips" },
  ],
  "paper-products": [
    ...COMMON_ARTS_CRAFTS_FIELDS,
    {
      key: "paper_type",
      label: "Paper Type",
      type: "select",
      required: true,
    },
    { key: "size", label: "Size", type: "select" },
  ],
  "painting-supplies": [
    ...COMMON_ARTS_CRAFTS_FIELDS,
    {
      key: "paint_type",
      label: "Paint Type",
      type: "select",
      required: true,
    },
    { key: "surface_type", label: "Surface Type", type: "chips" },
  ],
  "gifts-wrapping": [
    ...COMMON_ARTS_CRAFTS_FIELDS,
    {
      key: "item_type",
      label: "Item Type",
      type: "select",
      required: true,
    },
    { key: "occasion", label: "Occasion", type: "chips" },
  ],
  "craft-packaging-supplies": [
    ...COMMON_ARTS_CRAFTS_FIELDS,
    {
      key: "packaging_type",
      label: "Packaging Type",
      type: "select",
      required: true,
    },
  ],
  "art-pads-diaries-folios": [
    ...COMMON_ARTS_CRAFTS_FIELDS,
    {
      key: "product_type",
      label: "Product Type",
      type: "select",
      required: true,
    },
    { key: "paper_size", label: "Paper Size", type: "select" },
  ],
  "modeling-sculpting": [
    ...COMMON_ARTS_CRAFTS_FIELDS,
    {
      key: "sculpting_type",
      label: "Modeling Type",
      type: "select",
      required: true,
    },
    { key: "tool_included", label: "Tools Included", type: "chips" },
  ],

  "wool-knitting-crochet": [
    ...COMMON_ARTS_CRAFTS_FIELDS,
    {
      key: "product_type",
      label: "Product Type",
      type: "select",
      required: true,
    },
    { key: "yarn_weight", label: "Yarn Weight", type: "chips" },
  ],
  "other-craft-supplies": [
    ...COMMON_ARTS_CRAFTS_FIELDS,
    {
      key: "supply_name",
      label: "Supply Name",
      type: "text",
      required: true,
    },
    { key: "craft_type", label: "Craft Type", type: "select" },
  ],
  "laces-ribbons-decorative-trims": [
    ...COMMON_ARTS_CRAFTS_FIELDS,
    {
      key: "trim_type",
      label: "Trim Type",
      type: "select",
      required: true,
    },
    { key: "width", label: "Width", type: "chips" },
  ],
  "quilt-making-supplies": [
    ...COMMON_ARTS_CRAFTS_FIELDS,
    {
      key: "supply_type",
      label: "Supply Type",
      type: "select",
      required: true,
    },
    { key: "quilt_size", label: "Quilt Size", type: "select" },
  ],
  "sewing-accessories": [
    ...COMMON_ARTS_CRAFTS_FIELDS,
    {
      key: "accessory_type",
      label: "Accessory Type",
      type: "select",
      required: true,
    },
  ],
  "embroidery-hand-stitching": [
    ...COMMON_ARTS_CRAFTS_FIELDS,
    {
      key: "embroidery_type",
      label: "Embroidery Type",
      type: "select",
      required: true,
    },
    { key: "fabric_type", label: "Fabric Type", type: "select" },
  ],
  "sewing-craft-patterns": [
    ...COMMON_ARTS_CRAFTS_FIELDS,
    {
      key: "pattern_type",
      label: "Pattern Type",
      type: "select",
      required: true,
    },
    { key: "format", label: "Format", type: "chips" },
  ],

  lighting: [
    ...COMMON_CAMPING_FIELDS,
    {
      key: "lighting_type",
      label: "Lighting Type",
      type: "select",
      required: true,
    },
    { key: "power_source", label: "Power Source", type: "chips" },
  ],
  "trekking-poles": [
    ...COMMON_CAMPING_FIELDS,
    {
      key: "pole_type",
      label: "Pole Type",
      type: "select",
      required: true,
    },
    { key: "adjustable", label: "Adjustable", type: "chips" },
  ],
  "camp-kitchen": [
    ...COMMON_CAMPING_FIELDS,
    {
      key: "kitchen_item_type",
      label: "Kitchen Item Type",
      type: "select",
      required: true,
    },
    { key: "fuel_type", label: "Fuel Type", type: "chips" },
  ],
  "sleeping-gear": [
    ...COMMON_CAMPING_FIELDS,
    {
      key: "sleeping_item_type",
      label: "Sleeping Item Type",
      type: "select",
      required: true,
    },
    { key: "temperature_rating", label: "Temperature Rating", type: "select" },
  ],
  "camping-hiking-tool-kits": [
    ...COMMON_CAMPING_FIELDS,
    {
      key: "tool_kit_type",
      label: "Tool Kit Type",
      type: "select",
      required: true,
    },
    { key: "pieces_count", label: "Pieces Count", type: "text" },
  ],
  tents: [
    ...COMMON_CAMPING_FIELDS,
    {
      key: "tent_type",
      label: "Tent Type",
      type: "select",
      required: true,
    },
    { key: "persons_capacity", label: "Persons Capacity", type: "select" },
  ],
  backpacks: [
    ...COMMON_CAMPING_FIELDS,
    {
      key: "backpack_type",
      label: "Backpack Type",
      type: "select",
      required: true,
    },
    { key: "volume", label: "Volume", type: "select" },
  ],
  "navigation-electronics": [
    ...COMMON_CAMPING_FIELDS,
    {
      key: "device_type",
      label: "Device Type",
      type: "select",
      required: true,
    },
    { key: "battery_life", label: "Battery Life", type: "select" },
  ],
  "shelters-canopies": [
    ...COMMON_CAMPING_FIELDS,
    {
      key: "shelter_type",
      label: "Shelter Type",
      type: "select",
      required: true,
    },
  ],
  "camp-furniture": [
    ...COMMON_CAMPING_FIELDS,
    {
      key: "furniture_type",
      label: "Furniture Type",
      type: "select",
      required: true,
    },
    { key: "foldable", label: "Foldable", type: "chips" },
  ],

  "coins-notes": [
    ...COMMON_COLLECTABLE_FIELDS,
    { key: "grade", label: "Grade", type: "chips" },
  ],
  stamps: [
    ...COMMON_COLLECTABLE_FIELDS,
    { key: "country", label: "Country", type: "text" },
  ],
  stones: [
    ...COMMON_COLLECTABLE_FIELDS,
    { key: "stone_type", label: "Stone Type", type: "select" },
  ],
};
