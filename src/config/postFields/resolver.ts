import { ANIMAL_POST_FIELDS_BY_SUBCATEGORY } from "@/config/postFields/animals";
import { BIKE_POST_FIELDS_BY_SUBCATEGORY } from "@/config/postFields/bike";
import { BOOKS_SPORTS_HOBBIES_POST_FIELDS_BY_SUBCATEGORY } from "@/config/postFields/books-sports-hobbies";
import { BUSINESS_INDUSTRIES_AGRICULTURE_POST_FIELDS_BY_SUBCATEGORY } from "@/config/postFields/business-industries-agriculture";
import { ELECTRONICS_HOME_APPLIANCES_POST_FIELDS_BY_SUBCATEGORY } from "@/config/postFields/electronics-home-appliances";
import { FASHION_BEAUTY_POST_FIELDS_BY_SUBCATEGORY } from "@/config/postFields/fashion-beauty";
import { FURNITURE_HOME_DECOR_POST_FIELDS_BY_SUBCATEGORY } from "@/config/postFields/furniture-home-decor";
import { JOB_POST_FIELDS_BY_SUBCATEGORY } from "@/config/postFields/jobs";
import { KIDS_POST_FIELDS_BY_SUBCATEGORY } from "@/config/postFields/kids";
import { MOBILE_POST_FIELDS_BY_SUBCATEGORY } from "@/config/postFields/mobiles";
import { PROPERTY_RENT_POST_FIELDS_BY_SUBCATEGORY } from "@/config/postFields/property-rent";
import { PROPERTY_SALE_POST_FIELDS_BY_SUBCATEGORY } from "@/config/postFields/property-sale";
import { SERVICE_POST_FIELDS_BY_SUBCATEGORY } from "@/config/postFields/services";
import type { Field } from "@/config/postFields/types";
import { VEHICLE_POST_FIELDS_BY_SUBCATEGORY } from "@/config/postFields/vehicles";

const POST_FIELDS_BY_MAIN_CATEGORY: Record<string, Record<string, Field[]>> = {
  animals: ANIMAL_POST_FIELDS_BY_SUBCATEGORY,
  bike: BIKE_POST_FIELDS_BY_SUBCATEGORY,
  "books-sports-hobbies": BOOKS_SPORTS_HOBBIES_POST_FIELDS_BY_SUBCATEGORY,
  "business-industries-agriculture":
    BUSINESS_INDUSTRIES_AGRICULTURE_POST_FIELDS_BY_SUBCATEGORY,
  "electronics-home-appliances":
    ELECTRONICS_HOME_APPLIANCES_POST_FIELDS_BY_SUBCATEGORY,
  "fashion-beauty": FASHION_BEAUTY_POST_FIELDS_BY_SUBCATEGORY,
  jobs: JOB_POST_FIELDS_BY_SUBCATEGORY,
  kids: KIDS_POST_FIELDS_BY_SUBCATEGORY,
  mobiles: MOBILE_POST_FIELDS_BY_SUBCATEGORY,
  "property-for-rent": PROPERTY_RENT_POST_FIELDS_BY_SUBCATEGORY,
  "property-for-sale": PROPERTY_SALE_POST_FIELDS_BY_SUBCATEGORY,
  services: SERVICE_POST_FIELDS_BY_SUBCATEGORY,
  vehicles: VEHICLE_POST_FIELDS_BY_SUBCATEGORY,
  "furniture-home-decor": FURNITURE_HOME_DECOR_POST_FIELDS_BY_SUBCATEGORY,
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
