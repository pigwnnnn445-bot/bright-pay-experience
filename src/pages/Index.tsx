import { useState } from "react";
import PaymentEntryButton from "@/components/payment/PaymentEntryButton";
import PaymentModal from "@/components/payment/PaymentModal";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <ThemeToggle />
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold text-title">升级您的计划</h1>
        <p className="mb-8 text-text-secondary">解锁全部专业功能，提升工作效率</p>
        <PaymentEntryButton onClick={() => setModalOpen(true)} />
      </div>

      <PaymentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Index;
