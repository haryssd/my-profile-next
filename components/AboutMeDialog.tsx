"use client";
import { useEffect, useState } from "react";
import { X, Code, Heart, Target, Lightbulb } from "lucide-react";

interface AboutMeDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function AboutMeDialog({ isOpen, onClose }: AboutMeDialogProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Dialog */}
      <div
        className={`relative w-[1000px] max-w-full mx-4 max-h-[90vh] overflow-y-auto transition-all duration-300 transform ${
          isAnimating
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        <div className="p-[2px] bg-gradient-to-r from-blue-400 via-gray-500 to-blue-400 bg-[length:200%_100%] animate-gradient rounded-xl">
          <div className="bg-white rounded-[10px] p-8 shadow-lg">
            {/* Header */}
            <div
              className={`flex items-center justify-between mb-8 transition-all duration-500 delay-100 ${
                isAnimating
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  About Me
                </h2>
                <p className="text-gray-600">Get to know me better</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-8">
              {/* Introduction */}
              <section
                className={`transition-all duration-500 delay-200 ${
                  isAnimating
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Heart className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Who I Am
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  I'm a passionate full-stack developer with a love for creating
                  beautiful, functional web applications. My journey in tech
                  started with curiosity and has evolved into a deep commitment
                  to crafting exceptional digital experiences. I believe in the
                  power of clean code, thoughtful design, and continuous
                  learning.
                </p>
              </section>

              {/* What Drives Me */}
              <section
                className={`transition-all duration-500 delay-300 ${
                  isAnimating
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    What Drives Me
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  I'm motivated by the challenge of solving complex problems and
                  the satisfaction of seeing ideas come to life through code.
                  Every project is an opportunity to learn something new, push
                  boundaries, and create something meaningful that makes a
                  positive impact on users' lives.
                </p>
              </section>

              {/* Technical Philosophy */}
              <section
                className={`transition-all duration-500 delay-[400ms] ${
                  isAnimating
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Code className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    My Approach
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  I believe in writing clean, maintainable code that stands the
                  test of time. My approach combines modern development
                  practices with user-centered design principles. I'm always
                  exploring new technologies while maintaining a focus on
                  performance, accessibility, and user experience.
                </p>
              </section>

              {/* Future Goals */}
              <section
                className={`transition-all duration-500 delay-500 ${
                  isAnimating
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Looking Forward
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  I'm excited about the future of web development and emerging
                  technologies. My goal is to continue growing as a developer,
                  contribute to meaningful projects, and help build the next
                  generation of web applications that make the world a better
                  place.
                </p>
              </section>
            </div>

            {/* Footer */}
            <div
              className={`mt-8 pt-6 border-t border-gray-200 transition-all duration-500 delay-[600ms] ${
                isAnimating
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-center text-gray-500 text-sm">
                Thanks for taking the time to learn about me!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMeDialog;
