import type { ChipsFieldOptionsMap } from "@/config/chipsOptions/types";

const MAKES = [
  "Honda",
  "Yamaha",
  "Suzuki",
  "Kawasaki",
  "Unique",
  "Road Prince",
  "United",
  "Super Power",
  "Benelli",
  "Others",
];

const ENGINE_TYPE = ["2 Stroke", "4 Stroke", "Electric"];

const ENGINE_CAPACITY = [
  "< 50cc",
  "70cc",
  "100cc - 149cc",
  "150cc - 199cc",
  "200cc - 249cc",
  "250cc - 299cc",
  "300cc - 499cc",
  "500cc - 699cc",
  "700cc - 999cc",
  "1000cc",
  "Above 1000cc",
];

const REGISTRATION_CITY = [
  "Islamabad",
  "Karachi",
  "Lahore",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Hyderabad",
  "Gujranwala",
  "Other",
];

const CONDITION = ["New", "Used", "Like New", "Refurbished"];
const FUEL_TYPE = ["Petrol", "Electric", "Hybrid"];
const MATERIAL = [
  "Plastic",
  "Metal",
  "Steel",
  "Aluminum",
  "Rubber",
  "Leather",
  "Carbon Fiber",
];
const COMPATIBLE_WITH = [
  "70cc",
  "100cc",
  "125cc",
  "150cc",
  "200cc",
  "Universal",
  "Other",
];
const WARRANTY = [
  "No",
  "7 Days",
  "15 Days",
  "1 Month",
  "3 Months",
  "6 Months",
  "1 Year",
];
const FEATURES = [
  "Original",
  "Imported",
  "Heavy Duty",
  "Water Resistant",
  "Anti-Rust",
  "Easy Install",
];

const mapSubcategories = (
  ids: string[],
  options: ChipsFieldOptionsMap,
): Record<string, ChipsFieldOptionsMap> =>
  Object.fromEntries(ids.map((id) => [id, options])) as Record<
    string,
    ChipsFieldOptionsMap
  >;

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

const MOTORCYCLE_OPTIONS: ChipsFieldOptionsMap = {
  make: MAKES,
  engine_type: ENGINE_TYPE,
  engine_capacity: ENGINE_CAPACITY,
  fuel_type: FUEL_TYPE,
  registration_city: REGISTRATION_CITY,
  condition: CONDITION,
};

const ACCESSORY_OPTIONS: ChipsFieldOptionsMap = {
  type: [
    "Safety",
    "Cover",
    "Security",
    "Riding Gear",
    "Electrical",
    "Maintenance",
    "Comfort",
    "Styling",
    "Other",
  ],
  condition: CONDITION,
  material: MATERIAL,
  compatible_with: COMPATIBLE_WITH,
  features: FEATURES,
};

const SPARE_PART_OPTIONS: ChipsFieldOptionsMap = {
  part_type: [
    "Engine",
    "Electrical",
    "Body",
    "Suspension",
    "Braking",
    "Transmission",
    "Wheel",
    "Fuel System",
    "Other",
  ],
  condition: CONDITION,
  compatible_with: COMPATIBLE_WITH,
  warranty: WARRANTY,
  features: FEATURES,
};

const BIKE_CARE_OPTIONS: ChipsFieldOptionsMap = {
  service_type: [
    "Cleaning Kit",
    "Shampoo",
    "Polish",
    "Degreaser",
    "Brush Set",
    "Chain Cleaner",
  ],
  condition: CONDITION,
  features: FEATURES,
};

export const BIKE_FIELD_OPTIONS_BY_SUBCATEGORY: Record<
  string,
  ChipsFieldOptionsMap
> = {
  "atv-quads": {
    ...MOTORCYCLE_OPTIONS,
  },
  ...mapSubcategories(MOTORCYCLE_IDS, MOTORCYCLE_OPTIONS),
  ...mapSubcategories(BIKE_ACCESSORY_IDS, ACCESSORY_OPTIONS),
  ...mapSubcategories(BIKE_SPARE_PART_IDS, SPARE_PART_OPTIONS),
  "cleaning-tools": BIKE_CARE_OPTIONS,
};
