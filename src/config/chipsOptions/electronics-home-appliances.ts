import type { ChipsFieldOptionsMap } from "@/config/chipsOptions/types";

const CONDITIONS = ["New", "Used", "Open Box", "Refurbished"];
const WARRANTY = ["No", "3 Months", "6 Months", "1 Year", "2 Years+"];
const BRANDS = [
  "Dawlance",
  "PEL",
  "Haier",
  "Orient",
  "Kenwood",
  "Samsung",
  "LG",
  "Panasonic",
  "Sony",
  "Other",
];

const GENERIC_FEATURES = [
  "Energy Efficient",
  "Low Noise",
  "Portable",
  "Original Parts",
  "Imported",
  "Inverter Technology",
];

const mapSubcategories = (
  ids: string[],
  options: ChipsFieldOptionsMap,
): Record<string, ChipsFieldOptionsMap> =>
  Object.fromEntries(ids.map((id) => [id, options])) as Record<
    string,
    ChipsFieldOptionsMap
  >;

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

const KITCHEN_OPTIONS: ChipsFieldOptionsMap = {
  type: [
    "Cooking",
    "Blending",
    "Baking",
    "Cutting",
    "Brewing",
    "Storage",
    "Cleaning",
    "Accessory",
  ],
  condition: CONDITIONS,
  brand: BRANDS,
  warranty: WARRANTY,
  features: GENERIC_FEATURES,
};

const COOLING_OPTIONS: ChipsFieldOptionsMap = {
  type: [
    "Single Door",
    "Double Door",
    "Side by Side",
    "Chest",
    "Upright",
    "Mini",
    "Accessory",
  ],
  condition: CONDITIONS,
  brand: BRANDS,
  warranty: WARRANTY,
  features: GENERIC_FEATURES,
};

const LAUNDRY_OPTIONS: ChipsFieldOptionsMap = {
  type: [
    "Top Load",
    "Front Load",
    "Semi Automatic",
    "Automatic",
    "Dryer",
    "Accessory",
  ],
  condition: CONDITIONS,
  brand: BRANDS,
  warranty: WARRANTY,
  features: GENERIC_FEATURES,
};

const FAN_OPTIONS: ChipsFieldOptionsMap = {
  type: ["Ceiling", "Pedestal", "Portable", "Bracket", "Exhaust", "Mist"],
  condition: CONDITIONS,
  brand: BRANDS,
  warranty: WARRANTY,
  features: GENERIC_FEATURES,
};

const CLIMATE_OPTIONS: ChipsFieldOptionsMap = {
  type: [
    "Split AC",
    "Window AC",
    "Inverter AC",
    "Desert Cooler",
    "Room Cooler",
    "Accessory",
  ],
  condition: CONDITIONS,
  brand: BRANDS,
  warranty: WARRANTY,
  features: GENERIC_FEATURES,
};

const HEATING_OPTIONS: ChipsFieldOptionsMap = {
  type: [
    "Gas Geyser",
    "Electric Geyser",
    "Fan Heater",
    "Oil Heater",
    "Infrared Heater",
    "Rod",
  ],
  condition: CONDITIONS,
  brand: BRANDS,
  warranty: WARRANTY,
  features: GENERIC_FEATURES,
};

const IRONING_OPTIONS: ChipsFieldOptionsMap = {
  type: ["Dry Iron", "Steam Iron", "Garment Steamer", "Travel Iron"],
  condition: CONDITIONS,
  brand: BRANDS,
  warranty: WARRANTY,
  features: GENERIC_FEATURES,
};

const MICROWAVE_OPTIONS: ChipsFieldOptionsMap = {
  type: ["Microwave", "Convection", "Grill Oven", "OTG", "Built-in Oven"],
  condition: CONDITIONS,
  brand: BRANDS,
  warranty: WARRANTY,
  features: GENERIC_FEATURES,
};

const TV_OPTIONS: ChipsFieldOptionsMap = {
  type: [
    "LED",
    "Smart TV",
    "Android TV",
    "Satellite",
    "Streaming",
    "Accessory",
  ],
  condition: CONDITIONS,
  brand: BRANDS,
  warranty: WARRANTY,
  features: GENERIC_FEATURES,
};

const AUDIO_OPTIONS: ChipsFieldOptionsMap = {
  type: [
    "Speaker",
    "Microphone",
    "Amplifier",
    "Soundbar",
    "Recorder",
    "Accessory",
  ],
  condition: CONDITIONS,
  brand: BRANDS,
  warranty: WARRANTY,
  features: GENERIC_FEATURES,
};

const COMPUTER_OPTIONS: ChipsFieldOptionsMap = {
  type: [
    "Laptop",
    "Desktop",
    "Component",
    "Peripheral",
    "Networking",
    "Printer",
    "Software",
    "Accessory",
  ],
  condition: CONDITIONS,
  brand: BRANDS,
  warranty: WARRANTY,
  features: GENERIC_FEATURES,
};

const CAMERA_OPTIONS: ChipsFieldOptionsMap = {
  type: [
    "Digital Camera",
    "CCTV",
    "Drone",
    "Lens",
    "Tripod",
    "Lighting",
    "Accessory",
  ],
  condition: CONDITIONS,
  brand: BRANDS,
  warranty: WARRANTY,
  features: GENERIC_FEATURES,
};

