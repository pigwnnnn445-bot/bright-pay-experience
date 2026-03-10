import { useState, useEffect, useRef, useCallback } from "react";
import type { DisplayProduct, PayMethod, PaymentOrder, AgreementLink } from "@/types/payment";
import { QrCode, CheckCircle, Loader2 } from "lucide-react";
import { createOrder, getOrderStatus, cancelOrder, getAgreementLinks } from "@/api/payment";
import PaymentSuccessModal from "./PaymentSuccessModal";

interface PaymentSummaryPanelProps {
  product: DisplayProduct | null;
  userId: string;
}

const PaymentSummaryPanel = ({ product, userId }: PaymentSummaryPanelProps) => {
  const [payMethod, setPayMethod] = useState<PayMethod>("wechat");
  const [order, setOrder] = useState<PaymentOrder | null>(null);
  const [paying, setPaying] = useState(false);
  const [payStatus, setPayStatus] = useState<"idle" | "paying" | "paid" | "failed">("idle");
  const [agreements, setAgreements] = useState<AgreementLink[]>([]);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentOrderIdRef = useRef<string | null>(null);

  // Fetch agreement links
  useEffect(() => {
    getAgreementLinks().then(setAgreements);
  }, []);

  // Clean up polling on unmount
  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  // Reset state when product changes
  useEffect(() => {
    resetPayment();
  }, [product?.configId]);

  const resetPayment = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
    // Cancel existing order if paying
    if (currentOrderIdRef.current && payStatus === "paying") {
      cancelOrder(currentOrderIdRef.current);
    }
    currentOrderIdRef.current = null;
    setOrder(null);
    setPaying(false);
    setPayStatus("idle");
  }, [payStatus]);

  const startPolling = useCallback((orderId: string) => {
    if (pollingRef.current) clearInterval(pollingRef.current);

    pollingRef.current = setInterval(async () => {
      try {
        const result = await getOrderStatus(orderId);
        if (result.status === "paid") {
          setPayStatus("paid");
          if (pollingRef.current) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
          }
        } else if (result.status === "failed" || result.status === "cancelled" || result.status === "expired") {
          setPayStatus("failed");
          if (pollingRef.current) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
          }
        }
      } catch {
        // Keep polling on network errors
      }
    }, 2000);
  }, []);

  const handlePay = useCallback(async () => {
    if (!product) return;
    setPaying(true);
    setPayStatus("idle");

    try {
      const newOrder = await createOrder({
        skuId: product.skuId,
        skuCode: product.skuCode,
        productType: product.productType,
        userId,
        payMethod,
      });
      setOrder(newOrder);
      currentOrderIdRef.current = newOrder.orderId;
      setPayStatus("paying");
      startPolling(newOrder.orderId);
    } catch {
      setPayStatus("failed");
    } finally {
      setPaying(false);
    }
  }, [product, userId, payMethod, startPolling]);

  const handleSwitchPayMethod = useCallback(
    (method: PayMethod) => {
      if (method === payMethod) return;
      // Reset and switch
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
      if (currentOrderIdRef.current && payStatus === "paying") {
        cancelOrder(currentOrderIdRef.current);
      }
      currentOrderIdRef.current = null;
      setOrder(null);
      setPayStatus("idle");
      setPaying(false);
      setPayMethod(method);
    },
    [payMethod, payStatus]
  );

  if (!product) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-text-muted">请选择商品</p>
      </div>
    );
  }

  const discount = product.originalPrice - product.salePrice;
  const showQr = payStatus === "paying" && order?.qrCodeUrl;
  const isPaid = payStatus === "paid";

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

      {/* QR code area */}
      <div className="relative mt-7 flex h-[164px] w-[164px] items-center justify-center rounded-lg border border-border bg-card-alt overflow-hidden">
        {isPaid ? (
          /* Payment success */
          <div className="flex flex-col items-center justify-center gap-2">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <p className="text-sm font-medium text-green-600">支付成功</p>
          </div>
        ) : showQr ? (
          /* QR code display */
          <img
            src={order!.qrCodeUrl}
            alt="支付二维码"
            className="h-full w-full object-contain p-2"
          />
        ) : (
          /* Default state with overlay */
          <>
            <QrCode className="h-10 w-10 text-text-muted" />
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm">
              <p className="text-xs leading-relaxed text-text-secondary text-center">
                开通前请阅读<br />下方协议说明
              </p>
              <button
                type="button"
                onClick={handlePay}
                disabled={paying}
                className="mt-4 w-[102px] h-[32px] rounded-lg bg-primary text-xs font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {paying ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "同意并支付"
                )}
              </button>
            </div>
          </>
        )}

        {/* Paying spinner overlay on QR */}
        {payStatus === "paying" && showQr && (
          <div className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-background/80">
            <Loader2 className="h-3 w-3 animate-spin text-primary" />
          </div>
        )}
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
          onClick={() => handleSwitchPayMethod("wechat")}
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
          onClick={() => handleSwitchPayMethod("alipay")}
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

      {/* Status text */}
      {payStatus === "paying" && (
        <p className="mt-2 text-xs text-text-muted animate-pulse">等待支付中...</p>
      )}
      {payStatus === "failed" && (
        <p className="mt-2 text-xs text-destructive">支付失败，请重试</p>
      )}

      {/* Footer */}
      <p className="mt-auto pt-4 text-center text-[10px] leading-relaxed text-text-muted">
        支付表示您已阅读并同意{" "}
        {agreements.map((a, i) => (
          <span key={a.key}>
            <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-primary cursor-pointer hover:underline">{a.label}</a>
            {i < agreements.length - 1 && " "}
          </span>
        ))}
      </p>
    </div>
  );
};

export default PaymentSummaryPanel;
