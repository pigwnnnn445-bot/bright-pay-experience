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
        isAddon ? "w-full aspect-[302/190] px-0 py-0" : "w-[164px] h-[182px] min-w-[164px] shrink-0 px-0 py-0",
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
          className={cn(
            "absolute text-xs font-medium px-2 py-1 rounded-lg rounded-bl-none min-w-6 min-h-6",
            isAddon
              ? "top-[4px] left-[4px]"
              : "-left-0.5 text-xs font-medium"
          )}
          style={isAddon
            ? { color: "#EF534F", backgroundImage: "linear-gradient(90deg, #FCD2D0 0%, #FCD7EB 100%)" }
            : { top: "-12px", color: "#EF534F", backgroundImage: "linear-gradient(90deg, #FDE3E3 0%, #FDE6F3 100%)" }
          }
        >
          {product.badgeText}
        </span>
      )}

      {/* Title */}
      <p className={cn(
        "text-sm font-medium text-title line-clamp-1",
        isAddon ? "absolute top-[15%]" : "mt-5"
      )}>{product.title}</p>

      {/* Price */}
      <div className={isAddon ? "absolute top-[64px]" : "mt-4"}>
        <span className="inline-flex items-baseline text-primary" style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 700 }}>
          <span className="inline-block w-5 h-6 text-[20px] leading-6">{product.currency}</span>
          <span className="text-[32px] leading-[40px]">{product.salePrice.toFixed(2)}</span>
        </span>
      </div>

      {/* Original price */}
      <p className={cn(
        "text-xs text-text-muted line-through",
        isAddon ? "absolute top-[112px]" : "mt-2"
      )}>
        {product.currency}{product.originalPrice.toFixed(2)}
      </p>

      {/* Sub text */}
      <p className={cn(
        "absolute rounded-[10px] text-xs font-medium flex items-center justify-center break-words overflow-hidden",
        isAddon
          ? "left-[1px] top-[148px] w-[298px] h-[40px]"
          : "left-[1px] top-[140px] w-[160px] h-[40px]",
        selected ? "text-payment-text-1 bg-payment-bg-1/10" : "text-title bg-[#F2F2F5]"
      )}>
        {product.subTitle}
      </p>
    </button>
  );
};

export default ProductCard;
