"use client";
import { useState, useEffect } from "react";
import {
  Code,
  Database,
  Cloud,
  Settings,
  Smartphone,
  Globe,
  Server,
  GitBranch,
  Box,
  X,
} from "lucide-react";

interface Skill {
  name: string;
  icon: React.ReactNode;
}

function StatsCard() {
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const skills: Skill[] = [
    // Programming Languages
    { name: "JavaScript", icon: <Code className="w-5 h-5" /> },
    { name: "TypeScript", icon: <Code className="w-5 h-5" /> },
    { name: "C#", icon: <Code className="w-5 h-5" /> },
    { name: "Python", icon: <Code className="w-5 h-5" /> },

    // Frontend Technologies
    { name: "Vue.js", icon: <Globe className="w-5 h-5" /> },
    { name: "Quasar Framework", icon: <Smartphone className="w-5 h-5" /> },
    { name: "React Native", icon: <Smartphone className="w-5 h-5" /> },
    { name: "Next.js", icon: <Globe className="w-5 h-5" /> },
    { name: "Tailwind CSS", icon: <Globe className="w-5 h-5" /> },

    // Backend & Services
    { name: "Node.js", icon: <Server className="w-5 h-5" /> },
    { name: "MedusaJS", icon: <Server className="w-5 h-5" /> },

    // Database Systems
    { name: "PostgreSQL", icon: <Database className="w-5 h-5" /> },
    { name: "SQL Workbench", icon: <Database className="w-5 h-5" /> },

    // Development Tools
    { name: "Git", icon: <GitBranch className="w-5 h-5" /> },
    { name: "Bitbucket", icon: <GitBranch className="w-5 h-5" /> },
    { name: "Postman", icon: <Settings className="w-5 h-5" /> },

    // Cloud & DevOps
    { name: "IBM Cloud", icon: <Cloud className="w-5 h-5" /> },
    { name: "Firebase", icon: <Cloud className="w-5 h-5" /> },
    { name: "Microsoft Azure", icon: <Cloud className="w-5 h-5" /> },
    { name: "Docker", icon: <Box className="w-5 h-5" /> },
    { name: "Kubernetes", icon: <Box className="w-5 h-5" /> },
  ];

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (showSkillsModal) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [showSkillsModal]);

  // Handle animation states
  useEffect(() => {
    if (showSkillsModal) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsAnimating(true));
      });
    } else {
      setIsAnimating(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [showSkillsModal]);

  const handleSkillsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSkillsModal(true);
  };

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setShowSkillsModal(false);
    }, 300);
  };

  return (
    <>
      <div className="bg-gray-900 border border-gray-500 rounded-xl shadow-lg hover:shadow-2xl h-full p-4 transition-all duration-300 hover:scale-[1.01]">
        {/* Main Stats Layout  */}
        <div className="grid grid-cols-3 gap-4 h-full">
          {/* Years Experience */}
          <div className="border-2 bg-gray-800/80 hover:bg-gray-700 border-gray-700 rounded-lg p-1 flex items-center justify-center transition-all duration-300 hover:border-blue-400 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-white transition-colors duration-300 hover:text-blue-400">
                1+
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-sm font-semibold text-gray-300 leading-tight">
                  Years Experience
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Software Engineering
                </div>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="border-2 bg-gray-800/80 hover:bg-gray-700 border-gray-700 rounded-lg p-1 flex items-center justify-center transition-all duration-300 hover:border-blue-400 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-white transition-colors duration-300 hover:text-blue-400">
                1+
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-sm font-semibold text-gray-300 leading-tight">
                  Projects
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Built & Deployed
                </div>
              </div>
            </div>
          </div>

          {/* Tech Skills - Clickable */}
          <div
            className="border-2 bg-gray-800/80 hover:bg-gray-700 border-gray-700 rounded-lg p-1 flex items-center justify-center transition-all duration-300 hover:border-blue-400 hover:shadow-md cursor-pointer"
            onClick={handleSkillsClick}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-white transition-colors duration-300 hover:text-blue-400">
                {skills.length}+
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-sm font-semibold text-gray-300 leading-tight">
                  Tech Skills
                </div>
                <div className="text-xs text-gray-400 mt-1">Click to view</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Modal with Smooth Animations */}
      {shouldRender && (
        <div
          className={`fixed inset-0 z-[60] flex items-center justify-center transition-all duration-300 ${
            isAnimating ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-all duration-300 ${
              isAnimating ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div
            className={`relative bg-gray-900 border border-gray-500 rounded-xl shadow-2xl p-6 mx-4 w-full max-w-2xl max-h-[80vh] overflow-hidden transition-all duration-300 transform ${
              isAnimating
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4"
            }`}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between mb-6 transition-all duration-500 delay-100 ${
                isAnimating
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 border border-blue-400/30 rounded-lg">
                  <Code className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Technical Skills
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Technologies I work with
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-300 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Skills Grid */}
            <div
              className={`hide-scrollbar overflow-y-auto max-h-[60vh] transition-all duration-500 delay-200 ${
                isAnimating
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center gap-2 p-4 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-750 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 ${
                      isAnimating
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-8 scale-95"
                    }`}
                    style={{
                      transitionDelay: `${Math.min(index * 50, 800)}ms`,
                    }}
                  >
                    <div className="text-blue-400">{skill.icon}</div>
                    <span className="text-gray-200 text-sm font-medium text-center">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div
              className={`mt-6 pt-4 border-t border-gray-700 text-center transition-all duration-500 delay-300 ${
                isAnimating
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-gray-400 text-sm">
                Always learning and exploring new technologies! 🚀
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default StatsCard;
