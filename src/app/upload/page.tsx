// "use client";

// import CodeViewer from "~/components/ui/CodeViewer";
// import ErrorState from "~/components/ui/ErrorState";
// import FileUpload from "~/components/ui/FileUpload";
// import LoadingState from "~/components/ui/LoadingState";
// import VideoPlayer from "~/components/ui/VideoPlayer";
// import { Code, MessageCircle, Moon, Play, Sparkles, Sun } from "lucide-react";
// import Head from "next/head";
// import Image from "next/image";
// import { useState } from "react";

// type ProcessingStage =
//   | "idle"
//   | "analyzing"
//   | "generating"
//   | "rendering"
//   | "complete"
//   | "error";

// interface ProcessingState {
//   stage: ProcessingStage;
//   progress?: number;
//   message?: string;
//   error?: {
//     type:
//       | "upload"
//       | "analysis"
//       | "generation"
//       | "rendering"
//       | "network"
//       | "general";
//     title?: string;
//     message: string;
//     details?: string;
//   };
// }

// export default function Home() {
//   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
//   const [userQuestion, setUserQuestion] = useState<string>("");
//   const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
//   const [processingState, setProcessingState] = useState<ProcessingState>({
//     stage: "idle",
//   });
//   const [generatedVideo, setGeneratedVideo] = useState<string | undefined>();
//   const [generatedCode, setGeneratedCode] = useState<string | undefined>();

//   const handleFilesSelect = (files: File[]) => {
//     setUploadedFiles(files);
//     setProcessingState({ stage: "idle" });
//     setGeneratedVideo(undefined);
//     setGeneratedCode(undefined);
//     // Don't reset question when files change, user might want to keep it
//   };

//   const handleSubmit = async () => {
//     if (uploadedFiles.length === 0) return;

//     try {
//       // Simulate the processing pipeline
//       // In a real app, this would call your backend API
//       // Backend would receive: uploadedFiles + userQuestion

//       // Stage 1: Analyzing
//       setProcessingState({
//         stage: "analyzing",
//         progress: 0,
//         message: "Reading and understanding your code structure...",
//       });

//       await simulateDelay(2000);
//       setProcessingState({
//         stage: "analyzing",
//         progress: 30,
//         message: "Identifying key logic patterns...",
//       });

//       await simulateDelay(1500);

//       // Stage 2: Generating
//       setProcessingState({
//         stage: "generating",
//         progress: 40,
//         message: "Creating Manim animation script...",
//       });

//       await simulateDelay(2000);
//       setProcessingState({
//         stage: "generating",
//         progress: 70,
//         message: "Optimizing visualization approach...",
//       });

//       await simulateDelay(1000);

//       // Stage 3: Rendering
//       setProcessingState({
//         stage: "rendering",
//         progress: 80,
//         message: "Executing Manim script...",
//       });

//       await simulateDelay(2000);
//       setProcessingState({
//         stage: "rendering",
//         progress: 95,
//         message: "Finalizing video output...",
//       });

//       await simulateDelay(1000);

//       // Simulate generated content
//       const sampleCode = generateSampleManimCode(
//         uploadedFiles[0]?.name ?? "code.py",
//         userQuestion,
//       );
//       // const sampleVideo = '/path/to/sample/video.mp4'; // This would be the actual video URL

//       setGeneratedCode(sampleCode);
//       // setGeneratedVideo(sampleVideo); // Uncomment when you have actual video

//       setProcessingState({
//         stage: "complete",
//         progress: 100,
//         message: "Your animation is ready!",
//       });
//     } catch (error) {
//       console.error("Processing failed:", error);
//       setProcessingState({
//         stage: "error",
//         error: {
//           type: "general",
//           message: "Failed to process your code files",
//           details:
//             error instanceof Error ? error.message : "Unknown error occurred",
//         },
//       });
//     }
//   };

//   const handleRetry = () => {
//     void handleSubmit();
//   };

//   const handleReset = () => {
//     setUploadedFiles([]);
//     setUserQuestion("");
//     setProcessingState({ stage: "idle" });
//     setGeneratedVideo(undefined);
//     setGeneratedCode(undefined);
//   };

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const simulateDelay = (ms: number) =>
//     new Promise((resolve) => setTimeout(resolve, ms));

