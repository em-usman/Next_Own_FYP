import type { ChipsFieldOptionsMap } from "@/config/chipsOptions/types";

export const BUSINESS_INDUSTRIES_AGRICULTURE_FIELD_OPTIONS_BY_SUBCATEGORY: Record<
  string,
  ChipsFieldOptionsMap
> = {
  "other-business-industry": {
    type: [
      "Industrial Machinery",
      "Business Equipment",
      "Agricultural Equipment",
      "Manufacturing Unit",
      "Wholesale Setup",
      "Retail Setup",
      "Other",
    ],
    condition: ["New", "Used", "Refurbished"],
    business_stage: [
      "Startup",
      "Running Business",
      "Established",
      "Franchise",
      "Expansion",
    ],
    availability: [
      "Immediate",
      "Within 7 Days",
      "Within 30 Days",
      "Negotiable",
    ],
    features: [
      "Imported",
      "With Documentation",
      "Installed",
      "Training Included",
      "After Sales Support",
    ],
  },
};
