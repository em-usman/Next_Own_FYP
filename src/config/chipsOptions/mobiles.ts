import type { ChipsFieldOptionsMap } from "@/config/chipsOptions/types";

export const MOBILE_CHIPS_BY_SUBCATEGORY: Record<string, ChipsFieldOptionsMap> =
  {
    "mobile-phones": {
      condition: ["New", "Used", "Open Box", "Refurbished"],
      pta_status: ["PTA Approved", "Non PTA"],
      storage: ["32GB", "64GB", "128GB", "256GB", "512GB", "1TB"],
      ram: ["2GB", "3GB", "4GB", "6GB", "8GB", "12GB", "16GB"],
      battery: [
        "Below 3000mAh",
        "3000-4000mAh",
        "4000-5000mAh",
        "Above 5000mAh",
      ],
      warranty: ["Yes", "No"],
    },
    tablets: {
      condition: ["New", "Used", "Open Box", "Refurbished"],
      storage: ["32GB", "64GB", "128GB", "256GB", "512GB"],
      ram: ["2GB", "3GB", "4GB", "6GB", "8GB"],
      warranty: ["Yes", "No"],
    },
    "smart-watches": {
      condition: ["New", "Used", "Open Box"],
      warranty: ["Yes", "No"],
    },
    "landline-phones": {
      condition: ["New", "Used"],
      warranty: ["Yes", "No"],
    },
  };
