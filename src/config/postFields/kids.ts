import type { Field } from "@/config/postFields/types";

const COMMON_KIDS_FIELDS: Field[] = [
  {
    key: "condition",
    label: "Condition",
    type: "chips",
    required: true,
  },
  {
    key: "age_group",
    label: "Age Group",
    type: "chips",
    required: true,
  },
  {
    key: "brand",
    label: "Brand",
    type: "text",
    placeholder: "e.g. Fisher Price, LEGO, Chicco",
  },
  {
    key: "features",
    label: "Features",
    type: "multi-select",
  },
];

export const KIDS_POST_FIELDS_BY_SUBCATEGORY: Record<string, Field[]> = {
  toys: [
    ...COMMON_KIDS_FIELDS,
    {
      key: "toy_type",
      label: "Toy Type",
      type: "select",
      required: true,
    },
    {
      key: "material",
      label: "Material",
      type: "select",
    },
  ],

  "swing-slides": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "equipment_type",
      label: "Equipment Type",
      type: "select",
      required: true,
    },
    {
      key: "material",
      label: "Material",
      type: "select",
    },
    {
      key: "size",
      label: "Size",
      type: "select",
    },
  ],

  "kids-accessories": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "accessory_type",
      label: "Accessory Type",
      type: "select",
      required: true,
    },
    {
      key: "size",
      label: "Size",
      type: "select",
    },
  ],

  "kids-furniture": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "furniture_type",
      label: "Furniture Type",
      type: "select",
      required: true,
    },
    {
      key: "material",
      label: "Material",
      type: "select",
    },
    {
      key: "color",
      label: "Color",
      type: "text",
    },
  ],

  "bath-diapers": [
    ...COMMON_KIDS_FIELDS,
    {
      key: "product_type",
      label: "Product Type",
      type: "select",
      required: true,
    },
    {
      key: "size",
      label: "Size",
      type: "select",
    },
  ],
};
