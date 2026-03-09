import type { BenefitConfig } from "@/types/payment";
import BenefitItem from "./BenefitItem";

interface BenefitSectionProps {
  benefits: BenefitConfig[];
  loading?: boolean;
}

const BenefitSection = ({ benefits, loading }: BenefitSectionProps) => {
  if (loading) {
    return (
      <div className="space-y-3 pt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="h-8 w-8 animate-pulse rounded-lg bg-muted" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3.5 w-20 animate-pulse rounded bg-muted" />
              <div className="h-3 w-40 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!benefits.length) return null;

  return (
    <div className="pt-4">
      <h4 className="mb-2 text-sm font-semibold text-title">权益说明</h4>
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
        {benefits.map((b) => (
          <BenefitItem key={b.benefitId} benefit={b} />
        ))}
      </div>
    </div>
  );
};

export default BenefitSection;
