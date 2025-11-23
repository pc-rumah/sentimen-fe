import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResultTable({ results }: any) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Hasil Analisis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-[400px] overflow-auto rounded-md border">
          <Table>
            <TableHeader className="bg-slate-100 sticky top-0 z-10">
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Teks Asli</TableHead>
                <TableHead>Clean</TableHead>
                <TableHead className="text-center">IndoBERT</TableHead>
                <TableHead className="text-center">NB</TableHead>
                <TableHead className="text-center">SVC</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((row: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium text-center">
                    {idx + 1}
                  </TableCell>
                  <TableCell>{row.full_text}</TableCell>
                  <TableCell className="text-slate-600">{row.clean}</TableCell>
                  <TableCell className="text-center">{row.bert}</TableCell>
                  <TableCell className="text-center">{row.nb}</TableCell>
                  <TableCell className="text-center font-bold">
                    {row.svc}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
