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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
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
        border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
        transition-all duration-200 ease-in-out
        ${isDragActive 
          ? 'border-primary bg-primary/5 scale-[0.99]' 
          : 'border-gray-200 hover:border-primary hover:bg-gray-50'
        }
      `}
    >
      <input {...getInputProps()} />
      <Upload className={`
        w-12 h-12 mx-auto mb-4
        ${isDragActive ? 'text-primary' : 'text-gray-400'}
        transition-colors duration-200
      `} />
      <p className="text-lg font-medium text-gray-900">
        {isDragActive ? 'Drop your CSV file here' : 'Drag & drop your CSV file here'}
      </p>
      <p className="mt-2 text-sm text-gray-500">
        or click to select a file
      </p>
      <p className="mt-4 text-xs text-gray-400">
        File must be a CSV with product titles in Column A starting at Row 2
      </p>
    </div>
  );
};