import type { DisplayProduct } from "@/types/payment";
import { QrCode } from "lucide-react";

interface PaymentSummaryPanelProps {
  product: DisplayProduct | null;
  userId: string;
  onPay: (params: { skuId: string; skuCode: string; productType: string; userId: string }) => void;
}

const PaymentSummaryPanel = ({ product, userId, onPay }: PaymentSummaryPanelProps) => {
  if (!product) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl bg-card-alt p-6">
        <p className="text-sm text-text-muted">请选择商品</p>
      </div>
    );
  }

  const discount = product.originalPrice - product.salePrice;

  const handlePay = () => {
    onPay({
      skuId: product.skuId,
      skuCode: product.skuCode,
      productType: product.productType,
      userId,
    });
  };

  return (
    <div className="flex h-full flex-col rounded-xl bg-card-alt p-5">
      {/* Price */}
      <div className="mb-4">
        <p className="text-xs text-text-secondary">应付金额</p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-3xl font-bold text-primary">
            {product.currency}{product.salePrice.toFixed(2)}
          </span>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-xs text-text-muted line-through">
            {product.currency}{product.originalPrice.toFixed(2)}
          </span>
          {discount > 0 && (
            <span className="rounded-full bg-theme-green/10 px-2 py-0.5 text-[10px] font-medium text-theme-green">
              已减 {product.currency}{discount.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* QR placeholder */}
      <div className="mb-4 flex flex-col items-center justify-center rounded-lg border border-dashed border-border p-6">
        <QrCode className="h-16 w-16 text-text-muted/40" />
        <p className="mt-2 text-xs text-text-muted">微信扫码支付</p>
      </div>

      {/* Pay button */}
      <button
        type="button"
        onClick={handlePay}
        className="w-full rounded-xl bg-gradient-to-r from-theme-purple to-theme-green py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.98] cursor-pointer"
      >
        同意协议并支付
      </button>

      <p className="mt-3 text-center text-[10px] leading-relaxed text-text-muted">
        点击支付即表示您已阅读并同意
        <span className="text-primary cursor-pointer hover:underline"> 《用户服务协议》</span>
        和
        <span className="text-primary cursor-pointer hover:underline"> 《隐私政策》</span>
      </p>
    </div>
  );
};

export default PaymentSummaryPanel;
