import { useAuth } from "@/context/AuthContext";

export default function CapitalUpgrade() {
  const { isVerified, upgradeAccount } = useAuth();

  if (isVerified) {
    return (
      <div className="p-6 rounded-lg bg-success/10 text-success">
        Your capital account is verified.
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg bg-secondary space-y-4">
      <h3 className="text-lg font-semibold">Capital Account Verification</h3>

      <p className="text-sm text-muted-foreground">
        Verify your capital account to unlock withdrawals and IPO participation.
      </p>

      <div className="p-4 rounded bg-background border">
        <p className="font-medium">Verification Fee</p>
        <p className="text-2xl font-bold">$199</p>
      </div>

      <button
        onClick={upgradeAccount}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        Pay & Verify Account
      </button>
    </div>
  );
}
