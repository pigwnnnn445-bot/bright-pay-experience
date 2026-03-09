import type {
  UserProfile,
  ProductConfig,
  SkuPrice,
  BenefitConfig,
  DisplayProduct,
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
  { benefitId: "b1", productType: "membership", icon: "crown", title: "高级特权", description: "解锁全部高级功能，优先体验最新AI能力", isOnline: true, sort: 1 },
  { benefitId: "b2", productType: "membership", icon: "infinity", title: "高额配额", description: "每日配额大幅提升，满足高频计算需求", isOnline: true, sort: 2 },
  { benefitId: "b3", productType: "membership", icon: "shield", title: "隐私保护", description: "数据专属加密通道，全面保护您的隐私安全", isOnline: true, sort: 3 },
  { benefitId: "b4", productType: "membership", icon: "hard-drive", title: "超大容量", description: "尊享扩容云端存储空间，保留更多历史记录", isOnline: true, sort: 4 },
  { benefitId: "b5", productType: "membership", icon: "zap", title: "极速生成", description: "AI 模型优先调度，极速响应告别排队", isOnline: true, sort: 5 },
  { benefitId: "b6", productType: "membership", icon: "star", title: "专属标识", description: "尊贵 Pro 会员专属身份标识与个性主页", isOnline: true, sort: 6 },
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
