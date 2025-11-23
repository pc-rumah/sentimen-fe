const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData,
  });

  return res.json();
}

export async function checkStatus(jobId: string) {
  const res = await fetch(`${API_BASE}/status/${jobId}`);
  return res.json();
}

export async function fetchResult(jobId: string) {
  const res = await fetch(`${API_BASE}/result/${jobId}`);
  return res.json();
}
