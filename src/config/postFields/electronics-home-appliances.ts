import type { Field } from "@/config/postFields/types";

const COMMON_APPLIANCE_FIELDS: Field[] = [
  { key: "type", label: "Type", type: "select", required: true },
  { key: "condition", label: "Condition", type: "chips", required: true },
  {
    key: "brand",
    label: "Brand",
    type: "select",
  },
  {
    key: "model",
    label: "Model",
    type: "text",
    placeholder: "e.g. XYZ-2024",
  },
  {
    key: "warranty",
    label: "Warranty",
    type: "chips",
  },
  {
    key: "features",
    label: "Features",
    type: "multi-select",
  },
];

export const ELECTRONICS_HOME_APPLIANCES_POST_FIELDS_BY_SUBCATEGORY: Record<
  string,
  Field[]
> = {
  "other-home-appliances": [
    ...COMMON_APPLIANCE_FIELDS,
    {
      key: "power_source",
      label: "Power Source",
      type: "chips",
    },
  ],

  "sewing-machines": [
    ...COMMON_APPLIANCE_FIELDS,
    {
      key: "machine_type",
      label: "Machine Type",
      type: "select",
      required: true,
    },
    {
      key: "stitch_options",
      label: "Stitch Options",
      type: "select",
    },
  ],

  "water-dispensers": [
    ...COMMON_APPLIANCE_FIELDS,
    {
      key: "dispenser_type",
      label: "Dispenser Type",
      type: "select",
      required: true,
    },
    {
      key: "cooling_heating",
      label: "Cooling/Heating",
      type: "chips",
    },
    {
      key: "capacity",
      label: "Capacity",
      type: "select",
    },
  ],

  "air-purifiers": [
    ...COMMON_APPLIANCE_FIELDS,
    {
      key: "coverage_area",
      label: "Coverage Area",
      type: "select",
    },
    {
      key: "filter_type",
      label: "Filter Type",
      type: "select",
      required: true,
    },
    {
      key: "smart_features",
      label: "Smart Features",
      type: "chips",
    },
  ],
};
