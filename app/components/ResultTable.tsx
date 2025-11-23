export default function ResultTable({ results }: any) {
  return (
    <div className="mt-4 max-h-[400px] overflow-auto border rounded">
      <table className="min-w-full text-xs">
        <thead className="bg-slate-200 sticky top-0">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Teks Asli</th>
            <th className="p-2 border">Clean</th>
            <th className="p-2 border">IndoBERT</th>
            <th className="p-2 border">NB</th>
            <th className="p-2 border">SVC</th>
          </tr>
        </thead>
        <tbody>
          {results.map((row: any, idx: number) => (
            <tr key={idx} className="odd:bg-white even:bg-slate-100">
              <td className="p-2 border text-center">{idx + 1}</td>
              <td className="p-2 border">{row.full_text}</td>
              <td className="p-2 border text-slate-600">{row.clean}</td>
              <td className="p-2 border text-center">{row.bert}</td>
              <td className="p-2 border text-center">{row.nb}</td>
              <td className="p-2 border text-center font-bold">{row.svc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
