import type { ChipsFieldOptionsMap } from "@/config/chipsOptions/types";

const AREA_UNITS = ["Marla", "Kanal", "Square Feet", "Square Yards"];
const BEDROOM_COUNTS = [
  "Studio",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10+",
];
const BATHROOM_COUNTS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];
const FLOOR_COUNTS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];
const WASHROOM_COUNTS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];
const FLOOR_LEVELS = ["Ground", "1st", "2nd", "3rd", "4th", "5th+"];
const FURNISHED_OPTIONS = ["Furnished", "Semi-Furnished", "Unfurnished"];

export const PROPERTY_SALE_FIELD_OPTIONS_BY_SUBCATEGORY: Record<
  string,
  ChipsFieldOptionsMap
> = {
  "land-plots": {
    type: [
      "Residential Plot",
      "Commercial Plot",
      "Agricultural Land",
      "Industrial Land",
      "Plot File",
      "Plot Form",
    ],
    area_unit: AREA_UNITS,
    possession: ["Ready for Possession", "Under Development"],
    facing: ["Corner", "Park Facing", "Main Road", "Inside Street"],
    features: [
      "Possession",
      "Corner",
      "Boundary Wall",
      "Electricity",
      "Water Supply",
      "Gas",
      "Sewerage",
    ],
  },
  houses: {
    type: [
      "House",
      "Bungalow",
      "Villa",
      "Farm House",
      "Penthouse",
      "Guest House",
    ],
    bedrooms: BEDROOM_COUNTS,
    bathrooms: BATHROOM_COUNTS,
    floors: FLOOR_COUNTS,
    area_unit: AREA_UNITS,
    furnished: FURNISHED_OPTIONS,
    features: [
      "Servant Quarters",
      "Drawing Room",
      "Dining Room",
      "TV Lounge",
      "Store Room",
      "Laundry Room",
      "Car Parking",
      "Lawn",
      "Corner",
    ],
  },
  "apartments-flats": {
    type: ["Apartment", "Flat", "Penthouse", "Studio"],
    bedrooms: BEDROOM_COUNTS,
    bathrooms: BATHROOM_COUNTS,
    floor_level: FLOOR_LEVELS,
    area_unit: AREA_UNITS,
    furnished: FURNISHED_OPTIONS,
    features: [
      "Lift",
      "Car Parking",
      "Security",
      "Balcony",
      "Generator Backup",
      "Gym",
      "Swimming Pool",
      "Play Area",
    ],
  },
  "shops-offices-commercial-space": {
    type: [
      "Shop",
      "Office",
      "Commercial Floor",
      "Building",
      "Warehouse",
      "Factory",
    ],
    area_unit: AREA_UNITS,
    washrooms: WASHROOM_COUNTS,
    furnished: FURNISHED_OPTIONS,
    features: [
      "Parking",
      "Corner",
      "Main Road",
      "Elevator",
      "Security",
      "Backup Power",
      "CCTV",
    ],
  },
  "portions-floors": {
    type: ["Upper Portion", "Lower Portion", "Ground Portion", "Floor"],
    bedrooms: BEDROOM_COUNTS,
    bathrooms: BATHROOM_COUNTS,
    floor_level: FLOOR_LEVELS,
    area_unit: AREA_UNITS,
    furnished: FURNISHED_OPTIONS,
    features: [
      "Separate Entrance",
      "Gas",
      "Electricity",
      "Water Supply",
      "Car Parking",
      "TV Lounge",
      "Drawing Room",
    ],
  },
};
