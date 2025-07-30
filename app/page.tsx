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
import SignatureCard from "@/components/SignatureCard";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      {/* Splash Screen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Main Portfolio Content */}
      <div className="min-h-screen bg-black p-8">
        <div className="grid grid-cols-3 gap-6 max-w-9xl mx-auto">
          {/* Row 1 */}
          <div className="row-span-2">
            <ProfileCard />
          </div>
          <div className="col-span-2">
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
