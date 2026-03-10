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
        isAddon ? "w-full px-4 py-4" : "w-[164px] h-[182px] min-w-[164px] shrink-0 px-0 py-0",
        selected
          ? "border-primary bg-background scale-[1.02] shadow-card"
          : "border-border-card bg-background hover:border-primary/30",
        disabled && "pointer-events-none opacity-40"
      )}
    >
      {/* Badge - top left */}
      {product.badgeText && (
        <span
          className="absolute -left-0.5 text-xs font-medium px-2 py-1 rounded-lg rounded-bl-none min-w-6 min-h-6"
          style={{ top: "-12px", color: "#EF534F", backgroundImage: "linear-gradient(90deg, #FDE3E3 0%, #FDE6F3 100%)" }}
        >
          {product.badgeText}
        </span>
      )}

      {/* Title */}
      <p
        className="absolute w-[75px] h-5 text-center line-clamp-1"
        style={{ left: "44.5px", top: "32px", fontFamily: "Gilroy, sans-serif", fontSize: "14px", fontWeight: 500, lineHeight: "20px", letterSpacing: "-0.14px", color: "#323233" }}
      >{product.title}</p>

      {/* Price */}
      <div
        className="absolute flex items-baseline justify-center"
        style={{ left: "22px", top: "52px", width: "120px", height: "40px" }}
      >
        <span className="inline-block w-5 h-6 text-[20px] leading-6" style={{ fontFamily: "Gilroy, sans-serif", fontWeight: 700, color: "#5252E5" }}>{product.currency}</span>
        <span
          style={{ fontFamily: "Gilroy, sans-serif", fontSize: "32px", fontWeight: "bold", lineHeight: "40px", letterSpacing: "-0.14px", color: "#5252E5", fontFeatureSettings: '"kern" on' }}
        >{product.salePrice.toFixed(2)}</span>
      </div>

      {/* Original price */}
      <p className="mt-2 text-xs text-text-muted line-through">
        {product.currency}{product.originalPrice.toFixed(2)}
      </p>

      {/* Sub text */}
      <p className={cn("text-xs font-medium py-1 px-[10px] rounded-[10px] break-words overflow-hidden mt-auto mb-[2px] w-[160px] h-[40px] flex items-center justify-center bg-payment-bg-1/10", selected ? "text-payment-text-1" : "text-title")}>
        {product.subTitle}
      </p>
    </button>
  );
};

export default ProductCard;
