"use client";
import { useState } from "react";
import WorkExperienceDialog from "./WorkExperienceDialog";
import {
  Briefcase,
  Calendar,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Plus,
} from "lucide-react";

interface JobExperience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string | null; // null means current
  location: string;
  isLatest: boolean;
  isUpcoming?: boolean;
}

function WorkExperience() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const jobExperiences: JobExperience[] = [
    {
      id: "current",
      title: "Software Engineer",
      company: "CIBC Technology Sdn Bhd",
      startDate: "2024",
      endDate: null,
      location: "Puchong, Selangor",
      isLatest: true,
    },
    {
      id: "upcoming",
      title: "Future Opportunity",
      company: "Upcoming",
      startDate: "TBD",
      endDate: null,
      location: "Stay tuned",
      isLatest: false,
      isUpcoming: true,
    },
  ];

  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const currentJob = jobExperiences[currentJobIndex];

  const handleCardClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentJobIndex((prev) =>
      prev > 0 ? prev - 1 : jobExperiences.length - 1
    );
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentJobIndex((prev) =>
      prev < jobExperiences.length - 1 ? prev + 1 : 0
    );
  };

  const formatDateRange = (startDate: string, endDate: string | null) => {
    if (!endDate) return `${startDate} - Present`;
    return `${startDate} - ${endDate}`;
  };

  return (
    <>
      <div
        className="group relative bg-gray-900 border border-gray-500 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] h-full cursor-pointer p-6"
        onClick={handleCardClick}
      >
        {/* Header */}
        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-1 font-medium tracking-wider uppercase">
            Professional Journey
          </p>
          <h3 className="text-2xl font-bold text-white mb-2 leading-tight  transition-colors duration-300">
            Work Experience
          </h3>
        </div>

        {/* Experience Preview */}
        <div className="relative">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:bg-gray-750 transition-all duration-300">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                  currentJob.isUpcoming
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {currentJob.isUpcoming ? (
                  <Plus className="w-5 h-5 text-white" />
                ) : (
                  <Briefcase className="w-5 h-5 text-white" />
                )}
              </div>

              {/* Job Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-white text-sm">
                    {currentJob.title}
                  </h4>
                  {currentJob.isLatest && !currentJob.isUpcoming && (
                    <span className="bg-green-600/20 border border-green-500/30 text-green-400 text-xs px-2 py-0.5 rounded-full font-medium">
                      Current
                    </span>
                  )}
                  {currentJob.isUpcoming && (
                    <span className="bg-gray-600/20 border border-gray-500/30 text-gray-400 text-xs px-2 py-0.5 rounded-full font-medium">
                      Upcoming
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-300 mb-2">
                  {currentJob.company}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {formatDateRange(
                        currentJob.startDate,
                        currentJob.endDate
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{currentJob.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {jobExperiences.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="group/nav absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-7 h-7 bg-gray-800 hover:bg-blue-500 shadow-md rounded-full flex items-center justify-center cursor-pointer border border-gray-600 hover:border-blue-400 hover:shadow-lg active:scale-90 transition-all duration-300 z-10"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-gray-300 group-hover/nav:text-white transition-colors duration-300" />
              </button>

              <button
                onClick={goToNext}
                className="group/nav absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-7 h-7 bg-gray-800 hover:bg-blue-500 shadow-md rounded-full flex items-center justify-center cursor-pointer border border-gray-600 hover:border-blue-400 hover:shadow-lg active:scale-90 transition-all duration-300 z-10"
              >
                <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover/nav:text-white transition-colors duration-300" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {jobExperiences.length > 1 && (
            <div className="flex justify-center gap-1 mt-2">
              {jobExperiences.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentJobIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentJobIndex
                      ? "bg-blue-500"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Experience Summary */}
        <div className="flex items-center justify-end mt-3">
          {/* View Details Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsDialogOpen(true);
            }}
            className="group/viewdetails px-4 py-2 bg-gray-800/80 rounded-lg border border-gray-600 hover:bg-gray-700 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-gray-300 transition-colors duration-300 group-hover/viewdetails:text-white">
                View Details
              </span>
              <ChevronRight className="w-4 h-4 text-gray-300 transition-all duration-300 group-hover/viewdetails:text-white group-hover/viewdetails:translate-x-1" />
            </div>
          </button>
        </div>

        {/* Briefcase Badge Icon */}
        <div className="absolute top-6 right-6 w-8 h-8 bg-blue-500/20 border border-blue-400/30 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 z-10">
          <Briefcase className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Add the dialog component */}
      <WorkExperienceDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </>
  );
}

export default WorkExperience;
