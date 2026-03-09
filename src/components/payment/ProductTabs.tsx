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
    <div className="relative flex w-full rounded-2xl bg-card-alt p-1">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onTabChange(tab.key)}
          className={cn(
            "relative z-10 flex-1 py-2.5 text-sm font-medium transition-colors duration-200 cursor-pointer rounded-xl",
            activeTab === tab.key
              ? "text-title font-semibold"
              : "text-text-muted hover:text-text-secondary"
          )}
        >
          {tab.label}
          {activeTab === tab.key && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute inset-0 rounded-xl bg-menu-selected shadow-card"
              style={{ zIndex: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default ProductTabs;
