"use client";
import { useState } from "react";
import {
  Code,
  Calendar,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Plus,
  Github,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "planned";
  technologies: string[];
  startDate: string;
  endDate?: string;
  githubUrl?: string;
  liveUrl?: string;
  isLatest: boolean;
  isPlaceholder?: boolean;
}

function Projects() {
  const projects: Project[] = [
    {
      id: "portfolio",
      title: "Personal Portfolio",
      description: "This portfolio website you're viewing",
      status: "completed",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      startDate: "2025",
      endDate: "2025",
      isLatest: true,
    },
    {
      id: "upcoming",
      title: "Next Project",
      description: "Something amazing is coming soon",
      status: "planned",
      technologies: ["TBD"],
      startDate: "TBD",
      isLatest: false,
      isPlaceholder: true,
    },
  ];

  const [currentProjectIndex, setProjectIndex] = useState(0);
  const currentProject = projects[currentProjectIndex];

  const handleCardClick = () => {
    console.log("Opening projects details...");
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProjectIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProjectIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="bg-green-600/20 border border-green-500/30 text-green-400 text-xs px-2 py-0.5 rounded-full font-medium">
            Completed
          </span>
        );
      case "in-progress":
        return (
          <span className="bg-yellow-600/20 border border-yellow-500/30 text-yellow-400 text-xs px-2 py-0.5 rounded-full font-medium">
            In Progress
          </span>
        );
      case "planned":
        return (
          <span className="bg-gray-600/20 border border-gray-500/30 text-gray-400 text-xs px-2 py-0.5 rounded-full font-medium">
            Planned
          </span>
        );
      default:
        return null;
    }
  };

  const formatDateRange = (startDate: string, endDate?: string) => {
    if (startDate === "TBD") return "Coming Soon";
    if (!endDate) return `${startDate} - Present`;
    if (startDate === endDate) return startDate;
    return `${startDate} - ${endDate}`;
  };

  return (
    <div
      className="group relative bg-gray-900 border border-gray-500 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] h-full cursor-pointer p-6"
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="mb-4">
        <p className="text-sm text-gray-400 mb-1 font-medium tracking-wider uppercase">
          My Latest Work
        </p>
        <h3 className="text-2xl font-bold text-white mb-2 leading-tight transition-colors duration-300">
          Projects
        </h3>
      </div>

      {/* Project Preview */}
      <div className="relative">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:bg-gray-750 transition-all duration-300">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                currentProject.isPlaceholder
                  ? "bg-gray-600 hover:bg-gray-500"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {currentProject.isPlaceholder ? (
                <Plus className="w-5 h-5 text-white" />
              ) : (
                <Code className="w-5 h-5 text-white" />
              )}
            </div>

            {/* Project Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-white text-sm">
                  {currentProject.title}
                </h4>
                {getStatusBadge(currentProject.status)}
              </div>
              <p className="text-xs text-gray-300 mb-2">
                {currentProject.description}
              </p>

              {/* Meta Info */}
              {/*
              <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-2">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {formatDateRange(
                      currentProject.startDate,
                      currentProject.endDate
                    )}
                  </span>
                </div>
                {currentProject.githubUrl && (
                  <div className="flex items-center gap-1">
                    <Github className="w-3 h-3" />
                    <span>GitHub</span>
                  </div>
                )}
              </div>
              */}

              {/* Technologies - Always show, even for placeholder projects */}
              <div className="flex flex-wrap gap-1">
                {currentProject.technologies.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                      currentProject.isPlaceholder
                        ? "bg-gray-600/30 border border-gray-500/30 text-gray-400"
                        : "bg-blue-500/20 border border-blue-400/30 text-blue-400"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
                {currentProject.technologies.length > 3 && (
                  <span className="text-xs text-gray-400">
                    +{currentProject.technologies.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {projects.length > 1 && (
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
        {projects.length > 1 && (
          <div className="flex justify-center gap-1 mt-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setProjectIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentProjectIndex
                    ? "bg-blue-500"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Project Summary */}
      <div className="flex items-center justify-end mt-3">
        {/* View Details Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log("View Details clicked");
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

      {/* Code Badge Icon */}
      <div className="absolute top-6 right-6 w-8 h-8 bg-blue-500/20 border border-blue-400/30 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 z-10">
        <Code className="w-4 h-4 text-white" />
      </div>
    </div>
  );
}

export default Projects;
