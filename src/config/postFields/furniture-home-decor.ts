import type { Field } from "@/config/postFields/types";

const HOUSEHOLD_ITEMS_FIELDS: Field[] = [
  { key: "type", label: "Type", type: "select", required: true },
  { key: "condition", label: "Condition", type: "chips" },
  { key: "brand", label: "Brand", type: "text" },
  {
    key: "material",
    label: "Material",
    type: "select",
  },
  {
    key: "features",
    label: "Features",
    type: "multi-select",
  },
];

const HOME_DIY_FIELDS: Field[] = [
  { key: "type", label: "Type", type: "select", required: true },
  {
    key: "quantity",
    label: "Quantity",
    type: "text",
    placeholder: "e.g. 5 cans, 10 rolls",
  },
  { key: "brand", label: "Brand", type: "text" },
  { key: "color", label: "Color", type: "text" },
  {
    key: "features",
    label: "Features",
    type: "multi-select",
  },
];

const COMMON_FURNITURE_CHILD_FIELDS: Field[] = [
  { key: "condition", label: "Condition", type: "chips", required: true },
  { key: "material", label: "Material", type: "select" },
  { key: "size", label: "Size", type: "select" },
  { key: "brand", label: "Brand", type: "text" },
  { key: "features", label: "Features", type: "multi-select" },
];

const COMMON_DECOR_CHILD_FIELDS: Field[] = [
  { key: "condition", label: "Condition", type: "chips", required: true },
  { key: "material", label: "Material", type: "select" },
  { key: "style", label: "Style", type: "select" },
  { key: "brand", label: "Brand", type: "text" },
  { key: "features", label: "Features", type: "multi-select" },
];

const COMMON_OUTDOOR_FIELDS: Field[] = [
  { key: "condition", label: "Condition", type: "chips", required: true },
  { key: "material", label: "Material", type: "select" },
  { key: "usage_area", label: "Usage Area", type: "select" },
  { key: "weather_resistant", label: "Weather Resistant", type: "chips" },
  { key: "features", label: "Features", type: "multi-select" },
];

const COMMON_KITCHEN_FIELDS: Field[] = [
  { key: "condition", label: "Condition", type: "chips", required: true },
  { key: "material", label: "Material", type: "select" },
  { key: "capacity", label: "Capacity", type: "select" },
  { key: "dishwasher_safe", label: "Dishwasher Safe", type: "chips" },
  { key: "features", label: "Features", type: "multi-select" },
];

const COMMON_BATHROOM_FIELDS: Field[] = [
  { key: "condition", label: "Condition", type: "chips", required: true },
  { key: "material", label: "Material", type: "select" },
  { key: "installation_type", label: "Installation Type", type: "select" },
  { key: "size", label: "Size", type: "select" },
  { key: "features", label: "Features", type: "multi-select" },
];

const COMMON_LIGHTING_FIELDS: Field[] = [
  { key: "condition", label: "Condition", type: "chips", required: true },
  { key: "light_type", label: "Light Type", type: "select" },
  { key: "power_source", label: "Power Source", type: "select" },
  { key: "wattage", label: "Wattage", type: "select" },
  { key: "features", label: "Features", type: "multi-select" },
];

const COMMON_TEXTILE_FIELDS: Field[] = [
  { key: "condition", label: "Condition", type: "chips", required: true },
  { key: "material", label: "Material", type: "select" },
  { key: "size", label: "Size", type: "select" },
  { key: "pattern", label: "Pattern", type: "select" },
  { key: "features", label: "Features", type: "multi-select" },
];

const COMMON_HOME_ESSENTIAL_FIELDS: Field[] = [
  { key: "condition", label: "Condition", type: "chips", required: true },
  { key: "item_type", label: "Item Type", type: "select" },
  { key: "pack_size", label: "Pack Size", type: "select" },
  { key: "fragrance", label: "Fragrance", type: "select" },
  { key: "features", label: "Features", type: "multi-select" },
];

const mapSubcategories = (
  ids: string[],
  fields: Field[],
): Record<string, Field[]> =>
  Object.fromEntries(ids.map((id) => [id, fields])) as Record<string, Field[]>;

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

export const FURNITURE_HOME_DECOR_POST_FIELDS_BY_SUBCATEGORY: Record<
  string,
  Field[]
> = {
  "other-household-items": HOUSEHOLD_ITEMS_FIELDS,
  "home-diy-renovation": HOME_DIY_FIELDS,
  ...mapSubcategories(SOFA_CHAIRS_IDS, COMMON_FURNITURE_CHILD_FIELDS),
  ...mapSubcategories(BEDS_WARDROBES_IDS, COMMON_FURNITURE_CHILD_FIELDS),
  ...mapSubcategories(TABLES_DINING_IDS, COMMON_FURNITURE_CHILD_FIELDS),
  ...mapSubcategories(OFFICE_FURNITURE_IDS, COMMON_FURNITURE_CHILD_FIELDS),
  ...mapSubcategories(HOME_DECORATION_IDS, COMMON_DECOR_CHILD_FIELDS),
  ...mapSubcategories(GARDEN_OUTDOOR_IDS, COMMON_OUTDOOR_FIELDS),
  ...mapSubcategories(KITCHEN_ESSENTIALS_IDS, COMMON_KITCHEN_FIELDS),
  ...mapSubcategories(BATHROOM_ACCESSORIES_IDS, COMMON_BATHROOM_FIELDS),
  ...mapSubcategories(LIGHTING_IDS, COMMON_LIGHTING_FIELDS),
  ...mapSubcategories(PAINTING_MIRRORS_IDS, COMMON_DECOR_CHILD_FIELDS),
  ...mapSubcategories(CURTAINS_BLINDS_IDS, COMMON_TEXTILE_FIELDS),
  ...mapSubcategories(RUGS_CARPETS_IDS, COMMON_TEXTILE_FIELDS),
  ...mapSubcategories(HOME_ESSENTIALS_IDS, COMMON_HOME_ESSENTIAL_FIELDS),
};
