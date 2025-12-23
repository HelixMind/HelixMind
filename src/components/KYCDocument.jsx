import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Upload, IdCard } from "lucide-react";

export default function KYCDocument() {
  const navigate = useNavigate();
  const [docType, setDocType] = useState("passport");
  const [fileName, setFileName] = useState(""); // To display chosen file name
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="space-y-5">
      {/* Title */}
      <div>
        <h3 className="text-lg font-semibold">Proof of Identity</h3>
        <p className="text-sm text-muted-foreground">
          Upload a valid government-issued ID.
        </p>
      </div>

      {/* Document Type Selection */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Choose your identity type</p>
        <div className="flex gap-3 flex-wrap">
          {["id", "passport", "license"].map((type) => (
            <button
              key={type}
              onClick={() => setDocType(type)}
              className={`px-4 py-2 rounded-md border text-sm capitalize transition
                ${
                  docType === type
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground"
                }`}
            >
              {type === "id" && "ID Card"}
              {type === "passport" && "Passport"}
              {type === "license" && "Driver’s License"}
            </button>
          ))}
        </div>
      </div>

      {/* Upload Box */}
      <div className="border border-dashed rounded-lg p-6 text-center space-y-2">
        <Upload className="w-6 h-6 mx-auto text-muted-foreground" />
        <p className="text-sm font-medium">Upload Proof Identity</p>
        <p className="text-xs text-muted-foreground">
          Accepted: ID card, Passport, Driver’s License
        </p>

        {/* Hidden file input */}
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <Button variant="outline" size="sm" onClick={openFilePicker}>
          Choose file
        </Button>

        {/* Show selected file name */}
        {fileName && <p className="text-xs text-muted-foreground mt-1">{fileName}</p>}
      </div>

      {/* Selfie Notice */}
      <div className="border border-dashed rounded-lg p-4 flex gap-3 items-start">
        <IdCard className="w-5 h-5 text-muted-foreground mt-1" />
        <p className="text-xs text-muted-foreground">
          A selfie with your identity will be required in the next step.
          Screenshots or blurred images are not accepted.
        </p>
      </div>

      {/* Step indicators + Next */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-muted" />
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="w-2 h-2 rounded-full bg-muted" />
        </div>

        <Button
          className="w-full"
          onClick={() => navigate("../selfie")}
          disabled={!fileName} // Optional: only allow Next if a file is chosen
        >
          Next
        </Button>
      </div>
    </div>
  );
}
