import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/Dialog";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CreditCard, Bitcoin, Globe, } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useParams,
  useNavigate,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";

export default function CapitalDeposit({ setBalance }) {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState(null);
  const [network, setNetwork] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const cryptoNetworks = [
    { name: "Ethereum", icon: <Globe className="w-5 h-5" /> },
    { name: "Polygon", icon: <Globe className="w-5 h-5" /> },
    { name: "BSC", icon: <Bitcoin className="w-5 h-5" /> },
  ];

  const handleDeposit = () => {
    if (!amount || Number(amount) <= 0 || !method || (method === "crypto" && (!network || !walletAddress))) return;
    setShowConfirm(true);
  };

  const confirmDeposit = () => {
    setBalance(prev => prev + Number(amount));
    setAmount("");
    setWalletAddress("");
    setMethod(null);
    setNetwork(null);
    setShowConfirm(false);
    navigate("/capital");
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 fade-in max-w-4xl">
            {/* go back */}
            <Link
              to="/account"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors animate-fade-in"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Account
            </Link>
      <h2 className="text-2xl font-display font-bold text-gray-100">Deposit Capital</h2>
      <p className="text-gray-400 mb-4">
        Select a method and add funds to your capital.
      </p>

      {/* Amount */}
      <Card className="border border-border  shadow-md rounded-xl w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-100">Amount</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-3 rounded border border-border text-gray-100  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </CardContent>
      </Card>

      {/* Method Selection */}
      <Card className="border border-border  shadow-md rounded-xl w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-100">Select Method</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 flex-wrap">
          <div
            onClick={() => setMethod("bank")}
            className={cn(
              "flex-1 min-w-[150px] p-4 rounded-xl cursor-pointer border-2",
              method === "bank" ? "border-green-400 bg-gray-900" : "border-border ",
              "flex flex-col items-center justify-center gap-2 text-gray-100 hover:border-green-400 transition"
            )}
          >
            <CreditCard className="w-8 h-8" />
            <span>Bank Account</span>
          </div>

          <div
            onClick={() => setMethod("crypto")}
            className={cn(
              "flex-1 min-w-[150px] p-4 rounded-xl cursor-pointer border-2",
              method === "crypto" ? "border-green-400 bg-gray-900" : "border-border ",
              "flex flex-col items-center justify-center gap-2 text-gray-100 hover:border-green-400 transition"
            )}
          >
            <Bitcoin className="w-8 h-8" />
            <span>Crypto Wallet</span>
          </div>
        </CardContent>
      </Card>

      {/* Crypto Networks */}
      {method === "crypto" && (
        <Card className="border border-border  shadow-md rounded-xl w-full">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-100">Select Network</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4 flex-wrap">
            {cryptoNetworks.map((n) => (
              <div
                key={n.name}
                onClick={() => setNetwork(n.name)}
                className={cn(
                  "flex-1 min-w-[120px] p-4 rounded-xl cursor-pointer border-2",
                  network === n.name ? "border-green-400 bg-gray-900" : "border-border ",
                  "flex flex-col items-center justify-center gap-2 text-gray-100 hover:border-green-400 transition"
                )}
              >
                {n.icon}
                <span>{n.name}</span>
              </div>
            ))}
          </CardContent>

          {/* Wallet Address */}
          <CardContent className="mt-2">
            <label className="text-gray-300 font-medium mb-1 block">Wallet Address</label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="Enter wallet address"
              className="w-full p-3 rounded border border-border text-gray-100  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </CardContent>
        </Card>
      )}

      {/* Continue Button */}
      <Button
        onClick={handleDeposit}
        className="w-full bg-green-600 hover:bg-green-500 text-gray-100"
      >
        Continue
      </Button>

      {/* Confirmation Modal */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="border border-border rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-gray-100">Confirm Deposit</DialogTitle>
            <DialogDescription className="text-gray-300">
              You are about to deposit ${amount} via {method === "bank" ? "Bank Account" : `${network} Wallet`}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
            <Button
              onClick={confirmDeposit}
              className="bg-green-600 hover:bg-green-500 text-gray-100"
            >
              Confirm Deposit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
