import { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import type { DisplayProduct, ProductType } from "@/types/payment";
import ProductCard from "./ProductCard";

interface ProductCardListProps {
  products: DisplayProduct[];
  selectedId: string | null;
  onSelect: (product: DisplayProduct) => void;
  loading?: boolean;
  productType?: ProductType;
}

const ProductCardList = ({ products, selectedId, onSelect, loading, productType }: ProductCardListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const isAddon = productType === "addon";

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el?.removeEventListener("scroll", checkScroll);
  }, [products]);

  useEffect(() => {
    if (!selectedId || !scrollRef.current) return;
    const container = scrollRef.current;
    const selectedEl = container.querySelector(`[data-config-id="${selectedId}"]`) as HTMLElement | null;
    if (selectedEl) {
      selectedEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }
  }, [selectedId]);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 200 : -200, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className={isAddon ? "grid grid-cols-2 gap-3 p-4" : "flex gap-3 p-4"}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-36 w-full shrink-0 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex h-36 items-center justify-center">
        <p className="text-sm text-text-muted">暂无可用商品</p>
      </div>
    );
  }

  if (isAddon) {
    return (
      <div className="grid grid-cols-2 gap-3 p-4">
        {products.map((p) => (
          <ProductCard
            key={p.configId}
            product={p}
            selected={selectedId === p.configId}
            onSelect={onSelect}
            variant="addon"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto p-4 pb-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((p) => (
          <ProductCard
            key={p.configId}
            product={p}
            selected={selectedId === p.configId}
            onSelect={onSelect}
          />
        ))}
      </div>

      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-1 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-card shadow-card border border-border text-text-secondary hover:text-title transition-colors cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-1 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-card shadow-card border border-border text-text-secondary hover:text-title transition-colors cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default ProductCardList;
