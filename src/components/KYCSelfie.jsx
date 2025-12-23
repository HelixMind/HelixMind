import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Camera, Info } from "lucide-react";

export default function KYCSelfie() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState(""); // Selected selfie file name
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const openCameraOrPicker = () => {
    fileInputRef.current.click();
  };

    const openFilePicker = () => {
    fileInputRef.current.click();
  };


  return (
    <div className="space-y-5">
      {/* Title */}
      <div>
        <h3 className="text-lg font-semibold">Selfie Verification</h3>
        <p className="text-sm text-muted-foreground">
          Take a clear selfie holding your identity document.
        </p>
      </div>

      {/* Instructions */}
      <div className="p-4 rounded-lg bg-secondary flex gap-3 items-start">
        <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Make sure your face is clearly visible</li>
          <li>• Hold your ID next to your face</li>
          <li>• Avoid blur or low lighting</li>
        </ul>
      </div>

      {/* Camera / Upload Box */}
      <div className="border border-dashed rounded-lg p-6 text-center space-y-3">
        <Camera className="w-7 h-7 mx-auto text-muted-foreground" />
        <p className="text-sm font-medium">Take or Upload Selfie</p>
        <p className="text-xs text-muted-foreground">JPG or PNG • Max 5MB</p>

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          capture="user" // triggers camera on mobile devices
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          <Button variant="outline" size="sm" onClick={openFilePicker}>
            Upload a selfie
          </Button>
          <Button variant="outline" size="sm" onClick={openCameraOrPicker}>
            Take a selfie
          </Button>
        </div>

        {/* Display selected file name */}
        {fileName && (
          <p className="text-xs text-muted-foreground mt-1">{fileName}</p>
        )}
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-muted" />
        <span className="w-2 h-2 rounded-full bg-muted" />
        <span className="w-2 h-2 rounded-full bg-primary" />
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

        <Button
          className="w-full"
          onClick={() => navigate("../review")}
          disabled={!fileName} // optional: only allow Next if selfie is selected
        >
          Next
        </Button>
      </div>
    </div>
  );
}
