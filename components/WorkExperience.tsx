"use client";
import { useState } from "react";
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
  const jobExperiences: JobExperience[] = [
    {
      id: "current",
      title: "Software Engineer",
      company: "Current Position",
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
    console.log("Opening work experience details...");
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
    <div
      className="group p-[2px] bg-gradient-to-r from-blue-400 via-gray-500 to-blue-400 bg-[length:200%_100%] animate-gradient rounded-xl transition-all duration-300 hover:scale-[1.02] h-full cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="bg-white hover:bg-gray-50 rounded-[10px] p-6 shadow-lg hover:shadow-xl w-full h-full transition-all duration-300 relative overflow-hidden">
        {/* Header */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1 font-medium tracking-wider uppercase">
            Professional Journey
          </p>
          <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-900 transition-colors duration-300">
            Work Experience
          </h3>
        </div>

        {/* Experience Preview */}
        <div className="relative ">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 group-hover:from-blue-50 group-hover:to-blue-100 transition-all duration-300">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                  currentJob.isUpcoming ? "bg-gray-400" : "bg-blue-600"
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
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {currentJob.title}
                  </h4>
                  {currentJob.isLatest && !currentJob.isUpcoming && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium">
                      Current
                    </span>
                  )}
                  {currentJob.isUpcoming && (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">
                      Upcoming
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mb-2">
                  {currentJob.company}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
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
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-7 h-7 bg-white shadow-md rounded-full flex items-center justify-center cursor-pointer
                hover:bg-blue-50 hover:shadow-lg active:scale-90 transition-all duration-200 z-10"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-gray-600 hover:text-blue-600 transition-colors duration-200" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-7 h-7 bg-white shadow-md rounded-full flex items-center justify-center cursor-pointer
                hover:bg-blue-50 hover:shadow-lg active:scale-90 transition-all duration-200 z-10"
              >
                <ChevronRight className="w-3.5 h-3.5 text-gray-600 hover:text-blue-600 transition-colors duration-200" />
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
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Experience Summary */}
        <div className="flex items-center justify-end mt-1">
          {/* View Details Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("View Details clicked");
            }}
            className="group/viewdetails px-4 py-2 bg-gray-50 hover:bg-gray-900 rounded-lg border border-gray-100 hover:border-blue-900 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-gray-600 group-hover/viewdetails:text-white transition-colors duration-300">
                View Details
              </span>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover/viewdetails:text-white transition-colors duration-300" />
            </div>
          </button>
        </div>

        {/* Background */}
        <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-tl from-blue-400/10 to-transparent rounded-full transition-all duration-300 group-hover:scale-110"></div>
      </div>
    </div>
  );
}

export default WorkExperience;
