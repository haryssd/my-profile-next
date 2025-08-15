"use client";

import { useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import Tagline from "@/components/Tagline";
import MusicPlayer from "@/components/MusicPlayer";
import StatsCard from "@/components/StatsCard";
import WorkExperience from "@/components/WorkExperience";
import Certificates from "@/components/Certificates";
import Projects from "@/components/Projects";
import { SplashScreen } from "@/components/SplashScreen";
import AboutMe from "@/components/AboutMe";
import ThroughMyLens from "@/components/ThroughMyLens";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSplashComplete = () => {
    setIsTransitioning(true);
    setShowSplash(false);

    // Smooth transition to main content
    setTimeout(() => {
      document.body.classList.add("splash-complete");
      setIsTransitioning(false);
    }, 100);
  };

  return (
    <>
      {/* Splash Screen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Transition overlay */}
      {isTransitioning && (
        <div
          className="fixed inset-0 z-40 bg-black animate-fade-out"
          style={{ animation: "fadeOut 500ms ease-out forwards" }}
        />
      )}

      {/* Main Portfolio Content */}
      <div
        className={`main-content min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-stone-700 p-8 transition-all duration-500 ${
          !showSplash && !isTransitioning
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <div className="grid grid-cols-3 gap-6 max-w-9xl mx-auto">
          {/* Row 1 */}
          <div className="row-span-2">
            <ProfileCard />
          </div>
          <div className="col-span-2">
            <Tagline />
          </div>

          <div>
            <AboutMe />
          </div>
          <div>
            <MusicPlayer />
          </div>
          <div className="col-span-1">
            <WorkExperience />
          </div>
          <div>
            <Projects />
          </div>
          <div>
            <Certificates />
          </div>
          <div className="col-span-2">
            <StatsCard />
          </div>
          <div>
            <ThroughMyLens />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
