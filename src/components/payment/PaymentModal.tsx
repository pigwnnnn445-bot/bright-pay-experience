import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { UserProfile, ProductType, DisplayProduct, BenefitConfig } from "@/types/payment";
import {
  getUserProfile,
  getProductConfigs,
  getSkuPrices,
  getBenefitConfigs,
  buildDisplayProducts,
} from "@/api/payment";
import UserProfileHeader from "./UserProfileHeader";
import ProductTabs from "./ProductTabs";
import ProductCardList from "./ProductCardList";
import BenefitSection from "./BenefitSection";
import PaymentSummaryPanel from "./PaymentSummaryPanel";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
}

const PaymentModal = ({ open, onClose }: PaymentModalProps) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [allProducts, setAllProducts] = useState<DisplayProduct[]>([]);
  const [allBenefits, setAllBenefits] = useState<BenefitConfig[]>([]);
  const [activeTab, setActiveTab] = useState<ProductType>("membership");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch data
  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError(null);

    Promise.all([getUserProfile(), getProductConfigs(), getSkuPrices(), getBenefitConfigs()])
      .then(([userRes, configRes, skuRes, benefitRes]) => {
        setUser(userRes);
        const products = buildDisplayProducts(configRes, skuRes);
        setAllProducts(products);
        setAllBenefits(benefitRes.filter((b) => b.isOnline).sort((a, b) => a.sort - b.sort));

        // Auto-select default
        const tabProducts = products.filter((p) => p.productType === "membership" && p.isSaleable);
        const defaultP = tabProducts.find((p) => p.isDefault) || tabProducts[0];
        if (defaultP) setSelectedId(defaultP.configId);
      })
      .catch(() => setError("数据加载失败，请稍后重试"))
      .finally(() => setLoading(false));
  }, [open]);

  // Filtered products for current tab
  const filteredProducts = allProducts.filter(
    (p) => p.productType === activeTab && p.isSaleable
  );

  const filteredBenefits = allBenefits.filter((b) => b.productType === activeTab);

  const selectedProduct = allProducts.find((p) => p.configId === selectedId) || null;

  // Tab change
  const handleTabChange = useCallback(
    (tab: ProductType) => {
      setActiveTab(tab);
      const tabProducts = allProducts.filter((p) => p.productType === tab && p.isSaleable);
      const defaultP = tabProducts.find((p) => p.isDefault) || tabProducts[0];
      setSelectedId(defaultP?.configId || null);
    },
    [allProducts]
  );

  const handleSelect = useCallback((product: DisplayProduct) => {
    setSelectedId(product.configId);
  }, []);

  const handlePay = useCallback(
    (params: { skuId: string; skuCode: string; productType: string; userId: string }) => {
      // TODO: 接入真实支付接口
      console.log("发起支付:", params);
      alert(`支付参数准备完毕\nSKU: ${params.skuCode}\n金额: ${selectedProduct?.currency}${selectedProduct?.salePrice}`);
    },
    [selectedProduct]
  );

  // ESC close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-card shadow-modal lg:flex-row"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ maxHeight: "90vh" }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-hover-bg hover:text-title cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Left content */}
            <div className="flex-1 overflow-y-auto p-6 lg:pr-0">
              {error ? (
                <div className="flex h-48 items-center justify-center">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              ) : (
                <>
                  {/* User info */}
                  <UserProfileHeader user={user} loading={loading} />

                  {/* Tabs */}
                  <div className="mt-5">
                    <ProductTabs activeTab={activeTab} onTabChange={handleTabChange} />
                  </div>

                  {/* Product cards */}
                  <div className="mt-4">
                    <ProductCardList
                      products={filteredProducts}
                      selectedId={selectedId}
                      onSelect={handleSelect}
                      loading={loading}
                    />
                  </div>

                  {/* Benefits */}
                  <BenefitSection benefits={filteredBenefits} loading={loading} />
                </>
              )}
            </div>

            {/* Right payment panel */}
            <div className="w-full shrink-0 border-t border-border p-4 lg:w-64 lg:border-l lg:border-t-0 lg:p-5">
              <PaymentSummaryPanel
                product={selectedProduct}
                userId={user?.id || ""}
                onPay={handlePay}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
