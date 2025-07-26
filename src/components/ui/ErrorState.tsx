import { AlertCircle, RefreshCw, Bug, FileX, Network } from 'lucide-react';
import { clsx } from 'clsx';

interface ErrorStateProps {
  type?: 'upload' | 'analysis' | 'generation' | 'rendering' | 'network' | 'general';
  title?: string;
  message: string;
  details?: string;
  onRetry?: () => void;
  onReset?: () => void;
  className?: string;
}

const ERROR_TYPES = {
  upload: {
    icon: FileX,
    title: 'Upload Error',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
  analysis: {
    icon: Bug,
    title: 'Code Analysis Failed',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
  generation: {
    icon: AlertCircle,
    title: 'Script Generation Failed',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
  rendering: {
    icon: AlertCircle,
    title: 'Rendering Failed',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  network: {
    icon: Network,
    title: 'Connection Error',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  general: {
    icon: AlertCircle,
    title: 'Something went wrong',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
};

export default function ErrorState({
  type = 'general',
  title,
  message,
  details,
  onRetry,
  onReset,
  className
}: ErrorStateProps) {
  const errorConfig = ERROR_TYPES[type];
  const Icon = errorConfig.icon;
  const displayTitle = title ?? errorConfig.title;

  return (
    <div className={clsx(
      'rounded-lg border-2 p-6',
      errorConfig.bgColor,
      errorConfig.borderColor,
      className
    )}>
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Error Icon */}
        <div className={clsx(
          'p-3 rounded-full',
          errorConfig.bgColor
        )}>
          <Icon className={clsx('h-8 w-8', errorConfig.color)} />
        </div>

        {/* Error Title */}
        <h3 className={clsx(
          'text-lg font-semibold',
          errorConfig.color
        )}>
          {displayTitle}
        </h3>

        {/* Error Message */}
        <p className="text-sm text-gray-600 max-w-md">
          {message}
        </p>

        {/* Error Details (Collapsible) */}
        {details && (
          <details className="w-full max-w-md">
            <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700 mb-2">
              Show technical details
            </summary>
            <div className="bg-gray-100 rounded-md p-3 text-left">
              <pre className="text-xs text-gray-700 whitespace-pre-wrap break-words">
                {details}
              </pre>
            </div>
          </details>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 pt-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className={clsx(
                'inline-flex items-center space-x-2 px-4 py-2 rounded-md text-white text-sm font-medium transition-colors',
                type === 'network' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'
              )}
            >
              <RefreshCw className="h-4 w-4" />
              <span>Try Again</span>
            </button>
          )}

          {onReset && (
            <button
              onClick={onReset}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <span>Start Over</span>
            </button>
          )}
        </div>

        {/* Help Text */}
        <div className="text-xs text-gray-500 space-y-1 max-w-md">
          {type === 'upload' && (
            <p>Make sure your file is a valid code file and under 10MB.</p>
          )}
          {type === 'analysis' && (
            <p>The code structure might be too complex or contain syntax errors.</p>
          )}
          {type === 'generation' && (
            <p>The AI couldn&apos;t generate a suitable Manim script. Try with different code.</p>
          )}
          {type === 'rendering' && (
            <p>The generated Manim script couldn&apos;t be executed properly.</p>
          )}
          {type === 'network' && (
            <p>Check your internet connection and try again.</p>
          )}
        </div>
      </div>
    </div>
  );
}