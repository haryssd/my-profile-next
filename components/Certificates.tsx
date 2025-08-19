"use client";
import { useState, useRef } from "react";
import CertificatesDialog from "./CertificatesDialog";
import {
  Award,
  Calendar,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Plus,
} from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  completedDate: string;
  expiryDate: string | null; // null means no expiry
  credentialId?: string;
  isLatest: boolean;
  isUpcoming?: boolean;
}

function Certificates() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const certificates: Certificate[] = [
    {
      id: "ibm-software-engineering",
      title: "IBM Software Engineering",
      issuer: "IBM",
      completedDate: "2025",
      expiryDate: null,
      credentialId: "SE2025001",
      isLatest: true,
    },
    {
      id: "upcoming",
      title: "Next Certification",
      issuer: "In Progress",
      completedDate: "TBD",
      expiryDate: null,
      isLatest: false,
      isUpcoming: true,
    },
  ];

  const [currentCertIndex, setCertIndex] = useState(0);
  const currentCert = certificates[currentCertIndex];

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCertIndex((prev) => (prev > 0 ? prev - 1 : certificates.length - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCertIndex((prev) => (prev < certificates.length - 1 ? prev + 1 : 0));
  };

  const formatDate = (date: string) => {
    if (date === "TBD") return "TBD";
    return `Completed ${date}`;
  };

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && certificates.length > 1) {
      // Swipe left
      goToNext({} as React.MouseEvent);
    }
    if (isRightSwipe && certificates.length > 1) {
      // Swipe right
      goToPrevious({} as React.MouseEvent);
    }
  };

  return (
    <>
      <div className="group relative bg-gray-900 border border-gray-500 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] h-full cursor-pointer p-4 sm:p-6">
        {" "}
        {/* Header */}
        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-1 font-medium tracking-wider uppercase">
            Growing with me
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight transition-colors duration-300">
            Certificates
          </h3>
        </div>
        {/* Certificate Preview */}
        <div className="relative">
          <div
            className="bg-gray-800 border border-gray-700 rounded-xl p-3 sm:p-4 hover:bg-gray-750 transition-all duration-300"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex items-start gap-2 sm:gap-3">
              {/* Icon */}
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                  currentCert.isUpcoming
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {currentCert.isUpcoming ? (
                  <Plus className="w-5 h-5 text-white" />
                ) : (
                  <Award className="w-5 h-5 text-white" />
                )}
              </div>

              {/* Certificate Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-white text-xs sm:text-sm">
                    {currentCert.title}
                  </h4>
                  {currentCert.isLatest && !currentCert.isUpcoming && (
                    <span className="bg-green-600/20 border border-green-500/30 text-green-400 text-xs px-2 py-0.5 rounded-full font-medium">
                      Latest
                    </span>
                  )}
                  {currentCert.isUpcoming && (
                    <span className="bg-gray-600/20 border border-gray-500/30 text-gray-400 text-xs px-2 py-0.5 rounded-full font-medium">
                      In Progress
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-300 mb-2">
                  {currentCert.issuer}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-2 sm:gap-3 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(currentCert.completedDate)}</span>
                  </div>
                  {currentCert.credentialId && !currentCert.isUpcoming && (
                    <div className="flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      <span>ID: {currentCert.credentialId}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {certificates.length > 1 && (
            <div className="hidden sm:block">
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
            </div>
          )}

          {/* Dots Indicator */}
          {certificates.length > 1 && (
            <div className="flex justify-center gap-1 mt-2">
              {certificates.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCertIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentCertIndex
                      ? "bg-blue-500"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          )}

          {certificates.length > 1 && (
            <div className="flex sm:hidden justify-center mt-3 mb-2">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <span> Swipe to navigate </span>
              </p>
            </div>
          )}
        </div>
        {/* Certificate Summary */}
        <div className="flex items-center justify-end mt-3">
          {/* View Details Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsDialogOpen(true);
            }}
            className="group/viewdetails px-6 py-3 sm:px-4 sm:py-2 bg-transparent sm:bg-gray-800/80 rounded-lg border-0 sm:border sm:border-gray-600 hover:bg-gray-700/20 sm:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-base sm:text-sm text-gray-300 transition-colors duration-300 group-hover/viewdetails:text-white">
                View Details
              </span>
              <ChevronRight className="w-4 h-4 text-gray-300 transition-all duration-300 group-hover/viewdetails:text-white group-hover/viewdetails:translate-x-1" />
            </div>
          </button>
        </div>
        {/* Certificate Badge Icon */}
        <div className="absolute top-6 right-6 w-8 h-8 bg-blue-500/20 border border-blue-400/30 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 z-10">
          <Award className="w-4 h-4 text-white" />
        </div>
      </div>
      <CertificatesDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </>
  );
}

export default Certificates;
