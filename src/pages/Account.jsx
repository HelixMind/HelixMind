import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import {
  User,
  Mail,
  Shield,
  LogOut,
  CheckCircle2,
  UserCheck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { cn } from "../lib/utils.js";

export default function Account() {
  const { user, signOut, isVerified, upgradeAccount } = useAuth();
  const navigate = useNavigate();

  const [riskAcknowledged, setRiskAcknowledged] = useState(
    localStorage.getItem("risk_acknowledged") === "true"
  );

  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const [kycVerified] = useState(
    localStorage.getItem("kyc_verified") === "true"
  );

  const handleAcknowledgeRisk = () => {
    setRiskAcknowledged(true);
    localStorage.setItem("risk_acknowledged", "true");
  };

  const handleSignOut = () => {
    signOut();
    navigate("/signin");
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold">Account</h1>
        <p className="text-muted-foreground mt-1">
          Manage your profile and settings.
        </p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            {/* Profile Circle */}
            <div
              className={cn(
                "flex-shrink-0 w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-2xl font-display font-bold"
              )}
            >
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            {/* Name & Email */}
            <div className="min-w-0">
              <h3 className="flex items-center gap-2 text-lg font-semibold truncate">
                <span className="truncate">{user?.name || "User"}</span>
                {isVerified && (
                  <img
                    src="./verification_badge.svg"
                    alt=""
                    className="w-4 h-4"
                  />
                )}
              </h3>
              <p className="text-muted-foreground flex items-center gap-2 truncate">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">
                  {user?.email || "email@example.com"}
                </span>
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Full Name
              </label>
              <Input
                value={user?.name || ""}
                disabled
                className="mt-1 truncate"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Email Address
              </label>
              <Input
                value={user?.email || ""}
                disabled
                className="mt-1 truncate"
              />
            </div>
          </div>

          {/* Account Upgrade */}
          <div className="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold truncate">
                Account Upgrade
              </h3>
              <p className="text-sm text-muted-foreground">
                Upgrade your account to gain access to insider investment
                opportunities.
              </p>
            </div>
            <div>
              <Button onClick={upgradeAccount}>Upgrade Account</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================= KYC CARD ================= */}
      <Card>
        <CardHeader className="flex flex-col items-start gap-4">
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            KYC Verification
          </CardTitle>

          <div className="flex items-center gap-2">
            {kycVerified ? (
              <div className="flex items-center gap-2 text-success">
                <CheckCircle className="w-5 h-5" />
                Verified
              </div>
            ) : (
              <div className="flex items-center gap-2 text-warning">
                <XCircle className="w-5 h-5" />
                Not Verified
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {/* Default content when NOT in /account/kyc */}
          {!location.pathname.includes("/account/kyc") && (
            <div className="p-4 rounded-lg bg-secondary space-y-4">
              <p className="text-sm text-muted-foreground">
                Verify your account to unlock withdrawals and higher limits.
              </p>

              {!kycVerified && (
                <Button onClick={() => navigate("/kyc")}>
                  Verify Identity
                </Button>
              )}

              {kycVerified && (
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle2 className="w-5 h-5" />
                  KYC Verified
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Risk Acknowledgment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Risk Acknowledgment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg bg-secondary">
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              I understand that investing in initial public offerings
              (Investments) involves substantial risk, including the possible
              loss of principal. I acknowledge that past performance is not
              indicative of future results and that I should only invest money
              that I can afford to lose. I have read and understood the risks
              associated with Investment investments.
            </p>

            {riskAcknowledged ? (
              <div className="flex items-center gap-2 text-success">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Risk acknowledged</span>
              </div>
            ) : (
              <Button onClick={handleAcknowledgeRisk}>
                I Acknowledge the Risks
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sign Out */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-semibold">Sign Out</h3>
              <p className="text-sm text-muted-foreground">
                Sign out of your account on this device.
              </p>
            </div>
            <Button variant="outline" onClick={() => setShowSignOutModal(true)}>
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sign Out Confirmation Modal */}
      <Dialog open={showSignOutModal} onOpenChange={setShowSignOutModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign Out</DialogTitle>
            <DialogDescription>
              Are you sure you want to sign out of your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowSignOutModal(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSignOut}>Sign Out</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
