import { ANIMAL_FIELD_OPTIONS_BY_SUBCATEGORY } from "@/config/chipsOptions/animals";
import { BIKE_FIELD_OPTIONS_BY_SUBCATEGORY } from "@/config/chipsOptions/bike";
import { BOOKS_SPORTS_HOBBIES_FIELD_OPTIONS_BY_SUBCATEGORY } from "@/config/chipsOptions/books-sports-hobbies";
import { BUSINESS_INDUSTRIES_AGRICULTURE_FIELD_OPTIONS_BY_SUBCATEGORY } from "@/config/chipsOptions/business-industries-agriculture";
import { ELECTRONICS_HOME_APPLIANCES_FIELD_OPTIONS_BY_SUBCATEGORY } from "@/config/chipsOptions/electronics-home-appliances";
import { FASHION_BEAUTY_FIELD_OPTIONS_BY_SUBCATEGORY } from "@/config/chipsOptions/fashion-beauty";
import { FURNITURE_HOME_DECOR_FIELD_OPTIONS_BY_SUBCATEGORY } from "@/config/chipsOptions/furniture-home-decor";
import { JOB_FIELD_OPTIONS_BY_SUBCATEGORY } from "@/config/chipsOptions/jobs";
import { KIDS_FIELD_OPTIONS_BY_SUBCATEGORY } from "@/config/chipsOptions/kids";
import { MOBILE_FIELDS_OPTIONS_BY_SUBCATEGORY } from "@/config/chipsOptions/mobiles";
import { PROPERTY_RENT_FIELD_OPTIONS_BY_SUBCATEGORY } from "@/config/chipsOptions/property-rent";
import { PROPERTY_SALE_FIELD_OPTIONS_BY_SUBCATEGORY } from "@/config/chipsOptions/property-sale";
import { SERVICE_FIELD_OPTIONS_BY_SUBCATEGORY } from "@/config/chipsOptions/services";
import type { ChipsFieldOptionsMap } from "@/config/chipsOptions/types";
import { VEHICLE_FIELD_OPTIONS_BY_SUBCATEGORY } from "@/config/chipsOptions/vehicles";

const CHIPS_BY_SUBCATEGORY: Record<string, ChipsFieldOptionsMap> = {
  ...ANIMAL_FIELD_OPTIONS_BY_SUBCATEGORY,
  ...BIKE_FIELD_OPTIONS_BY_SUBCATEGORY,
  ...BOOKS_SPORTS_HOBBIES_FIELD_OPTIONS_BY_SUBCATEGORY,
  ...BUSINESS_INDUSTRIES_AGRICULTURE_FIELD_OPTIONS_BY_SUBCATEGORY,
  ...ELECTRONICS_HOME_APPLIANCES_FIELD_OPTIONS_BY_SUBCATEGORY,
  ...FASHION_BEAUTY_FIELD_OPTIONS_BY_SUBCATEGORY,
  ...JOB_FIELD_OPTIONS_BY_SUBCATEGORY,
  ...KIDS_FIELD_OPTIONS_BY_SUBCATEGORY,
  ...MOBILE_FIELDS_OPTIONS_BY_SUBCATEGORY,
  ...PROPERTY_RENT_FIELD_OPTIONS_BY_SUBCATEGORY,
  ...PROPERTY_SALE_FIELD_OPTIONS_BY_SUBCATEGORY,
  ...SERVICE_FIELD_OPTIONS_BY_SUBCATEGORY,
  ...VEHICLE_FIELD_OPTIONS_BY_SUBCATEGORY,
  ...FURNITURE_HOME_DECOR_FIELD_OPTIONS_BY_SUBCATEGORY,
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
