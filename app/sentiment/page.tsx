"use client";

import { useEffect, useState } from "react";
import UploadForm from "../components/UploadForm";
import StatusBox from "../components/StatusBox";
import ResultTable from "../components/ResultTable";
import SentimentChart from "../components/SentimentChart";

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
    <main className="min-h-screen text-black bg-slate-100 p-6 flex justify-center">
      <div className="max-w-5xl w-full space-y-6 bg-white rounded-xl p-6 shadow">
        <h1 className="text-2xl font-bold">
          Analisis Sentimen (FastAPI + Redis)
        </h1>

        <UploadForm
          onChange={setFile}
          onSubmit={startUpload}
          disabled={status === "processing"}
        />

        <StatusBox status={status} jobId={jobId} />

        {status === "done" && results.length > 0 && (
          <>
            <SentimentChart results={results} />
            <ResultTable results={results} />
          </>
        )}

        {error && <p className="text-red-600">{error}</p>}
      </div>
    </main>
  );
}
