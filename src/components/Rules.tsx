import {prizeToSymbolMap, prizeToValueMap} from "@/constants";
import {Prizes} from "@/types";

const payouts = Object.values(Prizes).map((p) => ({
  symbol: prizeToSymbolMap[p],
  name: p,
  payout: prizeToValueMap[p],
}));

export const Rules = () => {
  return (
    <div className="w-full mt-4">
      <h2 className="text-xl font-bold mb-3">Payouts (3 matching symbols)</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {payouts.map(({symbol, name, payout}) => (
          <div
            key={name}
            className="rounded-xl p-3 flex items-center justify-between"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,0,0,.25) 0%, rgba(0,0,0,.15) 100%)",
              border: "1px solid rgba(255,255,255,.08)",
            }}
          >
            <div className="flex items-center gap-2">
              <span style={{fontSize: 22}}>{symbol}</span>
              <span className="text-sm opacity-80">{name}</span>
            </div>
            <div
              className="text-base font-semibold"
              style={{color: "var(--color-accent-primary-glow)"}}
            >
              +{payout}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-sm opacity-80">Each spin costs 1 credit.</div>
    </div>
  );
};
