export default function StatusBox({ status, jobId }: any) {
  if (status !== "processing") return null;

  return (
    <div className="p-3 bg-yellow-100 rounded">
      Sedang diproses di background worker...
      <br />
      Job ID: {jobId}
    </div>
  );
}
