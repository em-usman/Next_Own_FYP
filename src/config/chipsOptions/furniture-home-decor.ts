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

const SIZE_OPTIONS = [
  "Small",
  "Medium",
  "Large",
  "Single",
  "Double",
  "Queen",
  "King",
  "Custom",
];

const STYLE_OPTIONS = [
  "Modern",
  "Classic",
  "Minimalist",
  "Traditional",
  "Rustic",
  "Luxury",
  "Contemporary",
];

const USAGE_AREA_OPTIONS = [
  "Indoor",
  "Outdoor",
  "Garden",
  "Balcony",
  "Patio",
  "Terrace",
  "Multi-purpose",
];

const CAPACITY_OPTIONS = [
  "0.5L",
  "1L",
  "2L",
  "5L",
  "10L",
  "Set of 2",
  "Set of 4",
  "Set of 6",
  "Set of 12",
];

const WATTAGE_OPTIONS = ["3W", "5W", "7W", "9W", "12W", "18W", "24W", "40W+"];

const COMMON_FURNITURE_OPTIONS: ChipsFieldOptionsMap = {
  condition: CONDITION_OPTIONS,
  material: MATERIAL_OPTIONS,
  size: SIZE_OPTIONS,
  features: FEATURES_OPTIONS,
};

const COMMON_DECOR_OPTIONS: ChipsFieldOptionsMap = {
  condition: CONDITION_OPTIONS,
  material: MATERIAL_OPTIONS,
  style: STYLE_OPTIONS,
  features: FEATURES_OPTIONS,
};

const COMMON_OUTDOOR_OPTIONS: ChipsFieldOptionsMap = {
  condition: CONDITION_OPTIONS,
  material: MATERIAL_OPTIONS,
  usage_area: USAGE_AREA_OPTIONS,
  weather_resistant: ["Yes", "No"],
  features: FEATURES_OPTIONS,
};

const COMMON_KITCHEN_OPTIONS: ChipsFieldOptionsMap = {
  condition: CONDITION_OPTIONS,
  material: MATERIAL_OPTIONS,
  capacity: CAPACITY_OPTIONS,
  dishwasher_safe: ["Yes", "No"],
  features: FEATURES_OPTIONS,
};

const COMMON_BATHROOM_OPTIONS: ChipsFieldOptionsMap = {
  condition: CONDITION_OPTIONS,
  material: MATERIAL_OPTIONS,
  installation_type: [
    "Wall Mounted",
    "Floor Mounted",
    "Counter Top",
    "Built-in",
    "Portable",
  ],
  size: SIZE_OPTIONS,
  features: FEATURES_OPTIONS,
};

const COMMON_LIGHTING_OPTIONS: ChipsFieldOptionsMap = {
  condition: CONDITION_OPTIONS,
  light_type: [
    "LED",
    "Halogen",
    "CFL",
    "Incandescent",
    "Smart",
    "Solar",
    "Decorative",
  ],
  power_source: ["Electric", "Battery", "Rechargeable", "Solar", "USB"],
  wattage: WATTAGE_OPTIONS,
  features: FEATURES_OPTIONS,
};

const COMMON_TEXTILE_OPTIONS: ChipsFieldOptionsMap = {
  condition: CONDITION_OPTIONS,
  material: ["Cotton", "Polyester", "Wool", "Silk", "Jute", "Velvet", "Mixed"],
  size: SIZE_OPTIONS,
  pattern: ["Plain", "Printed", "Striped", "Floral", "Geometric", "Abstract"],
  features: FEATURES_OPTIONS,
};

const COMMON_HOME_ESSENTIAL_OPTIONS: ChipsFieldOptionsMap = {
  condition: CONDITION_OPTIONS,
  item_type: [
    "Manual",
    "Electric",
    "Liquid",
    "Powder",
    "Spray",
    "Disposable",
    "Reusable",
  ],
  pack_size: [
    "Single",
    "Pack of 2",
    "Pack of 3",
    "Pack of 6",
    "Pack of 12",
    "Bulk",
  ],
  fragrance: ["Lemon", "Floral", "Lavender", "Ocean", "Unscented", "Other"],
  features: FEATURES_OPTIONS,
};

const mapSubcategories = (
  ids: string[],
  options: ChipsFieldOptionsMap,
): Record<string, ChipsFieldOptionsMap> =>
  Object.fromEntries(ids.map((id) => [id, options])) as Record<
    string,
    ChipsFieldOptionsMap
  >;

const SOFA_CHAIRS_IDS = [
  "sofas",
  "chairs",
  "sofa-beds",
  "sofa-covers",
  "cushions",
  "bean-bags",
  "recliners",
];

const BEDS_WARDROBES_IDS = [
  "beds",
  "wardrobes",
  "mattresses",
  "dressers-drawers",
  "bed-sheets",
  "bookcases-shelves",
  "blankets-comforters",
  "pillows-cases",
  "mattress-covers",
  "other-bedding-accessories",
  "bedside-tables",
  "mattress-toppers-pads",
];

