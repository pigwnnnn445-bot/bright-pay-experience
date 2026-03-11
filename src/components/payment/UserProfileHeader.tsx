import type { UserProfile, SubscriptionType } from "@/types/payment";
import { Crown, Infinity, User } from "lucide-react";

interface UserProfileHeaderProps {
  user: UserProfile | null;
  loading?: boolean;
}

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
        <p className="text-xs text-text-muted dark:text-text-secondary">{user.expireTip}</p>
      </div>
    </div>
  );
};

export default UserProfileHeader;
