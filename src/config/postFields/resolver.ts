import { MOBILE_POST_FIELDS_BY_SUBCATEGORY } from "@/config/postFields/mobiles";
import { PROPERTY_SALE_POST_FIELDS_BY_SUBCATEGORY } from "@/config/postFields/property-sale";
import type { Field } from "@/config/postFields/types";
import { VEHICLE_POST_FIELDS_BY_SUBCATEGORY } from "@/config/postFields/vehicles";

const POST_FIELDS_BY_MAIN_CATEGORY: Record<string, Record<string, Field[]>> = {
  mobiles: MOBILE_POST_FIELDS_BY_SUBCATEGORY,
  "property-for-sale": PROPERTY_SALE_POST_FIELDS_BY_SUBCATEGORY,
  vehicles: VEHICLE_POST_FIELDS_BY_SUBCATEGORY,
};

export function getPostFields(
  categoryId: string,
  subCategoryId: string,
): Field[] {
  const normalizedCategoryId = categoryId?.toLowerCase().trim();
  const normalizedSubCategoryId = subCategoryId?.toLowerCase().trim();

  const categoryFieldConfig =
    POST_FIELDS_BY_MAIN_CATEGORY[normalizedCategoryId];
  if (!categoryFieldConfig) {
    return [];
  }

  return categoryFieldConfig[normalizedSubCategoryId] || [];
}
