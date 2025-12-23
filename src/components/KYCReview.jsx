import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, FileText, Camera } from "lucide-react";

export default function KYCReview() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // simulate successful submission
    localStorage.setItem("kyc_verified", "true");
    navigate("account/kyc/success");
  };

  return (
    <div className="space-y-5">
      {/* Title */}
      <div>
        <h3 className="text-lg font-semibold">Review & Submit</h3>
        <p className="text-sm text-muted-foreground">
          Please confirm your details before submission.
        </p>
      </div>

      {/* Summary */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
          <FileText className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Identity Document</p>
            <p className="text-xs text-muted-foreground">
              Government-issued ID uploaded
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
          <Camera className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Selfie Verification</p>
            <p className="text-xs text-muted-foreground">
              Selfie uploaded successfully
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Notice */}
      <div className="p-4 rounded-lg border text-xs text-muted-foreground">
        By submitting, you confirm that the information provided is accurate
        and belongs to you. Verification may take up to 24 hours.
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        <Button className="w-full" onClick={handleSubmit}>
          Submit Verification
        </Button>
      </div>
    </div>
  );
}
