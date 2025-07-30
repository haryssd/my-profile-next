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
      <div className="group p-[2px] bg-gradient-to-r from-blue-400 via-gray-500 to-blue-400 bg-[length:200%_100%] animate-gradient rounded-xl transition-all duration-300 hover:scale-[1.02] h-full">
        <div className="bg-[#f7f7f7] hover:bg-[#eeeeee] rounded-[10px] p-6 shadow-sm hover:shadow-lg transition-all duration-300 h-full overflow-hidden relative">
          <div>
            <p className="text-sm text-gray-500 mb-1 font-medium tracking-wider uppercase">
              About Me
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-900 transition-colors duration-300">
              My Story
            </h3>
            <p className="text-md text-gray-600 leading-relaxed mb-6">
              Discover my passion, journey, and what drives me as a developer.
            </p>
          </div>

          <div className="flex justify-end mt-9">
            <button
              onClick={handleOpenDialog}
              className="group/aboutme px-4 py-2 bg-gray-50 hover:bg-gray-900 rounded-lg border border-gray-100 hover:border-blue-900 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm text-gray-600 group-hover/aboutme:text-white transition-colors duration-300">
                  Explore More
                </span>
                <ChevronRight className="w-4 h-4 text-gray-600 group-hover/aboutme:text-white transition-colors duration-300" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <AboutMeDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </>
  );
}

export default AboutMe;
