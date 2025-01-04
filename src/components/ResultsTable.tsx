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
          <TableRow className="border-b border-gray-200 bg-gray-50">
            <TableHead className="w-[40%] text-base font-semibold text-gray-900">Product Title</TableHead>
            <TableHead className="text-base font-semibold text-gray-900">Character Count</TableHead>
            <TableHead className="text-base font-semibold text-gray-900">Special Characters</TableHead>
            <TableHead className="text-base font-semibold text-gray-900">Repeated Words</TableHead>
            <TableHead className="w-[25%] text-base font-semibold text-gray-900">Details</TableHead>
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
                <TableCell className="font-medium text-gray-900">{item.title}</TableCell>
                <TableCell className="text-gray-700">{item.characterCount}</TableCell>
                <TableCell>
                  <span className={`
                    px-2 py-1 rounded-full text-sm font-medium
                    ${item.specialCharacters === 'Compliant' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'}
                  `}>
                    {item.specialCharacters}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`
                    px-2 py-1 rounded-full text-sm font-medium
                    ${item.repeatedWords === 'Compliant' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'}
                  `}>
                    {item.repeatedWords}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{item.details}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};