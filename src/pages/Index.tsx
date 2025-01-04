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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto py-6 px-4">
          <img 
            src="/lovable-uploads/f3386a45-cffe-4512-927a-65c60adcdb43.png" 
            alt="MajestIQ Logo" 
            className="h-14"
          />
        </div>
      </header>

      <main className="container mx-auto py-12 px-4 max-w-7xl space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Product Title Analyzer
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            Upload a CSV file to analyze product titles for compliance with character count,
            special characters, and word repetition rules.
          </p>
        </div>

        <div className="space-y-12">
          <div>
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Upload File</h2>
              <FileUpload onFileSelect={handleFileSelect} />
            </div>
          </div>

          {isProcessing && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900">Results</h2>
                <Button 
                  onClick={handleExport} 
                  className="bg-[hsl(var(--brand-blue))] hover:bg-[hsl(var(--brand-blue))/90]"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export Results
                </Button>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <ResultsTable data={results} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;