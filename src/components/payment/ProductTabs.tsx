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
              <div className="absolute bottom-0 -right-8 h-full w-8 z-0 pointer-events-none">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 32 48"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M0 0 C18 0 32 16 32 48 L0 48 Z"
                    className="fill-background"
                  />
                </svg>
              </div>
            )}

            {/* Left curve when right tab (addon) is selected */}
            {isActive && !isLeft && (
              <div className="absolute bottom-0 -left-8 h-full w-8 z-0 pointer-events-none">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 32 48"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M32 0 C14 0 0 16 0 48 L32 48 Z"
                    className="fill-background"
                  />
                </svg>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ProductTabs;
