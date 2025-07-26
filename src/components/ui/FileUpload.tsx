import { useState, useCallback, useRef } from 'react';
import { Upload, File, X, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

interface FileUploadProps {
  onFilesSelect: (files: File[]) => void;
  acceptedFormats?: string[];
  multiple?: boolean;
  maxFileSize?: number; // in MB
  disabled?: boolean;
  isDarkMode?: boolean;
}

const DEFAULT_ACCEPTED_FORMATS = [
  '.py', '.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.json', 
  '.ipynb', '.java', '.cpp', '.c', '.php', '.rb', '.go', '.rs', 
  '.swift', '.kt', '.dart', '.vue', '.svelte', '.xml', '.yml', '.yaml'
];

export default function FileUpload({
  onFilesSelect,
  acceptedFormats = DEFAULT_ACCEPTED_FORMATS,
  multiple = true,
  maxFileSize = 10, // 10MB default
  disabled = false,
  isDarkMode = false,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): string | null => {
    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File ${file.name} is too large (max ${maxFileSize}MB)`;
    }

    // Check file extension
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedFormats.includes(extension)) {
      return `File type ${extension} is not supported`;
    }

    return null;
  }, [acceptedFormats, maxFileSize]);

  const handleFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return;

    const filesArray = Array.from(newFiles);
    const validFiles: File[] = [];
    let errorMessage = '';

    for (const file of filesArray) {
      const validationError = validateFile(file);
      if (validationError) {
        errorMessage = validationError;
        break;
      }
      validFiles.push(file);
    }

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setError(null);
    
    if (!multiple && validFiles.length > 1) {
      setError('Only one file is allowed');
      return;
    }

    const finalFiles = multiple ? [...uploadedFiles, ...validFiles] : validFiles;
    setUploadedFiles(finalFiles);
    onFilesSelect(finalFiles);
  }, [validateFile, multiple, uploadedFiles, onFilesSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (!disabled) {
      handleFiles(e.dataTransfer.files);
    }
  }, [disabled, handleFiles]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  }, [handleFiles]);

  const handleBrowseClick = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  const removeFile = useCallback((index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onFilesSelect(newFiles);
  }, [uploadedFiles, onFilesSelect]);

  const clearAllFiles = useCallback(() => {
    setUploadedFiles([]);
    onFilesSelect([]);
    setError(null);
  }, [onFilesSelect]);

  return (
    <div className="w-full space-y-4">
      <div
        className={clsx(
          'relative rounded-lg border-2 border-dashed p-2 text-center transition-colors',
          {
            // Light mode
            'border-blue-300 bg-blue-50': !isDarkMode && isDragging && !disabled,
            'border-gray-300 bg-gray-50': !isDarkMode && !isDragging && !disabled,
            'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50': !isDarkMode && disabled,
            'hover:border-blue-300 hover:bg-blue-50': !isDarkMode && !disabled && !isDragging,
            // Dark mode
            'border-blue-400 bg-blue-900/20': isDarkMode && isDragging && !disabled,
            'border-gray-600 bg-gray-800': isDarkMode && !isDragging && !disabled,
            'border-gray-700 bg-gray-700 cursor-not-allowed opacity-50': isDarkMode && disabled,
            'hover:border-blue-400 hover:bg-blue-900/20': isDarkMode && !disabled && !isDragging,
          }
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={acceptedFormats.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled}
        />
        
        <div className="flex flex-col items-center space-y-4">
          <Upload 
            className={clsx(
              'h-12 w-12',
              disabled 
                ? isDarkMode ? 'text-gray-600' : 'text-gray-400'
                : isDarkMode ? 'text-gray-400' : 'text-gray-500'
            )} 
          />
          
          <div className="space-y-2">
            <p className={clsx(
              'text-lg font-medium',
              disabled 
                ? isDarkMode ? 'text-gray-600' : 'text-gray-400'
                : isDarkMode ? 'text-gray-200' : 'text-gray-700'
            )}>
              {isDragging ? 'Drop your files here' : 'Drag & drop your code files here'}
            </p>
            
            <p className={clsx(
              'text-sm',
              disabled 
                ? isDarkMode ? 'text-gray-600' : 'text-gray-400'
                : isDarkMode ? 'text-gray-300' : 'text-gray-500'
            )}>
              or{' '}
              <button
                type="button"
                onClick={handleBrowseClick}
                disabled={disabled}
                className={clsx(
                  'font-medium underline',
                  disabled 
                    ? isDarkMode ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed' 
                    : isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                )}
              >
                browse files
              </button>
            </p>
            
            <p className={clsx(
              'text-xs',
              disabled 
                ? isDarkMode ? 'text-gray-600' : 'text-gray-400'
                : isDarkMode ? 'text-gray-500' : 'text-gray-400'
            )}>
              Supports: {acceptedFormats.slice(0, 6).join(', ')}
              {acceptedFormats.length > 6 && ` +${acceptedFormats.length - 6} more`}
              <br />
              Max file size: {maxFileSize}MB {multiple && '• Multiple files allowed'}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className={clsx(
          'flex items-center space-x-2 rounded-md p-3',
          isDarkMode 
            ? 'bg-red-900/20 text-red-400' 
            : 'bg-red-50 text-red-700'
        )}>
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className={clsx(
              'text-sm font-medium',
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            )}>
              Uploaded Files ({uploadedFiles.length})
            </h3>
            <button
              type="button"
              onClick={clearAllFiles}
              className="text-xs text-red-600 hover:text-red-700"
            >
              Clear all
            </button>
          </div>
          
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className={clsx(
                  'flex items-center justify-between rounded-md p-3',
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                )}
              >
                <div className="flex items-center space-x-3">
                  <File className={clsx(
                    'h-4 w-4',
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  )} />
                  <div>
                    <p className={clsx(
                      'text-sm font-medium',
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    )}>{file.name}</p>
                    <p className={clsx(
                      'text-xs',
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    )}>
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className={clsx(
                    isDarkMode 
                      ? 'text-red-400 hover:text-red-300' 
                      : 'text-red-500 hover:text-red-700'
                  )}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}