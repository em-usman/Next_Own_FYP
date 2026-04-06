import type { Field } from "@/config/postFields/types";

const COMMON_APPLIANCE_FIELDS: Field[] = [
  { key: "type", label: "Type", type: "select", required: true },
  { key: "condition", label: "Condition", type: "chips", required: true },
  {
    key: "brand",
    label: "Brand",
    type: "select",
  },
  {
    key: "model",
    label: "Model",
    type: "text",
    placeholder: "e.g. XYZ-2024",
  },
  {
    key: "warranty",
    label: "Warranty",
    type: "chips",
  },
  {
    key: "features",
    label: "Features",
    type: "multi-select",
  },
];

const mapSubcategories = (
  ids: string[],
  fields: Field[],
): Record<string, Field[]> =>
  Object.fromEntries(ids.map((id) => [id, fields])) as Record<string, Field[]>;

const KITCHEN_APPLIANCES_IDS = [
  "other-kitchen-appliances",
  "stoves",
  "air-fryers",
  "coffee-tea-machines",
  "juicers",
  "kitchen-appliance-accessories",
  "choppers",
  "vegetable-slicers",
  "blenders",
  "electric-kettles",
  "hot-plates",
  "water-purifiers",
  "food-factory",
  "mixers",
  "electric-cookers",
  "meat-grinders",
  "hobs",
  "toasters",
  "sandwich-makers",
  "roti-makers",
  "hoods",
  "grills",
  "dishwashers",
  "food-steamers",
  "sinks",
];

const COOLING_STORAGE_IDS = [
  "refrigerators",
  "freezers",
  "refrigerators-freezers-accessories",
  "mini",
];

const LAUNDRY_IDS = [
  "washer-dryer",
  "washer",
  "spin-dryer",
  "washing-machine-dryer-accessories",
];

const FANS_IDS = [
  "ceiling-fans",
  "pedestal-fans",
  "portable-fans",
  "bracket-fans",
  "exhaust-fans",
  "mist-fans",
];

const AC_COOLER_IDS = [
  "air-conditioners",
  "air-coolers",
  "ac-cooler-accessories",
];
const HEATING_IDS = ["geysers", "heaters", "heating-rods"];
const IRONING_IDS = ["irons", "steamers"];
const MICROWAVE_OVEN_IDS = ["microwaves", "ovens"];

const TV_IDS = [
  "televisions",
  "dish-antennas",
  "iptv",
  "projectors-projection-screens",
  "tv-remotes",
  "android-boxes",
  "other-tv-accessories",
  "wall-mounts",
  "tv-cables",
];

const VIDEO_AUDIO_IDS = [
  "speakers",
  "microphones",
  "other-video-audio",
  "amplifiers",
  "home-theater-systems",
  "car-audio-video",
  "cd-dvd-players",
  "sound-bars",
  "walkie-talkie",
  "radios",
  "cassette-players-recorders",
  "cables",
  "audio-mixers",
  "audio-interface",
  "mp3-players",
  "turntables-accessories",
  "digital-recorders",
];

const COMPUTERS_IDS = [
  "laptops",
  "computer-components",
  "computer-laptop-accessories",
  "networking",
  "gaming-pcs",
  "printers-photocopiers",
  "desktops",
  "workstations",
  "inks-toners",
  "servers",
  "softwares",
  "3d-printers-accessories",
  "bags-cases",
];

const CAMERA_IDS = [
  "digital-cameras",
  "cctv-cameras",
  "drones",
  "camera-lenses",
  "video-cameras",
  "tripods-stands",
  "other-cameras-accessories",
  "camera-lenses-accessories",
  "video-lights",
  "gimbles-stablizers",
  "professional-microphones",
  "camera-batteries",
  "flash-guns",
  "binoculars",
  "binoculars-optics-accessories",
  "camera-bags-cases",
];

const GAMING_IDS = [
  "gaming-consoles",
  "video-games",
  "gaming-accessories",
  "controllers",
];
const TOOLS_IDS = [
  "electrical",
  "hand-tools",
  "power-tools",
  "other-equipments",
];
const POWER_SOLUTION_IDS = [
  "solar-inverter",
  "generators",
  "ups",
  "batteries",
  "solar-accessories",
  "solar-panels",
];

export const ELECTRONICS_HOME_APPLIANCES_POST_FIELDS_BY_SUBCATEGORY: Record<
  string,
  Field[]
> = {
  "other-home-appliances": [
    ...COMMON_APPLIANCE_FIELDS,
    {
      key: "power_source",
      label: "Power Source",
      type: "chips",
    },
  ],

  "sewing-machines": [
    ...COMMON_APPLIANCE_FIELDS,
    {
      key: "machine_type",
      label: "Machine Type",
      type: "select",
      required: true,
    },
    {
      key: "stitch_options",
      label: "Stitch Options",
      type: "select",
    },
  ],

  "water-dispensers": [
    ...COMMON_APPLIANCE_FIELDS,
    {
      key: "dispenser_type",
      label: "Dispenser Type",
      type: "select",
      required: true,
    },
    {
      key: "cooling_heating",
      label: "Cooling/Heating",
      type: "chips",
    },
    {
      key: "capacity",
      label: "Capacity",
      type: "select",
    },
  ],

  "air-purifiers": [
    ...COMMON_APPLIANCE_FIELDS,
    {
      key: "coverage_area",
      label: "Coverage Area",
      type: "select",
    },
    {
      key: "filter_type",
      label: "Filter Type",
      type: "select",
      required: true,
    },
    {
      key: "smart_features",
      label: "Smart Features",
      type: "chips",
    },
  ],

  ...mapSubcategories(KITCHEN_APPLIANCES_IDS, COMMON_APPLIANCE_FIELDS),
  ...mapSubcategories(COOLING_STORAGE_IDS, COMMON_APPLIANCE_FIELDS),
  ...mapSubcategories(LAUNDRY_IDS, COMMON_APPLIANCE_FIELDS),
  ...mapSubcategories(FANS_IDS, COMMON_APPLIANCE_FIELDS),
  ...mapSubcategories(AC_COOLER_IDS, COMMON_APPLIANCE_FIELDS),
  ...mapSubcategories(HEATING_IDS, COMMON_APPLIANCE_FIELDS),
  ...mapSubcategories(IRONING_IDS, COMMON_APPLIANCE_FIELDS),
  ...mapSubcategories(MICROWAVE_OVEN_IDS, COMMON_APPLIANCE_FIELDS),
  ...mapSubcategories(TV_IDS, COMMON_APPLIANCE_FIELDS),
  ...mapSubcategories(VIDEO_AUDIO_IDS, COMMON_APPLIANCE_FIELDS),
  ...mapSubcategories(COMPUTERS_IDS, COMMON_APPLIANCE_FIELDS),
  ...mapSubcategories(CAMERA_IDS, COMMON_APPLIANCE_FIELDS),
  ...mapSubcategories(GAMING_IDS, COMMON_APPLIANCE_FIELDS),
  ...mapSubcategories(TOOLS_IDS, COMMON_APPLIANCE_FIELDS),
  ...mapSubcategories(POWER_SOLUTION_IDS, COMMON_APPLIANCE_FIELDS),
};
