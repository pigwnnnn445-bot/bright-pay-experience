import { Sparkles } from "lucide-react";

interface PaymentEntryButtonProps {
  onClick: () => void;
}

const PaymentEntryButton = ({ onClick }: PaymentEntryButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-theme-purple to-theme-green px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-100 cursor-pointer"
    >
      <Sparkles className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
      立即支付
    </button>
  );
};

export default PaymentEntryButton;
