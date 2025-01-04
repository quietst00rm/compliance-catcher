import { ProductTitle } from '@/lib/csvUtils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ResultsTableProps {
  data: ProductTitle[];
}

export const ResultsTable = ({ data }: ResultsTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Product Title</TableHead>
            <TableHead>Character Count</TableHead>
            <TableHead>Special Characters</TableHead>
            <TableHead>Repeated Words</TableHead>
            <TableHead className="w-[300px]">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => {
            const isNonCompliant = 
              item.characterCount > 200 ||
              item.specialCharacters === 'Non-compliant' ||
              item.repeatedWords === 'Non-compliant';

            return (
              <TableRow
                key={index}
                className={isNonCompliant ? 'bg-red-50' : undefined}
              >
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.characterCount}</TableCell>
                <TableCell>{item.specialCharacters}</TableCell>
                <TableCell>{item.repeatedWords}</TableCell>
                <TableCell>{item.details}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};