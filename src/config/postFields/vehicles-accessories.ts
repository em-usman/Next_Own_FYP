import type { Field } from "@/config/postFields/types";

export const VEHICLES_ACCESSORIES_POST_FIELDS_BY_SUBCATEGORY: Record<
  string,
  Field[]
> = {
  // Cars Accessories
  interior: [
    {
      key: "accessory_type",
      label: "Accessory Type",
      type: "select",
      required: true,
    },
    { key: "brand", label: "Brand", type: "select" },
    { key: "material", label: "Material", type: "chips" },
    { key: "compatibility", label: "Car Model Fit", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  exterior: [
    {
      key: "accessory_type",
      label: "Accessory Type",
      type: "select",
      required: true,
    },
    { key: "material", label: "Material", type: "chips" },
    { key: "brand", label: "Brand", type: "text" },
    { key: "compatibility", label: "Car Model Fit", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "tools-gadgets": [
    { key: "tool_type", label: "Tool Type", type: "select", required: true },
    { key: "brand", label: "Brand", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "audio-multimedia": [
    {
      key: "product_type",
      label: "Product Type",
      type: "select",
      required: true,
    },
    { key: "brand", label: "Brand", type: "select", required: true },
    { key: "connectivity", label: "Connectivity", type: "select" },
    { key: "origin", label: "Origin", type: "chips" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "safety-security": [
    {
      key: "product_type",
      label: "Product Type",
      type: "select",
      required: true,
    },
    { key: "brand", label: "Brand", type: "select" },
    { key: "origin", label: "Origin/Authenticity", type: "chips" },
    { key: "warranty", label: "Warranty", type: "chips" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "paints-primers-tools": [
    {
      key: "product_type",
      label: "Product Type",
      type: "select",
      required: true,
    },
    { key: "brand", label: "Brand", type: "select" },
    { key: "quantity", label: "Quantity", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],

  // Spare Parts
  "spark-plugs": [
    { key: "brand", label: "Brand", type: "select", required: true },
    { key: "type", label: "Type", type: "chips", required: true },
    { key: "quantity", label: "Quantity", type: "text", required: true },
    { key: "origin", label: "Origin", type: "chips", required: true },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "air-filters": [
    { key: "brand", label: "Brand", type: "select", required: true },
    { key: "filter_type", label: "Filter Type", type: "chips" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "cabin-filters": [
    { key: "brand", label: "Brand", type: "select", required: true },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "timing-belt": [
    { key: "brand", label: "Brand", type: "select", required: true },
    {
      key: "compatible_model",
      label: "Compatible Model",
      type: "text",
      required: true,
    },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "water-pumps": [
    { key: "brand", label: "Brand", type: "select", required: true },
    { key: "compatible_model", label: "Compatible Model", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "fuel-filters": [
    { key: "brand", label: "Brand", type: "select", required: true },
    { key: "filter_type", label: "Filter Type", type: "chips" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "oil-filters": [
    { key: "brand", label: "Brand", type: "select", required: true },
    { key: "compatible_model", label: "Compatible Model", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "brake-pads": [
    { key: "brand", label: "Brand", type: "select", required: true },
    {
      key: "compatible_model",
      label: "Compatible Model",
      type: "text",
      required: true,
    },
    { key: "material", label: "Material", type: "chips" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "brake-discs": [
    { key: "brand", label: "Brand", type: "select", required: true },
    {
      key: "compatible_model",
      label: "Compatible Model",
      type: "text",
      required: true,
    },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "brake-calipers": [
    { key: "brand", label: "Brand", type: "select", required: true },
    { key: "compatible_model", label: "Compatible Model", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "shock-absorbers": [
    { key: "brand", label: "Brand", type: "select", required: true },
    {
      key: "compatible_model",
      label: "Compatible Model",
      type: "text",
      required: true,
    },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  springs: [
    { key: "brand", label: "Brand", type: "select" },
    {
      key: "compatible_model",
      label: "Compatible Model",
      type: "text",
      required: true,
    },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "ball-joints": [
    { key: "brand", label: "Brand", type: "select" },
    { key: "compatible_model", label: "Compatible Model", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  struts: [
    { key: "brand", label: "Brand", type: "select", required: true },
    { key: "compatible_model", label: "Compatible Model", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  radiator: [
    { key: "brand", label: "Brand", type: "select" },
    {
      key: "compatible_model",
      label: "Compatible Model",
      type: "text",
      required: true,
    },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "coolant-hoses": [
    { key: "brand", label: "Brand", type: "select" },
    { key: "compatible_model", label: "Compatible Model", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  alternator: [
    { key: "brand", label: "Brand", type: "select", required: true },
    {
      key: "compatible_model",
      label: "Compatible Model",
      type: "text",
      required: true,
    },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "starter-motor": [
    { key: "brand", label: "Brand", type: "select", required: true },
    { key: "compatible_model", label: "Compatible Model", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  batteries: [
    { key: "brand", label: "Brand", type: "select", required: true },
    { key: "capacity", label: "Capacity (Ah)", type: "select", required: true },
    { key: "voltage", label: "Voltage", type: "chips", required: true },
    { key: "origin", label: "Origin", type: "chips", required: true },
    { key: "warranty", label: "Warranty", type: "chips" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "car-lights": [
    { key: "light_type", label: "Light Type", type: "select", required: true },
    { key: "brand", label: "Brand", type: "select" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "windshield-glass": [
    { key: "glass_type", label: "Glass Type", type: "chips", required: true },
    {
      key: "compatible_model",
      label: "Compatible Model",
      type: "text",
      required: true,
    },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "seat-upholstery": [
    { key: "material", label: "Material", type: "select", required: true },
    { key: "seat_type", label: "Seat Type", type: "chips" },
    { key: "compatible_model", label: "Compatible Model", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "door-locks": [
    { key: "brand", label: "Brand", type: "select" },
    { key: "lock_type", label: "Lock Type", type: "chips" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "door-handles": [
    { key: "brand", label: "Brand", type: "select" },
    { key: "compatible_model", label: "Compatible Model", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "transmission-parts": [
    { key: "part_type", label: "Part Type", type: "select", required: true },
    { key: "compatible_model", label: "Compatible Model", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "engine-gaskets": [
    { key: "brand", label: "Brand", type: "select" },
    { key: "compatible_model", label: "Compatible Model", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "wiper-blades": [
    { key: "brand", label: "Brand", type: "select", required: true },
    { key: "size", label: "Size", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "clutch-plate": [
    { key: "brand", label: "Brand", type: "select" },
    { key: "compatible_model", label: "Compatible Model", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "fuel-pumps": [
    { key: "brand", label: "Brand", type: "select", required: true },
    { key: "compatible_model", label: "Compatible Model", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "fuel-injectors": [
    { key: "brand", label: "Brand", type: "select", required: true },
    { key: "compatible_model", label: "Compatible Model", type: "text" },
    { key: "quantity", label: "Quantity", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "exhaust-muffler": [
    { key: "brand", label: "Brand", type: "select" },
    {
      key: "compatible_model",
      label: "Compatible Model",
      type: "text",
      required: true,
    },
    { key: "material", label: "Material", type: "chips" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "catalytic-converter": [
    { key: "brand", label: "Brand", type: "select" },
    {
      key: "compatible_model",
      label: "Compatible Model",
      type: "text",
      required: true,
    },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "door-panels": [
    {
      key: "compatible_model",
      label: "Compatible Model",
      type: "text",
      required: true,
    },
    { key: "material", label: "Material", type: "chips" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  mirrors: [
    { key: "mirror_type", label: "Mirror Type", type: "chips", required: true },
    { key: "compatible_model", label: "Compatible Model", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "other-spare-parts": [
    { key: "part_type", label: "Part Type", type: "text", required: true },
    { key: "brand", label: "Brand", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],

  // Car Care
  covers: [
    { key: "cover_type", label: "Cover Type", type: "chips", required: true },
    { key: "material", label: "Material", type: "chips" },
    { key: "size", label: "Size", type: "chips" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  cleaners: [
    {
      key: "cleaner_type",
      label: "Cleaner Type",
      type: "select",
      required: true,
    },
    { key: "brand", label: "Brand", type: "select" },
    { key: "quantity", label: "Quantity", type: "text" },
    { key: "origin", label: "Origin", type: "chips" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "air-fresheners": [
    { key: "brand", label: "Brand", type: "select" },
    { key: "scent", label: "Scent", type: "select" },
    { key: "quantity", label: "Quantity", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "microfiber-cloths": [
    { key: "quantity", label: "Quantity", type: "text", required: true },
    { key: "color", label: "Color", type: "select" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "pressure-washers": [
    { key: "brand", label: "Brand", type: "text", required: true },
    { key: "power", label: "Power (PSI)", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  polishes: [
    { key: "brand", label: "Brand", type: "select", required: true },
    { key: "type", label: "Type", type: "chips" },
    { key: "quantity", label: "Quantity", type: "text" },
    { key: "origin", label: "Origin", type: "chips" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  waxes: [
    { key: "brand", label: "Brand", type: "select", required: true },
    { key: "type", label: "Type", type: "select" },
    { key: "quantity", label: "Quantity", type: "text" },
    { key: "origin", label: "Origin", type: "chips" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  shampoos: [
    { key: "brand", label: "Brand", type: "select", required: true },
    { key: "shampoo_type", label: "Shampoo Type", type: "chips" },
    { key: "quantity", label: "Quantity", type: "text" },
    { key: "origin", label: "Origin", type: "chips" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "compound-polishes": [
    { key: "brand", label: "Brand", type: "select", required: true },
    { key: "quantity", label: "Quantity", type: "text" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "pads-sponges-brushes": [
    {
      key: "product_type",
      label: "Product Type",
      type: "chips",
      required: true,
    },
    { key: "quantity", label: "Quantity", type: "text", required: true },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "car-care-other": [
    {
      key: "product_type",
      label: "Product Type",
      type: "text",
      required: true,
    },
    { key: "brand", label: "Brand", type: "select" },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],

  // Oil & Lubricants
  "engine-oil": [
    { key: "brand", label: "Brand", type: "select", required: true },
    {
      key: "viscosity",
      label: "Viscosity Grade",
      type: "select",
      required: true,
    },
    { key: "quantity", label: "Quantity", type: "select", required: true },
    { key: "type", label: "Oil Type", type: "chips" },
    {
      key: "origin",
      label: "Origin/Authenticity",
      type: "chips",
      required: true,
    },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "gear-oil": [
    { key: "brand", label: "Brand", type: "select", required: true },
    { key: "viscosity", label: "Viscosity", type: "select" },
    { key: "quantity", label: "Quantity", type: "chips", required: true },
  ],
  coolants: [
    { key: "brand", label: "Brand", type: "select", required: true },
    { key: "coolant_type", label: "Coolant Type", type: "select" },
    { key: "quantity", label: "Quantity", type: "chips", required: true },
  ],
  "chain-lubes-cleaners": [
    {
      key: "product_type",
      label: "Product Type",
      type: "chips",
      required: true,
    },
    { key: "brand", label: "Brand", type: "text" },
    { key: "quantity", label: "Quantity", type: "text" },
  ],
  "multipurpose-grease": [
    { key: "brand", label: "Brand", type: "text", required: true },
    { key: "quantity", label: "Quantity", type: "text", required: true },
  ],
  "brake-oil": [
    { key: "brand", label: "Brand", type: "select", required: true },
    { key: "dot_type", label: "DOT Type", type: "chips", required: true },
    { key: "quantity", label: "Quantity", type: "text", required: true },
    { key: "origin", label: "Origin", type: "chips", required: true },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "fluids-flushes": [
    { key: "fluid_type", label: "Fluid Type", type: "select", required: true },
    { key: "brand", label: "Brand", type: "text" },
    { key: "quantity", label: "Quantity", type: "text" },
  ],
  "oil-additives": [
    { key: "brand", label: "Brand", type: "select", required: true },
    {
      key: "additive_type",
      label: "Additive Type",
      type: "chips",
      required: true,
    },
    { key: "quantity", label: "Quantity", type: "text" },
    { key: "origin", label: "Origin", type: "chips", required: true },
    { key: "condition", label: "Condition", type: "chips", required: true },
  ],
  "fuel-additives": [
    { key: "brand", label: "Brand", type: "select", required: true },
    { key: "additive_type", label: "Additive Type", type: "chips" },
    { key: "quantity", label: "Quantity", type: "text" },
  ],
  solvents: [
    { key: "brand", label: "Brand", type: "text" },
    {
      key: "solvent_type",
      label: "Solvent Type",
      type: "chips",
      required: true,
    },
    { key: "quantity", label: "Quantity", type: "text" },
  ],
  "cvtf-oil": [
    { key: "brand", label: "Brand", type: "select", required: true },
    { key: "quantity", label: "Quantity", type: "text", required: true },
  ],
  adhesives: [
    { key: "brand", label: "Brand", type: "text" },
    {
      key: "adhesive_type",
      label: "Adhesive Type",
      type: "chips",
      required: true,
    },
    { key: "quantity", label: "Quantity", type: "text" },
  ],
};
