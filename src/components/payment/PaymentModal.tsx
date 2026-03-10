import { useEffect, useState, useCallback } from "react";
import modalBg from "@/assets/modal-bg.webp";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { UserProfile, ProductType, DisplayProduct, BenefitConfig, PayMethod } from "@/types/payment";
import {
  getUserProfile,
  getProductConfigs,
  getSkuPrices,
  getBenefitConfigs,
  buildDisplayProducts,
  createOrder,
  cancelOrder,
  getOrderStatus,
} from "@/api/payment";
import { useIsMobile } from "@/hooks/use-mobile";
import UserProfileHeader from "./UserProfileHeader";
import ProductTabs from "./ProductTabs";
import ProductCardList from "./ProductCardList";
import BenefitSection from "./BenefitSection";
import PaymentSummaryPanel from "./PaymentSummaryPanel";
import MobilePayMethodSelector from "./MobilePayMethodSelector";
import MobilePayBottomBar from "./MobilePayBottomBar";
import PaymentSuccessModal from "./PaymentSuccessModal";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
}

const PaymentModal = ({ open, onClose }: PaymentModalProps) => {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [allProducts, setAllProducts] = useState<DisplayProduct[]>([]);
  const [allBenefits, setAllBenefits] = useState<BenefitConfig[]>([]);
  const [activeTab, setActiveTab] = useState<ProductType>("membership");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Mobile payment state
  const [mobilePayMethod, setMobilePayMethod] = useState<PayMethod>("wechat");
  const [mobilePaying, setMobilePaying] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paidOrderId, setPaidOrderId] = useState<string>("");

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

        const tabProducts = products.filter((p) => p.productType === "membership" && p.isSaleable);
        const defaultP = tabProducts[1] || tabProducts[0];
        if (defaultP) setSelectedId(defaultP.configId);
      })
      .catch(() => setError("数据加载失败，请稍后重试"))
      .finally(() => setLoading(false));
  }, [open]);

  const filteredProducts = allProducts.filter(
    (p) => p.productType === activeTab && p.isSaleable
  );
  const filteredBenefits = allBenefits.filter((b) => b.productType === activeTab);
  const selectedProduct = allProducts.find((p) => p.configId === selectedId) || null;

  const handleTabChange = useCallback(
    (tab: ProductType) => {
      setActiveTab(tab);
      const tabProducts = allProducts.filter((p) => p.productType === tab && p.isSaleable);
      const defaultP = tabProducts[1] || tabProducts[0];
      setSelectedId(defaultP?.configId || null);
    },
    [allProducts]
  );

  const handleSelect = useCallback((product: DisplayProduct) => {
    setSelectedId(product.configId);
  }, []);

  const handleMobilePay = useCallback(async () => {
    if (!selectedProduct || !user) return;
    setMobilePaying(true);
    try {
      const order = await createOrder({
        skuId: selectedProduct.skuId,
        skuCode: selectedProduct.skuCode,
        productType: selectedProduct.productType,
        userId: user.id,
        payMethod: mobilePayMethod,
      });
      // Poll for payment status
      const pollInterval = setInterval(async () => {
        try {
          const result = await getOrderStatus(order.orderId);
          if (result.status === "paid") {
            clearInterval(pollInterval);
            setMobilePaying(false);
            setPaidOrderId(order.orderId);
            setShowSuccessModal(true);
          } else if (result.status === "failed" || result.status === "cancelled" || result.status === "expired") {
            clearInterval(pollInterval);
            setMobilePaying(false);
            alert("支付失败，请重试");
          }
        } catch {}
      }, 2000);
    } catch {
      alert("支付失败，请重试");
      setMobilePaying(false);
    }
  }, [selectedProduct, user, mobilePayMethod]);

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
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 flex w-full max-w-[980px] max-lg:max-w-full h-[700px] max-lg:h-full max-lg:max-h-screen flex-col overflow-hidden rounded-2xl max-lg:rounded-none shadow-modal lg:flex-row"
            style={{ backgroundImage: `url(${modalBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-hover-bg hover:text-title cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Main content */}
            <div className="flex-1 overflow-y-auto p-6 max-lg:pb-4">
              {error ? (
                <div className="flex h-48 items-center justify-center">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              ) : (
                <>
                  <UserProfileHeader user={user} loading={loading} />

                  {/* Wrapped content area */}
                  <div className="mt-5 rounded-2xl border border-border bg-background p-4">
                    {/* Tab switcher */}
                    <ProductTabs activeTab={activeTab} onTabChange={handleTabChange} />

                    {/* Product cards */}
                    <div className="mt-3">
                      <ProductCardList
                        products={filteredProducts}
                        selectedId={selectedId}
                        onSelect={handleSelect}
                        loading={loading}
                        productType={activeTab}
                      />
                    </div>

                    {/* Mobile: payment method selector */}
                    {isMobile && (
                      <div className="mt-5 px-1">
                        <MobilePayMethodSelector
                          payMethod={mobilePayMethod}
                          onSwitch={setMobilePayMethod}
                        />
                      </div>
                    )}

                    {/* Benefits - only for membership */}
                    {activeTab === "membership" && (
                      <BenefitSection benefits={filteredBenefits} loading={loading} />
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Desktop: right payment panel */}
            {!isMobile && (
              <div className="w-full shrink-0 border-t border-border p-5 lg:pt-[118px] lg:w-[220px] lg:border-t-0">
                <PaymentSummaryPanel
                  product={selectedProduct}
                  userId={user?.id || ""}
                />
              </div>
            )}

            {/* Mobile: bottom pay bar */}
            {isMobile && (
              <MobilePayBottomBar
                product={selectedProduct}
                paying={mobilePaying}
                onPay={handleMobilePay}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;