import type { ChipsFieldOptionsMap } from "@/config/chipsOptions/types";

const CONDITIONS = ["New", "Used", "Open Box", "Refurbished"];
const WARRANTY = ["No", "3 Months", "6 Months", "1 Year", "2 Years+"];

export const ELECTRONICS_HOME_APPLIANCES_FIELD_OPTIONS_BY_SUBCATEGORY: Record<
  string,
  ChipsFieldOptionsMap
> = {
  "other-home-appliances": {
    type: [
      "Microwave Oven",
      "Electric Kettle",
      "Toaster",
      "Food Processor",
      "Vacuum Cleaner",
      "Iron",
      "Heater",
      "Other",
    ],
    condition: CONDITIONS,
    brand: ["Dawlance", "PEL", "Haier", "Orient", "Kenwood", "Other"],
    warranty: WARRANTY,
    power_source: ["Electric", "Battery", "Gas", "Manual"],
    features: [
      "Energy Efficient",
      "Low Noise",
      "Portable",
      "Original Parts",
      "Imported",
    ],
  },

  "sewing-machines": {
    type: ["Domestic", "Industrial", "Portable", "Computerized"],
    condition: CONDITIONS,
    brand: ["Singer", "Juki", "Brother", "Janome", "Other"],
    machine_type: ["Manual", "Electric", "Computerized"],
    stitch_options: ["Basic", "Multiple", "Embroidery", "Overlock"],
    warranty: WARRANTY,
    features: [
      "High Speed",
      "Embroidery Support",
      "Portable",
      "Foot Pedal",
      "Motor Included",
    ],
  },

  "water-dispensers": {
    type: ["Top Load", "Bottom Load", "Table Top", "Cabinet Type"],
    condition: CONDITIONS,
    brand: ["PEL", "Dawlance", "Orient", "Haier", "Midea", "Other"],
    dispenser_type: ["Top Load", "Bottom Load", "Table Top"],
    cooling_heating: [
      "Cooling Only",
      "Heating Only",
      "Hot & Cold",
      "Normal+Cold+Hot",
    ],
    capacity: ["2-5 Liters", "6-10 Liters", "11-15 Liters", "15+ Liters"],
    warranty: WARRANTY,
    features: [
      "Compressor Cooling",
      "Child Lock",
      "Low Noise",
      "Energy Saving",
    ],
  },

  "air-purifiers": {
    type: [
      "Room Purifier",
      "Car Purifier",
      "Portable Purifier",
      "Smart Purifier",
    ],
    condition: CONDITIONS,
    brand: ["Xiaomi", "Philips", "Dyson", "Panasonic", "Other"],
    coverage_area: [
      "Up to 150 sq ft",
      "151-300 sq ft",
      "301-500 sq ft",
      "500+ sq ft",
    ],
    filter_type: ["HEPA", "Carbon", "Pre-Filter", "HEPA+Carbon", "Multi-Layer"],
    smart_features: [
      "App Control",
      "Air Quality Sensor",
      "Auto Mode",
      "Sleep Mode",
    ],
    warranty: WARRANTY,
    features: [
      "Silent Operation",
      "Energy Efficient",
      "Air Quality Indicator",
      "Timer",
      "Child Lock",
    ],
  },
};
