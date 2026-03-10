import { motion } from "framer-motion";
import type { ProductType } from "@/types/payment";
import { cn } from "@/lib/utils";
import tabCurveLeft from "@/assets/tab-curve-left.webp";
import tabCurveRight from "@/assets/tab-curve-right.webp";

interface ProductTabsProps {
  activeTab: ProductType;
  onTabChange: (tab: ProductType) => void;
}

const tabs: { key: ProductType; label: string }[] = [
  { key: "membership", label: "会员套餐" },
  { key: "addon", label: "加量包" },
];

const ProductTabs = ({ activeTab, onTabChange }: ProductTabsProps) => {
  return (
    <div className="relative flex w-full">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const isLeft = tab.key === "membership";

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

            {/* Selected tab background */}
            {isActive && (
              <motion.div
                layoutId="tab-bg"
                className="absolute inset-0 bg-background"
                style={{
                  borderRadius: isLeft ? "16px 0 0 0" : "0 16px 0 0",
                  zIndex: 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            {/* Right curve when left tab (membership) is selected */}
            {isActive && isLeft && (
              <img
                src={tabCurveRight}
                alt=""
                className="absolute bottom-0 -right-6 h-full w-6 z-0 pointer-events-none"
              />
            )}

            {/* Left curve when right tab (addon) is selected */}
            {isActive && !isLeft && (
              <img
                src={tabCurveLeft}
                alt=""
                className="absolute bottom-0 -left-6 h-full w-6 z-0 pointer-events-none"
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ProductTabs;
