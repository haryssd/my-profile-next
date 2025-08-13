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
        className="group p-[2px] bg-gradient-to-r from-blue-400 via-gray-500 to-blue-400 bg-[length:200%_100%] animate-gradient rounded-xl transition-all duration-300 hover:scale-[1.02] h-full cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="bg-white hover:bg-gray-50 rounded-[10px] p-4 shadow-lg hover:shadow-xl w-full h-full transition-all duration-300 relative overflow-hidden">
          {/* Main Content Layout */}
          <div className="flex items-center justify-between h-full">
            {/* Left: Text Content */}
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-medium tracking-wider uppercase mb-1">
                Photography
              </p>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-900 transition-colors duration-300 mb-2">
                Through My Lens
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Nature • Mountains • Skies
              </p>
            </div>

            {/* Visual Element */}
            <div className="flex flex-col items-center gap-2 ml-4">
              {/* Camera Icon */}
              <div className="w-10 h-10 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-gray-200 group-hover:border-gray-300">
                <Camera className="w-5 h-5 text-gray-600 group-hover:text-gray-700 transition-colors duration-300" />
              </div>

              {/* Clickable Indicator Arrow */}
              <div className="w-5 h-5 bg-gray-100 group-hover:bg-gray-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-gray-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </div>
            </div>
          </div>

          {/* Subtle hover indication - background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/0 to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

          {/* Corner shine effect */}
          <div className="absolute top-2 right-2 w-2 h-2 bg-gray-400/20 rounded-full group-hover:scale-150 group-hover:bg-gray-400/40 transition-all duration-300"></div>
        </div>
      </div>
      <ThroughMyLensDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </>
  );
}

export default ThroughMyLens;
