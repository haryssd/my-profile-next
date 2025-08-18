"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import AboutMeDialog from "./AboutMeDialog";

function AboutMe() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="group h-full rounded-xl transition-all duration-300 hover:scale-[1.01]">
        <div className="h-full bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-500 overflow-hidden relative">
          <div className="h-full flex flex-col justify-between relative z-10">
            {/* Title */}
            <div>
              <p className="text-sm text-gray-400 mb-1 font-medium tracking-wider uppercase">
                About Me
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight transition-colors duration-300">
                My Story
              </h3>
              <p className="text-sm sm:text-md text-gray-300 group-hover:text-white leading-relaxed mb-4 sm:mb-6">
                Discover my passion, journey, and what drives me as a developer.
              </p>
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <button
                onClick={handleOpenDialog}
                className="group/aboutme px-4 py-2 sm:px-4 sm:py-2 rounded-lg border-0 sm:border sm:border-gray-600 bg-transparent sm:bg-gray-800/80 hover:bg-gray-700/20 sm:hover:bg-gray-700 transition-all duration-300 hover:scale-[1.03]"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-gray-300 transition-colors duration-300 group-hover/aboutme:text-white">
                    Explore More
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-300 transition-all duration-300 group-hover/aboutme:text-white group-hover/aboutme:translate-x-1" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AboutMeDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </>
  );
}

export default AboutMe;
