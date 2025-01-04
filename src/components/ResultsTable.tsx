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
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-white shadow-sm z-10">
          <TableRow>
            <TableHead className="w-[300px] text-base font-semibold">Product Title</TableHead>
            <TableHead className="text-base font-semibold">Character Count</TableHead>
            <TableHead className="text-base font-semibold">Special Characters</TableHead>
            <TableHead className="text-base font-semibold">Repeated Words</TableHead>
            <TableHead className="w-[300px] text-base font-semibold">Details</TableHead>
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
                className={`
                  ${isNonCompliant ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'}
                  ${index % 2 === 0 ? 'bg-opacity-50' : ''}
                  transition-colors
                `}
              >
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.characterCount}</TableCell>
                <TableCell>{item.specialCharacters}</TableCell>
                <TableCell>{item.repeatedWords}</TableCell>
                <TableCell className="text-sm text-gray-600">{item.details}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};