const TABLES_DINING_IDS = [
  "dining-tables",
  "coffee-tables",
  "console-tables",
  "side-tables",
  "dining-room-sets",
  "kids-tables-sets",
  "dining-chairs",
  "sideboards-buffets",
  "kitchen-islands",
];

const OFFICE_FURNITURE_IDS = [
  "office-tables",
  "other-office-furniture",
  "office-chairs",
  "shelves-racks",
  "office-sofas",
  "office-cabinets",
];

const HOME_DECORATION_IDS = [
  "other-decor-items",
  "wall-clocks",
  "wall-hangings",
  "lamps",
  "other-decorations",
  "flooring",
  "candles",
  "showpieces",
  "aromatherapy-home-fragrance",
  "artificial-flowers-plants",
  "vases",
  "wall-lights",
  "picture-frames",
  "handicrafts",
  "chandeliers",
  "tissue-boxes",
  "sculptures",
  "decorative-trays",
  "indoor-fountains",
];

const GARDEN_OUTDOOR_IDS = [
  "plants-pots",
  "artificial-grass",
  "outdoor-chairs",
  "tents-shades",
  "other-outdoor-items",
  "outdoor-activities",
  "outdoor-swings",
  "hardware",
  "benches",
  "outdoor-umbrellas",
  "outdoor-lights",
  "sprinklers-watering-systems",
  "outdoor-fountains",
  "outdoor-tables",
];

const KITCHEN_ESSENTIALS_IDS = [
  "crockery-dinner-sets",
  "kitchen-utensils-tools",
  "cups-glasses-drink-sets",
  "baking-dishes-tools",
  "sponges-cleaners-liquids",
  "cookers-pots-pans",
  "food-storage-dispensers",
  "beverage-containers",
  "cutlery",
  "serving-dishes-utensils",
];

const BATHROOM_ACCESSORIES_IDS = [
  "other-bathroom-accessories",
  "hand-showers-hoses-pipes",
  "toilets",
  "soap-dispensers",
  "bath-cabinets",
  "taps",
  "bath-towels",
  "basins",
  "vanity-units",
  "bath-tubs",
  "traps-drains",
  "shower-cabins",
  "bathrobes",
];

const LIGHTING_IDS = [
  "night-lights",
  "outdoor-lighting",
  "table-lamps",
  "ceiling-lights",
  "light-bulbs",
  "led-strip-lighting",
  "fairy-lights",
  "wall-lights-sconces",
  "floor-lamps",
  "lamp-shades",
  "lighting-fixtures-components",
  "picture-display-lights",
  "seasonal-decorative",
  "bathroom-lighting",
];

const PAINTING_MIRRORS_IDS = [
  "paintings",
  "mirrors",
  "frames",
  "mirror-lights",
  "painting-accessories",
];

const CURTAINS_BLINDS_IDS = ["curtains", "blinds", "curtain-accessories"];
const RUGS_CARPETS_IDS = ["carpets", "rugs", "prayer-mats", "mats"];

const HOME_ESSENTIALS_IDS = [
  "brooms-mops-sweepers",
  "brushes-sponges-wipers",
  "cleaning-supplies",
  "air-fresheners",
  "laundry-supplies",
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
  ...mapSubcategories(SOFA_CHAIRS_IDS, COMMON_FURNITURE_OPTIONS),
  ...mapSubcategories(BEDS_WARDROBES_IDS, COMMON_FURNITURE_OPTIONS),
  ...mapSubcategories(TABLES_DINING_IDS, COMMON_FURNITURE_OPTIONS),
  ...mapSubcategories(OFFICE_FURNITURE_IDS, COMMON_FURNITURE_OPTIONS),
  ...mapSubcategories(HOME_DECORATION_IDS, COMMON_DECOR_OPTIONS),
  ...mapSubcategories(GARDEN_OUTDOOR_IDS, COMMON_OUTDOOR_OPTIONS),
  ...mapSubcategories(KITCHEN_ESSENTIALS_IDS, COMMON_KITCHEN_OPTIONS),
  ...mapSubcategories(BATHROOM_ACCESSORIES_IDS, COMMON_BATHROOM_OPTIONS),
  ...mapSubcategories(LIGHTING_IDS, COMMON_LIGHTING_OPTIONS),
  ...mapSubcategories(PAINTING_MIRRORS_IDS, COMMON_DECOR_OPTIONS),
  ...mapSubcategories(CURTAINS_BLINDS_IDS, COMMON_TEXTILE_OPTIONS),
  ...mapSubcategories(RUGS_CARPETS_IDS, COMMON_TEXTILE_OPTIONS),
  ...mapSubcategories(HOME_ESSENTIALS_IDS, COMMON_HOME_ESSENTIAL_OPTIONS),
};
