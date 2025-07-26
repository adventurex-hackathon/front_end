import { useState } from 'react';
import Head from "next/head";
import { Sparkles, Code, Play, MessageCircle } from 'lucide-react';

import FileUpload from '../components/ui/FileUpload';
import VideoPlayer from '../components/ui/VideoPlayer';
import CodeViewer from '../components/ui/CodeViewer';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';

type ProcessingStage = 'idle' | 'analyzing' | 'generating' | 'rendering' | 'complete' | 'error';

interface ProcessingState {
  stage: ProcessingStage;
  progress?: number;
  message?: string;
  error?: {
    type: 'upload' | 'analysis' | 'generation' | 'rendering' | 'network' | 'general';
    title?: string;
    message: string;
    details?: string;
  };
}

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [processingState, setProcessingState] = useState<ProcessingState>({ stage: 'idle' });
  const [generatedVideo, setGeneratedVideo] = useState<string | undefined>();
  const [generatedCode, setGeneratedCode] = useState<string | undefined>();

  const handleFilesSelect = (files: File[]) => {
    setUploadedFiles(files);
    setProcessingState({ stage: 'idle' });
    setGeneratedVideo(undefined);
    setGeneratedCode(undefined);
    // Don't reset question when files change, user might want to keep it
  };

  const handleSubmit = async () => {
    if (uploadedFiles.length === 0) return;

    try {
      // Simulate the processing pipeline
      // In a real app, this would call your backend API
      // Backend would receive: uploadedFiles + userQuestion

      // Stage 1: Analyzing
      setProcessingState({ 
        stage: 'analyzing', 
        progress: 0,
        message: 'Reading and understanding your code structure...' 
      });
      
      await simulateDelay(2000);
      setProcessingState({ 
        stage: 'analyzing', 
        progress: 30,
        message: 'Identifying key logic patterns...' 
      });
      
      await simulateDelay(1500);

      // Stage 2: Generating
      setProcessingState({ 
        stage: 'generating', 
        progress: 40,
        message: 'Creating Manim animation script...' 
      });
      
      await simulateDelay(2000);
      setProcessingState({ 
        stage: 'generating', 
        progress: 70,
        message: 'Optimizing visualization approach...' 
      });
      
      await simulateDelay(1000);

      // Stage 3: Rendering
      setProcessingState({ 
        stage: 'rendering', 
        progress: 80,
        message: 'Executing Manim script...' 
      });
      
      await simulateDelay(2000);
      setProcessingState({ 
        stage: 'rendering', 
        progress: 95,
        message: 'Finalizing video output...' 
      });
      
      await simulateDelay(1000);

      // Simulate generated content
      const sampleCode = generateSampleManimCode(uploadedFiles[0]?.name ?? 'code.py', userQuestion);
      // const sampleVideo = '/path/to/sample/video.mp4'; // This would be the actual video URL

      setGeneratedCode(sampleCode);
      // setGeneratedVideo(sampleVideo); // Uncomment when you have actual video
      
      setProcessingState({ 
        stage: 'complete', 
        progress: 100,
        message: 'Your animation is ready!' 
      });

    } catch (error) {
      console.error('Processing failed:', error);
      setProcessingState({
        stage: 'error',
        error: {
          type: 'general',
          message: 'Failed to process your code files',
          details: error instanceof Error ? error.message : 'Unknown error occurred'
        }
      });
    }
  };

  const handleRetry = () => {
    void handleSubmit();
  };

  const handleReset = () => {
    setUploadedFiles([]);
    setUserQuestion('');
    setProcessingState({ stage: 'idle' });
    setGeneratedVideo(undefined);
    setGeneratedCode(undefined);
  };

  const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const generateSampleManimCode = (fileName: string, question?: string) => {
    return `from manim import *

class CodeExplanation(Scene):
    def construct(self):
        # Title
        title = Text("Code Explanation: ${fileName ?? 'code.py'}", font_size=48)
        title.to_edge(UP)
        self.play(Write(title))
        self.wait(1)
        
        # User Question${question ? `\n        question = Text("${question}", font_size=24, color=YELLOW)\n        question.next_to(title, DOWN, buff=0.5)\n        self.play(Write(question))\n        self.wait(1)` : ''}
        
        # Main code visualization
        code_block = Code(
            code='''
def example_function(data):
    result = []
    for item in data:
        if item > 0:
            result.append(item * 2)
    return result
            ''',
            tab_width=4,
            background_color=DARK_GRAY,
            language="Python",
        ).scale(0.7)
        
        self.play(Create(code_block))
        self.wait(2)
        
        # Flow diagram
        flow_title = Text("Execution Flow", font_size=36)
        flow_title.next_to(code_block, DOWN, buff=1)
        self.play(Write(flow_title))
        
        # Create flow elements
        start = Circle(radius=0.5, color=GREEN)
        start_text = Text("Start", font_size=20).move_to(start)
        
        loop = Rectangle(width=2, height=1, color=BLUE)
        loop_text = Text("For Loop", font_size=16).move_to(loop)
        
        condition = Diamond(side_length=1.5, color=YELLOW)
        condition_text = Text("item > 0?", font_size=14).move_to(condition)
        
        process = Rectangle(width=2, height=1, color=ORANGE)
        process_text = Text("item * 2", font_size=16).move_to(process)
        
        end = Circle(radius=0.5, color=RED)
        end_text = Text("End", font_size=20).move_to(end)
        
        # Position elements
        start.shift(LEFT * 4 + DOWN * 2)
        start_text.shift(LEFT * 4 + DOWN * 2)
        
        loop.next_to(start, RIGHT, buff=1)
        loop_text.move_to(loop)
        
        condition.next_to(loop, RIGHT, buff=1)
        condition_text.move_to(condition)
        
        process.next_to(condition, DOWN, buff=1)
        process_text.move_to(process)
        
        end.next_to(condition, RIGHT, buff=1)
        end_text.move_to(end)
        
        # Animate flow
        flow_elements = [
            start, start_text, loop, loop_text,
            condition, condition_text, process, process_text,
            end, end_text
        ]
        
        self.play(*[Create(element) for element in flow_elements])
        self.wait(1)
        
        # Add arrows
        arrows = [
            Arrow(start.get_right(), loop.get_left()),
            Arrow(loop.get_right(), condition.get_left()),
            Arrow(condition.get_bottom(), process.get_top()),
            Arrow(process.get_right(), loop.get_bottom()),
            Arrow(condition.get_right(), end.get_left()),
        ]
        
        for arrow in arrows:
            self.play(Create(arrow), run_time=0.5)
        
        self.wait(2)
        
        # Final message
        summary = Text("This code filters positive numbers and doubles them", 
                      font_size=24, color=WHITE)
        summary.to_edge(DOWN)
        self.play(Write(summary))
        self.wait(3)`;
  };

  const isProcessing = ['analyzing', 'generating', 'rendering'].includes(processingState.stage);
  const canSubmit = uploadedFiles.length > 0 && !isProcessing;

  return (
    <>
      <Head>
        <title>Manim Explainer - Visualize Your Code</title>
        <meta name="description" content="Transform your code into visual explanations using Manim animations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Manim Explainer</h1>
                  <p className="text-sm text-gray-500">Code to Visualization</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Code className="h-4 w-4" />
                  <span>Upload Code</span>
                </div>
                <span className="text-gray-300">→</span>
                <div className="flex items-center space-x-1">
                  <Sparkles className="h-4 w-4" />
                  <span>AI Analysis</span>
                </div>
                <span className="text-gray-300">→</span>
                <div className="flex items-center space-x-1">
                  <Play className="h-4 w-4" />
                  <span>Animation</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Panel - File Upload */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Upload Your Code
                </h2>
                <p className="text-gray-600 mb-6">
                  Drop your code files here and we&apos;ll create a visual explanation using Manim animations.
                </p>
                
                <FileUpload
                  onFilesSelect={handleFilesSelect}
                  disabled={isProcessing}
                />
                
                {/* Question Input */}
                <div className="mt-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <MessageCircle className="h-5 w-5 text-gray-500" />
                    <label htmlFor="userQuestion" className="text-lg font-medium text-gray-700">
                      What do you want to understand about this code?
                    </label>
                  </div>
                  <input
                    id="userQuestion"
                    type="text"
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    placeholder="E.g. Show me how the state changes over time"
                    disabled={isProcessing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="flex justify-center">
                  <button
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    className={`
                      inline-flex items-center space-x-3 px-8 py-4 rounded-xl text-white font-semibold text-lg
                      transition-all duration-200 transform hover:scale-105
                      ${canSubmit 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl' 
                        : 'bg-gray-400 cursor-not-allowed'
                      }
                    `}
                  >
                    <Sparkles className="h-5 w-5" />
                    <span>Generate Animation</span>
                  </button>
                </div>
              )}

              {/* Code Viewer */}
              {generatedCode && (
                <CodeViewer 
                  code={generatedCode}
                  title="Generated Manim Code"
                  fileName={`${uploadedFiles[0]?.name.split('.')[0] ?? 'animation'}_explanation.py`}
                />
              )}
            </div>

            {/* Right Panel - Results */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Animation Result
              </h2>

              {/* Show different states based on processing stage */}
              {processingState.stage === 'idle' && (
                <VideoPlayer 
                  placeholder={true}
                  className="min-h-[400px]"
                />
              )}

              {isProcessing && (
                <LoadingState
                  stage={processingState.stage as 'analyzing' | 'generating' | 'rendering' | 'complete'}
                  progress={processingState.progress}
                  message={processingState.message}
                  className="min-h-[400px]"
                />
              )}

              {processingState.stage === 'complete' && !generatedVideo && (
                <div className="rounded-lg border-2 border-dashed border-green-300 bg-green-50 p-8 min-h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto h-16 w-16 text-green-500 mb-4">
                      <Sparkles className="h-full w-full" />
                    </div>
                    <h3 className="text-lg font-medium text-green-700 mb-2">
                      Processing Complete!
                    </h3>
                    <p className="text-sm text-green-600 mb-4">
                      Your Manim code has been generated successfully. In a full implementation, 
                      the rendered animation would appear here.
                    </p>
                    <div className="text-xs text-green-500 bg-green-100 px-3 py-1 rounded">
                      Check the generated code in the left panel
                    </div>
                  </div>
                </div>
              )}

              {processingState.stage === 'complete' && generatedVideo && (
                <VideoPlayer
                  src={generatedVideo}
                  title="Code Explanation Animation"
                  onDownload={() => {
                    // Handle video download
                    console.log('Download video');
                  }}
                />
              )}

              {processingState.stage === 'error' && processingState.error && (
                <ErrorState
                  type={processingState.error.type}
                  title={processingState.error.title}
                  message={processingState.error.message}
                  details={processingState.error.details}
                  onRetry={handleRetry}
                  onReset={handleReset}
                  className="min-h-[400px]"
                />
              )}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-16 py-8 border-t border-gray-200">
            <div className="text-center text-gray-500">
              <p className="mb-2">
                Built for vibe coders who want to understand their AI-generated code
              </p>
              <p className="text-sm">
                Supports Python, JavaScript, TypeScript, HTML, CSS, and many other formats
              </p>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}