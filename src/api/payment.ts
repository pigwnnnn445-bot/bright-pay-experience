import type {
  UserProfile,
  ProductConfig,
  SkuPrice,
  BenefitConfig,
  DisplayProduct,
  CreateOrderParams,
  PaymentOrder,
  OrderStatusResult,
  OrderStatus,
  AgreementLink,
} from "@/types/payment";

// ========== Mock Data ==========

const mockUserProfile: UserProfile = {
  id: "u_001",
  avatar: "",
  nickname: "Alex Chen",
  badge: "专业版",
  expireTime: "2026/12/28",
  expireTip: "您的会员将于 2026/12/28 到期，购买后有效期顺延",
};

const mockProductConfigs: ProductConfig[] = [
  {
    configId: "cfg_1",
    productType: "membership",
    title: "Pro套餐15天",
    subTitle: "包含570配额，日均价仅¥1.05",
    badgeText: "推荐套餐",
    badgeType: "recommend",
    isOnline: true,
    isDefault: false,
    sort: 1,
    skuCode: "sku_m_15",
  },
  {
    configId: "cfg_2",
    productType: "membership",
    title: "Pro套餐30天",
    subTitle: "包含1200配额，日均价仅¥0.86",
    badgeText: "性价比最高",
    badgeType: "value",
    isOnline: true,
    isDefault: true,
    sort: 2,
    skuCode: "sku_m_30",
  },
  {
    configId: "cfg_3",
    productType: "membership",
    title: "Pro套餐90天",
    subTitle: "包含4000配额，日均价仅¥0.72",
    badgeText: "",
    badgeType: "",
    isOnline: true,
    isDefault: false,
    sort: 3,
    skuCode: "sku_m_90",
  },
  {
    configId: "cfg_4",
    productType: "membership",
    title: "Pro套餐365天",
    subTitle: "包含18000配额，日均价仅¥0.55",
    badgeText: "",
    badgeType: "",
    isOnline: true,
    isDefault: false,
    sort: 4,
    skuCode: "sku_m_365",
  },
  {
    configId: "cfg_5",
    productType: "addon",
    title: "100 配额",
    subTitle: "少量补充，立即继续使用，无时效限制",
    badgeText: "临时补充",
    badgeType: "recommend",
    isOnline: true,
    isDefault: true,
    sort: 1,
    skuCode: "sku_a_100",
  },
  {
    configId: "cfg_6",
    productType: "addon",
    title: "200 配额",
    subTitle: "常用补充，避免中断创作，无时效限制",
    badgeText: "常用补充",
    badgeType: "recommend",
    isOnline: true,
    isDefault: false,
    sort: 2,
    skuCode: "sku_a_200",
  },
  {
    configId: "cfg_7",
    productType: "addon",
    title: "500 配额",
    subTitle: "高频随心用，效率显著提升，无时效限制",
    badgeText: "更划算",
    badgeType: "value",
    isOnline: true,
    isDefault: false,
    sort: 3,
    skuCode: "sku_a_500",
  },
  {
    configId: "cfg_8",
    productType: "addon",
    title: "1000 配额",
    subTitle: "深度补充，告别配额焦虑，无时效限制",
    badgeText: "性价比最高",
    badgeType: "value",
    isOnline: true,
    isDefault: false,
    sort: 4,
    skuCode: "sku_a_1000",
  },
];

const mockSkuPrices: SkuPrice[] = [
  { skuId: "s1", skuCode: "sku_m_15", salePrice: 15.88, originalPrice: 25.88, currency: "¥", isSaleable: true },
  { skuId: "s2", skuCode: "sku_m_30", salePrice: 25.88, originalPrice: 50.88, currency: "¥", isSaleable: true },
  { skuId: "s3", skuCode: "sku_m_90", salePrice: 64.88, originalPrice: 128.88, currency: "¥", isSaleable: true },
  { skuId: "s4", skuCode: "sku_m_365", salePrice: 198.88, originalPrice: 398.88, currency: "¥", isSaleable: true },
  { skuId: "s5", skuCode: "sku_a_100", salePrice: 4.98, originalPrice: 7.98, currency: "¥", isSaleable: true },
  { skuId: "s6", skuCode: "sku_a_200", salePrice: 9.58, originalPrice: 23.98, currency: "¥", isSaleable: true },
  { skuId: "s7", skuCode: "sku_a_500", salePrice: 23.88, originalPrice: 62.88, currency: "¥", isSaleable: true },
  { skuId: "s8", skuCode: "sku_a_1000", salePrice: 45.88, originalPrice: 179.98, currency: "¥", isSaleable: true },
];

