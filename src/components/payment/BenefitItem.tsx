import { Zap, Infinity, Shield, Star, PlusCircle, Clock, type LucideIcon } from "lucide-react";
import type { BenefitConfig } from "@/types/payment";

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  infinity: Infinity,
  shield: Shield,
  star: Star,
  "plus-circle": PlusCircle,
  clock: Clock,
};

interface BenefitItemProps {
  benefit: BenefitConfig;
}

const BenefitItem = ({ benefit }: BenefitItemProps) => {
  const Icon = iconMap[benefit.icon] || Zap;

  return (
    <div className="flex items-start gap-3 py-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-title">{benefit.title}</p>
        <p className="text-xs text-text-muted">{benefit.description}</p>
      </div>
    </div>
  );
};

export default BenefitItem;
