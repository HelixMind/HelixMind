import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { DollarSign, CreditCard } from "lucide-react";

export default function CapitalWithdraw({ balance = 5000, setBalance = () => {} }) {
  const navigate = useNavigate();
  const { isVerified } = useAuth();
  const [amount, setAmount] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const inUse = 1200;
  const available = balance - inUse;

  if (!isVerified) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-100">Withdraw Capital</h2>
        <p className="text-warning">
          Account verification required to withdraw capital.
        </p>
        <Button onClick={() => navigate("/account")}>Verify Account</Button>
      </div>
    );
  }

  const handleWithdraw = () => {
    const value = Number(amount);
    if (!value || value <= 0 || value > available) return;
    setShowConfirm(true);
  };

  const confirmWithdraw = () => {
    setBalance((prev) => prev - Number(amount));
    setAmount("");
    setShowConfirm(false);
    navigate("/capital");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-gray-100">Withdraw Capital</h2>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center bg-gray-900 text-gray-100">
          <DollarSign className="mx-auto mb-1" />
          <p>Total Capital</p>
          <h3>${balance.toLocaleString()}</h3>
        </Card>
        <Card className="p-4 text-center bg-gray-900 text-gray-100">
          <CreditCard className="mx-auto mb-1" />
          <p>In Use</p>
          <h3>${inUse.toLocaleString()}</h3>
        </Card>
        <Card className="p-4 text-center bg-gray-900 text-gray-100">
          <DollarSign className="mx-auto mb-1" />
          <p>Available</p>
          <h3>${available.toLocaleString()}</h3>
        </Card>
      </div>

      {/* Withdraw Form */}
      <Card className="p-6 bg-gray-900 text-gray-100">
        <CardHeader>
          <CardTitle>Withdrawal Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`Max ${available}`}
            className="w-full p-2 rounded border"
          />
          <select className="w-full p-2 rounded border">
            <option>Bank Account</option>
            <option>Crypto Wallet</option>
          </select>
          <Button onClick={handleWithdraw}>Continue</Button>
        </CardContent>
      </Card>

      {/* Confirm Modal */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Withdrawal</DialogTitle>
            <DialogDescription>
              You are about to withdraw ${amount}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
            <Button onClick={confirmWithdraw}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
