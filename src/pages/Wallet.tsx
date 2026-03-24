import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const transactions = [
  { id: "t1", type: "out", title: "Flight to Tokyo", amount: -890, date: "Mar 15, 2026", status: "Completed" },
  { id: "t2", type: "in", title: "Top-up via USDC", amount: 2000, date: "Mar 14, 2026", status: "Completed" },
  { id: "t3", type: "out", title: "Park Hyatt Tokyo", amount: -1540, date: "Mar 14, 2026", status: "Completed" },
  { id: "t4", type: "out", title: "Shibuya Food Tour", amount: -85, date: "Mar 12, 2026", status: "Completed" },
  { id: "t5", type: "in", title: "Referral Reward", amount: 50, date: "Mar 10, 2026", status: "Completed" },
];

const Wallet = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-foreground mb-2">MiniPay Wallet</h1>
      <p className="text-muted-foreground mb-8">Manage your crypto balance for seamless travel payments.</p>

      {/* Balance */}
      <div className="glass rounded-2xl p-8 mb-8 glow-accent">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
            <WalletIcon className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Available Balance</p>
            <p className="text-3xl font-bold text-foreground">$1,535.00</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <span>≈ 1,535 cUSD</span>
          <span className="text-border">·</span>
          <span>MiniPay Network</span>
        </div>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90 glow-accent">
          <Plus className="w-4 h-4 mr-2" /> Top Up
        </Button>
      </div>

      {/* Transactions */}
      <h2 className="font-semibold text-foreground mb-4">Recent Transactions</h2>
      <div className="space-y-2">
        {transactions.map((tx) => (
          <div key={tx.id} className="glass rounded-xl p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              tx.type === "in" ? "bg-neon-green/10" : "bg-destructive/10"
            }`}>
              {tx.type === "in" ? (
                <ArrowDownLeft className="w-5 h-5 text-neon-green" />
              ) : (
                <ArrowUpRight className="w-5 h-5 text-destructive" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-medium text-foreground">{tx.title}</div>
              <div className="text-xs text-muted-foreground">{tx.date}</div>
            </div>
            <div className={`font-semibold ${tx.type === "in" ? "text-neon-green" : "text-foreground"}`}>
              {tx.type === "in" ? "+" : ""}${Math.abs(tx.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wallet;
