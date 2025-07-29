"use client";

import { useEffect, useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import Tagline from "@/components/Tagline";
import MusicPlayer from "@/components/MusicPlayer";
import StatsCard from "@/components/StatsCard";
import WorkExperience from "@/components/WorkExperience";
import Certificates from "@/components/Certificates";
import Projects from "@/components/Projects";
import { SplashScreen } from "@/components/SplashScreen";
import SignatureCard from "@/components/SignatureCard";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [showTagline, setShowTagline] = useState(false);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // After splash ends, trigger tagline fade-in after 100ms
  useEffect(() => {
    if (!showSplash) {
      const timer = setTimeout(() => {
        setShowTagline(true);
      }, 100); // Can increase delay for longer pause
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  return (
    <>
      {/* Splash Screen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Main Portfolio Content */}
      <div
        className={`min-h-screen bg-black p-8 transition-all duration-500 ${
          showSplash ? "blur-sm opacity-50" : "blur-none opacity-100"
        }`}
      >
        <div className="grid grid-cols-3 gap-6 max-w-9xl mx-auto">
          {/* Row 1 */}
          <div className="row-span-2">
            <ProfileCard />
          </div>
          <div
            className={`col-span-2 transition-opacity duration-1000 ${
              showTagline ? "opacity-100" : "opacity-0"
            }`}
          >
            <Tagline />
          </div>

          <div>
            <SignatureCard />
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
        </div>
      </div>
    </>
  );
}
