import { Zap, Infinity, Shield, Star, PlusCircle, Clock, Crown, HardDrive, Monitor, MessageCircle, Image, Search, type LucideIcon } from "lucide-react";
import type { BenefitConfig } from "@/types/payment";

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  infinity: Infinity,
  shield: Shield,
  star: Star,
  "plus-circle": PlusCircle,
  clock: Clock,
  crown: Crown,
  "hard-drive": HardDrive,
  monitor: Monitor,
  "message-circle": MessageCircle,
  image: Image,
  search: Search,
};

interface BenefitItemProps {
  benefit: BenefitConfig;
}

const BenefitItem = ({ benefit }: BenefitItemProps) => {
  const Icon = iconMap[benefit.icon] || Zap;
  const hasSvg = benefit.iconUrl;

  return (
    <div className="flex items-start gap-3 py-2.5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E5E5FF] dark:bg-[#232328]">
        {hasSvg ? (
          <img src={benefit.iconUrl} alt={benefit.title} className="h-5 w-5" />
        ) : (
          <Icon className="h-5 w-5 text-primary" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-title">{benefit.title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-text-muted">{benefit.description}</p>
      </div>
    </div>
  );
};

export default BenefitItem;
