import type { Field } from "@/config/postFields/types";

const COMMON_SERVICE_FIELDS: Field[] = [
  {
    key: "service_mode",
    label: "Service Mode",
    type: "chips",
    required: true,
  },
  {
    key: "experience",
    label: "Experience",
    type: "select",
  },
  {
    key: "availability",
    label: "Availability",
    type: "select",
    required: true,
  },
  {
    key: "price_type",
    label: "Price Type",
    type: "select",
    required: true,
  },
  {
    key: "urgent_service",
    label: "Urgent Service",
    type: "chips",
  },
  {
    key: "features",
    label: "Features",
    type: "multi-select",
  },
];

export const SERVICE_POST_FIELDS_BY_SUBCATEGORY: Record<string, Field[]> = {
  "other-services": [
    { key: "type", label: "Type", type: "select", required: true },
    ...COMMON_SERVICE_FIELDS,
  ],

  "car-rental": [
    {
      key: "vehicle_type",
      label: "Vehicle Type",
      type: "select",
      required: true,
    },
    {
      key: "rental_duration",
      label: "Rental Duration",
      type: "select",
      required: true,
    },
    { key: "with_driver", label: "With Driver", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],

  "tuition-academic": [
    { key: "subject", label: "Subject", type: "select", required: true },
    {
      key: "class_level",
      label: "Class Level",
      type: "select",
      required: true,
    },
    { key: "teaching_mode", label: "Teaching Mode", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],

  "web-development": [
    {
      key: "service_type",
      label: "Service Type",
      type: "select",
      required: true,
    },
    { key: "platform", label: "Platform", type: "select" },
    { key: "turnaround", label: "Turnaround Time", type: "select" },
    ...COMMON_SERVICE_FIELDS,
  ],

  "electronics-computer-repair": [
    {
      key: "device_type",
      label: "Device Type",
      type: "select",
      required: true,
    },
    {
      key: "repair_type",
      label: "Repair Type",
      type: "select",
      required: true,
    },
    { key: "doorstep", label: "Doorstep Service", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],

  "travel-visa": [
    {
      key: "service_type",
      label: "Service Type",
      type: "select",
      required: true,
    },
    { key: "destination", label: "Destination", type: "select" },
    { key: "visa_type", label: "Visa Type", type: "select" },
    ...COMMON_SERVICE_FIELDS,
  ],

  "farms-fresh-food": [
    {
      key: "product_type",
      label: "Product Type",
      type: "select",
      required: true,
    },
    { key: "quantity_unit", label: "Quantity Unit", type: "select" },
    { key: "delivery_available", label: "Delivery Available", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],

  "construction-services": [
    {
      key: "service_type",
      label: "Service Type",
      type: "select",
      required: true,
    },
    { key: "project_type", label: "Project Type", type: "select" },
    { key: "material_included", label: "Material Included", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],

  "event-services": [
    {
      key: "service_type",
      label: "Service Type",
      type: "select",
      required: true,
    },
    { key: "event_type", label: "Event Type", type: "select" },
    { key: "team_size", label: "Team Size", type: "select" },
    ...COMMON_SERVICE_FIELDS,
  ],

  "movers-packers": [
    { key: "move_type", label: "Move Type", type: "select", required: true },
    { key: "vehicle_size", label: "Vehicle Size", type: "select" },
    { key: "packing_included", label: "Packing Included", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],

  "architecture-interior-design": [
    {
      key: "service_type",
      label: "Service Type",
      type: "select",
      required: true,
    },
    { key: "property_type", label: "Property Type", type: "select" },
    { key: "drawing_type", label: "Drawing Type", type: "select" },
    ...COMMON_SERVICE_FIELDS,
  ],

  "video-photography": [
    {
      key: "service_type",
      label: "Service Type",
      type: "select",
      required: true,
    },
    { key: "event_type", label: "Event Type", type: "select" },
    { key: "deliverables", label: "Deliverables", type: "multi-select" },
    ...COMMON_SERVICE_FIELDS,
  ],

  "camera-installation": [
    {
      key: "camera_type",
      label: "Camera Type",
      type: "select",
      required: true,
    },
    { key: "property_type", label: "Property Type", type: "select" },
    { key: "system_size", label: "System Size", type: "select" },
    { key: "warranty", label: "Warranty", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],

  "renting-services": [
    { key: "item_type", label: "Item Type", type: "select", required: true },
    { key: "rental_duration", label: "Rental Duration", type: "select" },
    { key: "delivery_available", label: "Delivery Available", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],

  "car-services": [
    {
      key: "service_type",
      label: "Service Type",
      type: "select",
      required: true,
    },
    { key: "vehicle_type", label: "Vehicle Type", type: "select" },
    { key: "at_home_service", label: "At Home Service", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],

  "catering-restaurent": [
    { key: "cuisine", label: "Cuisine", type: "select", required: true },
    { key: "event_type", label: "Event Type", type: "select" },
    { key: "serving_capacity", label: "Serving Capacity", type: "select" },
    ...COMMON_SERVICE_FIELDS,
  ],

  "tailor-services": [
    {
      key: "service_type",
      label: "Service Type",
      type: "select",
      required: true,
    },
    { key: "gender", label: "Gender", type: "chips" },
    { key: "urgent_delivery", label: "Urgent Delivery", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],

  "insurance-services": [
    {
      key: "insurance_type",
      label: "Insurance Type",
      type: "select",
      required: true,
    },
    { key: "coverage_type", label: "Coverage Type", type: "select" },
    { key: "claim_assistance", label: "Claim Assistance", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],
};
