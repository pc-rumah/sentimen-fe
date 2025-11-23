import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export default function StatusBox({ status, jobId }: any) {
  if (status !== "processing") return null;

  return (
    <Alert className="bg-yellow-50 border-yellow-200 text-yellow-800">
      <Loader2 className="h-4 w-4 animate-spin" />
      <AlertTitle>Memproses</AlertTitle>
      <AlertDescription>
        Sedang diproses di background worker...
        <br />
        <span className="text-xs font-mono mt-1 block">Job ID: {jobId}</span>
      </AlertDescription>
    </Alert>
  );
}
