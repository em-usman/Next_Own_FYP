// ── Brand → Models mapping ────────────────────────────────────────
export const MOBILE_BRAND_MODELS: Record<string, string[]> = {
  Apple: [
    "iPhone 16 Pro Max",
    "iPhone 16 Pro",
    "iPhone 16 Plus",
    "iPhone 16",
    "iPhone 15 Pro Max",
    "iPhone 15 Pro",
    "iPhone 15 Plus",
    "iPhone 15",
    "iPhone 14 Pro Max",
    "iPhone 14 Pro",
    "iPhone 14 Plus",
    "iPhone 14",
    "iPhone 13 Pro Max",
    "iPhone 13 Pro",
    "iPhone 13",
    "iPhone 13 Mini",
    "iPhone 12 Pro Max",
    "iPhone 12 Pro",
    "iPhone 12",
    "iPhone 12 Mini",
    "iPhone 11 Pro Max",
    "iPhone 11 Pro",
    "iPhone 11",
    "iPhone XS Max",
    "iPhone XS",
    "iPhone XR",
    "iPhone X",
    "iPhone SE (3rd Gen)",
    "iPhone SE (2nd Gen)",
  ],
  Samsung: [
    "Galaxy S24 Ultra",
    "Galaxy S24+",
    "Galaxy S24",
    "Galaxy S23 Ultra",
    "Galaxy S23+",
    "Galaxy S23",
    "Galaxy S22 Ultra",
    "Galaxy S22+",
    "Galaxy S22",
    "Galaxy A55",
    "Galaxy A54",
    "Galaxy A35",
    "Galaxy A34",
    "Galaxy A15",
    "Galaxy A14",
    "Galaxy A05s",
    "Galaxy Z Fold 5",
    "Galaxy Z Fold 4",
    "Galaxy Z Flip 5",
    "Galaxy Z Flip 4",
    "Galaxy Note 20 Ultra",
    "Galaxy Note 20",
  ],
  Xiaomi: [
    "Xiaomi 14 Ultra",
    "Xiaomi 14 Pro",
    "Xiaomi 14",
    "Xiaomi 13 Ultra",
    "Xiaomi 13 Pro",
    "Xiaomi 13",
    "Redmi Note 13 Pro+",
    "Redmi Note 13 Pro",
    "Redmi Note 13",
    "Redmi Note 12 Pro+",
    "Redmi Note 12 Pro",
    "Redmi Note 12",
    "Redmi 13C",
    "Redmi 12",
    "Redmi A3",
    "POCO X6 Pro",
    "POCO X6",
    "POCO M6 Pro",
  ],
  Oppo: [
    "Oppo Find X7 Ultra",
    "Oppo Find X7",
    "Oppo Find X6 Pro",
    "Oppo Reno 11 Pro",
    "Oppo Reno 11",
    "Oppo Reno 10 Pro",
    "Oppo A98",
    "Oppo A78",
    "Oppo A58",
    "Oppo A38",
    "Oppo A18",
  ],
  Vivo: [
    "Vivo X100 Pro",
    "Vivo X100",
    "Vivo X90 Pro",
    "Vivo V29 Pro",
    "Vivo V29",
    "Vivo V27 Pro",
    "Vivo Y100",
    "Vivo Y78",
    "Vivo Y36",
    "Vivo Y17s",
  ],
  OnePlus: [
    "OnePlus 12 Pro",
    "OnePlus 12",
    "OnePlus 11 Pro",
    "OnePlus 11",
    "OnePlus Nord 3",
    "OnePlus Nord CE 3",
    "OnePlus 10 Pro",
    "OnePlus 10T",
  ],
  Huawei: [
    "Huawei Mate 60 Pro",
    "Huawei Mate 60",
    "Huawei P60 Pro",
    "Huawei Nova 11 Pro",
    "Huawei Nova 11",
    "Huawei Nova 10",
  ],
  Infinix: [
    "Infinix Zero 30",
    "Infinix Zero 20",
    "Infinix Note 40 Pro",
    "Infinix Note 40",
    "Infinix Note 30",
    "Infinix Hot 40 Pro",
    "Infinix Hot 40",
    "Infinix Hot 30",
    "Infinix Smart 8",
    "Infinix Smart 7",
  ],
  Tecno: [
    "Tecno Phantom X2 Pro",
    "Tecno Phantom X2",
    "Tecno Camon 20 Pro",
    "Tecno Camon 20",
    "Tecno Spark 20 Pro",
    "Tecno Spark 20",
    "Tecno Pop 8",
    "Tecno Pop 7 Pro",
  ],
  Nokia: [
    "Nokia G42",
    "Nokia G22",
    "Nokia G21",
    "Nokia C32",
    "Nokia C22",
    "Nokia C12",
    "Nokia XR21",
    "Nokia X30",
  ],
  Realme: [
    "Realme GT 5 Pro",
    "Realme GT 5",
    "Realme 11 Pro+",
    "Realme 11 Pro",
    "Realme 11",
    "Realme C67",
    "Realme C55",
    "Realme C53",
  ],
  Motorola: [
    "Motorola Edge 40 Pro",
    "Motorola Edge 40",
    "Motorola G84",
    "Motorola G54",
    "Motorola G34",
    "Motorola G14",
    "Motorola G13",
  ],
  Other: ["Other"],
};

