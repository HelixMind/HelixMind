import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

export default function KYCSuccess() {
  const navigate = useNavigate();

  return (
    <div className="p-4 rounded-lg bg-secondary space-y-4 text-center">
      <CheckCircle2 className="w-10 h-10 text-success mx-auto" />

      <div>
        <h3 className="text-lg font-semibold">Verification Submitted</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Your identity verification has been submitted successfully.
          Verification usually takes up to 24 hours.
        </p>
      </div>
    </div>
  );
}
