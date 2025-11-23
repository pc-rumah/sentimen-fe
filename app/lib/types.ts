export interface ResultRow {
  full_text: string;
  clean: string;
  bert: string;
  nb: string;
  svc: string;
}

export interface JobStatusResponse {
  status: "processing" | "done";
}

export interface UploadResponse {
  job_id: string;
}
