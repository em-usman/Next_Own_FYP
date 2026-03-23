import { BIKE_CHIPS_DEFAULTS } from "@/config/chipsOptions/bikes";
import { CAR_CHIPS_DEFAULTS } from "@/config/chipsOptions/cars";
import { MOBILE_CHIPS_BY_SUBCATEGORY } from "@/config/chipsOptions/mobiles";
import type { ChipsFieldOptionsMap } from "@/config/chipsOptions/types";

const CHIPS_BY_MAIN_CATEGORY: Record<string, ChipsFieldOptionsMap> = {
  cars: CAR_CHIPS_DEFAULTS,
  bikes: BIKE_CHIPS_DEFAULTS,
};

const CHIPS_BY_SUBCATEGORY: Record<string, ChipsFieldOptionsMap> = {
  ...MOBILE_CHIPS_BY_SUBCATEGORY,
};

export function getChipsFieldOptions(
  categoryId: string,
  subCategoryId: string,
  fieldKey: string,
): string[] {
  const normalizedCategoryId = categoryId?.toLowerCase().trim();
  const normalizedSubCategoryId = subCategoryId?.toLowerCase().trim();

  const subCategoryOptions = CHIPS_BY_SUBCATEGORY[normalizedSubCategoryId];
  if (subCategoryOptions?.[fieldKey]) {
    return subCategoryOptions[fieldKey];
  }

  const categoryDefaults = CHIPS_BY_MAIN_CATEGORY[normalizedCategoryId];
  if (categoryDefaults?.[fieldKey]) {
    return categoryDefaults[fieldKey];
  }

  return [];
}
