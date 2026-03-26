import type { ChipsFieldOptionsMap } from "@/config/chipsOptions/types";

export const BOOKS_SPORTS_HOBBIES_FIELD_OPTIONS_BY_SUBCATEGORY: Record<
  string,
  ChipsFieldOptionsMap
> = {
  "gym-fitness": {
    condition: ["New", "Used", "Like New"],
    type: [
      "Dumbbells",
      "Barbells",
      "Kettlebells",
      "Weight Plates",
      "Machine",
      "Mat",
      "Other",
    ],
    equipment_type: [
      "Free Weights",
      "Machines",
      "Cardio",
      "Bodyweight",
      "Wearable",
    ],
    usage: ["Home", "Commercial", "Professional"],
  },

  "sports-equipment": {
    condition: ["New", "Used", "Like New", "Good"],
    type: [
      "Cricket",
      "Football",
      "Badminton",
      "Tennis",
      "Basketball",
      "Volleyball",
      "Other",
    ],
    sport_type: [
      "Cricket",
      "Football",
      "Badminton",
      "Tennis",
      "Basketball",
      "Volleyball",
      "Swimming",
      "Cycling",
      "Skating",
      "Other",
    ],
    size: ["XS", "S", "M", "L", "XL", "XXL"],
    material: ["Rubber", "Leather", "Synthetic", "Nylon", "Plastic", "Canvas"],
  },

  "other-hobbies": {
    condition: ["New", "Used", "Like New", "Vintage"],
    type: [
      "Art & Craft",
      "Board Games",
      "Collectibles",
      "Model Kits",
      "Musical Instrument",
      "Reading",
      "Photography",
      "Other",
    ],
    hobby_category: [
      "Art & Craft",
      "Games",
      "Collectibles",
      "Toys",
      "Music",
      "Reading",
      "Photography",
      "Video Games",
      "DIY",
      "Other",
    ],
    age_group: ["Kids (3-7)", "Kids (8-12)", "Teens", "Adults", "All Ages"],
  },

  calendars: {
    condition: ["New", "Used"],
    type: ["Wall Calendar", "Desk Calendar", "Planner", "Perpetual Calendar"],
    format: ["2024", "2025", "2026", "Perpetual"],
    theme: [
      "Nature",
      "Animals",
      "Sports",
      "Movies",
      "Art",
      "Travel",
      "Business",
      "Inspirational",
      "Plain",
      "Other",
    ],
  },
};
