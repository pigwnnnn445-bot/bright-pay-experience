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

  if (isAddon) {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && onSelect(product)}
        className={cn(
          "relative flex w-full flex-col items-center rounded-xl border-2 text-center transition-all duration-200 cursor-pointer pb-0",
          selected
            ? "border-primary scale-[1.02] shadow-card"
            : "border-border-card bg-background hover:border-primary/30",
          disabled && "pointer-events-none opacity-40"
        )}
        style={selected ? { background: "linear-gradient(180deg, rgba(82, 82, 229, 0.08) 0%, rgba(82, 82, 229, 0) 50%)" } : undefined}
      >
        {/* Badge */}
        {product.badgeText && (
          <span
            className="absolute top-1 left-1 text-xs font-medium px-2 rounded-lg rounded-bl-none min-w-6 h-6 flex items-center"
            style={{ color: "#EF534F", backgroundImage: "linear-gradient(90deg, #FCD2D0 0%, #FCD7EB 100%)" }}
          >
            {product.badgeText}
          </span>
        )}

        {/* Title */}
        <p className="mt-7 text-sm font-medium text-title line-clamp-1">{product.title}</p>

        {/* Price */}
        <div className="mt-1">
          <span className="inline-flex items-baseline text-primary" style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 700 }}>
            <span className="inline-block w-5 h-6 text-[20px] leading-6">{product.currency}</span>
            <span className="text-[32px] leading-[40px]">{product.salePrice.toFixed(2)}</span>
          </span>
        </div>

        {/* Original price */}
        <p className="mt-0.5 text-xs text-text-muted line-through">
          {product.currency}{product.originalPrice.toFixed(2)}
        </p>

        {/* Sub text */}
        <p className={cn(
          "mt-2 w-[calc(100%-2px)] rounded-[10px] text-xs font-medium flex items-center justify-center break-words overflow-hidden px-2 py-2.5",
          selected ? "text-primary bg-primary/10 dark:text-theme-green dark:bg-theme-green/10" : "text-title bg-secondary"
        )}>
          {product.subTitle}
        </p>
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && onSelect(product)}
      className={cn(
        "relative flex flex-col items-center rounded-xl border-2 text-center transition-all duration-200 cursor-pointer",
        "w-[164px] h-[182px] min-w-[164px] shrink-0 px-0 py-0",
        selected
          ? "border-primary scale-[1.02] shadow-card"
          : "border-border-card bg-background hover:border-primary/30",
        disabled && "pointer-events-none opacity-40"
      )}
      style={selected ? { background: "linear-gradient(180deg, rgba(82, 82, 229, 0.08) 0%, rgba(82, 82, 229, 0) 50%)" } : undefined}
    >
      {/* Badge */}
      {product.badgeText && (
        <span
          className="-left-0.5 absolute text-xs font-medium px-2 rounded-lg rounded-bl-none min-w-6 h-6 flex items-center"
          style={{ top: "-12px", color: "#EF534F", backgroundImage: "linear-gradient(90deg, #FDE3E3 0%, #FDE6F3 100%)" }}
        >
          {product.badgeText}
        </span>
      )}

      {/* Title */}
      <p className="mt-5 text-sm font-medium text-title line-clamp-1">{product.title}</p>

      {/* Price */}
      <div className="mt-4">
        <span className="inline-flex items-baseline text-primary" style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 700 }}>
          <span className="inline-block w-5 h-6 text-[20px] leading-6">{product.currency}</span>
          <span className="text-[32px] leading-[40px]">{product.salePrice.toFixed(2)}</span>
        </span>
      </div>

      {/* Original price */}
      <p className="mt-2 text-xs text-text-muted line-through">
        {product.currency}{product.originalPrice.toFixed(2)}
      </p>

      {/* Sub text */}
      <p className={cn(
        "absolute left-[1px] top-[140px] w-[160px] h-[40px] rounded-[10px] text-xs font-medium flex items-center justify-center break-words overflow-hidden px-2",
        selected ? "text-primary-foreground bg-primary dark:text-theme-green dark:bg-theme-green/10" : "text-title bg-secondary"
      )}>
        {product.subTitle}
      </p>
    </button>
  );
};

export default ProductCard;