const mockBenefitConfigs: BenefitConfig[] = [
  { benefitId: "b1", productType: "membership", icon: "crown", title: "顶级模型免费使用", description: "20+ 顶级模型不消耗配额，高频使用也毫无压力", isOnline: true, sort: 1 },
  { benefitId: "b2", productType: "membership", icon: "monitor", title: "全场景通用", description: "可支持1200次对话 / 240张图片 / 34个视频 / 60个音频", isOnline: true, sort: 2 },
  { benefitId: "b3", productType: "membership", icon: "message-circle", title: "全球知名对话模型", description: "Chat、双子星、克劳德等30+全球顶级模型，为您的指令提供经全球验证的专业支持。", isOnline: true, sort: 3 },
  { benefitId: "b4", productType: "membership", icon: "image", title: "全球知名生图模型", description: "集成香蕉、MJ 等10+ 顶级生图模型，实现更出色的生成效果。", isOnline: true, sort: 4 },
  { benefitId: "b5", productType: "membership", icon: "search", title: "深度研究功能", description: "面向学生、教授、专家、律师等专业人士的效率利器，快速整合海量信息，有深度，可信赖", isOnline: true, sort: 5 },
  { benefitId: "b6", productType: "membership", icon: "star", title: "更多实用功能", description: "支持水印去除、卡通头像生成、专业翻译等多种能力，轻松兼顾工作与生活", isOnline: true, sort: 6 },
  { benefitId: "b7", productType: "addon", icon: "plus-circle", title: "即买即用", description: "配额实时到账，无需等待", isOnline: true, sort: 1 },
  { benefitId: "b8", productType: "addon", icon: "clock", title: "永不过期", description: "加量包配额不限使用期限", isOnline: true, sort: 2 },
];

// ========== API Simulation ==========

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getUserProfile(): Promise<UserProfile> {
  await delay(300);
  return mockUserProfile;
}

export async function getProductConfigs(): Promise<ProductConfig[]> {
  await delay(200);
  return mockProductConfigs;
}

export async function getSkuPrices(): Promise<SkuPrice[]> {
  await delay(200);
  return mockSkuPrices;
}

export async function getBenefitConfigs(): Promise<BenefitConfig[]> {
  await delay(200);
  return mockBenefitConfigs;
}

// ========== Data Assembly ==========

export function buildDisplayProducts(
  configs: ProductConfig[],
  skus: SkuPrice[]
): DisplayProduct[] {
  const skuMap = new Map(skus.map((s) => [s.skuCode, s]));

  return configs
    .filter((c) => c.isOnline)
    .map((c) => {
      const sku = skuMap.get(c.skuCode);
      if (!sku) return null;
      return {
        configId: c.configId,
        skuId: sku.skuId,
        skuCode: c.skuCode,
        productType: c.productType,
        title: c.title,
        subTitle: c.subTitle,
        badgeText: c.badgeText,
        badgeType: c.badgeType,
        salePrice: sku.salePrice,
        originalPrice: sku.originalPrice,
        currency: sku.currency,
        isSaleable: sku.isSaleable,
        isDefault: c.isDefault,
        sort: c.sort,
      } as DisplayProduct;
    })
    .filter((p): p is DisplayProduct => p !== null)
    .sort((a, b) => a.sort - b.sort);
}

// ========== Payment Order API (Mock) ==========

// In-memory order store for simulation
const orderStore = new Map<string, { status: OrderStatus; payMethod: string }>();

let orderCounter = 0;

export async function createOrder(params: CreateOrderParams): Promise<PaymentOrder> {
  await delay(500);
  orderCounter++;
  const orderId = `order_${Date.now()}_${orderCounter}`;
  const sku = mockSkuPrices.find((s) => s.skuCode === params.skuCode);

  // Store order with "paying" status
  orderStore.set(orderId, { status: "paying", payMethod: params.payMethod });

  // Simulate auto-payment after 8 seconds
  setTimeout(() => {
    const order = orderStore.get(orderId);
    if (order && order.status === "paying") {
      order.status = "paid";
    }
  }, 8000);

  // Generate a mock QR code URL (using a public QR code API for demo)
  const qrContent = encodeURIComponent(
    `${params.payMethod === "wechat" ? "wxp" : "alipay"}://pay?order=${orderId}&amount=${sku?.salePrice || 0}`
  );
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=164x164&data=${qrContent}`;

  return {
    orderId,
    status: "paying",
    qrCodeUrl,
    payMethod: params.payMethod,
    amount: sku?.salePrice || 0,
    currency: sku?.currency || "¥",
    createdAt: new Date().toISOString(),
  };
}

export async function getOrderStatus(orderId: string): Promise<OrderStatusResult> {
  await delay(300);
  const order = orderStore.get(orderId);
  return {
    orderId,
    status: order?.status || "pending",
  };
}

export async function cancelOrder(orderId: string): Promise<void> {
  await delay(200);
  const order = orderStore.get(orderId);
  if (order && order.status === "paying") {
    order.status = "cancelled";
  }
}

// ========== Agreement Links API (Mock) ==========

const mockAgreementLinks: AgreementLink[] = [
  { key: "terms", label: "服务条款", url: "https://example.com/terms" },
  { key: "privacy", label: "隐私政策", url: "https://example.com/privacy" },
];

export async function getAgreementLinks(): Promise<AgreementLink[]> {
  await delay(200);
  return mockAgreementLinks;
}

// ========== Payment Success API (Mock) ==========

export async function getPaymentSuccessResult(orderId: string): Promise<import("@/types/payment").PaymentSuccessResult> {
  await delay(300);
  const order = orderStore.get(orderId);
  const sku = mockSkuPrices.find((s) => {
    // Find matching sku from order
    return mockProductConfigs.some((c) => c.skuCode === s.skuCode);
  });
  
  // Find the product config that matches this order
  const matchedSku = mockSkuPrices.find((s) => {
    const config = mockProductConfigs.find((c) => c.skuCode === s.skuCode);
    return config && s.salePrice > 0;
  });

  return {
    amount: matchedSku?.salePrice || 0,
    currency: matchedSku?.currency || "¥",
    productName: "Pro会员30天",
    expireTime: "2026/01/28 10:09:00",
  };
}
