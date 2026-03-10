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

// ========== Payment Order Types ==========

export type PayMethod = "wechat" | "alipay";

export type OrderStatus =
  | "pending"      // 待支付
  | "paying"       // 支付中
  | "paid"         // 支付成功
  | "failed"       // 支付失败
  | "cancelled"    // 已取消
  | "refunded"     // 已退款
  | "expired";     // 已过期

export interface CreateOrderParams {
  skuId: string;
  skuCode: string;
  productType: string;
  userId: string;
  payMethod: PayMethod;
}

export interface PaymentOrder {
  orderId: string;
  status: OrderStatus;
  qrCodeUrl: string;
  payMethod: PayMethod;
  amount: number;
  currency: string;
  createdAt: string;
}

export interface OrderStatusResult {
  orderId: string;
  status: OrderStatus;
}

export interface AgreementLink {
  key: string;
  label: string;
  url: string;
}
