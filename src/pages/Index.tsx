import { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { ResultsTable } from '@/components/ResultsTable';
import { ProductTitle, processCSV, exportToCSV, processTitle } from '@/lib/csvUtils';
import { Button } from '@/components/ui/button';
import { Download, Upload, Type, Crown } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComplianceRules } from '@/components/ComplianceRules';

const Index = () => {
  const [results, setResults] = useState<ProductTitle[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const [pastedTitles, setPastedTitles] = useState('');

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

  const handlePastedTitles = () => {
    try {
      setIsProcessing(true);
      const titles = pastedTitles
        .split('\n')
        .map(title => title.trim())
        .filter(Boolean);

      if (titles.length === 0) {
        toast({
          title: "No titles found",
          description: "Please paste one or more product titles",
          variant: "destructive",
        });
        return;
      }

      const processedData = titles.map(processTitle);
      setResults(processedData);
      toast({
        title: "Titles processed successfully",
        description: `Analyzed ${processedData.length} product titles`,
      });
    } catch (error) {
      toast({
        title: "Error processing titles",
        description: "An error occurred while processing the titles",
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
      <header className="bg-gradient-to-r from-[hsl(var(--brand-gold))] to-[hsl(var(--brand-blue))] border-b border-gray-200">
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/f3386a45-cffe-4512-927a-65c60adcdb43.png" 
              alt="MajestIQ Logo" 
              className="h-14"
            />
            <Crown className="w-6 h-6 text-white animate-pulse" />
          </div>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4 max-w-7xl space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl md:text-[36px] font-bold tracking-tight text-gray-900">
            Product Title Analyzer
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Optimize your product titles for maximum visibility and compliance. 
            Our analyzer checks character count, special characters, and word repetition rules.
          </p>
        </div>

        <ComplianceRules />

        <div className="space-y-12">
          <Tabs defaultValue="paste" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="paste" className="flex items-center gap-2">
                <Type className="w-4 h-4" />
                Paste Titles
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload CSV
              </TabsTrigger>
            </TabsList>

            <TabsContent value="paste">
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Paste Titles</h2>
                <p className="text-gray-600">Enter one product title per line:</p>
                <Textarea
                  value={pastedTitles}
                  onChange={(e) => setPastedTitles(e.target.value)}
                  placeholder="Enter product titles here..."
                  className="min-h-[200px]"
                />
                <Button 
                  onClick={handlePastedTitles}
                  className="bg-[hsl(var(--brand-blue))] hover:bg-[hsl(var(--brand-blue))/90]"
                >
                  Analyze Titles
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="upload">
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">Upload File</h2>
                <FileUpload onFileSelect={handleFileSelect} />
              </div>
            </TabsContent>
          </Tabs>

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