export const MOBILE_BRANDS = Object.keys(MOBILE_BRAND_MODELS);

// ── Types ─────────────────────────────────────────────────────────
export type FieldType =
  | "text"
  | "select"
  | "number"
  | "textarea"
  | "brand-model"
  | "chips";

export type Field = {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
  required?: boolean;
};

export type SubCategory = {
  id: string;
  label: string;
  icon: string;
  children?: SubCategory[];
  fields?: Field[];
};

export type CategoryData = {
  id: string;
  label: string;
  icon: string;
  subCategories: SubCategory[];
};

export const CATEGORIES: CategoryData[] = [
  {
    id: "mobiles",
    label: "Mobiles",
    icon: "phone-portrait-outline",
    subCategories: [
      {
        id: "mobile-phones",
        label: "Mobile Phones",
        icon: "phone-portrait-outline",
        fields: [
          {
            key: "brand_model",
            label: "Brand & Model",
            type: "brand-model",
            required: true,
          },
          {
            key: "condition",
            label: "Condition",
            type: "chips",
            required: true,
            options: ["New", "Used", "Open Box", "Refurbished"],
          },
          {
            key: "pta_status",
            label: "PTA Status",
            type: "chips",
            required: true,
            options: ["PTA Approved", "Non PTA"],
          },
          {
            key: "storage",
            label: "Storage",
            type: "chips",
            options: ["32GB", "64GB", "128GB", "256GB", "512GB", "1TB"],
          },
          {
            key: "ram",
            label: "RAM",
            type: "chips",
            options: ["2GB", "3GB", "4GB", "6GB", "8GB", "12GB", "16GB"],
          },
          {
            key: "battery",
            label: "Battery",
            type: "chips",
            options: [
              "Below 3000mAh",
              "3000-4000mAh",
              "4000-5000mAh",
              "Above 5000mAh",
            ],
          },
          {
            key: "warranty",
            label: "Warranty",
            type: "chips",
            options: ["Yes", "No"],
          },
          {
            key: "color",
            label: "Color",
            type: "text",
            placeholder: "e.g. Midnight Black",
          },
        ],
      },
      {
        id: "tablets",
        label: "Tablets",
        icon: "tablet-portrait-outline",
        fields: [
          {
            key: "brand_model",
            label: "Brand & Model",
            type: "brand-model",
            required: true,
          },
          {
            key: "condition",
            label: "Condition",
            type: "chips",
            required: true,
            options: ["New", "Used", "Open Box", "Refurbished"],
          },
          {
            key: "storage",
            label: "Storage",
            type: "chips",
            options: ["32GB", "64GB", "128GB", "256GB", "512GB"],
          },
          {
            key: "ram",
            label: "RAM",
            type: "chips",
            options: ["2GB", "3GB", "4GB", "6GB", "8GB"],
          },
          {
            key: "warranty",
            label: "Warranty",
            type: "chips",
            options: ["Yes", "No"],
          },
        ],
      },
      {
        id: "smart-watches",
        label: "Smart Watches",
        icon: "watch-outline",
        fields: [
          {
            key: "brand_model",
            label: "Brand & Model",
            type: "brand-model",
            required: true,
          },
          {
            key: "condition",
            label: "Condition",
            type: "chips",
            required: true,
            options: ["New", "Used", "Open Box"],
          },
          {
            key: "warranty",
            label: "Warranty",
            type: "chips",
            options: ["Yes", "No"],
          },
        ],
      },
      {
        id: "landline-phones",
        label: "Landline Phones",
        icon: "call-outline",
        fields: [
          {
            key: "brand",
            label: "Brand",
            type: "text",
            required: true,
            placeholder: "e.g. Panasonic, Cisco",
          },
          {
            key: "model",
            label: "Model",
            type: "text",
            placeholder: "e.g. KX-TGC220",
          },
          {
            key: "condition",
            label: "Condition",
            type: "chips",
            required: true,
            options: ["New", "Used"],
          },
          {
            key: "warranty",
            label: "Warranty",
            type: "chips",
            options: ["Yes", "No"],
          },
        ],
      },
    ],
  },
];
