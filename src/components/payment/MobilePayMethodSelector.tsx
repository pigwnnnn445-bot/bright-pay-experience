import type { PayMethod } from "@/types/payment";

interface MobilePayMethodSelectorProps {
  payMethod: PayMethod;
  onSwitch: (method: PayMethod) => void;
}

const WechatIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill={active ? "#07C160" : "hsl(var(--text-muted))"}>
    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05a6.577 6.577 0 0 1-.312-2.014c0-3.63 3.477-6.57 7.762-6.57.275 0 .543.026.811.05C16.834 4.858 13.143 2.188 8.691 2.188zm-2.6 4.408c.56 0 1.016.455 1.016 1.016s-.455 1.016-1.015 1.016-1.016-.455-1.016-1.016.456-1.016 1.016-1.016zm5.21 0c.56 0 1.016.455 1.016 1.016s-.456 1.016-1.016 1.016-1.016-.455-1.016-1.016.456-1.016 1.016-1.016zm4.654 4.182c-3.762 0-6.81 2.57-6.81 5.742 0 3.172 3.048 5.742 6.81 5.742.722 0 1.42-.1 2.078-.287a.638.638 0 0 1 .526.072l1.397.818a.239.239 0 0 0 .122.04.214.214 0 0 0 .213-.217c0-.053-.02-.105-.035-.156l-.286-1.086a.432.432 0 0 1 .156-.488C22.923 19.86 24 18.1 24 16.52c0-3.172-3.048-5.742-6.81-5.742h-.035zm-2.71 3.269c.41 0 .744.334.744.744s-.333.744-.744.744a.745.745 0 0 1-.744-.744c0-.41.334-.744.744-.744zm5.421 0c.41 0 .744.334.744.744s-.334.744-.744.744a.745.745 0 0 1-.744-.744c0-.41.333-.744.744-.744z" />
  </svg>
);

const AlipayIcon = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill={active ? "#1677FF" : "hsl(var(--text-muted))"}>
    <path d="M21.422 15.358c-1.327-.554-5.86-2.243-7.337-2.982.373-.813.687-1.7.93-2.647h-4.14v-1.44h5.09V7.27h-5.09V5.112H8.91v2.159H3.972v1.017h4.938v1.44H4.44v1.017h8.476a14.473 14.473 0 0 1-.545 1.618C10.83 11.738 8.7 12.632 7.052 13.137l.602 1.089c1.816-.562 4.164-1.592 5.905-2.328.998.562 4.12 1.853 6.073 2.629L21.422 15.358zM24 19.2V4.8A4.8 4.8 0 0 0 19.2 0H4.8A4.8 4.8 0 0 0 0 4.8v14.4A4.8 4.8 0 0 0 4.8 24h14.4A4.8 4.8 0 0 0 24 19.2z" />
  </svg>
);

const MobilePayMethodSelector = ({ payMethod, onSwitch }: MobilePayMethodSelectorProps) => {
  const methods: { key: PayMethod; label: string; badge?: string; Icon: typeof WechatIcon }[] = [
    { key: "wechat", label: "微信支付", badge: "推荐", Icon: WechatIcon },
    { key: "alipay", label: "支付宝支付", Icon: AlipayIcon },
  ];

  return (
    <div className="mt-4 space-y-4">
      {methods.map((m) => {
        const selected = payMethod === m.key;
        return (
          <button
            key={m.key}
            type="button"
            onClick={() => onSwitch(m.key)}
            className="flex w-full items-center gap-3 px-1 cursor-pointer"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/8">
              <m.Icon active={selected} />
            </div>
            <span className="text-sm font-medium text-title">{m.label}</span>
            {m.badge && (
              <span
                className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                style={{ color: "#EF534F", backgroundImage: "linear-gradient(90deg, #FCD2D0 0%, #FCD7EB 100%)" }}
              >
                {m.badge}
              </span>
            )}
            <div className="ml-auto">
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                  selected ? "border-primary" : "border-border"
                }`}
              >
                {selected && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default MobilePayMethodSelector;