//   const generateSampleManimCode = (fileName: string, question?: string) => {
//     return `from manim import *

// class CodeExplanation(Scene):
//     def construct(self):
//         # Title
//         title = Text("Code Explanation: ${fileName ?? "code.py"}", font_size=48)
//         title.to_edge(UP)
//         self.play(Write(title))
//         self.wait(1)

//         # User Question${question ? `\n        question = Text("${question}", font_size=24, color=YELLOW)\n        question.next_to(title, DOWN, buff=0.5)\n        self.play(Write(question))\n        self.wait(1)` : ""}

//         # Main code visualization
//         code_block = Code(
//             code='''
// def example_function(data):
//     result = []
//     for item in data:
//         if item > 0:
//             result.append(item * 2)
//     return result
//             ''',
//             tab_width=4,
//             background_color=DARK_GRAY,
//             language="Python",
//         ).scale(0.7)

//         self.play(Create(code_block))
//         self.wait(2)

//         # Flow diagram
//         flow_title = Text("Execution Flow", font_size=36)
//         flow_title.next_to(code_block, DOWN, buff=1)
//         self.play(Write(flow_title))

//         # Create flow elements
//         start = Circle(radius=0.5, color=GREEN)
//         start_text = Text("Start", font_size=20).move_to(start)

//         loop = Rectangle(width=2, height=1, color=BLUE)
//         loop_text = Text("For Loop", font_size=16).move_to(loop)

//         condition = Diamond(side_length=1.5, color=YELLOW)
//         condition_text = Text("item > 0?", font_size=14).move_to(condition)

//         process = Rectangle(width=2, height=1, color=ORANGE)
//         process_text = Text("item * 2", font_size=16).move_to(process)

//         end = Circle(radius=0.5, color=RED)
//         end_text = Text("End", font_size=20).move_to(end)

//         # Position elements
//         start.shift(LEFT * 4 + DOWN * 2)
//         start_text.shift(LEFT * 4 + DOWN * 2)

//         loop.next_to(start, RIGHT, buff=1)
//         loop_text.move_to(loop)

//         condition.next_to(loop, RIGHT, buff=1)
//         condition_text.move_to(condition)

//         process.next_to(condition, DOWN, buff=1)
//         process_text.move_to(process)

//         end.next_to(condition, RIGHT, buff=1)
//         end_text.move_to(end)

//         # Animate flow
//         flow_elements = [
//             start, start_text, loop, loop_text,
//             condition, condition_text, process, process_text,
//             end, end_text
//         ]

//         self.play(*[Create(element) for element in flow_elements])
//         self.wait(1)

//         # Add arrows
//         arrows = [
//             Arrow(start.get_right(), loop.get_left()),
//             Arrow(loop.get_right(), condition.get_left()),
//             Arrow(condition.get_bottom(), process.get_top()),
//             Arrow(process.get_right(), loop.get_bottom()),
//             Arrow(condition.get_right(), end.get_left()),
//         ]

//         for arrow in arrows:
//             self.play(Create(arrow), run_time=0.5)

//         self.wait(2)

//         # Final message
//         summary = Text("This code filters positive numbers and doubles them",
//                       font_size=24, color=WHITE)
//         summary.to_edge(DOWN)
//         self.play(Write(summary))
//         self.wait(3)`;
//   };

//   const isProcessing = ["analyzing", "generating", "rendering"].includes(
//     processingState.stage,
//   );
//   const canSubmit = uploadedFiles.length > 0 && !isProcessing;

