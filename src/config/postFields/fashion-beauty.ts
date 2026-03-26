import type { Field } from "@/config/postFields/types";

const COMMON_FASHION_FIELDS: Field[] = [
  {
    key: "condition",
    label: "Condition",
    type: "chips",
    required: true,
  },
  {
    key: "gender",
    label: "Gender",
    type: "chips",
  },
  {
    key: "brand",
    label: "Brand",
    type: "text",
    placeholder: "e.g. Casio, Nike, Chanel",
  },
  {
    key: "features",
    label: "Features",
    type: "multi-select",
  },
];

export const FASHION_BEAUTY_POST_FIELDS_BY_SUBCATEGORY: Record<
  string,
  Field[]
> = {
  watches: [
    ...COMMON_FASHION_FIELDS,
    {
      key: "watch_type",
      label: "Watch Type",
      type: "select",
      required: true,
    },
    {
      key: "movement",
      label: "Movement",
      type: "select",
    },
    {
      key: "strap_material",
      label: "Strap Material",
      type: "select",
    },
  ],

  footwear: [
    ...COMMON_FASHION_FIELDS,
    {
      key: "type",
      label: "Type",
      type: "select",
      required: true,
    },
    {
      key: "size",
      label: "Size",
      type: "select",
      required: true,
    },
    {
      key: "material",
      label: "Material",
      type: "select",
    },
  ],

  jewellery: [
    ...COMMON_FASHION_FIELDS,
    {
      key: "type",
      label: "Type",
      type: "select",
      required: true,
    },
    {
      key: "material",
      label: "Material",
      type: "select",
    },
    {
      key: "stone_type",
      label: "Stone Type",
      type: "select",
    },
  ],

  bags: [
    ...COMMON_FASHION_FIELDS,
    {
      key: "type",
      label: "Type",
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

  fragrance: [
    ...COMMON_FASHION_FIELDS,
    {
      key: "fragrance_type",
      label: "Fragrance Type",
      type: "select",
      required: true,
    },
    {
      key: "volume",
      label: "Volume",
      type: "select",
    },
    {
      key: "concentration",
      label: "Concentration",
      type: "select",
    },
  ],

  "other-fashion": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "type",
      label: "Type",
      type: "select",
      required: true,
    },
  ],

  "diy-jewellery": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "kit_type",
      label: "Kit Type",
      type: "select",
      required: true,
    },
    {
      key: "material",
      label: "Material",
      type: "select",
    },
    {
      key: "skill_level",
      label: "Skill Level",
      type: "chips",
    },
  ],
};
