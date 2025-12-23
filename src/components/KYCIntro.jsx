

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { UserCheck } from "lucide-react";

export default function KYCIntro() {
  const navigate = useNavigate();

  return (
    <div className="p-4 rounded-lg bg-secondary space-y-4">
      <div className="flex items-center gap-2">
        <UserCheck className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Verify Your Identity</h3>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        Complete identity verification to unlock withdrawals, higher limits,
        and ensure your card remains secure.
      </p>

      {/* Step indicators (like the design) */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary" />
        <span className="w-2 h-2 rounded-full bg-muted" />
        <span className="w-2 h-2 rounded-full bg-muted" />
      </div>

      <Button
        className="w-full"
        onClick={() => navigate("document")}
      >
        Next
      </Button>
    </div>
  );
}

