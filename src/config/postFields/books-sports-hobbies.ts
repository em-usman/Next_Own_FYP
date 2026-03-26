import type { Field } from "@/config/postFields/types";

const COMMON_BOOKS_SPORTS_HOBBIES_FIELDS: Field[] = [
  {
    key: "condition",
    label: "Condition",
    type: "chips",
    required: true,
  },
  {
    key: "type",
    label: "Type",
    type: "select",
    required: true,
  },
  {
    key: "brand",
    label: "Brand",
    type: "text",
    placeholder: "e.g. Yonex, Adidas, Decathlon",
  },
  {
    key: "features",
    label: "Features",
    type: "multi-select",
  },
];

export const BOOKS_SPORTS_HOBBIES_POST_FIELDS_BY_SUBCATEGORY: Record<
  string,
  Field[]
> = {
  "gym-fitness": [
    ...COMMON_BOOKS_SPORTS_HOBBIES_FIELDS,
    {
      key: "equipment_type",
      label: "Equipment Type",
      type: "select",
      required: true,
    },
    {
      key: "weight_capacity",
      label: "Weight/Capacity",
      type: "text",
      placeholder: "e.g. 20kg dumbbell, 120kg max load",
    },
    {
      key: "usage",
      label: "Usage",
      type: "chips",
    },
  ],

  "sports-equipment": [
    ...COMMON_BOOKS_SPORTS_HOBBIES_FIELDS,
    {
      key: "sport_type",
      label: "Sport Type",
      type: "select",
      required: true,
    },
    {
      key: "size",
      label: "Size",
      type: "select",
    },
    {
      key: "material",
      label: "Material",
      type: "select",
    },
  ],

  "other-hobbies": [
    ...COMMON_BOOKS_SPORTS_HOBBIES_FIELDS,
    {
      key: "hobby_category",
      label: "Hobby Category",
      type: "select",
      required: true,
    },
    {
      key: "age_group",
      label: "Age Group",
      type: "chips",
    },
  ],

  calendars: [
    ...COMMON_BOOKS_SPORTS_HOBBIES_FIELDS,
    {
      key: "year",
      label: "Year",
      type: "number",
      required: true,
    },
    {
      key: "format",
      label: "Format",
      type: "chips",
    },
    {
      key: "theme",
      label: "Theme",
      type: "select",
    },
  ],
};
