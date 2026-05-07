import type { BusinessPublic, Employee } from "@/types";
import { YepMark } from "@/components/yep-mark";
import { BrandBar, PoweredBy } from "./rating-screen";

interface ThanksScreenProps {
  business: BusinessPublic;
  employee: Employee | null;
  positive: boolean;
}

export function ThanksScreen({ business, employee, positive }: ThanksScreenProps) {
  const firstName = employee?.name.split(" ")[0] ?? null;

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <BrandBar business={business} />
        <YepMark size={16} color="#5b5f6e" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
        <div
          className="w-22 h-22 rounded-full flex items-center justify-center mb-5"
          style={{
            width: 88,
            height: 88,
            background: positive ? "#e3f6ee" : "#eeeefe",
          }}
        >
          {positive ? (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#12a66a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#5a5af0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21s-7-4.5-9-9c-1.3-3 1-7 4.5-7 2 0 3.5 1 4.5 2.5C13 6 14.5 5 16.5 5c3.5 0 5.8 4 4.5 7-2 4.5-9 9-9 9z" />
            </svg>
          )}
        </div>

        <div className="text-[28px] font-bold text-ink tracking-tight leading-tight mb-2.5">
          You&apos;re a legend.
        </div>

        <div className="text-sm text-ink-60 leading-relaxed" style={{ maxWidth: 280 }}>
          {positive ? (
            firstName ? (
              <>Your review will make {firstName}&apos;s day — and help new customers find {business.name}.</>
            ) : (
              <>Your review will help new customers find {business.name}.</>
            )
          ) : firstName ? (
            <>{firstName} and the team will review your note and follow up soon.</>
          ) : (
            <>The team will review your note and follow up soon.</>
          )}
        </div>
      </div>

      <div className="px-5 pb-6">
        <PoweredBy />
      </div>
    </div>
  );
}
