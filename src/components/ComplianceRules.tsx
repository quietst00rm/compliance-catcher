import { TextQuote, Ban, RefreshCw } from 'lucide-react';

export const ComplianceRules = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-transform hover:scale-[1.02]">
        <div className="flex items-center gap-3 mb-3">
          <TextQuote className="w-6 h-6 text-[hsl(var(--brand-blue))]" />
          <h3 className="text-xl font-semibold text-gray-900">Character Count</h3>
        </div>
        <p className="text-gray-600">Maximum 200 characters per title</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-transform hover:scale-[1.02]">
        <div className="flex items-center gap-3 mb-3">
          <Ban className="w-6 h-6 text-[hsl(var(--brand-blue))]" />
          <h3 className="text-xl font-semibold text-gray-900">Special Characters</h3>
        </div>
        <p className="text-gray-600">No !, $, ?, _, {}, ^, ¬, ¦ allowed</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-transform hover:scale-[1.02]">
        <div className="flex items-center gap-3 mb-3">
          <RefreshCw className="w-6 h-6 text-[hsl(var(--brand-blue))]" />
          <h3 className="text-xl font-semibold text-gray-900">Word Repetition</h3>
        </div>
        <p className="text-gray-600">Words cannot appear more than twice*</p>
      </div>
    </div>
  );
};