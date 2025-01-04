import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
        transition-all duration-200 ease-in-out
        ${isDragActive 
          ? 'border-[hsl(var(--brand-blue))] bg-[hsl(var(--brand-blue))/5] scale-[0.99]' 
          : 'border-gray-300 hover:border-[hsl(var(--brand-blue))] hover:bg-gray-50'
        }
      `}
    >
      <input {...getInputProps()} />
      <Upload className={`
        w-16 h-16 mx-auto mb-6
        ${isDragActive ? 'text-[hsl(var(--brand-blue))]' : 'text-gray-400'}
        transition-colors duration-200
      `} />
      <p className="text-xl font-medium text-gray-900 mb-2">
        {isDragActive ? 'Drop your CSV file here' : 'Drag & drop your CSV file here'}
      </p>
      <p className="text-base text-gray-600 mb-4">
        or click to select a file
      </p>
      {acceptedFiles.length > 0 ? (
        <p className="text-sm font-medium text-[hsl(var(--brand-blue))]">
          Selected: {acceptedFiles[0].name}
        </p>
      ) : (
        <p className="text-sm text-gray-500">
          <strong>CSV file</strong> with titles in Column A (from Row 2)
        </p>
      )}
    </div>
  );
};