//   return (
//     <>
//       <Head>
//         <title>Visocode - Visualize Your Code</title>
//         <meta
//           name="description"
//           content="Transform your code into visual explanations using Manim animations"
//         />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <div
//         className={`min-h-screen transition-colors duration-300 ${
//           isDarkMode
//             ? "bg-gradient-to-br from-gray-900 to-gray-800"
//             : "bg-gradient-to-br from-slate-50 to-blue-50"
//         }`}
//       >
//         {/* Header */}
//         <header
//           className={`sticky top-0 z-50 border-b backdrop-blur-sm transition-colors duration-300 ${
//             isDarkMode
//               ? "border-gray-700 bg-gray-900/80"
//               : "border-gray-200 bg-white/80"
//           }`}
//         >
//           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//             <div className="flex h-16 items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <div className="flex h-10 w-10 items-center justify-center">
//                   <Image
//                     src={
//                       isDarkMode
//                         ? "/visocode_logo_white.png"
//                         : "/visocode_logo_black.png"
//                     }
//                     alt="Visocode Logo"
//                     width={40}
//                     height={40}
//                     className="rounded transition-opacity duration-300"
//                   />
//                 </div>
//                 <div>
//                   <h1
//                     className={`text-xl font-bold transition-colors duration-300 ${
//                       isDarkMode ? "text-white" : "text-gray-900"
//                     }`}
//                   >
//                     Visocode
//                   </h1>
//                   <p
//                     className={`text-sm transition-colors duration-300 ${
//                       isDarkMode ? "text-gray-300" : "text-gray-500"
//                     }`}
//                   >
//                     Code to Visualization
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-4">
//                 <div
//                   className={`flex items-center space-x-4 text-sm transition-colors duration-300 ${
//                     isDarkMode ? "text-gray-300" : "text-gray-600"
//                   }`}
//                 >
//                   <div className="flex items-center space-x-1">
//                     <Code className="h-4 w-4" />
//                     <span>Upload Code</span>
//                   </div>
//                   <span
//                     className={`transition-colors duration-300 ${
//                       isDarkMode ? "text-gray-500" : "text-gray-300"
//                     }`}
//                   >
//                     →
//                   </span>
//                   <div className="flex items-center space-x-1">
//                     <Sparkles className="h-4 w-4" />
//                     <span>AI Analysis</span>
//                   </div>
//                   <span
//                     className={`transition-colors duration-300 ${
//                       isDarkMode ? "text-gray-500" : "text-gray-300"
//                     }`}
//                   >
//                     →
//                   </span>
//                   <div className="flex items-center space-x-1">
//                     <Play className="h-4 w-4" />
//                     <span>Animation</span>
//                   </div>
//                 </div>

//                 {/* Theme Toggle */}
//                 <button
//                   onClick={toggleTheme}
//                   className={`rounded-lg p-2 transition-colors duration-300 ${
//                     isDarkMode
//                       ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
//                       : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                   }`}
//                   title={
//                     isDarkMode ? "Switch to light mode" : "Switch to dark mode"
//                   }
//                 >
//                   {isDarkMode ? (
//                     <Sun className="h-5 w-5" />
//                   ) : (
//                     <Moon className="h-5 w-5" />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </header>

//         <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//             {/* Left Panel - File Upload */}
//             <div className="space-y-4">
//               <div>
//                 <h2
//                   className={`mb-2 text-2xl font-bold transition-colors duration-300 ${
//                     isDarkMode ? "text-white" : "text-gray-900"
//                   }`}
//                 >
//                   Upload Your Code
//                 </h2>
//                 <p
//                   className={`mb-4 transition-colors duration-300 ${
//                     isDarkMode ? "text-gray-300" : "text-gray-600"
//                   }`}
//                 >
//                   Drop your code files here and we&apos;ll create a visual
//                   explanation using Manim animations.
//                 </p>

//                 <FileUpload
//                   onFilesSelect={handleFilesSelect}
//                   disabled={isProcessing}
//                   isDarkMode={isDarkMode}
//                 />

//                 {/* Question Input */}
//                 <div className="mt-4">
//                   <div className="mb-2 flex items-center space-x-2">
//                     <MessageCircle
//                       className={`h-5 w-5 transition-colors duration-300 ${
//                         isDarkMode ? "text-gray-400" : "text-gray-500"
//                       }`}
//                     />
//                     <label
//                       htmlFor="userQuestion"
//                       className={`text-lg font-medium transition-colors duration-300 ${
//                         isDarkMode ? "text-gray-200" : "text-gray-700"
//                       }`}
//                     >
//                       What do you want to understand about this code?
//                     </label>
//                   </div>
//                   <input
//                     id="userQuestion"
//                     type="text"
//                     value={userQuestion}
//                     onChange={(e) => setUserQuestion(e.target.value)}
//                     placeholder="E.g. Show me how the state changes over time"
//                     disabled={isProcessing}
//                     className={`w-full rounded-lg border px-3 py-1.5 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed ${
//                       isDarkMode
//                         ? "border-gray-600 bg-gray-800 text-gray-100 placeholder-gray-400 disabled:bg-gray-700"
//                         : "border-gray-300 bg-white text-gray-700 placeholder-gray-400 disabled:bg-gray-100"
//                     }`}
//                   />
//                 </div>
//               </div>

