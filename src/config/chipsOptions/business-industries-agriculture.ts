import type { ChipsFieldOptionsMap } from "@/config/chipsOptions/types";

const CONDITION = ["New", "Used", "Refurbished", "Imported"];
const AVAILABILITY = [
  "Immediate",
  "Within 7 Days",
  "Within 30 Days",
  "Negotiable",
];
const WARRANTY = [
  "No",
  "7 Days",
  "15 Days",
  "1 Month",
  "3 Months",
  "6 Months",
  "1 Year+",
];
const FEATURES = [
  "Imported",
  "With Documentation",
  "Installed",
  "Training Included",
  "After Sales Support",
  "Heavy Duty",
];

const mapSubcategories = (
  ids: string[],
  options: ChipsFieldOptionsMap,
): Record<string, ChipsFieldOptionsMap> =>
  Object.fromEntries(ids.map((id) => [id, options])) as Record<
    string,
    ChipsFieldOptionsMap
  >;

const AGRICULTURE_IDS = [
  "farm-machinery-equipments",
  "plants-trees",
  "other-agriculture",
  "pesticides-fertilizers",
  "seeds",
  "crops",
  "silage",
];

const BUSINESS_FOR_SALE_IDS = [
  "other-businesses",
  "water-plants",
  "hotels-restaurants-business",
  "beauty-salons",
  "mobile-shops",
  "grocery-stores",
  "pharmacies",
  "snooker-clubs",
  "gyms-business",
  "auto-part-shops",
  "cosmetic-jewellery-shops",
  "franchises",
  "clinics-business",
  "petrol-pumps",
  "gift-toy-shops",
];

const CONSTRUCTION_HEAVY_IDS = [
  "construction-material",
  "other-heavy-equipments",
  "pavers",
  "drill-machines-heavy",
  "water-pumps-heavy",
  "concrete-mixers",
  "compactors",
  "air-compressors-heavy",
  "motor-graders",
  "cranes",
  "construction-lifters",
  "excavators",
  "concrete-cutters",
  "concrete-grinders",
  "road-roller",
  "loaders",
  "bulldozers",
  "dump-truck",
];

const TRADE_INDUSTRIAL_IDS = [
  "other-business-industrial-machines",
  "currency-counting-machines",
  "industry-laser-machines",
  "printing-machines-industrial",
  "packaging-machines",
  "lathe-machines",
  "molding-machines",
  "air-compressors-industrial",
  "sewing-machines-industrial",
  "woodworking-machines",
  "sealing-machines",
  "marking-machines",
  "liquid-filling-machines",
  "textile-machinery",
  "plastic-rubber-processing-machines",
  "welding-equipments",
  "knitting-machines",
  "embroidery-machines",
  "paper-machines",
];

const MEDICAL_PHARMA_IDS = [
  "other-medical-supplies",
  "patient-beds",
  "oxygen-concentrators",
  "ultrasound-machines",
  "wheelchairs",
  "oxygen-cylinders",
  "nebulizers",
  "blood-pressure-monitors",
  "hearing-aids",
  "breast-pumps",
  "walkers",
  "glucometers",
  "commode-chairs",
  "surgical-instruments",
  "x-ray-machines",
  "microscopes",
  "medicines",
  "surgical-masks",
  "sanitizers",
  "thermometers",
  "pulse-oximeters",
  "surgical-gloves",
  "medical-scrubs",
  "lighting-medical",
  "health-accessories",
  "weighing-scales",
];

const FOOD_RESTAURANTS_IDS = [
  "other-restaurant-equipments",
  "food-display-counters",
  "food-stalls",
  "ovens-tandoor",
  "fryers",
  "ice-cream-machines",
  "tables-platforms",
  "chillers",
  "fruit-vegetable-machines",
  "delivery-bags",
  "baking-equipments",
  "crockery-cutlery",
];

