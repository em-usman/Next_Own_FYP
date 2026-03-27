import type { Field } from "@/config/postFields/types";

const COMMON_FASHION_FIELDS: Field[] = [
  {
    key: "condition",
    label: "Condition",
    type: "chips",
    required: true,
  },
  {
    key: "gender",
    label: "Gender",
    type: "chips",
  },
  {
    key: "brand",
    label: "Brand",
    type: "text",
    placeholder: "e.g. Casio, Nike, Chanel",
  },
  {
    key: "features",
    label: "Features",
    type: "multi-select",
  },
];

export const FASHION_BEAUTY_POST_FIELDS_BY_SUBCATEGORY: Record<string, Field[]> = {
  watches: [
    ...COMMON_FASHION_FIELDS,
    {
      key: "watch_type",
      label: "Watch Type",
      type: "select",
      required: true,
    },
    {
      key: "movement",
      label: "Movement",
      type: "select",
    },
    {
      key: "strap_material",
      label: "Strap Material",
      type: "select",
    },
  ],

  footwear: [
    ...COMMON_FASHION_FIELDS,
    {
      key: "type",
      label: "Type",
      type: "select",
      required: true,
    },
    {
      key: "size",
      label: "Size",
      type: "select",
      required: true,
    },
    {
      key: "material",
      label: "Material",
      type: "select",
    },
  ],

  jewellery: [
    ...COMMON_FASHION_FIELDS,
    {
      key: "type",
      label: "Type",
      type: "select",
      required: true,
    },
    {
      key: "material",
      label: "Material",
      type: "select",
    },
    {
      key: "stone_type",
      label: "Stone Type",
      type: "select",
    },
  ],

  bags: [
    ...COMMON_FASHION_FIELDS,
    {
      key: "type",
      label: "Type",
      type: "select",
      required: true,
    },
    {
      key: "material",
      label: "Material",
      type: "select",
    },
    {
      key: "size",
      label: "Size",
      type: "select",
    },
  ],

  fragrance: [
    ...COMMON_FASHION_FIELDS,
    {
      key: "fragrance_type",
      label: "Fragrance Type",
      type: "select",
      required: true,
    },
    {
      key: "volume",
      label: "Volume",
      type: "select",
    },
    {
      key: "concentration",
      label: "Concentration",
      type: "select",
    },
  ],

  "other-fashion": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "type",
      label: "Type",
      type: "select",
      required: true,
    },
  ],

  "diy-jewellery": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "kit_type",
      label: "Kit Type",
      type: "select",
      required: true,
    },
    {
      key: "material",
      label: "Material",
      type: "select",
    },
    {
      key: "skill_level",
      label: "Skill Level",
      type: "chips",
    },
  ],

  "clothes-eastern": [
    ...COMMON_FASHION_FIELDS,
    { key: "type", label: "Type", type: "select", required: true },
    { key: "size", label: "Size", type: "select", required: true },
    { key: "fabric", label: "Fabric", type: "select" },
    { key: "stitching", label: "Stitching", type: "chips" },
  ],
  "clothes-western": [
    ...COMMON_FASHION_FIELDS,
    { key: "type", label: "Type", type: "select", required: true },
    { key: "size", label: "Size", type: "select", required: true },
    { key: "fabric", label: "Fabric", type: "select" },
    { key: "fit", label: "Fit", type: "select" },
  ],
  "clothes-kids": [
    ...COMMON_FASHION_FIELDS,
    { key: "type", label: "Type", type: "select", required: true },
    { key: "age_group", label: "Age Group", type: "select" },
    { key: "size", label: "Size", type: "select", required: true },
    { key: "season", label: "Season", type: "chips" },
  ],
  "clothes-intimates": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "intimate_type",
      label: "Intimate Type",
      type: "select",
      required: true,
    },
    { key: "size", label: "Size", type: "select", required: true },
    { key: "fabric", label: "Fabric", type: "select" },
  ],
  "clothes-hijabs-abayas": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "hijab_abaya_type",
      label: "Type",
      type: "select",
      required: true,
    },
    { key: "fabric", label: "Fabric", type: "select" },
    { key: "size", label: "Size", type: "select" },
  ],
  "clothes-sports": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "sportswear_type",
      label: "Sportswear Type",
      type: "select",
      required: true,
    },
    { key: "size", label: "Size", type: "select", required: true },
    { key: "sport", label: "Sport", type: "select" },
  ],
  "clothes-costumes": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "costume_type",
      label: "Costume Type",
      type: "select",
      required: true,
    },
    { key: "size", label: "Size", type: "select" },
    { key: "occasion", label: "Occasion", type: "select" },
  ],
  "clothing-accessories": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "accessory_type",
      label: "Accessory Type",
      type: "select",
      required: true,
    },
    { key: "material", label: "Material", type: "select" },
  ],

  sunglasses: [
    ...COMMON_FASHION_FIELDS,
    {
      key: "frame_type",
      label: "Frame Type",
      type: "select",
      required: true,
    },
    { key: "lens_type", label: "Lens Type", type: "select" },
    { key: "uv_protection", label: "UV Protection", type: "chips" },
  ],
  caps: [
    ...COMMON_FASHION_FIELDS,
    { key: "cap_type", label: "Cap Type", type: "select", required: true },
    { key: "size", label: "Size", type: "select" },
    { key: "material", label: "Material", type: "select" },
  ],
  "other-accessories": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "accessory_type",
      label: "Accessory Type",
      type: "select",
      required: true,
    },
    { key: "material", label: "Material", type: "select" },
  ],
  socks: [
    ...COMMON_FASHION_FIELDS,
    {
      key: "sock_type",
      label: "Sock Type",
      type: "select",
      required: true,
    },
    { key: "size", label: "Size", type: "select" },
    { key: "pack_size", label: "Pack Size", type: "select" },
  ],
  belts: [
    ...COMMON_FASHION_FIELDS,
    {
      key: "belt_type",
      label: "Belt Type",
      type: "select",
      required: true,
    },
    { key: "material", label: "Material", type: "select" },
    { key: "size", label: "Size", type: "select" },
  ],
  gloves: [
    ...COMMON_FASHION_FIELDS,
    {
      key: "glove_type",
      label: "Glove Type",
      type: "select",
      required: true,
    },
    { key: "material", label: "Material", type: "select" },
    { key: "size", label: "Size", type: "select" },
  ],
  eyewear: [
    ...COMMON_FASHION_FIELDS,
    {
      key: "eyewear_type",
      label: "Eyewear Type",
      type: "select",
      required: true,
    },
    { key: "lens_type", label: "Lens Type", type: "select" },
    { key: "frame_material", label: "Frame Material", type: "select" },
  ],
  scarves: [
    ...COMMON_FASHION_FIELDS,
    {
      key: "scarf_type",
      label: "Scarf Type",
      type: "select",
      required: true,
    },
    { key: "material", label: "Material", type: "select" },
    { key: "size", label: "Size", type: "select" },
  ],
  cufflinks: [
    ...COMMON_FASHION_FIELDS,
    {
      key: "material",
      label: "Material",
      type: "select",
      required: true,
    },
    { key: "finish", label: "Finish", type: "select" },
  ],
  ties: [
    ...COMMON_FASHION_FIELDS,
    { key: "tie_type", label: "Tie Type", type: "select", required: true },
    { key: "material", label: "Material", type: "select" },
    { key: "width", label: "Width", type: "select" },
  ],
  "key-holder": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "key_holder_type",
      label: "Key Holder Type",
      type: "select",
      required: true,
    },
    { key: "material", label: "Material", type: "select" },
  ],

  "makeup-face": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "product_type",
      label: "Product Type",
      type: "select",
      required: true,
    },
    { key: "skin_tone", label: "Skin Tone", type: "select" },
    { key: "finish", label: "Finish", type: "select" },
    { key: "coverage", label: "Coverage", type: "chips" },
  ],
  "other-makeup-accessories": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "accessory_type",
      label: "Accessory Type",
      type: "select",
      required: true,
    },
    { key: "material", label: "Material", type: "select" },
  ],
  "makeup-nails": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "product_type",
      label: "Product Type",
      type: "select",
      required: true,
    },
    { key: "finish", label: "Finish", type: "select" },
    { key: "color_family", label: "Color Family", type: "select" },
  ],
  "makeup-eyes": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "product_type",
      label: "Product Type",
      type: "select",
      required: true,
    },
    { key: "finish", label: "Finish", type: "select" },
    { key: "shade_family", label: "Shade Family", type: "select" },
  ],
  "makeup-lips": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "product_type",
      label: "Product Type",
      type: "select",
      required: true,
    },
    { key: "finish", label: "Finish", type: "select" },
    { key: "shade_family", label: "Shade Family", type: "select" },
  ],
  "makeup-brushes": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "brush_type",
      label: "Brush Type",
      type: "select",
      required: true,
    },
    { key: "bristle_type", label: "Bristle Type", type: "chips" },
    { key: "set_size", label: "Set Size", type: "select" },
  ],

  "lotions-moisturisers": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "product_type",
      label: "Product Type",
      type: "select",
      required: true,
    },
    { key: "skin_type", label: "Skin Type", type: "select" },
    { key: "volume", label: "Volume", type: "select" },
  ],
  "hair-removal": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "method_type",
      label: "Method Type",
      type: "select",
      required: true,
    },
    { key: "body_area", label: "Body Area", type: "select" },
    { key: "skin_type", label: "Skin Type", type: "select" },
  ],
  "soaps-shower-gels": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "product_type",
      label: "Product Type",
      type: "select",
      required: true,
    },
    { key: "skin_type", label: "Skin Type", type: "select" },
    {
      key: "fragrance_family",
      label: "Fragrance Family",
      type: "select",
    },
  ],
  "bath-body-accessories": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "accessory_type",
      label: "Accessory Type",
      type: "select",
      required: true,
    },
    { key: "material", label: "Material", type: "select" },
  ],
  scrubs: [
    ...COMMON_FASHION_FIELDS,
    {
      key: "scrub_type",
      label: "Scrub Type",
      type: "select",
      required: true,
    },
    { key: "skin_type", label: "Skin Type", type: "select" },
  ],
  "massage-oils": [
    ...COMMON_FASHION_FIELDS,
    { key: "oil_type", label: "Oil Type", type: "select", required: true },
    { key: "body_area", label: "Body Area", type: "select" },
    { key: "volume", label: "Volume", type: "select" },
  ],
  "gifts-value-sets": [
    ...COMMON_FASHION_FIELDS,
    { key: "set_type", label: "Set Type", type: "select", required: true },
    { key: "target_gender", label: "Target Gender", type: "chips" },
  ],

  "hair-care": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "product_type",
      label: "Product Type",
      type: "select",
      required: true,
    },
    { key: "hair_type", label: "Hair Type", type: "select" },
    { key: "concern", label: "Concern", type: "select" },
  ],
  "skin-care": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "product_type",
      label: "Product Type",
      type: "select",
      required: true,
    },
    { key: "skin_type", label: "Skin Type", type: "select" },
    { key: "concern", label: "Concern", type: "select" },
  ],
  "hair-accessories": [
    ...COMMON_FASHION_FIELDS,
    {
      key: "accessory_type",
      label: "Accessory Type",
      type: "select",
      required: true,
    },
    { key: "material", label: "Material", type: "select" },
  ],

  bridals: [
    ...COMMON_FASHION_FIELDS,
    {
      key: "bridal_type",
      label: "Bridal Type",
      type: "select",
      required: true,
    },
    { key: "size", label: "Size", type: "select" },
    { key: "stitching", label: "Stitching", type: "chips" },
  ],
  formals: [
    ...COMMON_FASHION_FIELDS,
    {
      key: "formal_type",
      label: "Formal Type",
      type: "select",
      required: true,
    },
    { key: "size", label: "Size", type: "select" },
    { key: "fabric", label: "Fabric", type: "select" },
  ],
  grooms: [
    ...COMMON_FASHION_FIELDS,
    {
      key: "groom_wear_type",
      label: "Groom Wear Type",
      type: "select",
      required: true,
    },
    { key: "size", label: "Size", type: "select" },
    { key: "stitching", label: "Stitching", type: "chips" },
  ],
};
