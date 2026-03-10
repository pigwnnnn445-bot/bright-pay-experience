import { motion } from "framer-motion";
import type { ProductType } from "@/types/payment";
import { cn } from "@/lib/utils";

interface ProductTabsProps {
  activeTab: ProductType;
  onTabChange: (tab: ProductType) => void;
}

const tabs: { key: ProductType; label: string }[] = [
  { key: "membership", label: "会员套餐" },
  { key: "addon", label: "加量包" },
];

const ProductTabs = ({ activeTab, onTabChange }: ProductTabsProps) => {
  const activeIndex = tabs.findIndex((t) => t.key === activeTab);

  return (
    <div className="relative flex w-full">
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={cn(
              "relative flex-1 py-3 text-base font-medium transition-colors duration-200 cursor-pointer",
              isActive
                ? "text-title font-semibold"
                : "text-text-muted hover:text-text-secondary"
            )}
          >
            <span className="relative z-10">{tab.label}</span>
            {isActive && (
              <motion.div
                layoutId="tab-bg"
                className="absolute inset-0 bg-background"
                style={{
                  borderRadius: "16px 16px 0 0",
                  zIndex: 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {/* Left curve connector */}
            {isActive && (
              <motion.div
                layoutId="tab-curve-left"
                className="absolute bottom-0 -left-3 h-3 w-3 z-0"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M12 12H0V0C0 0 0 12 12 12Z"
                    className="fill-background"
                  />
                </svg>
              </motion.div>
            )}
            {/* Right curve connector */}
            {isActive && (
              <motion.div
                layoutId="tab-curve-right"
                className="absolute bottom-0 -right-3 h-3 w-3 z-0"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M0 12H12V0C12 0 12 12 0 12Z"
                    className="fill-background"
                  />
                </svg>
              </motion.div>
            )}
          </button>
        );
      })}
      {/* Background bar behind tabs */}
      <div className="absolute inset-0 rounded-t-2xl bg-card-alt -z-10" />
    </div>
  );
};

export default ProductTabs;
