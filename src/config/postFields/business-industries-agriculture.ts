import type { Field } from "@/config/postFields/types";

const COMMON_BIA_BUSINESS_FIELDS: Field[] = [
  { key: "type", label: "Type", type: "select", required: true },
  { key: "condition", label: "Condition", type: "chips", required: true },
  { key: "business_stage", label: "Business Stage", type: "select" },
  { key: "availability", label: "Availability", type: "select" },
  { key: "features", label: "Features", type: "multi-select" },
];

const COMMON_BIA_AGRICULTURE_FIELDS: Field[] = [
  { key: "type", label: "Type", type: "select", required: true },
  { key: "condition", label: "Condition", type: "chips", required: true },
  {
    key: "quantity",
    label: "Quantity",
    type: "text",
    placeholder: "e.g. 50 kg",
  },
  { key: "origin", label: "Origin", type: "select" },
  { key: "features", label: "Features", type: "multi-select" },
];

const COMMON_BIA_MACHINERY_FIELDS: Field[] = [
  { key: "type", label: "Type", type: "select", required: true },
  { key: "condition", label: "Condition", type: "chips", required: true },
  { key: "power_source", label: "Power Source", type: "select" },
  { key: "capacity", label: "Capacity", type: "select" },
  { key: "warranty", label: "Warranty", type: "chips" },
  { key: "features", label: "Features", type: "multi-select" },
];

const COMMON_BIA_MEDICAL_FIELDS: Field[] = [
  { key: "type", label: "Type", type: "select", required: true },
  { key: "condition", label: "Condition", type: "chips", required: true },
  { key: "regulatory_status", label: "Regulatory Status", type: "select" },
  { key: "sterile", label: "Sterile", type: "chips" },
  { key: "warranty", label: "Warranty", type: "chips" },
  { key: "features", label: "Features", type: "multi-select" },
];

const COMMON_BIA_FOOD_FIELDS: Field[] = [
  { key: "type", label: "Type", type: "select", required: true },
  { key: "condition", label: "Condition", type: "chips", required: true },
  { key: "fuel_type", label: "Fuel Type", type: "select" },
  { key: "capacity", label: "Capacity", type: "select" },
  { key: "availability", label: "Availability", type: "select" },
  { key: "features", label: "Features", type: "multi-select" },
];

const mapSubcategories = (
  ids: string[],
  fields: Field[],
): Record<string, Field[]> =>
  Object.fromEntries(ids.map((id) => [id, fields])) as Record<string, Field[]>;

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

export const BUSINESS_INDUSTRIES_AGRICULTURE_POST_FIELDS_BY_SUBCATEGORY: Record<
  string,
  Field[]
> = {
  "other-business-industry": COMMON_BIA_BUSINESS_FIELDS,
  ...mapSubcategories(AGRICULTURE_IDS, COMMON_BIA_AGRICULTURE_FIELDS),
  ...mapSubcategories(BUSINESS_FOR_SALE_IDS, COMMON_BIA_BUSINESS_FIELDS),
  ...mapSubcategories(CONSTRUCTION_HEAVY_IDS, COMMON_BIA_MACHINERY_FIELDS),
  ...mapSubcategories(TRADE_INDUSTRIAL_IDS, COMMON_BIA_MACHINERY_FIELDS),
  ...mapSubcategories(MEDICAL_PHARMA_IDS, COMMON_BIA_MEDICAL_FIELDS),
  ...mapSubcategories(FOOD_RESTAURANTS_IDS, COMMON_BIA_FOOD_FIELDS),
};
