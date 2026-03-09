// Payment domain types

export interface UserProfile {
  id: string;
  avatar: string;
  nickname: string;
  badge: string;
  expireTime: string;
  expireTip: string;
}

export type ProductType = "membership" | "addon";

export interface ProductConfig {
  configId: string;
  productType: ProductType;
  title: string;
  subTitle: string;
  badgeText: string;
  badgeType: "recommend" | "value" | "";
  isOnline: boolean;
  isDefault: boolean;
  sort: number;
  skuCode: string;
}

export interface SkuPrice {
  skuId: string;
  skuCode: string;
  salePrice: number;
  originalPrice: number;
  currency: string;
  isSaleable: boolean;
}

export interface BenefitConfig {
  benefitId: string;
  productType: ProductType;
  icon: string;
  title: string;
  description: string;
  isOnline: boolean;
  sort: number;
}

/** Merged product for UI rendering */
export interface DisplayProduct {
  configId: string;
  skuId: string;
  skuCode: string;
  productType: ProductType;
  title: string;
  subTitle: string;
  badgeText: string;
  badgeType: "recommend" | "value" | "";
  salePrice: number;
  originalPrice: number;
  currency: string;
  isSaleable: boolean;
  isDefault: boolean;
  sort: number;
}
