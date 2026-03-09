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
    <div className="flex border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onTabChange(tab.key)}
          className={cn(
            "relative px-6 py-3 text-sm font-medium transition-colors duration-200 cursor-pointer",
            activeTab === tab.key
              ? "text-title"
              : "text-text-muted hover:text-text-secondary"
          )}
        >
          {tab.label}
          {activeTab === tab.key && (
            <span className="absolute bottom-0 left-1/2 h-0.5 w-12 -translate-x-1/2 rounded-full bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
};

export default ProductTabs;
