import type { Field } from "@/config/postFields/types";

export const PROPERTY_RENT_POST_FIELDS_BY_SUBCATEGORY: Record<string, Field[]> =
  {
    "rent-houses": [
      { key: "type", label: "Type", type: "select", required: true },
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
      { key: "floors", label: "Floors", type: "select" },
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
      { key: "furnished", label: "Furnished", type: "chips" },
      { key: "parking_spaces", label: "Parking Spaces", type: "select" },
      {
        key: "availability",
        label: "Availability",
        type: "select",
        required: true,
      },
      {
        key: "features",
        label: "Features",
        type: "multi-select",
      },
    ],

    "rent-apartments-flats": [
      { key: "type", label: "Type", type: "select", required: true },
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
      { key: "floor_level", label: "Floor Level", type: "select" },
      { key: "furnished", label: "Furnished", type: "chips" },
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
      {
        key: "availability",
        label: "Availability",
        type: "select",
        required: true,
      },
      {
        key: "features",
        label: "Features",
        type: "multi-select",
      },
    ],

    "rent-portions-floors": [
      { key: "type", label: "Type", type: "select", required: true },
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
      { key: "floor_level", label: "Floor Level", type: "select" },
      { key: "furnished", label: "Furnished", type: "chips" },
      {
        key: "area",
        label: "Area",
        type: "number",
        required: true,
        placeholder: "e.g. 700",
      },
      {
        key: "area_unit",
        label: "Area Unit",
        type: "select",
        required: true,
      },
      {
        key: "availability",
        label: "Availability",
        type: "select",
        required: true,
      },
      {
        key: "features",
        label: "Features",
        type: "multi-select",
      },
    ],

    "rent-rooms": [
      { key: "type", label: "Type", type: "select", required: true },
      {
        key: "attached_bath",
        label: "Attached Bath",
        type: "chips",
        required: true,
      },
      {
        key: "furnished",
        label: "Furnished",
        type: "chips",
      },
      {
        key: "room_capacity",
        label: "Room Capacity",
        type: "select",
      },
      {
        key: "availability",
        label: "Availability",
        type: "select",
        required: true,
      },
      {
        key: "features",
        label: "Features",
        type: "multi-select",
      },
    ],

    "rent-shops-offices-commercial-space": [
      { key: "type", label: "Type", type: "select", required: true },
      {
        key: "area",
        label: "Area",
        type: "number",
        required: true,
        placeholder: "e.g. 450",
      },
      {
        key: "area_unit",
        label: "Area Unit",
        type: "select",
        required: true,
      },
      {
        key: "washrooms",
        label: "Washrooms",
        type: "select",
      },
      { key: "furnished", label: "Furnished", type: "chips" },
      {
        key: "availability",
        label: "Availability",
        type: "select",
        required: true,
      },
      {
        key: "features",
        label: "Features",
        type: "multi-select",
      },
    ],

    "rent-land-plots": [
      { key: "type", label: "Type", type: "select", required: true },
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
        key: "facing",
        label: "Facing",
        type: "chips",
      },
      {
        key: "possession",
        label: "Possession",
        type: "chips",
      },
      {
        key: "availability",
        label: "Availability",
        type: "select",
        required: true,
      },
      {
        key: "features",
        label: "Features",
        type: "multi-select",
      },
    ],

    "rent-roommates-paying-guests": [
      {
        key: "accommodation_type",
        label: "Accommodation Type",
        type: "select",
        required: true,
      },
      {
        key: "gender_preference",
        label: "Gender Preference",
        type: "select",
      },
      {
        key: "room_capacity",
        label: "Room Capacity",
        type: "select",
      },
      {
        key: "furnished",
        label: "Furnished",
        type: "chips",
      },
      {
        key: "availability",
        label: "Availability",
        type: "select",
        required: true,
      },
      {
        key: "features",
        label: "Features",
        type: "multi-select",
      },
    ],

    "rent-vacation-rentals-guest-houses": [
      {
        key: "property_type",
        label: "Property Type",
        type: "select",
        required: true,
      },
      {
        key: "bedrooms",
        label: "Bedrooms",
        type: "select",
      },
      {
        key: "bathrooms",
        label: "Bathrooms",
        type: "select",
      },
      {
        key: "guest_capacity",
        label: "Guest Capacity",
        type: "select",
      },
      {
        key: "minimum_stay",
        label: "Minimum Stay (Nights)",
        type: "select",
      },
      {
        key: "availability",
        label: "Availability",
        type: "select",
        required: true,
      },
      {
        key: "features",
        label: "Features",
        type: "multi-select",
      },
    ],
  };
