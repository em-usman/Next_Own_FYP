import type { Field } from "@/config/postFields/types";

const COMMON_FURNITURE_FIELDS: Field[] = [
  { key: "type", label: "Type", type: "select", required: true },
  { key: "condition", label: "Condition", type: "chips" },
  { key: "brand", label: "Brand", type: "text" },
  {
    key: "features",
    label: "Features",
    type: "multi-select",
  },
];

const HOUSEHOLD_ITEMS_FIELDS: Field[] = [
  { key: "type", label: "Type", type: "select", required: true },
  { key: "condition", label: "Condition", type: "chips" },
  { key: "brand", label: "Brand", type: "text" },
  {
    key: "material",
    label: "Material",
    type: "chips",
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

export const FURNITURE_HOME_DECOR_POST_FIELDS_BY_SUBCATEGORY: Record<
  string,
  Field[]
> = {
  "other-household-items": HOUSEHOLD_ITEMS_FIELDS,
  "home-diy-renovation": HOME_DIY_FIELDS,
};
