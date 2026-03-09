import type { DisplayProduct } from "@/types/payment";
import ProductCard from "./ProductCard";

interface ProductCardListProps {
  products: DisplayProduct[];
  selectedId: string | null;
  onSelect: (product: DisplayProduct) => void;
  loading?: boolean;
}

const ProductCardList = ({ products, selectedId, onSelect, loading }: ProductCardListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-border">
        <p className="text-sm text-text-muted">暂无可用商品</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard
          key={p.configId}
          product={p}
          selected={selectedId === p.configId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default ProductCardList;
