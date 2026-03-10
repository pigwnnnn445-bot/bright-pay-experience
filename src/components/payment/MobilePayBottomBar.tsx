import { useEffect, useState } from "react";
import type { DisplayProduct, AgreementLink } from "@/types/payment";
import { Loader2 } from "lucide-react";
import { getAgreementLinks } from "@/api/payment";

interface MobilePayBottomBarProps {
  product: DisplayProduct | null;
  paying: boolean;
  onPay: () => void;
}

const MobilePayBottomBar = ({ product, paying, onPay }: MobilePayBottomBarProps) => {
  const [agreements, setAgreements] = useState<AgreementLink[]>([]);

  useEffect(() => {
    getAgreementLinks().then(setAgreements);
  }, []);

  if (!product) return null;

  return (
    <div className="shrink-0 bg-background px-4 pb-[env(safe-area-inset-bottom)] pt-3">
      <button
        type="button"
        onClick={onPay}
        disabled={paying}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-base font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {paying ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            同意协议并支付
            <span className="ml-1">
              {product.currency}{product.salePrice.toFixed(2)}
            </span>
          </>
        )}
      </button>
      <p className="mt-2 pb-2 text-center text-[10px] leading-relaxed text-text-muted">
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

export default MobilePayBottomBar;