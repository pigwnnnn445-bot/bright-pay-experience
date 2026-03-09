import type { DisplayProduct } from "@/types/payment";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: DisplayProduct;
  selected: boolean;
  onSelect: (product: DisplayProduct) => void;
}

const ProductCard = ({ product, selected, onSelect }: ProductCardProps) => {
  const disabled = !product.isSaleable;
  const discount = product.originalPrice - product.salePrice;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && onSelect(product)}
      className={cn(
        "relative w-full rounded-xl border-2 p-4 text-left transition-all duration-200 cursor-pointer",
        "hover:shadow-card",
        selected
          ? "border-primary bg-primary/5 shadow-card"
          : "border-border bg-card hover:border-primary/40",
        disabled && "pointer-events-none opacity-40"
      )}
    >
      {/* Badge */}
      {product.badgeText && (
        <span
          className={cn(
            "absolute -top-2.5 right-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground",
            product.badgeType === "recommend"
              ? "bg-gradient-to-r from-theme-purple to-theme-green"
              : "bg-theme-green"
          )}
        >
          {product.badgeText}
        </span>
      )}

      <p className="text-sm font-semibold text-title">{product.title}</p>

      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="text-xl font-bold text-primary">
          {product.currency}{product.salePrice.toFixed(2)}
        </span>
        <span className="text-xs text-text-muted line-through">
          {product.currency}{product.originalPrice.toFixed(2)}
        </span>
      </div>

      <p className="mt-1 text-xs text-text-secondary">{product.subTitle}</p>

      {selected && discount > 0 && (
        <p className="mt-1.5 text-[10px] font-medium text-theme-green">
          已省 {product.currency}{discount.toFixed(2)}
        </p>
      )}
    </button>
  );
};

export default ProductCard;
