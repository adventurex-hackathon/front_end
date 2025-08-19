"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render the page if user is not authenticated
  if (!user) {
    return null;
  }

  const handleGenerate = () => {
    if (prompt.trim()) {
      console.log("Generating video for:", prompt);
      // TODO: Implement video generation logic
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Get Started
          </h1>
          <p className="text-muted-foreground text-lg">
            Transform any topic into an engaging educational video
          </p>
        </div>

        {/* Main Input Area */}
        <div className="relative">
          {/* Input Container */}
          <div className="relative bg-card border border-border rounded-xl p-6 shadow-lg">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your topic here... (e.g., 'Explain quantum computing basics' or 'How does machine learning work?')"
              className="w-full min-h-[120px] bg-transparent text-foreground placeholder:text-muted-foreground resize-none border-none outline-none text-base leading-relaxed pb-8"
              style={{ fontSize: "16px" }}
            />
            
            {/* Upload Media Button - Positioned on the left side of the input */}
            <div className="absolute bottom-4 left-4">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full bg-background/80 hover:bg-accent border-border px-3 py-2"
                onClick={() => {
                  // TODO: Implement file upload
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*,video/*,.pdf,.txt,.md';
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      console.log('File selected:', file.name);
                      // TODO: Handle file upload
                    }
                  };
                  input.click();
                }}
              >
                <svg 
                  className="mr-2 size-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                  />
                </svg>
                Upload
              </Button>
            </div>

            {/* Generate Button - Positioned on the bottom border */}
            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2">
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim()}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-3 rounded-full shadow-lg cursor-pointer"
              >
                <span className="mr-2">✦</span>
                Generate
              </Button>
            </div>
          </div>

        </div>

        {/* Quick Examples */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm mb-4">Try these examples:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Explain photosynthesis with animations",
              "How does blockchain work?",
              "Python loops for beginners",
              "The water cycle explained"
            ].map((example, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setPrompt(example)}
                className="text-xs hover:bg-accent"
              >
                {example}
              </Button>
            ))}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-12 text-center text-muted-foreground text-sm">
          <p>
            Powered by advanced AI • Creates videos in seconds • 
            <span className="text-primary font-medium"> 150% better retention</span> for visual learners
          </p>
        </div>
      </div>
    </div>
  );
}
