import { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { ResultsTable } from '@/components/ResultsTable';
import { ProductTitle, processCSV, exportToCSV } from '@/lib/csvUtils';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [results, setResults] = useState<ProductTitle[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = async (file: File) => {
    try {
      setIsProcessing(true);
      const processedData = await processCSV(file);
      setResults(processedData);
      toast({
        title: "File processed successfully",
        description: `Analyzed ${processedData.length} product titles`,
      });
    } catch (error) {
      toast({
        title: "Error processing file",
        description: "Please ensure your file is a valid CSV with product titles in the first column",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport = () => {
    if (results.length === 0) {
      toast({
        title: "No data to export",
        description: "Please upload and process a CSV file first",
        variant: "destructive",
      });
      return;
    }
    exportToCSV(results);
    toast({
      title: "Export successful",
      description: "Your results have been downloaded",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Product Title Analyzer
          </h1>
          <p className="mt-2 text-muted-foreground">
            Upload a CSV file to analyze product titles for compliance with character count,
            special characters, and word repetition rules.
          </p>
        </div>

        <div className="grid gap-8">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Upload File</h2>
            <FileUpload onFileSelect={handleFileSelect} />
          </div>

          {isProcessing && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Results</h2>
                <Button onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Results
                </Button>
              </div>
              <ResultsTable data={results} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;