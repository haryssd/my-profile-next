"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    // Ensure body starts with black background and no scroll
    document.body.style.backgroundColor = "black";
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    // Add class to show main content and enable scrolling
    document.body.classList.add("splash-complete");
  };

  return (
    <>
      {/* Splash Screen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Main Portfolio Content */}
      <div className="main-content min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-stone-700 p-8">
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
    </>
  );
}
