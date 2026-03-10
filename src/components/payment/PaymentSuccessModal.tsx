import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { PaymentSuccessResult } from "@/types/payment";
import { getPaymentSuccessResult } from "@/api/payment";

interface PaymentSuccessModalProps {
  open: boolean;
  orderId: string;
  onClose: () => void;
}

// Confetti particle component
const ConfettiParticle = ({ delay, x, color, size }: { delay: number; x: number; color: string; size: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size * (Math.random() > 0.5 ? 1 : 2.5),
      backgroundColor: color,
      left: `${x}%`,
      top: "-10%",
      borderRadius: Math.random() > 0.5 ? "50%" : "2px",
    }}
    initial={{ y: -20, opacity: 1, rotate: 0 }}
    animate={{
      y: [0, 120, 200],
      opacity: [1, 1, 0],
      rotate: [0, 180, 360],
      x: [0, (Math.random() - 0.5) * 60],
    }}
    transition={{
      duration: 1.8 + Math.random() * 0.8,
      delay: delay,
      ease: "easeOut",
    }}
  />
);

const CONFETTI_COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57", "#FF9FF3", "#54A0FF", "#5F27CD", "#01A3A4", "#F368E0"];

const PaymentSuccessModal = ({ open, orderId, onClose }: PaymentSuccessModalProps) => {
  const [result, setResult] = useState<PaymentSuccessResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open || !orderId) return;
    setLoading(true);
    getPaymentSuccessResult(orderId)
      .then(setResult)
      .finally(() => setLoading(false));
  }, [open, orderId]);

  // Generate confetti particles
  const confettiParticles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: Math.random() * 0.5,
    x: 10 + Math.random() * 80,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: 4 + Math.random() * 6,
  }));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-[380px] rounded-2xl bg-background px-6 pb-6 pt-4 shadow-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-hover-bg hover:text-title cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Confetti animation */}
            <div className="absolute inset-x-0 top-0 h-48 overflow-hidden pointer-events-none">
              {confettiParticles.map((p) => (
                <ConfettiParticle key={p.id} {...p} />
              ))}
            </div>

            {/* Celebration emoji */}
            <div className="relative flex flex-col items-center pt-6">
              <motion.div
                className="text-7xl"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
              >
                👏
              </motion.div>

              <motion.h2
                className="mt-4 text-xl font-bold text-title"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                支付成功
              </motion.h2>
            </div>

            {/* Details card */}
            <motion.div
              className="mt-5 rounded-xl bg-muted/50 px-5 py-4 space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="h-4 w-16 animate-pulse rounded bg-muted" />
                      <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                    </div>
                  ))}
                </div>
              ) : result ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">实付金额：</span>
                    <span className="text-sm font-medium text-title">
                      {result.currency}{result.amount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">购买产品：</span>
                    <span className="text-sm font-medium text-title">{result.productName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">到期时间：</span>
                    <span className="text-sm font-medium text-title">{result.expireTime}</span>
                  </div>
                </>
              ) : null}
            </motion.div>

            {/* I Know button */}
            <motion.button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-xl bg-primary py-3.5 text-base font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.98] cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              我知道了
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentSuccessModal;
