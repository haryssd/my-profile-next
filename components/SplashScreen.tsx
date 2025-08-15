"use client";

import { useEffect, useState } from "react";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { Vortex } from "./ui/vortex";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const words =
    "Crafting digital experiences. Building the future. One line of code at a time.";

  useEffect(() => {
    // Start fade out after 5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
      setIsClosing(true);
    }, 5000);

    // Complete after 6 seconds (longer to allow for smooth transition)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 6000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-1000 ease-in-out ${
        isClosing
          ? "opacity-0 scale-110 blur-sm"
          : "opacity-100 scale-100 blur-0"
      }`}
    >
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={400}
        baseHue={160}
        className="flex items-center flex-col justify-center px-4 md:px-10 py-4 w-full h-full"
      >
        <div
          className={`text-center space-y-8 transition-all duration-1000 delay-100 ${
            isClosing
              ? "opacity-0 translate-y-8 scale-95"
              : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          {/* Logo/Name */}
          <div className="space-y-2">
            <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight">
              Haris Daniel Noh
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          {/* Animated description */}
          <div className="max-w-4xl mx-auto">
            <div className="text-white [&_*]:!text-white">
              <TextGenerateEffect
                words={words}
                className="text-xl md:text-2xl text-center font-light !text-white"
              />
            </div>
          </div>

          {/* Role */}
          <p className="text-gray-300 text-lg md:text-xl font-medium">
            Full-Stack Software Engineer
          </p>
        </div>

        {/* Progress indicator */}
        <div
          className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-200 ${
            isClosing ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          <div className="flex items-center space-x-2 text-white/60">
            <div className="w-8 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"
                style={{ animation: "progress 3s linear forwards" }}
              ></div>
            </div>
            <span className="text-sm">Loading portfolio...</span>
          </div>
        </div>
      </Vortex>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
