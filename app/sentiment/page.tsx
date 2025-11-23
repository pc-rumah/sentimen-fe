"use client";

import { useEffect, useState } from "react";
import UploadForm from "../components/UploadForm";
import StatusBox from "../components/StatusBox";
import ResultTable from "../components/ResultTable";
import SentimentChart from "../components/SentimentChart";
import ApiStatus from "../components/ApiStatus";

import { uploadFile, checkStatus, fetchResult } from "../lib/api";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "done">("idle");
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState("");

  // Polling status job
  useEffect(() => {
    if (!jobId || status !== "processing") return;

    const t = setInterval(async () => {
      const data = await checkStatus(jobId);

      if (data.status === "done") {
        clearInterval(t);
        setStatus("done");

        const res = await fetchResult(jobId);
        setResults(res.data);
      }
    }, 2000);

    return () => clearInterval(t);
  }, [jobId, status]);

  const startUpload = async () => {
    if (!file) return setError("Silakan upload file.");

    setError("");
    setStatus("processing");

    const res = await uploadFile(file);
    setJobId(res.job_id);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12 relative">
      <ApiStatus />
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Analisis Sentimen
          </h1>
          <p className="text-slate-500">
            Upload file dengan format CSV.
          </p>
        </div>

        <div className="grid gap-6">
          <UploadForm
            onChange={setFile}
            onSubmit={startUpload}
            disabled={status === "processing"}
          />

          <StatusBox status={status} jobId={jobId} />

          {error && (
            <div className="p-4 text-sm text-red-800 bg-red-50 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {status === "done" && results.length > 0 && (
            <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SentimentChart results={results} />
              <ResultTable results={results} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
