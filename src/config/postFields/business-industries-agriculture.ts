import type { Field } from "@/config/postFields/types";

export const BUSINESS_INDUSTRIES_AGRICULTURE_POST_FIELDS_BY_SUBCATEGORY: Record<
  string,
  Field[]
> = {
  "other-business-industry": [
    {
      key: "type",
      label: "Type",
      type: "select",
      required: true,
    },
    {
      key: "condition",
      label: "Condition",
      type: "chips",
    },
    {
      key: "business_stage",
      label: "Business Stage",
      type: "select",
    },
    {
      key: "availability",
      label: "Availability",
      type: "select",
    },
    {
      key: "features",
      label: "Features",
      type: "multi-select",
    },
  ],
};
