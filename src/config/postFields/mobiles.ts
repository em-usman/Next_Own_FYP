import type { Field } from "@/config/postFields/types";

export const MOBILE_POST_FIELDS_BY_SUBCATEGORY: Record<string, Field[]> = {
  "mobile-phones": [
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
    },
    {
      key: "pta_status",
      label: "PTA Status",
      type: "chips",
      required: true,
    },
    {
      key: "storage",
      label: "Storage",
      type: "chips",
    },
    {
      key: "ram",
      label: "RAM",
      type: "chips",
    },
    {
      key: "battery",
      label: "Battery",
      type: "chips",
    },
    {
      key: "warranty",
      label: "Warranty",
      type: "chips",
    },
    {
      key: "color",
      label: "Color",
      type: "text",
      placeholder: "e.g. Midnight Black",
    },
  ],
  tablets: [
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
    },
    {
      key: "storage",
      label: "Storage",
      type: "chips",
    },
    {
      key: "ram",
      label: "RAM",
      type: "chips",
    },
    {
      key: "warranty",
      label: "Warranty",
      type: "chips",
    },
  ],
  "smart-watches": [
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
    },
    {
      key: "warranty",
      label: "Warranty",
      type: "chips",
    },
  ],
  "landline-phones": [
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
    },
    {
      key: "warranty",
      label: "Warranty",
      type: "chips",
    },
  ],
};
