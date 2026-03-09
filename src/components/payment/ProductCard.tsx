import type { DisplayProduct } from "@/types/payment";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: DisplayProduct;
  selected: boolean;
  onSelect: (product: DisplayProduct) => void;
  variant?: "default" | "addon";
}

const ProductCard = ({ product, selected, onSelect, variant = "default" }: ProductCardProps) => {
  const disabled = !product.isSaleable;
  const isAddon = variant === "addon";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && onSelect(product)}
      className={cn(
        "relative flex flex-col items-center rounded-xl border-2 text-center transition-all duration-200 cursor-pointer",
        isAddon ? "w-full px-4 py-4" : "w-[170px] min-w-[170px] shrink-0 px-4 py-3",
        selected
          ? "border-primary bg-primary/[0.03] scale-[1.02] shadow-card"
          : "border-border bg-card hover:border-primary/30",
        disabled && "pointer-events-none opacity-40"
      )}
    >
      {/* Badge - top left */}
      {product.badgeText && (
        <span
          className={cn(
            "absolute -top-px -left-px rounded-tl-[10px] rounded-br-[10px] px-2.5 py-1 text-[10px] font-semibold text-primary-foreground",
            product.badgeType === "recommend"
              ? "bg-gradient-to-r from-theme-purple to-theme-green"
              : product.badgeType === "value"
                ? "bg-destructive"
                : "bg-theme-green"
          )}
        >
          {product.badgeText}
        </span>
      )}

      {/* Title */}
      <p className="mt-3 text-sm font-medium text-title line-clamp-1">{product.title}</p>

      {/* Price */}
      <div className="mt-2">
        <span className="text-2xl font-bold text-primary">
          {product.currency}{product.salePrice.toFixed(2)}
        </span>
      </div>

      {/* Original price */}
      <p className="mt-1 text-xs text-text-muted line-through">
        {product.currency}{product.originalPrice.toFixed(2)}
      </p>

      {/* Sub text */}
      <p className="text-xs font-medium py-1 px-[10px] rounded-[10px] break-words overflow-hidden mx-1 mt-1 w-[calc(100%-8px)] bg-payment-bg-1/10 text-payment-text-1">
        {product.subTitle}
      </p>
    </button>
  );
};

export default ProductCard;
