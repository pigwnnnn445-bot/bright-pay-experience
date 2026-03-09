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
    <div className="flex gap-1 rounded-full bg-card-alt p-1">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onTabChange(tab.key)}
          className={cn(
            "rounded-full px-5 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer",
            activeTab === tab.key
              ? "bg-menu-selected text-title shadow-sm"
              : "text-text-secondary hover:text-title"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ProductTabs;
