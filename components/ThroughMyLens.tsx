"use client";
import { useState } from "react";
import { Camera, ArrowUpRight } from "lucide-react";
import ThroughMyLensDialog from "./ThroughMyLensDialog";

function ThroughMyLens() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div
        className="group bg-gray-900 border border-gray-500 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] h-full cursor-pointer p-4"
        onClick={handleCardClick}
      >
        <div className="relative overflow-hidden h-full">
          {/* Main Content Layout */}
          <div className="flex items-center justify-between h-full">
            {/* Left: Text Content */}
            <div className="flex-1">
              <p className="text-xs text-gray-400 font-medium tracking-wider uppercase mb-1">
                Photography
              </p>
              <h3 className="text-lg font-bold text-white transition-colors duration-300 mb-2">
                Through My Lens
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Nature • Mountains • Skies
              </p>
            </div>

            {/* Visual Element */}
            <div className="flex flex-col items-center gap-2 ml-4">
              {/* Camera Icon */}
              <div className="w-10 h-10 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 group-hover:bg-blue-500/20 group-hover:border-blue-400/30">
                <Camera className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors duration-300" />
              </div>

              {/* Clickable Indicator Arrow */}
              <div className="w-5 h-5 bg-gray-800 border border-gray-600 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500 transition-all duration-300">
                <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </div>
            </div>
          </div>

          {/* Subtle hover indication - background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"></div>

          {/* Corner shine effect */}
          <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400/20 rounded-full group-hover:scale-150 group-hover:bg-blue-400/40 transition-all duration-300"></div>
        </div>
      </div>
      <ThroughMyLensDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </>
  );
}

export default ThroughMyLens;
