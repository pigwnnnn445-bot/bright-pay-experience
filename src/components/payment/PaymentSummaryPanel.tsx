import { useState } from "react";
import type { DisplayProduct } from "@/types/payment";
import { QrCode } from "lucide-react";

type PayMethod = "wechat" | "alipay";

interface PaymentSummaryPanelProps {
  product: DisplayProduct | null;
  userId: string;
  onPay: (params: { skuId: string; skuCode: string; productType: string; userId: string }) => void;
}

const PaymentSummaryPanel = ({ product, userId, onPay }: PaymentSummaryPanelProps) => {
  const [payMethod, setPayMethod] = useState<PayMethod>("wechat");

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

      {/* QR code area with overlay text and button */}
      <div className="relative mt-7 flex h-[164px] w-[164px] items-center justify-center rounded-lg border border-border bg-card-alt">
        <QrCode className="h-10 w-10 text-text-muted" />
        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm">
          <p className="text-xs leading-relaxed text-text-secondary text-center">
            开通前请阅读<br />下方协议说明
          </p>
          <button
            type="button"
            onClick={handlePay}
            className="mt-4 w-[102px] h-[32px] rounded-lg bg-primary text-xs font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.98] cursor-pointer"
          >
            同意并支付
          </button>
        </div>
      </div>

      {/* Payment method label */}
      <p className="mt-4 text-sm text-text-secondary">
        {payMethod === "wechat" ? "微信扫码支付" : "支付宝扫码支付"}
      </p>

      {/* Payment method icons */}
      <div className="mt-3 flex items-center gap-4">
        {/* WeChat icon */}
        <button
          type="button"
          onClick={() => setPayMethod("wechat")}
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
            payMethod === "wechat"
              ? "bg-[#07C160]/10 ring-2 ring-[#07C160]/40"
              : "bg-muted hover:bg-muted/80"
          }`}
          title="微信支付"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill={payMethod === "wechat" ? "#07C160" : "hsl(var(--text-muted))"}>
            <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05a6.577 6.577 0 0 1-.312-2.014c0-3.63 3.477-6.57 7.762-6.57.275 0 .543.026.811.05C16.834 4.858 13.143 2.188 8.691 2.188zm-2.6 4.408c.56 0 1.016.455 1.016 1.016s-.455 1.016-1.015 1.016-1.016-.455-1.016-1.016.456-1.016 1.016-1.016zm5.21 0c.56 0 1.016.455 1.016 1.016s-.456 1.016-1.016 1.016-1.016-.455-1.016-1.016.456-1.016 1.016-1.016zm4.654 4.182c-3.762 0-6.81 2.57-6.81 5.742 0 3.172 3.048 5.742 6.81 5.742.722 0 1.42-.1 2.078-.287a.638.638 0 0 1 .526.072l1.397.818a.239.239 0 0 0 .122.04.214.214 0 0 0 .213-.217c0-.053-.02-.105-.035-.156l-.286-1.086a.432.432 0 0 1 .156-.488C22.923 19.86 24 18.1 24 16.52c0-3.172-3.048-5.742-6.81-5.742h-.035zm-2.71 3.269c.41 0 .744.334.744.744s-.333.744-.744.744a.745.745 0 0 1-.744-.744c0-.41.334-.744.744-.744zm5.421 0c.41 0 .744.334.744.744s-.334.744-.744.744a.745.745 0 0 1-.744-.744c0-.41.333-.744.744-.744z" />
          </svg>
        </button>

        {/* Alipay icon */}
        <button
          type="button"
          onClick={() => setPayMethod("alipay")}
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
            payMethod === "alipay"
              ? "bg-[#1677FF]/10 ring-2 ring-[#1677FF]/40"
              : "bg-muted hover:bg-muted/80"
          }`}
          title="支付宝支付"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill={payMethod === "alipay" ? "#1677FF" : "hsl(var(--text-muted))"}>
            <path d="M21.422 15.358c-1.327-.554-5.86-2.243-7.337-2.982.373-.813.687-1.7.93-2.647h-4.14v-1.44h5.09V7.27h-5.09V5.112H8.91v2.159H3.972v1.017h4.938v1.44H4.44v1.017h8.476a14.473 14.473 0 0 1-.545 1.618C10.83 11.738 8.7 12.632 7.052 13.137l.602 1.089c1.816-.562 4.164-1.592 5.905-2.328.998.562 4.12 1.853 6.073 2.629L21.422 15.358zM24 19.2V4.8A4.8 4.8 0 0 0 19.2 0H4.8A4.8 4.8 0 0 0 0 4.8v14.4A4.8 4.8 0 0 0 4.8 24h14.4A4.8 4.8 0 0 0 24 19.2z" />
          </svg>
        </button>
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
