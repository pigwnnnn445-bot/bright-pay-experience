import { motion } from "framer-motion";
import type { ProductType } from "@/types/payment";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import tabCurveLeft from "@/assets/tab-curve-left.webp";
import tabCurveRight from "@/assets/tab-curve-right.webp";
import tabCurveLeftDark from "@/assets/tab-curve-left-dark.webp";
import tabCurveRightDark from "@/assets/tab-curve-right-dark.webp";

interface ProductTabsProps {
  activeTab: ProductType;
  onTabChange: (tab: ProductType) => void;
}

const tabs: { key: ProductType; label: string }[] = [
  { key: "membership", label: "Pro套餐" },
  { key: "addon", label: "加量包" },
];

const springTransition = { type: "spring" as const, stiffness: 350, damping: 30 };

const ProductTabs = ({ activeTab, onTabChange }: ProductTabsProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const curveLeft = isDark ? tabCurveLeftDark : tabCurveLeft;
  const curveRight = isDark ? tabCurveRightDark : tabCurveRight;

  return (
    <div className="relative flex w-full items-end">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const isLeft = tab.key === "membership";

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={cn(
              "relative flex-1 text-base font-medium cursor-pointer",
              isLeft ? "rounded-tl-2xl" : "rounded-tr-2xl",
              isActive
                ? "h-[52px] flex items-center justify-center text-title font-semibold z-10"
                : "h-[44px] flex items-center justify-center self-end text-text-muted hover:text-text-secondary bg-white/60 backdrop-blur-[10px] dark:bg-[rgba(35,35,40,0.8)] dark:backdrop-blur-none z-0"
            )}
          >
            <span className="relative z-10">{tab.label}</span>

            {/* Selected tab background */}
            {isActive && (
              <div
                className="absolute inset-0 bg-background"
                style={{
                  borderRadius: isLeft ? "16px 0 0 0" : "0 16px 0 0",
                  zIndex: 0,
                }}
              />
            )}

            {/* Curve connectors — always mounted, visibility toggled */}
            {isLeft && (
              <img
                src={curveLeft}
                alt=""
                className={cn(
                  "absolute bottom-0 -right-6 h-full w-6 z-0 pointer-events-none",
                  isActive ? "visible" : "invisible"
                )}
              />
            )}
            {!isLeft && (
              <img
                src={curveRight}
                alt=""
                className={cn(
                  "absolute bottom-0 -left-6 h-full w-6 z-0 pointer-events-none",
                  isActive ? "visible" : "invisible"
                )}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ProductTabs;
