import type { ChipsFieldOptionsMap } from "@/config/chipsOptions/types";

export const CAR_CHIPS_DEFAULTS: ChipsFieldOptionsMap = {
  condition: ["New", "Used", "Certified", "Imported"],
  transmission: ["Automatic", "Manual"],
  fuel_type: ["Petrol", "Diesel", "Hybrid", "Electric"],
  warranty: ["Yes", "No"],
};
