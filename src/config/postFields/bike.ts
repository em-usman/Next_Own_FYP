import type { Field } from "@/config/postFields/types";

export const BIKE_POST_FIELDS_BY_SUBCATEGORY: Record<string, Field[]> = {
  "atv-quads": [
    {
      key: "make",
      label: "Make",
      type: "chips",
      required: true,
    },
    {
      key: "year",
      label: "Year",
      type: "number",
      required: true,
      placeholder: "e.g. 2021",
    },
    {
      key: "km_driven",
      label: "KM's driven",
      type: "number",
      required: true,
      placeholder: "e.g. 12000",
    },
    {
      key: "engine_type",
      label: "Engine Type",
      type: "chips",
      required: true,
    },
    {
      key: "engine_capacity",
      label: "Engine Capacity",
      type: "select",
      required: true,
    },
    {
      key: "registration_city",
      label: "Registration City",
      type: "select",
    },
    {
      key: "condition",
      label: "Condition",
      type: "chips",
      required: true,
    },
  ],
};