//               {uploadedFiles.length > 0 && (
//                 <div className="mt-4 flex justify-center">
//                   <button
//                     onClick={handleSubmit}
//                     disabled={!canSubmit}
//                     className={`inline-flex transform items-center space-x-3 rounded-xl px-6 py-3 text-base font-semibold text-white transition-all duration-200 hover:scale-105 ${
//                       canSubmit
//                         ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
//                         : "cursor-not-allowed bg-gray-400"
//                     } `}
//                   >
//                     <Sparkles className="h-4 w-4" />
//                     <span>Generate Animation</span>
//                   </button>
//                 </div>
//               )}

//               {/* Code Viewer */}
//               {generatedCode && (
//                 <CodeViewer
//                   code={generatedCode}
//                   title="Generated Manim Code"
//                   fileName={`${uploadedFiles[0]?.name.split(".")[0] ?? "animation"}_explanation.py`}
//                 />
//               )}
//             </div>

//             {/* Right Panel - Results */}
//             <div className="space-y-4">
//               <h2
//                 className={`text-2xl font-bold transition-colors duration-300 ${
//                   isDarkMode ? "text-white" : "text-gray-900"
//                 }`}
//               >
//                 Animation Result
//               </h2>

//               {/* Show different states based on processing stage */}
//               {processingState.stage === "idle" && (
//                 <VideoPlayer placeholder={true} className="min-h-[400px]" />
//               )}

//               {isProcessing && (
//                 <LoadingState
//                   stage={
//                     processingState.stage as
//                       | "analyzing"
//                       | "generating"
//                       | "rendering"
//                       | "complete"
//                   }
//                   progress={processingState.progress}
//                   message={processingState.message}
//                   className="min-h-[400px]"
//                 />
//               )}

//               {processingState.stage === "complete" && !generatedVideo && (
//                 <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-green-300 bg-green-50 p-8">
//                   <div className="text-center">
//                     <div className="mx-auto mb-4 h-16 w-16 text-green-500">
//                       <Sparkles className="h-full w-full" />
//                     </div>
//                     <h3 className="mb-2 text-lg font-medium text-green-700">
//                       Processing Complete!
//                     </h3>
//                     <p className="mb-4 text-sm text-green-600">
//                       Your Manim code has been generated successfully. In a full
//                       implementation, the rendered animation would appear here.
//                     </p>
//                     <div className="rounded bg-green-100 px-3 py-1 text-xs text-green-500">
//                       Check the generated code in the left panel
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {processingState.stage === "complete" && generatedVideo && (
//                 <VideoPlayer
//                   src={generatedVideo}
//                   title="Code Explanation Animation"
//                   onDownload={() => {
//                     // Handle video download
//                     console.log("Download video");
//                   }}
//                 />
//               )}

//               {processingState.stage === "error" && processingState.error && (
//                 <ErrorState
//                   type={processingState.error.type}
//                   title={processingState.error.title}
//                   message={processingState.error.message}
//                   details={processingState.error.details}
//                   onRetry={handleRetry}
//                   onReset={handleReset}
//                   className="min-h-[400px]"
//                 />
//               )}
//             </div>
//           </div>

//           {/* Footer */}
//           <footer
//             className={`mt-12 border-t py-6 transition-colors duration-300 ${
//               isDarkMode ? "border-gray-700" : "border-gray-200"
//             }`}
//           >
//             <div
//               className={`text-center transition-colors duration-300 ${
//                 isDarkMode ? "text-gray-400" : "text-gray-500"
//               }`}
//             >
//               <p className="mb-2">
//                 Built for vibe coders who want to understand their AI-generated
//                 code
//               </p>
//               <p className="text-sm">
//                 Supports Python, JavaScript, TypeScript, HTML, CSS, and many
//                 other formats
//               </p>
//             </div>
//           </footer>
//         </main>
//       </div>
//     </>
//   );
// }

const Upload = () => {
  return <input />;
};

export default Upload;
