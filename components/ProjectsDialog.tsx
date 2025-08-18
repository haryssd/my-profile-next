"use client";
import { useEffect, useState, useRef } from "react";
import {
  X,
  Code,
  Github,
  ExternalLink,
  Calendar,
  Star,
  GitBranch,
  Users,
} from "lucide-react";

interface ProjectsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  status: "completed" | "in-progress" | "planned";
  technologies: string[];
  startDate: string;
  endDate?: string;
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
  challenges?: string[];
  learnings?: string[];
  stats?: {
    commits?: number;
    contributors?: number;
    stars?: number;
  };
}

function ProjectsDialog({ isOpen, onClose }: ProjectsDialogProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [visibleSections, setVisibleSections] = useState<boolean[]>([]);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: "portfolio",
      title: "Personal Portfolio Website",
      description: "This modern portfolio website you're currently viewing",
      longDescription:
        "A comprehensive portfolio website built with modern web technologies, featuring a responsive design, dark theme, smooth animations, and interactive components. The site showcases my professional journey, projects, skills, and photography in an engaging and user-friendly interface.",
      status: "completed",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "React",
        "Framer Motion",
        "Lucide Icons",
      ],
      startDate: "July 2025",
      endDate: "August 2025",
      githubUrl: "https://github.com/haryssd/my-profile-next",
      features: [
        "Responsive dark theme design",
        "Interactive card components with hover effects",
        "Smooth scroll animations and transitions",
        "Photography gallery with lightbox view",
        "Professional timeline and experience showcase",
        "SEO optimized and performance focused",
      ],
      stats: {
        contributors: 1,
      },
    },
    {
      id: "upcoming-project",
      title: "Next Amazing Project",
      description: "Something innovative is brewing...",
      longDescription:
        "This space is reserved for my next exciting project. Stay tuned for updates as I continue to explore new technologies and build solutions that make a difference.",
      status: "planned",
      technologies: ["TBD", "React", "Node.js"],
      startDate: "Coming Soon",
      features: [
        "Innovative features to be announced",
        "Cutting-edge technology stack",
        "User-centered design approach",
      ],
    },
  ];

  // Handle escape key press
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

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsAnimating(true));
      });
    } else {
      setIsAnimating(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  // Smooth scroll reveal effect
  useEffect(() => {
    const observerOptions = {
      root: scrollContainerRef.current,
      rootMargin: "-15% 0px -15% 0px",
      threshold: [0, 0.05, 0.1, 0.3, 0.5],
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = sectionRefs.current.findIndex(
          (ref) => ref === entry.target
        );
        if (index !== -1) {
          setVisibleSections((prev) => {
            const newVisible = [...prev];
            newVisible[index] = entry.intersectionRatio > 0.1;
            return newVisible;
          });
        }
      });
    }, observerOptions);

    if (isAnimating && scrollContainerRef.current) {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }

    return () => observer.disconnect();
  }, [isAnimating]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="bg-green-600/20 border border-green-500/30 text-green-400 text-xs px-3 py-1 rounded-full font-medium">
            Completed
          </span>
        );
      case "in-progress":
        return (
          <span className="bg-yellow-600/20 border border-yellow-500/30 text-yellow-400 text-xs px-3 py-1 rounded-full font-medium">
            🚧 In Progress
          </span>
        );
      case "planned":
        return (
          <span className="bg-gray-600/20 border border-gray-500/30 text-gray-400 text-xs px-3 py-1 rounded-full font-medium">
            📋 Planned
          </span>
        );
      default:
        return null;
    }
  };

  const formatDateRange = (startDate: string, endDate?: string) => {
    if (startDate === "Coming Soon") return "Coming Soon";
    if (!endDate) return `${startDate} - Present`;
    if (startDate === endDate) return startDate;
    return `${startDate} - ${endDate}`;
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
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-all duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Dialog */}
      <div
        className={`relative w-full sm:w-[900px] max-w-full mx-4 max-h-[90vh] transition-all duration-300 text-left sm:text-justify transform ${
          isAnimating
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        <div className="bg-gray-900 border border-gray-500 rounded-xl shadow-2xl p-4 sm:p-8">
          {/* Header */}
          <div
            className={`flex items-center justify-between mb-4 sm:mb-8 transition-all duration-500 delay-100 ${
              isAnimating
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 border border-blue-400/30 rounded-lg">
                <Code className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  My Projects
                </h2>
                <p className="text-gray-400">
                  Detailed overview of my development work
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-300 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div
            ref={scrollContainerRef}
            className={`hide-scrollbar space-y-6 sm:space-y-8 max-h-[60vh] overflow-y-auto pr-2 pb-8 transition-all duration-500 delay-200 ${
              isAnimating
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              scrollBehavior: "smooth",
              scrollPaddingBottom: "2rem",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {projects.map((project, index) => (
              <section
                key={project.id}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className={`transition-all duration-700 ease-out ${
                  visibleSections[index] ? "opacity-100" : "opacity-30"
                }`}
              >
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 sm:p-6 hover:bg-gray-750 transition-all duration-300">
                  {/* Project Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3 sm:gap-0">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white">
                          {project.title}
                        </h3>
                        {getStatusBadge(project.status)}
                      </div>
                      <p className="text-gray-300 text-sm mb-3">
                        {project.description}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {formatDateRange(
                              project.startDate,
                              project.endDate
                            )}
                          </span>
                        </div>
                        {project.stats && (
                          <>
                            {project.stats.contributors && (
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                <span>
                                  {project.stats.contributors} contributor
                                  {project.stats.contributors !== 1 ? "s" : ""}
                                </span>
                              </div>
                            )}
                            {project.stats.stars && (
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3" />
                                <span>{project.stats.stars} stars</span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 sm:ml-4 self-start">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-300 text-gray-300 hover:text-white"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-300 text-white"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">
                      About this project
                    </h4>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      {project.longDescription}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-300 mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-blue-900/20 border border-blue-400/30 text-blue-400 text-xs px-3 py-1 rounded-full font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-300 mb-3">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-2 text-sm text-gray-200"
                        >
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Footer */}
          <div
            className={`mt-4 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700 transition-all duration-500 delay-[600ms] ${
              isAnimating
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-center text-gray-400 text-sm">
              More projects coming soon as I continue building and learning!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsDialog;
