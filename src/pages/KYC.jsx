import {
  useParams,
  useNavigate,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

import { CheckCircle2, UserCheck, CheckCircle, XCircle } from "lucide-react";

export default function KYC() {
  const navigate = useNavigate();
  const location = useLocation();

  const [kycVerified] = useState(
    localStorage.getItem("kyc_verified") === "true"
  );

  return (
    <div className="p-6 lg:p-8 space-y-6 fade-in">
      {/* go back */}
      <Link
        to="/account"
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors animate-fade-in"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Account
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold">KYC Verification</h1>
        <p className="text-muted-foreground mt-1">
          Verify your account to unlock withdrawals and higher limits.
        </p>
      </div>

      {/* ================= KYC CARD ================= */}
      <Card>
        <CardHeader className="flex flex-col items-start gap-4">
          <CardTitle className="flex items-center gap-2">
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
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Nested KYC routes render HERE */}
          <Outlet />

          {/* Default content when NOT in /kyc */}
          {!location.pathname.includes("/kyc") && (
            <div className="p-4 rounded-lg bg-secondary space-y-4">
              <p className="text-sm text-muted-foreground">
                Verify your account to unlock withdrawals and higher limits.
              </p>

              {!kycVerified && (
                <Button className="w-full" onClick={() => navigate("document")}>
                  Next
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
    </div>
  );
}
