import { useState } from 'react';
import { Copy, Download, Eye, EyeOff, Check } from 'lucide-react';
import { clsx } from 'clsx';

interface CodeViewerProps {
  code?: string;
  title?: string;
  fileName?: string;
  onDownload?: () => void;
  className?: string;
}

export default function CodeViewer({
  code,
  title = "Generated Manim Code",
  fileName = "animation.py",
  onDownload,
  className
}: CodeViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!code) return;
    
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleDownload = () => {
    if (!code) return;
    
    const blob = new Blob([code], { type: 'text/python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    if (onDownload) {
      onDownload();
    }
  };

  if (!code) {
    return (
      <div className={clsx(
        'rounded-lg border border-gray-200 bg-gray-50 p-6',
        className
      )}>
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-3">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">
            No code generated yet
          </h3>
          <p className="text-xs text-gray-500">
            Manim code will appear here after processing your files
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(
      'rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <span className="text-sm font-medium text-gray-700">{title}</span>
          <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
            {fileName}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>

          <button
            onClick={handleCopy}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
            title="Copy code"
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>

          <button
            onClick={handleDownload}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
            title="Download code"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className={clsx(
        'transition-all duration-300 ease-in-out overflow-hidden',
        isExpanded ? 'max-h-96 overflow-y-auto' : 'max-h-24'
      )}>
        <pre className="p-4 text-sm bg-gray-900 text-gray-100 overflow-x-auto">
          <code className="language-python">
            {code}
          </code>
        </pre>
      </div>

      {/* Expand/Collapse Footer */}
      {!isExpanded && code.split('\n').length > 6 && (
        <div className="bg-gradient-to-t from-gray-50 to-transparent py-2 px-4 border-t border-gray-200">
          <button
            onClick={() => setIsExpanded(true)}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Show full code ({code.split('\n').length} lines)
          </button>
        </div>
      )}
      
      {isCopied && (
        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded shadow-lg">
          Copied!
        </div>
      )}
    </div>
  );
}