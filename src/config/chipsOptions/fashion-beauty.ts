import type { ChipsFieldOptionsMap } from "@/config/chipsOptions/types";

export const FASHION_BEAUTY_FIELD_OPTIONS_BY_SUBCATEGORY: Record<
  string,
  ChipsFieldOptionsMap
> = {
  watches: {
    condition: ["New", "Used", "Like New", "Open Box"],
    gender: ["Men", "Women", "Unisex"],
    movement: ["Quartz", "Automatic", "Mechanical", "Solar"],
    strap_material: ["Leather", "Metal", "Rubber", "Fabric", "Silicone"],
  },

  footwear: {
    condition: ["New", "Used", "Like New", "Open Box"],
    gender: ["Men", "Women", "Kids", "Unisex"],
    type: ["Casual", "Sports", "Formal", "Sandals", "Boots", "Slippers"],
    material: ["Leather", "Canvas", "Rubber", "Synthetic", "Suede"],
    size: ["5", "6", "7", "8", "9", "10", "11", "12", "13"],
  },

  jewellery: {
    condition: ["New", "Used", "Vintage"],
    gender: ["Men", "Women", "Unisex"],
    type: ["Necklace", "Bracelet", "Ring", "Earrings", "Anklet", "Pendant"],
    material: ["Gold", "Silver", "Platinum", "Copper", "Crystal", "Beads"],
    stone_type: ["Diamond", "Emerald", "Ruby", "Sapphire", "Pearl", "None"],
  },

  bags: {
    condition: ["New", "Used", "Like New", "Open Box"],
    gender: ["Men", "Women", "Unisex"],
    type: [
      "Handbag",
      "Backpack",
      "Shoulder Bag",
      "Crossbody",
      "Clutch",
      "Wallet",
    ],
    material: ["Leather", "Canvas", "Synthetic", "Fabric"],
    size: ["Small", "Medium", "Large", "Extra Large"],
  },

  fragrance: {
    condition: ["New", "Used", "Sealed"],
    gender: ["Men", "Women", "Unisex"],
    fragrance_type: [
      "Perfume",
      "Eau de Parfum",
      "Eau de Toilette",
      "Cologne",
      "Body Spray",
    ],
    volume: ["30ml", "50ml", "75ml", "100ml", "150ml", "200ml"],
    concentration: ["High", "Medium", "Low"],
  },

  "other-fashion": {
    condition: ["New", "Used", "Like New"],
    gender: ["Men", "Women", "Kids", "Unisex"],
    type: ["Belts", "Scarves", "Hats", "Gloves", "Sunglasses", "Ties", "Other"],
  },

  "diy-jewellery": {
    condition: ["New", "Used", "Open Box"],
    gender: ["Men", "Women", "Kids", "Unisex"],
    kit_type: ["Beading Kit", "Wire Wrapping", "Polymer Clay", "Resin Cast"],
    material: ["Beads", "Wire", "Clay", "Resin", "String"],
    skill_level: ["Beginner", "Intermediate", "Advanced"],
  },
};
