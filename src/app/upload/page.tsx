"use client";

import { Button } from "~/components/ui/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/primitives/card";
import { Input } from "~/components/ui/primitives/input";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Loader2,
  Play,
  Send,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const Upload = () => {
  const [input, setInput] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setError("");
    setVideoUrl("");

    try {
      const response = await fetch(
        "https://tuna-main-lacewing.ngrok-free.app/capitalize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: input }),
        },
      );

      if (!response.ok) {
        // Handle error response (JSON)
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate video");
      }

      // Get the video blob
      const videoBlob = await response.blob();
      const url = URL.createObjectURL(videoBlob);
      setVideoUrl(url);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to process your request. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Learn Anything
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            100x your learning experience with highly engaging videos. Enter
            your prompt and let the magic happen!
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          {/* Input Card */}
          <Card className="mb-8 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                What do you want to learn?
              </CardTitle>
              <CardDescription>
                Type or paste your text below and click submit to generate a
                video.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="text-input"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Input
                </label>
                <Input
                  id="text-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your topic here..."
                  className="h-12 text-base"
                  disabled={isLoading}
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!input.trim() || isLoading}
                className="h-12 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-base font-semibold shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Video...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" />
                    Generate Video
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Result Card */}
          {(videoUrl || error) && (
            <Card
              className={`shadow-xl transition-all duration-300 ${
                error
                  ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
                  : "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
              }`}
            >
              <CardHeader>
                <div className="flex items-center space-x-2">
                  {error ? (
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  )}
                  <CardTitle
                    className={
                      error
                        ? "text-red-800 dark:text-red-200"
                        : "text-green-800 dark:text-green-200"
                    }
                  >
                    {error ? "Error" : "Generated Video"}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {error ? (
                  <p className="text-red-700 dark:text-red-300">{error}</p>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                      <video
                        controls
                        className="w-full rounded-lg"
                        style={{ maxHeight: "400px" }}
                      >
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>

                    {/* Download button */}
                    <Button
                      variant="outline"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = videoUrl;
                        link.download = "generated-video.mp4";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="w-full"
                    >
                      Download Video
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                AI Generated
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Advanced AI creates engaging educational videos
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                <Play className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Visual Learning
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Learn through animations and visual explanations
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Instant Results
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Get your video in seconds with voice narration
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