const AGRICULTURE_OPTIONS: ChipsFieldOptionsMap = {
  type: [
    "Farm Machinery",
    "Plants & Trees",
    "Pesticides",
    "Fertilizers",
    "Seeds",
    "Crops",
    "Silage",
    "Other",
  ],
  condition: CONDITION,
  origin: ["Local", "Imported", "Organic", "Mixed"],
  features: FEATURES,
};

const BUSINESS_FOR_SALE_OPTIONS: ChipsFieldOptionsMap = {
  type: [
    "Retail",
    "Service",
    "Manufacturing",
    "Food",
    "Health",
    "Franchise",
    "Wholesale",
    "Other",
  ],
  condition: CONDITION,
  business_stage: [
    "Startup",
    "Running Business",
    "Established",
    "Franchise",
    "Expansion",
  ],
  availability: AVAILABILITY,
  features: FEATURES,
};

const MACHINERY_OPTIONS: ChipsFieldOptionsMap = {
  type: [
    "Heavy Machinery",
    "Industrial Machine",
    "Construction Equipment",
    "Processing Machine",
    "Packaging Machine",
    "Fabrication",
    "Other",
  ],
  condition: CONDITION,
  power_source: ["Electric", "Diesel", "Petrol", "Hydraulic", "PTO", "Manual"],
  capacity: ["Small", "Medium", "Large", "Industrial Grade", "Custom"],
  warranty: WARRANTY,
  features: FEATURES,
};

const MEDICAL_OPTIONS: ChipsFieldOptionsMap = {
  type: [
    "Diagnostic",
    "Patient Care",
    "Surgical",
    "Monitoring",
    "Consumables",
    "Pharma",
    "Other",
  ],
  condition: CONDITION,
  regulatory_status: [
    "Registered",
    "Licensed",
    "OTC",
    "Prescription",
    "Not Specified",
  ],
  sterile: ["Yes", "No"],
  warranty: WARRANTY,
  features: FEATURES,
};

const FOOD_OPTIONS: ChipsFieldOptionsMap = {
  type: [
    "Restaurant Equipment",
    "Display",
    "Cooking",
    "Cooling",
    "Prep Machine",
    "Serving",
    "Delivery",
    "Other",
  ],
  condition: CONDITION,
  fuel_type: ["Electric", "Gas", "Diesel", "Manual"],
  capacity: ["Small", "Medium", "Large", "Commercial"],
  availability: AVAILABILITY,
  features: FEATURES,
};

export const BUSINESS_INDUSTRIES_AGRICULTURE_FIELD_OPTIONS_BY_SUBCATEGORY: Record<
  string,
  ChipsFieldOptionsMap
> = {
  "other-business-industry": {
    type: [
      "Industrial Machinery",
      "Business Equipment",
      "Agricultural Equipment",
      "Manufacturing Unit",
      "Wholesale Setup",
      "Retail Setup",
      "Other",
    ],
    condition: ["New", "Used", "Refurbished"],
    business_stage: [
      "Startup",
      "Running Business",
      "Established",
      "Franchise",
      "Expansion",
    ],
    availability: [
      "Immediate",
      "Within 7 Days",
      "Within 30 Days",
      "Negotiable",
    ],
    features: [
      "Imported",
      "With Documentation",
      "Installed",
      "Training Included",
      "After Sales Support",
    ],
  },
  ...mapSubcategories(AGRICULTURE_IDS, AGRICULTURE_OPTIONS),
  ...mapSubcategories(BUSINESS_FOR_SALE_IDS, BUSINESS_FOR_SALE_OPTIONS),
  ...mapSubcategories(CONSTRUCTION_HEAVY_IDS, MACHINERY_OPTIONS),
  ...mapSubcategories(TRADE_INDUSTRIAL_IDS, MACHINERY_OPTIONS),
  ...mapSubcategories(MEDICAL_PHARMA_IDS, MEDICAL_OPTIONS),
  ...mapSubcategories(FOOD_RESTAURANTS_IDS, FOOD_OPTIONS),
};
