import { Brain, Cog, Play, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';

type LoadingStage = 'analyzing' | 'generating' | 'rendering' | 'complete';

interface LoadingStateProps {
  stage?: LoadingStage;
  progress?: number;
  message?: string;
  className?: string;
}

const STAGES = {
  analyzing: {
    icon: Brain,
    title: 'Analyzing Code',
    description: 'Understanding your code structure and logic...',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  generating: {
    icon: Cog,
    title: 'Generating Animation Script',
    description: 'Creating Manim code to visualize your logic...',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  rendering: {
    icon: Play,
    title: 'Rendering Animation',
    description: 'Executing Manim script and creating video...',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
  complete: {
    icon: CheckCircle,
    title: 'Complete',
    description: 'Your animation is ready!',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
};

export default function LoadingState({
  stage = 'analyzing',
  progress,
  message,
  className
}: LoadingStateProps) {
  const currentStage = STAGES[stage];
  const Icon = currentStage.icon;

  return (
    <div className={clsx(
      'flex flex-col items-center justify-center p-8 rounded-lg border-2 border-dashed',
      currentStage.bgColor,
      'border-gray-300',
      className
    )}>
      <div className={clsx(
        'relative mb-4 p-4 rounded-full',
        currentStage.bgColor
      )}>
        {stage !== 'complete' ? (
          <div className="relative">
            <Icon className={clsx('h-8 w-8', currentStage.color)} />
            <div className={clsx(
              'absolute inset-0 rounded-full border-2 border-transparent border-t-current animate-spin',
              currentStage.color
            )} />
          </div>
        ) : (
          <Icon className={clsx('h-8 w-8', currentStage.color)} />
        )}
      </div>

      <h3 className={clsx(
        'text-lg font-semibold mb-2',
        currentStage.color
      )}>
        {currentStage.title}
      </h3>

      <p className="text-sm text-gray-600 text-center mb-4 max-w-sm">
        {message ?? currentStage.description}
      </p>

      {/* Progress Bar */}
      {progress !== undefined && (
        <div className="w-full max-w-xs mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={clsx(
                'h-2 rounded-full transition-all duration-300 ease-out',
                stage === 'complete' ? 'bg-green-500' : 'bg-blue-500'
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Stage Indicators */}
      <div className="flex items-center space-x-2 mt-4">
        {Object.entries(STAGES).map(([key, stageInfo], _index) => {
          const StageIcon = stageInfo.icon;
          const isActive = key === stage;
          const isPast = Object.keys(STAGES).indexOf(key) < Object.keys(STAGES).indexOf(stage);
          
          return (
            <div
              key={key}
              className={clsx(
                'flex items-center space-x-2 px-2 py-1 rounded-full text-xs',
                {
                  [stageInfo.bgColor]: isActive,
                  'bg-gray-100': !isActive && !isPast,
                  'bg-green-50': isPast && stage !== 'complete',
                  'bg-green-100': isPast && stage === 'complete',
                }
              )}
            >
              <StageIcon className={clsx(
                'h-3 w-3',
                {
                  [stageInfo.color]: isActive,
                  'text-gray-400': !isActive && !isPast,
                  'text-green-500': isPast,
                }
              )} />
              <span className={clsx(
                {
                  [stageInfo.color]: isActive,
                  'text-gray-500': !isActive && !isPast,
                  'text-green-600': isPast,
                }
              )}>
                {stageInfo.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Estimated Time */}
      {stage !== 'complete' && (
        <p className="text-xs text-gray-400 mt-3">
          This usually takes 30-90 seconds
        </p>
      )}
    </div>
  );
}