const GAMING_OPTIONS: ChipsFieldOptionsMap = {
  type: ["Console", "Game", "Controller", "Gaming Accessory"],
  condition: CONDITIONS,
  brand: BRANDS,
  warranty: WARRANTY,
  features: GENERIC_FEATURES,
};

const TOOLS_OPTIONS: ChipsFieldOptionsMap = {
  type: ["Electrical", "Hand Tool", "Power Tool", "DIY Equipment"],
  condition: CONDITIONS,
  brand: BRANDS,
  warranty: WARRANTY,
  features: GENERIC_FEATURES,
};

const POWER_OPTIONS: ChipsFieldOptionsMap = {
  type: [
    "Solar Inverter",
    "Generator",
    "UPS",
    "Battery",
    "Solar Accessory",
    "Solar Panel",
  ],
  condition: CONDITIONS,
  brand: BRANDS,
  warranty: WARRANTY,
  features: GENERIC_FEATURES,
};

export const ELECTRONICS_HOME_APPLIANCES_FIELD_OPTIONS_BY_SUBCATEGORY: Record<
  string,
  ChipsFieldOptionsMap
> = {
  "other-home-appliances": {
    type: [
      "Microwave Oven",
      "Electric Kettle",
      "Toaster",
      "Food Processor",
      "Vacuum Cleaner",
      "Iron",
      "Heater",
      "Other",
    ],
    condition: CONDITIONS,
    brand: ["Dawlance", "PEL", "Haier", "Orient", "Kenwood", "Other"],
    warranty: WARRANTY,
    power_source: ["Electric", "Battery", "Gas", "Manual"],
    features: [
      "Energy Efficient",
      "Low Noise",
      "Portable",
      "Original Parts",
      "Imported",
    ],
  },

  "sewing-machines": {
    type: ["Domestic", "Industrial", "Portable", "Computerized"],
    condition: CONDITIONS,
    brand: ["Singer", "Juki", "Brother", "Janome", "Other"],
    machine_type: ["Manual", "Electric", "Computerized"],
    stitch_options: ["Basic", "Multiple", "Embroidery", "Overlock"],
    warranty: WARRANTY,
    features: [
      "High Speed",
      "Embroidery Support",
      "Portable",
      "Foot Pedal",
      "Motor Included",
    ],
  },

  "water-dispensers": {
    type: ["Top Load", "Bottom Load", "Table Top", "Cabinet Type"],
    condition: CONDITIONS,
    brand: ["PEL", "Dawlance", "Orient", "Haier", "Midea", "Other"],
    dispenser_type: ["Top Load", "Bottom Load", "Table Top"],
    cooling_heating: [
      "Cooling Only",
      "Heating Only",
      "Hot & Cold",
      "Normal+Cold+Hot",
    ],
    capacity: ["2-5 Liters", "6-10 Liters", "11-15 Liters", "15+ Liters"],
    warranty: WARRANTY,
    features: [
      "Compressor Cooling",
      "Child Lock",
      "Low Noise",
      "Energy Saving",
    ],
  },

  "air-purifiers": {
    type: [
      "Room Purifier",
      "Car Purifier",
      "Portable Purifier",
      "Smart Purifier",
    ],
    condition: CONDITIONS,
    brand: ["Xiaomi", "Philips", "Dyson", "Panasonic", "Other"],
    coverage_area: [
      "Up to 150 sq ft",
      "151-300 sq ft",
      "301-500 sq ft",
      "500+ sq ft",
    ],
    filter_type: ["HEPA", "Carbon", "Pre-Filter", "HEPA+Carbon", "Multi-Layer"],
    smart_features: [
      "App Control",
      "Air Quality Sensor",
      "Auto Mode",
      "Sleep Mode",
    ],
    warranty: WARRANTY,
    features: [
      "Silent Operation",
      "Energy Efficient",
      "Air Quality Indicator",
      "Timer",
      "Child Lock",
    ],
  },

  ...mapSubcategories(KITCHEN_APPLIANCES_IDS, KITCHEN_OPTIONS),
  ...mapSubcategories(COOLING_STORAGE_IDS, COOLING_OPTIONS),
  ...mapSubcategories(LAUNDRY_IDS, LAUNDRY_OPTIONS),
  ...mapSubcategories(FANS_IDS, FAN_OPTIONS),
  ...mapSubcategories(AC_COOLER_IDS, CLIMATE_OPTIONS),
  ...mapSubcategories(HEATING_IDS, HEATING_OPTIONS),
  ...mapSubcategories(IRONING_IDS, IRONING_OPTIONS),
  ...mapSubcategories(MICROWAVE_OVEN_IDS, MICROWAVE_OPTIONS),
  ...mapSubcategories(TV_IDS, TV_OPTIONS),
  ...mapSubcategories(VIDEO_AUDIO_IDS, AUDIO_OPTIONS),
  ...mapSubcategories(COMPUTERS_IDS, COMPUTER_OPTIONS),
  ...mapSubcategories(CAMERA_IDS, CAMERA_OPTIONS),
  ...mapSubcategories(GAMING_IDS, GAMING_OPTIONS),
  ...mapSubcategories(TOOLS_IDS, TOOLS_OPTIONS),
  ...mapSubcategories(POWER_SOLUTION_IDS, POWER_OPTIONS),
};
