import type { DisplayProduct } from "@/types/payment";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: DisplayProduct;
  selected: boolean;
  onSelect: (product: DisplayProduct) => void;
}

const ProductCard = ({ product, selected, onSelect }: ProductCardProps) => {
  const disabled = !product.isSaleable;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && onSelect(product)}
      className={cn(
        "relative flex min-w-[150px] shrink-0 flex-col items-center rounded-xl border-2 px-4 py-4 text-center transition-all duration-200 cursor-pointer",
        selected
          ? "border-primary bg-primary/[0.03] scale-[1.04] shadow-card"
          : "border-border bg-card hover:border-primary/30",
        disabled && "pointer-events-none opacity-40"
      )}
    >
      {/* Badge */}
      {product.badgeText && (
        <span
          className={cn(
            "absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-0.5 text-[10px] font-semibold text-primary-foreground",
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
      <p className="text-sm font-medium text-title">{product.title}</p>

      {/* Price */}
      <div className="mt-2">
        <span className={cn(
          "text-2xl font-bold",
          selected ? "text-primary" : "text-title"
        )}>
          {product.currency}{product.salePrice.toFixed(2)}
        </span>
      </div>

      {/* Original price */}
      <p className="mt-1 text-xs text-text-muted line-through">
        {product.currency}{product.originalPrice.toFixed(2)}
      </p>

      {/* Sub text */}
      <p className="text-xs font-medium py-1 px-[14px] rounded-[10px] break-words overflow-hidden m-[2px] bg-payment-bg-1/10 text-payment-text-1">
        {product.subTitle}
      </p>
    </button>
  );
};

export default ProductCard;
