import type { UserProfile, SubscriptionType } from "@/types/payment";
import { Crown, Infinity, User } from "lucide-react";

interface UserProfileHeaderProps {
  user: UserProfile | null;
  loading?: boolean;
}

const badgeConfig: Record<SubscriptionType, { label: string; icon: React.ReactNode; className: string }> = {
  pro: {
    label: "Pro",
    icon: <Crown className="h-2.5 w-2.5" />,
    className: "bg-[rgba(82,82,229,0.15)] text-[#5252E5] dark:bg-[rgba(111,214,180,0.15)] dark:text-[#6FD6B4]",
  },
  addon: {
    label: "配额永久有效",
    icon: <Infinity className="h-2.5 w-2.5" />,
    className: "bg-[rgba(82,82,229,0.15)] text-[#5252E5] dark:bg-[rgba(111,214,180,0.15)] dark:text-[#6FD6B4]",
  },
  free: {
    label: "免费",
    icon: <User className="h-2.5 w-2.5" />,
    className: "bg-[rgba(120,120,122,0.15)] text-[#78787A] dark:bg-[rgba(230,230,240,0.15)] dark:text-[#E6E6F0]",
  },
};

const SubscriptionBadge = ({ type }: { type: SubscriptionType }) => {
  const config = badgeConfig[type];
  const isFree = type === "free";
  const isAddon = type === "addon";
  const useCompactStyle = isFree || type === "pro";
  return (
    <span className={`inline-flex items-center justify-center font-semibold ${useCompactStyle ? "rounded-[4px] text-[10px] w-[27px] h-[16px] px-[6px] py-[2px]" : "rounded-full px-2 py-0.5 text-[10px] gap-0.5"} ${config.className}`}>
      {isAddon && config.icon}
      {config.label}
    </span>
  );
};

const UserProfileHeader = ({ user, loading }: UserProfileHeaderProps) => {
  if (loading) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
        <div className="space-y-1.5">
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="h-3 w-48 animate-pulse rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card-alt">
          <span className="text-sm text-text-muted">?</span>
        </div>
        <p className="text-sm text-text-muted">未登录</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div className="relative">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.nickname}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-theme-purple to-theme-green">
            <span className="text-sm font-semibold text-primary-foreground">
              {user.nickname.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-title">{user.nickname}</span>
          <SubscriptionBadge type={user.subscriptionType} />
        </div>
        {user.subscriptionType !== "free" && user.expireTip && (
          <p className="text-xs text-text-muted dark:text-text-secondary">{user.expireTip}</p>
        )}
      </div>
    </div>
  );
};

export default UserProfileHeader;
