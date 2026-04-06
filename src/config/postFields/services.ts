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

  "health-services": [
    {
      key: "service_type",
      label: "Service Type",
      type: "select",
      required: true,
    },
    { key: "specialization", label: "Specialization", type: "select" },
    { key: "consultation_mode", label: "Consultation Mode", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],
  "beauty-spa": [
    {
      key: "service_type",
      label: "Service Type",
      type: "select",
      required: true,
    },
    { key: "target_gender", label: "Target Gender", type: "chips" },
    { key: "home_service", label: "Home Service", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],
  "fitness-trainers": [
    {
      key: "training_type",
      label: "Training Type",
      type: "select",
      required: true,
    },
    { key: "trainer_gender", label: "Trainer Gender", type: "chips" },
    { key: "training_mode", label: "Training Mode", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],

  "pick-drop": [
    { key: "ride_type", label: "Ride Type", type: "select", required: true },
    { key: "vehicle_type", label: "Vehicle Type", type: "select" },
    { key: "service_area", label: "Service Area", type: "select" },
    { key: "shift_time", label: "Shift Time", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],
  drivers: [
    {
      key: "driver_type",
      label: "Driver Type",
      type: "select",
      required: true,
    },
    { key: "license_type", label: "License Type", type: "select" },
    { key: "shift_type", label: "Shift Type", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],
  carpool: [
    { key: "route_type", label: "Route Type", type: "select", required: true },
    { key: "vehicle_type", label: "Vehicle Type", type: "select" },
    { key: "seat_capacity", label: "Seat Capacity", type: "chips" },
    { key: "commute_time", label: "Commute Time", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],

  maids: [
    { key: "maid_type", label: "Maid Type", type: "select", required: true },
    { key: "duty_type", label: "Duty Type", type: "select" },
    { key: "accommodation", label: "Accommodation", type: "chips" },
    { key: "shift_type", label: "Shift Type", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],
  "other-domestic-help": [
    { key: "help_type", label: "Help Type", type: "text", required: true },
    { key: "shift_type", label: "Shift Type", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],
  cooks: [
    { key: "cuisine", label: "Cuisine", type: "select", required: true },
    { key: "meal_type", label: "Meal Type", type: "select" },
    { key: "accommodation", label: "Accommodation", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],
  babysitters: [
    {
      key: "service_type",
      label: "Service Type",
      type: "select",
      required: true,
    },
    { key: "age_group", label: "Age Group", type: "chips" },
    { key: "first_aid", label: "First Aid", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],
  "nursing-staff": [
    {
      key: "service_type",
      label: "Service Type",
      type: "select",
      required: true,
    },
    { key: "qualification", label: "Qualification", type: "select" },
    { key: "shift_type", label: "Shift Type", type: "select" },
    ...COMMON_SERVICE_FIELDS,
  ],

  "other-repair-services": [
    { key: "repair_type", label: "Repair Type", type: "text", required: true },
    { key: "property_type", label: "Property Type", type: "select" },
    ...COMMON_SERVICE_FIELDS,
  ],
  "ac-services": [
    { key: "ac_type", label: "AC Type", type: "select", required: true },
    {
      key: "service_type",
      label: "Service Type",
      type: "select",
      required: true,
    },
    { key: "tonnage", label: "Tonnage", type: "chips" },
    { key: "gas_refill", label: "Gas Refill", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],
  "pest-control": [
    { key: "pest_type", label: "Pest Type", type: "select", required: true },
    { key: "property_type", label: "Property Type", type: "select" },
    { key: "treatment_type", label: "Treatment Type", type: "select" },
    { key: "warranty", label: "Warranty", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],
  carpenters: [
    {
      key: "service_type",
      label: "Service Type",
      type: "select",
      required: true,
    },
    { key: "work_type", label: "Work Type", type: "select" },
    { key: "material_included", label: "Material Included", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],
  painters: [
    {
      key: "service_type",
      label: "Service Type",
      type: "select",
      required: true,
    },
    { key: "paint_type", label: "Paint Type", type: "select" },
    { key: "property_type", label: "Property Type", type: "select" },
    { key: "material_included", label: "Material Included", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],
  electricians: [
    {
      key: "service_type",
      label: "Service Type",
      type: "select",
      required: true,
    },
    { key: "property_type", label: "Property Type", type: "select" },
    { key: "emergency_service", label: "Emergency Service", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],
  "deep-cleaning": [
    { key: "place_type", label: "Place Type", type: "select", required: true },
    { key: "frequency", label: "Frequency", type: "chips" },
    { key: "team_size", label: "Team Size", type: "select" },
    { key: "supplies_included", label: "Supplies Included", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],
  "water-tank-cleaning": [
    { key: "tank_type", label: "Tank Type", type: "select", required: true },
    { key: "tank_size", label: "Tank Size", type: "select" },
    { key: "service_type", label: "Service Type", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],
  plumbers: [
    {
      key: "service_type",
      label: "Service Type",
      type: "select",
      required: true,
    },
    { key: "property_type", label: "Property Type", type: "select" },
    { key: "emergency_service", label: "Emergency Service", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],
  "geyser-services": [
    {
      key: "geyser_type",
      label: "Geyser Type",
      type: "select",
      required: true,
    },
    {
      key: "service_type",
      label: "Service Type",
      type: "select",
      required: true,
    },
    { key: "capacity", label: "Capacity", type: "chips" },
    { key: "parts_included", label: "Parts Included", type: "chips" },
    ...COMMON_SERVICE_FIELDS,
  ],
};
