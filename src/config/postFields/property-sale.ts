import type { Field } from "@/config/postFields/types";

export const PROPERTY_SALE_POST_FIELDS_BY_SUBCATEGORY: Record<string, Field[]> =
  {
    "land-plots": [
      {
        key: "type",
        label: "Type",
        type: "select",
        required: true,
      },
      {
        key: "area",
        label: "Area",
        type: "number",
        required: true,
        placeholder: "e.g. 5",
      },
      {
        key: "area_unit",
        label: "Area Unit",
        type: "select",
        required: true,
      },
      {
        key: "possession",
        label: "Possession",
        type: "chips",
      },
      {
        key: "facing",
        label: "Facing",
        type: "chips",
      },
      {
        key: "features",
        label: "Features",
        type: "multi-select",
      },
    ],
    houses: [
      {
        key: "type",
        label: "Type",
        type: "select",
        required: true,
      },
      {
        key: "bedrooms",
        label: "Bedrooms",
        type: "select",
        required: true,
      },
      {
        key: "bathrooms",
        label: "Bathrooms",
        type: "select",
        required: true,
      },
      {
        key: "features",
        label: "Features",
        type: "multi-select",
      },
      {
        key: "area",
        label: "Area",
        type: "number",
        required: true,
        placeholder: "e.g. 10",
      },
      {
        key: "area_unit",
        label: "Area Unit",
        type: "select",
        required: true,
      },
      {
        key: "furnished",
        label: "Furnished",
        type: "chips",
      },
      {
        key: "floors",
        label: "Floors",
        type: "select",
        placeholder: "Select total floors (e.g. 2)",
      },
    ],
    "apartments-flats": [
      {
        key: "type",
        label: "Type",
        type: "select",
        required: true,
      },
      {
        key: "bedrooms",
        label: "Bedrooms",
        type: "select",
        required: true,
      },
      {
        key: "bathrooms",
        label: "Bathrooms",
        type: "select",
        required: true,
      },
      {
        key: "floor_level",
        label: "Floor Level",
        type: "select",
      },
      {
        key: "furnished",
        label: "Furnished",
        type: "chips",
      },
      {
        key: "features",
        label: "Features",
        type: "multi-select",
      },
      {
        key: "area",
        label: "Area",
        type: "number",
        required: true,
        placeholder: "e.g. 1200",
      },
      {
        key: "area_unit",
        label: "Area Unit",
        type: "select",
        required: true,
      },
    ],
    "shops-offices-commercial-space": [
      {
        key: "type",
        label: "Type",
        type: "select",
        required: true,
      },
      {
        key: "area",
        label: "Area",
        type: "number",
        required: true,
        placeholder: "e.g. 600",
      },
      {
        key: "area_unit",
        label: "Area Unit",
        type: "select",
        required: true,
      },
      {
        key: "furnished",
        label: "Furnished",
        type: "chips",
      },
      {
        key: "washrooms",
        label: "Washrooms",
        type: "select",
        placeholder: "Select washrooms (up to 10)",
      },
      {
        key: "features",
        label: "Features",
        type: "multi-select",
      },
    ],
    "portions-floors": [
      {
        key: "type",
        label: "Type",
        type: "select",
        required: true,
      },
      {
        key: "bedrooms",
        label: "Bedrooms",
        type: "select",
        required: true,
      },
      {
        key: "bathrooms",
        label: "Bathrooms",
        type: "select",
        required: true,
      },
      {
        key: "floor_level",
        label: "Floor Level",
        type: "select",
      },
      {
        key: "furnished",
        label: "Furnished",
        type: "chips",
      },
      {
        key: "features",
        label: "Features",
        type: "multi-select",
      },
      {
        key: "area",
        label: "Area",
        type: "number",
        required: true,
        placeholder: "e.g. 900",
      },
      {
        key: "area_unit",
        label: "Area Unit",
        type: "select",
        required: true,
      },
    ],
  };
