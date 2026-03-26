import type { Field } from "@/config/postFields/types";

const COMMON_JOB_FIELDS: Field[] = [
  { key: "role_type", label: "Role Type", type: "select", required: true },
  {
    key: "employment_type",
    label: "Employment Type",
    type: "chips",
    required: true,
  },
  { key: "workplace_type", label: "Workplace", type: "chips" },
  { key: "experience_level", label: "Experience Level", type: "select" },
  { key: "education_level", label: "Education Level", type: "select" },
  { key: "salary_period", label: "Salary Period", type: "select" },
  {
    key: "shift_timing",
    label: "Shift Timing",
    type: "chips",
  },
  { key: "gender_preference", label: "Gender Preference", type: "chips" },
  {
    key: "positions_available",
    label: "Positions Available",
    type: "select",
  },
  { key: "skills", label: "Skills", type: "multi-select" },
];

const JOB_SUBCATEGORY_IDS = [
  "other-jobs",
  "online-jobs",
  "sales-jobs",
  "part-time-jobs",
  "restaurants-hospitality-jobs",
  "customer-service-jobs",
  "domestic-staff-jobs",
  "marketing-jobs",
  "education-jobs",
  "medical-jobs",
  "delivery-riders-jobs",
  "accounting-finance-jobs",
  "it-networking-jobs",
  "graphic-design-jobs",
  "hotels-tourism-jobs",
  "engineering-jobs",
  "security-jobs",
  "manufacturing-jobs",
  "clerical-administration-jobs",
  "content-writing-jobs",
  "human-resources-jobs",
  "real-estate-jobs",
  "internships-jobs",
  "advertising-pr-jobs",
  "architecture-interior-design-jobs",
] as const;

export const JOB_POST_FIELDS_BY_SUBCATEGORY: Record<string, Field[]> =
  JOB_SUBCATEGORY_IDS.reduce<Record<string, Field[]>>((acc, id) => {
    acc[id] = [...COMMON_JOB_FIELDS];
    return acc;
  }, {});
