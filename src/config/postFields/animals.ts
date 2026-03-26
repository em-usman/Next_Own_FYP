import type { Field } from "@/config/postFields/types";

const COMMON_ANIMAL_FIELDS: Field[] = [
  { key: "type", label: "Type", type: "select", required: true },
  {
    key: "age",
    label: "Age (Months)",
    type: "number",
    placeholder: "e.g. 8",
  },
  { key: "gender", label: "Gender", type: "chips" },
  { key: "health", label: "Health", type: "chips" },
  { key: "vaccinated", label: "Vaccinated", type: "chips" },
  {
    key: "features",
    label: "Features",
    type: "multi-select",
  },
];

export const ANIMAL_POST_FIELDS_BY_SUBCATEGORY: Record<string, Field[]> = {
  hens: [...COMMON_ANIMAL_FIELDS],
  cats: [...COMMON_ANIMAL_FIELDS],
  parrots: [...COMMON_ANIMAL_FIELDS],
  dogs: [...COMMON_ANIMAL_FIELDS],
  pigeons: [...COMMON_ANIMAL_FIELDS],
  rabbits: [...COMMON_ANIMAL_FIELDS],
  finches: [...COMMON_ANIMAL_FIELDS],
  fish: [
    { key: "type", label: "Type", type: "select", required: true },
    {
      key: "size",
      label: "Size",
      type: "chips",
    },
    {
      key: "water_type",
      label: "Water Type",
      type: "chips",
    },
    {
      key: "features",
      label: "Features",
      type: "multi-select",
    },
  ],
  "fertile-eggs": [
    { key: "type", label: "Type", type: "select", required: true },
    {
      key: "quantity",
      label: "Quantity",
      type: "number",
      required: true,
      placeholder: "e.g. 24",
    },
    {
      key: "fertility_rate",
      label: "Fertility Rate",
      type: "chips",
    },
  ],
  "other-birds": [
    { key: "type", label: "Type", type: "select", required: true },
    {
      key: "age",
      label: "Age (Months)",
      type: "number",
      placeholder: "e.g. 10",
    },
    { key: "gender", label: "Gender", type: "chips" },
    { key: "health", label: "Health", type: "chips" },
    {
      key: "features",
      label: "Features",
      type: "multi-select",
    },
  ],
  ducks: [...COMMON_ANIMAL_FIELDS],
  "other-animals": [
    { key: "type", label: "Type", type: "select", required: true },
    {
      key: "age",
      label: "Age (Months)",
      type: "number",
      placeholder: "e.g. 12",
    },
    { key: "gender", label: "Gender", type: "chips" },
    { key: "health", label: "Health", type: "chips" },
    {
      key: "features",
      label: "Features",
      type: "multi-select",
    },
  ],
  doves: [...COMMON_ANIMAL_FIELDS],
  peacocks: [...COMMON_ANIMAL_FIELDS],
  horses: [
    { key: "type", label: "Type", type: "select", required: true },
    {
      key: "age",
      label: "Age (Years)",
      type: "number",
      placeholder: "e.g. 4",
    },
    { key: "gender", label: "Gender", type: "chips" },
    {
      key: "height",
      label: "Height (Hands)",
      type: "number",
      placeholder: "e.g. 15",
    },
    {
      key: "features",
      label: "Features",
      type: "multi-select",
    },
  ],
};
