import type { ChipsFieldOptionsMap } from "@/config/chipsOptions/types";

export const KIDS_FIELD_OPTIONS_BY_SUBCATEGORY: Record<
  string,
  ChipsFieldOptionsMap
> = {
  toys: {
    condition: ["New", "Used", "Like New", "Good"],
    age_group: ["0-1 years", "1-3 years", "3-5 years", "5-8 years", "8+ years"],
    toy_type: [
      "Action Figures",
      "Building Blocks",
      "Dolls",
      "Puzzles",
      "Board Games",
      "Educational Toys",
      "Outdoor Toys",
      "Remote Control",
      "Plush Toys",
      "Other",
    ],
    material: ["Plastic", "Wood", "Metal", "Fabric", "Rubber", "Mixed"],
  },

  "swing-slides": {
    condition: ["New", "Used", "Like New", "Good"],
    age_group: ["0-2 years", "2-5 years", "5-8 years", "8+ years"],
    equipment_type: [
      "Swing",
      "Slide",
      "Seesaws",
      "Climbing Frame",
      "Sandbox",
      "Spring Riders",
      "Jungle Gym",
      "Other",
    ],
    material: ["Plastic", "Wood", "Metal", "Steel"],
    size: ["Small", "Medium", "Large"],
  },

  "kids-accessories": {
    condition: ["New", "Used", "Like New"],
    age_group: ["0-1 years", "1-3 years", "3-5 years", "5-8 years", "8+ years"],
    accessory_type: [
      "Backpack",
      "Shoes",
      "Socks",
      "Hat",
      "Jacket",
      "Bag",
      "Belt",
      "Scarf",
      "Mittens",
      "Other",
    ],
    size: ["XS", "S", "M", "L", "XL"],
  },

  "kids-furniture": {
    condition: ["New", "Used", "Like New"],
    age_group: ["0-2 years", "2-5 years", "5-8 years", "8+ years", "All Ages"],
    furniture_type: [
      "Crib",
      "Bed",
      "High Chair",
      "Playpen",
      "Desk",
      "Chair",
      "Bookshelf",
      "Wardrobe",
      "Other",
    ],
    material: ["Wood", "Plastic", "Metal", "Fabric"],
  },

  "bath-diapers": {
    condition: ["New", "Sealed", "Unused"],
    age_group: [
      "0-6 months",
      "6-12 months",
      "1-2 years",
      "2-3 years",
      "3+ years",
    ],
    product_type: [
      "Diapers",
      "Wipes",
      "Bath Tub",
      "Bath Seat",
      "Towels",
      "Shampoo & Soap",
      "Lotion & Oil",
      "Potty Seat",
      "Other",
    ],
    size: [
      "Size 1",
      "Size 2",
      "Size 3",
      "Size 4",
      "Size 5",
      "Size 6",
      "One Size",
    ],
  },
};
