import { MOBILE_FIELDS_OPTIONS_BY_SUBCATEGORY } from "@/config/chipsOptions/mobiles";
import type { ChipsFieldOptionsMap } from "@/config/chipsOptions/types";
import { VEHICLE_FIELD_OPTIONS_BY_SUBCATEGORY } from "@/config/chipsOptions/vehicles";

const CHIPS_BY_SUBCATEGORY: Record<string, ChipsFieldOptionsMap> = {
  ...MOBILE_FIELDS_OPTIONS_BY_SUBCATEGORY,
  ...VEHICLE_FIELD_OPTIONS_BY_SUBCATEGORY,
};

export function getFieldOptions(
  _categoryId: string,
  subCategoryId: string,
  fieldKey: string,
): string[] {
  const normalizedSubCategoryId = subCategoryId?.toLowerCase().trim();

  const subCategoryOptions = CHIPS_BY_SUBCATEGORY[normalizedSubCategoryId];
  if (subCategoryOptions?.[fieldKey]) {
    return subCategoryOptions[fieldKey];
  }

  return [];
}

export function getChipsFieldOptions(
  categoryId: string,
  subCategoryId: string,
  fieldKey: string,
): string[] {
  return getFieldOptions(categoryId, subCategoryId, fieldKey);
}
