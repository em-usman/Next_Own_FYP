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
      placeholder: "e.g. 85000",
    },
    {
      key: "year",
      label: "Year",
      type: "number",
      required: true,
      placeholder: "e.g. 2020",
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
      placeholder: "e.g. 5",
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
      placeholder: "e.g. 2",
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
      placeholder: "e.g. 2018",
    },
    {
      key: "km_driven",
      label: "KM Driven",
      type: "number",
      required: true,
      placeholder: "e.g. 120000",
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
      placeholder: "e.g. 2021",
    },
    {
      key: "km_driven",
      label: "KM Driven",
      type: "number",
      required: true,
      placeholder: "e.g. 25000",
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
      placeholder: "e.g. 2019",
    },
    {
      key: "km_driven",
      label: "KM Driven",
      type: "number",
      required: true,
      placeholder: "e.g. 60000",
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
      placeholder: "e.g. 2022",
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
      placeholder: "e.g. 500000",
    },
    {
      key: "monthly_payment",
      label: "Monthly Payment",
      type: "number",
      placeholder: "e.g. 45000",
    },
    {
      key: "installment_plan",
      label: "Installment Plan",
      type: "text",
      placeholder: "e.g. 3 years (36 months)",
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
      placeholder: "e.g. 5",
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
      placeholder: "e.g. Loader Rickshaw for sale",
    },
    {
      key: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Provide details about the vehicle",
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
      placeholder: "e.g. 950000",
    },
  ],

  boats: [
    {
      key: "type",
      label: "Boat Type",
      type: "text",
      placeholder: "e.g. Fishing Boat",
    },
    {
      key: "year",
      label: "Year",
      type: "number",
      placeholder: "e.g. 2017",
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
      placeholder: "e.g. 2x 150HP Outboard",
    },
    {
      key: "capacity",
      label: "Passenger Capacity",
      type: "number",
      placeholder: "e.g. 10",
    },
    {
      key: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Mention condition, accessories, and usage",
    },
  ],
};
