import { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Download, Maximize2 } from 'lucide-react';
import { clsx } from 'clsx';

interface VideoPlayerProps {
  src?: string;
  title?: string;
  placeholder?: boolean;
  onDownload?: () => void;
  className?: string;
}

export default function VideoPlayer({
  src,
  title = "Generated Animation",
  placeholder = false,
  onDownload,
  className
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handleEnd = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', handleEnd);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', handleEnd);
    };
  }, [src]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      void video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const restart = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    setCurrentTime(0);
    if (!isPlaying) {
      void video.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const time = parseFloat(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      void container.requestFullscreen?.();
    } else {
      void document.exitFullscreen?.();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (placeholder) {
    return (
      <div className={clsx(
        'flex items-center justify-center rounded-lg bg-gray-100 border-2 border-dashed border-gray-300',
        'min-h-[300px] p-8',
        className
      )}>
        <div className="text-center">
          <Play className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Animation will appear here
          </h3>
          <p className="text-sm text-gray-500">
            Upload your code files to generate a Manim animation
          </p>
        </div>
      </div>
    );
  }

  if (!src) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={clsx(
        'bg-black rounded-lg overflow-hidden shadow-lg',
        className
      )}
    >
      {/* Video Container */}
      <div className="relative aspect-video bg-black">
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-contain"
          onClick={togglePlay}
        />
        
        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="bg-white/20 hover:bg-white/30 rounded-full p-4 backdrop-blur-sm transition-colors"
          >
            {isPlaying ? (
              <Pause className="h-8 w-8 text-white" />
            ) : (
              <Play className="h-8 w-8 text-white ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-gray-900 p-4 space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400 min-w-[40px]">
            {formatTime(currentTime)}
          </span>
          
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          
          <span className="text-xs text-gray-400 min-w-[40px]">
            {formatTime(duration)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={togglePlay}
              className="p-2 text-white hover:bg-white/10 rounded-md transition-colors"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>
            
            <button
              onClick={restart}
              className="p-2 text-white hover:bg-white/10 rounded-md transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            
            <span className="text-sm text-gray-300 ml-2">
              {title}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {onDownload && (
              <button
                onClick={onDownload}
                className="p-2 text-white hover:bg-white/10 rounded-md transition-colors"
                title="Download video"
              >
                <Download className="h-4 w-4" />
              </button>
            )}
            
            <button
              onClick={toggleFullscreen}
              className="p-2 text-white hover:bg-white/10 rounded-md transition-colors"
              title="Fullscreen"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
        }
      `}</style>
    </div>
  );
}