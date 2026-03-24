import type { Field } from "@/config/postFields/types";

export const VEHICLE_POST_FIELDS_BY_SUBCATEGORY: Record<string, Field[]> = {
  cars: [
    {
      key: "brand_model",
      label: "Make & Model",
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
      key: "km_driven",
      label: "KM Driven",
      type: "number",
      required: true,
    },
    {
      key: "year",
      label: "Year",
      type: "number",
      required: true,
    },
    {
      key: "fuel",
      label: "Fuel",
      type: "select",
    },
    {
      key: "transmission",
      label: "Transmission",
      type: "chips",
    },
    {
      key: "body_type",
      label: "Body Type",
      type: "select",
    },
    {
      key: "color",
      label: "Color",
      type: "select",
    },
    {
      key: "seats",
      label: "Number of Seats",
      type: "number",
    },
    {
      key: "features",
      label: "Features",
      type: "multi-select",
    },
    {
      key: "owners",
      label: "Number of Owners",
      type: "number",
    },
    {
      key: "registration_city",
      label: "Registration City",
      type: "select",
    },
    {
      key: "documents",
      label: "Car Documents",
      type: "chips",
    },
    {
      key: "assembly",
      label: "Assembly",
      type: "chips",
    },
  ],

  "buses-vans-trucks": [
    {
      key: "year",
      label: "Year",
      type: "number",
      required: true,
    },
    {
      key: "km_driven",
      label: "KM Driven",
      type: "number",
      required: true,
    },
    {
      key: "condition",
      label: "Condition",
      type: "chips",
      required: true,
    },
  ],

  "rickshaw-chingchi": [
    {
      key: "year",
      label: "Year",
      type: "number",
      required: true,
    },
    {
      key: "km_driven",
      label: "KM Driven",
      type: "number",
      required: true,
    },
    {
      key: "condition",
      label: "Condition",
      type: "chips",
      required: true,
    },
  ],

  "tractors-trailers": [
    {
      key: "year",
      label: "Year",
      type: "number",
      required: true,
    },
    {
      key: "km_driven",
      label: "KM Driven",
      type: "number",
      required: true,
    },
    {
      key: "condition",
      label: "Condition",
      type: "chips",
      required: true,
    },
  ],

  "cars-on-installments": [
    {
      key: "brand_model",
      label: "Make & Model",
      type: "brand-model",
      required: true,
    },
    {
      key: "year",
      label: "Year",
      type: "number",
      required: true,
    },
    {
      key: "condition",
      label: "Condition",
      type: "chips",
      required: true,
    },
    {
      key: "transmission",
      label: "Transmission",
      type: "chips",
    },
    {
      key: "registered",
      label: "Registered",
      type: "chips",
    },
    {
      key: "down_payment",
      label: "Down Payment",
      type: "number",
    },
    {
      key: "monthly_payment",
      label: "Monthly Payment",
      type: "number",
    },
    {
      key: "installment_plan",
      label: "Installment Plan",
      type: "text",
    },
    {
      key: "fuel",
      label: "Fuel",
      type: "select",
    },
    {
      key: "body_type",
      label: "Body Type",
      type: "select",
    },
    {
      key: "color",
      label: "Color",
      type: "select",
    },
    {
      key: "seats",
      label: "Number of Seats",
      type: "number",
    },
    {
      key: "registration_city",
      label: "Registration City",
      type: "select",
    },
    {
      key: "documents",
      label: "Car Documents",
      type: "chips",
    },
    {
      key: "assembly",
      label: "Assembly",
      type: "chips",
    },
    {
      key: "features",
      label: "Features",
      type: "multi-select",
    },
  ],

  "other-vehicles": [
    {
      key: "title",
      label: "Title",
      type: "text",
    },
    {
      key: "description",
      label: "Description",
      type: "textarea",
    },
    {
      key: "condition",
      label: "Condition",
      type: "chips",
    },
    {
      key: "price",
      label: "Price",
      type: "number",
    },
  ],

  boats: [
    {
      key: "type",
      label: "Boat Type",
      type: "text",
    },
    {
      key: "year",
      label: "Year",
      type: "number",
    },
    {
      key: "condition",
      label: "Condition",
      type: "chips",
    },
    {
      key: "engine",
      label: "Engine Details",
      type: "text",
    },
    {
      key: "capacity",
      label: "Passenger Capacity",
      type: "number",
    },
    {
      key: "description",
      label: "Description",
      type: "textarea",
    },
  ],
};
