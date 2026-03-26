import type { ChipsFieldOptionsMap } from "@/config/chipsOptions/types";

const COMMON_GENDER = ["Male", "Female", "Pair", "Unknown"];
const COMMON_HEALTH = ["Healthy", "Under Treatment", "Special Care Needed"];
const YES_NO = ["Yes", "No"];

const COMMON_FEATURES = [
  "Trained",
  "Friendly",
  "With Cage",
  "With Accessories",
  "Imported",
  "Breeding Pair",
  "Home Raised",
];

export const ANIMAL_FIELD_OPTIONS_BY_SUBCATEGORY: Record<
  string,
  ChipsFieldOptionsMap
> = {
  hens: {
    type: ["Aseel", "Desi", "Layer", "Broiler", "Silkie", "Brahma"],
    gender: COMMON_GENDER,
    health: COMMON_HEALTH,
    vaccinated: YES_NO,
    features: COMMON_FEATURES,
  },
  cats: {
    type: ["Persian", "Siamese", "Maine Coon", "Turkish Angora", "Mixed"],
    gender: COMMON_GENDER,
    health: COMMON_HEALTH,
    vaccinated: YES_NO,
    features: [
      "Litter Trained",
      "Playful",
      "Indoor Cat",
      "Vaccination Card",
      "Pedigree",
    ],
  },
  parrots: {
    type: ["African Grey", "Cockatiel", "Budgie", "Macaw", "Love Bird"],
    gender: COMMON_GENDER,
    health: COMMON_HEALTH,
    vaccinated: YES_NO,
    features: ["Talking", "Tamed", "Hand Fed", "Breeding Pair", "With Cage"],
  },
  dogs: {
    type: ["German Shepherd", "Labrador", "Pug", "Rottweiler", "Mixed"],
    gender: COMMON_GENDER,
    health: COMMON_HEALTH,
    vaccinated: YES_NO,
    features: [
      "Guard Dog",
      "Friendly",
      "House Trained",
      "Pedigree",
      "Obedience Trained",
    ],
  },
  pigeons: {
    type: ["Kabootar", "Tippler", "Highflyer", "Tumbler", "Fancy"],
    gender: COMMON_GENDER,
    health: COMMON_HEALTH,
    vaccinated: YES_NO,
    features: ["Flying Trained", "Breeding Pair", "Fancy", "With Cage"],
  },
  rabbits: {
    type: ["Angora", "Dutch", "Lionhead", "New Zealand", "Mixed"],
    gender: COMMON_GENDER,
    health: COMMON_HEALTH,
    vaccinated: YES_NO,
    features: ["Friendly", "Breeding Pair", "Indoor Raised", "With Cage"],
  },
  finches: {
    type: ["Zebra Finch", "Society Finch", "Gouldian Finch", "Star Finch"],
    gender: COMMON_GENDER,
    health: COMMON_HEALTH,
    vaccinated: YES_NO,
    features: ["Breeding Pair", "Color Variant", "With Cage"],
  },
  fish: {
    type: ["Goldfish", "Koi", "Arowana", "Betta", "Flowerhorn", "Guppy"],
    size: ["Small", "Medium", "Large", "Jumbo"],
    water_type: ["Freshwater", "Saltwater"],
    features: ["Imported", "Pair", "Tank Setup Available", "Healthy"],
  },
  "fertile-eggs": {
    type: ["Chicken Eggs", "Duck Eggs", "Parrot Eggs", "Quail Eggs"],
    fertility_rate: ["60%+", "70%+", "80%+", "90%+"],
  },
  "other-birds": {
    type: [
      "Falcon",
      "Batair (Quail)",
      "Eagle",
      "Owl",
      "Canary",
      "Mynah",
      "Sparrow",
      "Other",
    ],
    gender: COMMON_GENDER,
    health: COMMON_HEALTH,
    features: ["Tamed", "With Cage", "Breeding Pair", "Imported"],
  },
  ducks: {
    type: ["Desi Duck", "Pekin", "Muscovy", "Runner"],
    gender: COMMON_GENDER,
    health: COMMON_HEALTH,
    vaccinated: YES_NO,
    features: COMMON_FEATURES,
  },
  "other-animals": {
    type: [
      "Goat",
      "Sheep",
      "Cow",
      "Buffalo",
      "Donkey",
      "Camel",
      "Falcon",
      "Batair (Quail)",
      "Other",
    ],
    gender: COMMON_GENDER,
    health: COMMON_HEALTH,
    features: ["Healthy", "Breeding", "Imported", "Farm Raised", "Trained"],
  },
  doves: {
    type: ["Ringneck Dove", "White Dove", "Collared Dove", "Fancy Dove"],
    gender: COMMON_GENDER,
    health: COMMON_HEALTH,
    vaccinated: YES_NO,
    features: ["Pair", "Fancy", "Breeding Pair", "With Cage"],
  },
  peacocks: {
    type: ["Indian Peafowl", "White Peafowl", "Green Peafowl"],
    gender: COMMON_GENDER,
    health: COMMON_HEALTH,
    vaccinated: YES_NO,
    features: ["Adult", "Juvenile", "Breeding Pair", "Healthy"],
  },
  horses: {
    type: ["Arabian", "Thoroughbred", "Sindhi", "Balochi", "Mixed"],
    gender: COMMON_GENDER,
    features: [
      "Riding Trained",
      "Race Trained",
      "Healthy",
      "Vaccinated",
      "Calm Temperament",
    ],
  },
};
