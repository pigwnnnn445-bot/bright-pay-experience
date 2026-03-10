import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface PaymentFailModalProps {
  open: boolean;
  onClose: () => void;
}

const PaymentFailModal = ({ open, onClose }: PaymentFailModalProps) => {
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
            className="relative z-10 w-full max-w-[380px] rounded-2xl bg-background px-6 pb-6 pt-4 shadow-xl"
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

            {/* Error icon */}
            <div className="flex flex-col items-center pt-6">
              <motion.div
                className="flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-destructive"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
              >
                <X className="h-10 w-10 text-destructive" strokeWidth={2.5} />
              </motion.div>

              <motion.h2
                className="mt-4 text-xl font-bold text-title"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                支付失败
              </motion.h2>

              <motion.p
                className="mt-2 text-sm text-text-muted"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                请重新支付！
              </motion.p>
            </div>

            {/* Button */}
            <motion.button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-xl bg-primary py-3.5 text-base font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.98] cursor-pointer dark:text-black"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              我知道了
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentFailModal;
