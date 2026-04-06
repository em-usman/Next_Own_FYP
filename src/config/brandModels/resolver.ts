import { VEHICLE_BRAND_MODELS } from "@/config/brandModels/Vehicles";
import { MOBILE_PHONE_BRAND_MODELS } from "@/config/brandModels/mobiles";

export type BrandModelsMap = Record<string, string[]>;

export type BrandModelConfig = {
  brands: string[];
  brandModels: BrandModelsMap;
};

const BRAND_MODELS_BY_MAIN_CATEGORY: Record<string, BrandModelsMap> = {
  mobiles: MOBILE_PHONE_BRAND_MODELS,
  vehicles: VEHICLE_BRAND_MODELS,
};

const BRAND_MODELS_BY_SUBCATEGORY: Record<string, BrandModelsMap> = {
  "mobile-phones": MOBILE_PHONE_BRAND_MODELS,
  tablets: MOBILE_PHONE_BRAND_MODELS,
  "smart-watches": MOBILE_PHONE_BRAND_MODELS,
  cars: VEHICLE_BRAND_MODELS,
  "cars-on-installments": VEHICLE_BRAND_MODELS,
  "buses-vans-trucks": VEHICLE_BRAND_MODELS,
  "rickshaw-chingchi": VEHICLE_BRAND_MODELS,
  "tractors-trailers": VEHICLE_BRAND_MODELS,
  "other-vehicles": VEHICLE_BRAND_MODELS,
  boats: VEHICLE_BRAND_MODELS,
};

const FALLBACK_BRAND_MODELS = MOBILE_PHONE_BRAND_MODELS;

export function getBrandModelConfig(
  categoryId: string,
  subCategoryId: string,
): BrandModelConfig {
  const normalizedCategoryId = categoryId?.toLowerCase().trim();
  const normalizedSubCategoryId = subCategoryId?.toLowerCase().trim();

  const brandModels =
    BRAND_MODELS_BY_SUBCATEGORY[normalizedSubCategoryId] ||
    BRAND_MODELS_BY_MAIN_CATEGORY[normalizedCategoryId] ||
    FALLBACK_BRAND_MODELS;

  return {
    brandModels,
    brands: Object.keys(brandModels),
  };
}
