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
      <div className="flex h-full items-center justify-center">
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
    <div className="flex h-full flex-col items-center">
      {/* Price area */}
      <div className="text-center">
        <div className="flex items-baseline justify-center gap-0.5">
          <span className="text-lg font-bold text-primary">¥</span>
          <span className="text-4xl font-bold text-primary">
            {product.salePrice.toFixed(2)}
          </span>
        </div>
        <p className="mt-1 text-sm text-text-muted line-through">
          {product.currency}{product.originalPrice.toFixed(2)}
        </p>
        {discount > 0 && (
          <span
            className="mt-1.5 inline-block rounded-full px-3 py-0.5 text-xs font-medium"
            style={{ color: "#EF534F", backgroundImage: "linear-gradient(90deg, #FCD2D0 0%, #FCD7EB 100%)" }}
          >
            已减 {product.currency}{discount.toFixed(2)}
          </span>
        )}
      </div>

      {/* Agreement notice */}
      <div className="mt-5 w-full rounded-xl bg-card-alt p-4 text-center">
        <p className="text-xs leading-relaxed text-text-secondary">
          开通前请阅读<br />下方协议说明
        </p>
        <button
          type="button"
          onClick={handlePay}
          className="mt-3 w-full rounded-lg bg-gradient-to-r from-theme-purple to-theme-green py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.98] cursor-pointer"
        >
          同意并支付
        </button>
      </div>

      {/* WeChat section */}
      <div className="mt-5 text-center">
        <p className="text-sm text-text-secondary">微信扫码支付</p>
        <div className="mt-3 flex items-center justify-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-theme-green/10">
            <QrCode className="h-5 w-5 text-theme-green" />
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <QrCode className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-auto pt-4 text-center text-[10px] leading-relaxed text-text-muted">
        支付表示您已阅读并同意{" "}
        <span className="text-primary cursor-pointer hover:underline">服务条款</span>{" "}
        <span className="text-primary cursor-pointer hover:underline">隐私政策</span>
      </p>
    </div>
  );
};

export default PaymentSummaryPanel;
