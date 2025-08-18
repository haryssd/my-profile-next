"use client";
import { useEffect, useState, useRef } from "react";
import {
  X,
  Briefcase,
  Calendar,
  MapPin,
  Building,
  ChevronRight,
  User,
  Award,
} from "lucide-react";

interface WorkExperienceDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WorkExperience {
  id: string;
  title: string;
  company: string;
  type: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  projects?: {
    name: string;
    details: string[];
  }[];
  skills: string[];
}

function WorkExperienceDialog({ isOpen, onClose }: WorkExperienceDialogProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [visibleSections, setVisibleSections] = useState<boolean[]>([]);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const workExperiences: WorkExperience[] = [
    {
      id: "cibc-current",
      title: "Software Engineer",
      company: "CIBC Technology Sdn Bhd",
      type: "Full-time",
      period: "Feb 2024 - Present",
      location: "Puchong, Selangor",
      description:
        "Maintaining and enhancing enterprise systems while collaborating effectively within development teams to execute tasks and meet project goals.",
      achievements: [
        "Maintained and enhanced the eBuild system, ensuring optimal performance and reliability",
        "Collaborated effectively within the development team, executing tasks to meet project goals",
        "Gained proficiency in project infrastructure, including development/production environments and Firebase services",
        "Contributed to multiple projects, expanding technical skills in new technologies",
      ],
      projects: [
        {
          name: "DBG (Durian Boat Global)",
          details: [
            "Implemented key features using MedusaJS, including authentication pages and password reset functionality",
            "Developed Stripe webhook handlers to manage subscription lifecycles, synchronizing data between Stripe and internal databases",
            "Integrated SendGrid for email notifications, overcoming challenges with TypeScript implementation",
          ],
        },
        {
          name: "PHG",
          details: [
            "Developed Payment Account page and implemented real-time driver tracking using LeafletJS and Firebase Realtime Database",
            "Maintained and improved existing system features, enhancing overall reliability",
          ],
        },
      ],
      skills: [
        "MedusaJS",
        "Stripe API",
        "SendGrid",
        "TypeScript",
        "LeafletJS",
        "Firebase",
        "Vue.js",
      ],
    },
    {
      id: "sutera-stack",
      title: "Software Developer",
      company: "Sutera Stack",
      type: "Freelance Team",
      period: "Jan 2024 - Present",
      location: "Remote",
      description:
        "Contributing to healthcare technology solutions by developing queue management systems for government clinics.",
      achievements: [
        "Contributed to the development of a Queue Management System for Klinik Kesihatan Sungai Air Tawar (Government Clinic)",
        "Utilized Quasar Framework and Firebase for application development",
        "Implemented comprehensive patient management system",
      ],
      projects: [
        {
          name: "Queue Management System",
          details: [
            "Ticket printing system (for patients and reception desk)",
            "Real-time queue display for clinic-wide monitors",
            "Integration with room-specific phone systems for patient calling",
            "Firebase real-time database for live queue updates",
          ],
        },
      ],
      skills: [
        "Quasar Framework",
        "Firebase",
        "Vue.js",
        "Real-time Systems",
        "Healthcare Tech",
      ],
    },
    {
      id: "cibc-intern",
      title: "Software Engineer Intern",
      company: "CIBC Technology Sdn Bhd",
      type: "Internship",
      period: "Aug 2023 - Feb 2024",
      location: "Puchong, Selangor",
      description:
        "Started my professional journey by maintaining and improving enterprise systems while learning full-stack development in an agile environment.",
      achievements: [
        "Maintained and improved eBuild system, resolving production and development bugs",
        "Developed eNquiry module and Membership Rewards Points module",
        "Collaborated with cross-functional teams on requirement gathering and solution design",
        "Gained proficiency in full-stack development, version control, and agile methodologies",
        "Led UI optimization initiatives, enhancing user experience",
      ],
      skills: [
        "Full-stack Development",
        "Bug Resolution",
        "Agile Methodologies",
        "UI/UX",
        "Team Collaboration",
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
      rootMargin: "-20% 0px -20% 0px",
      threshold: [0, 0.1, 0.3, 0.5],
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-blue-600/20 border border-blue-500/30 text-blue-400";
      case "Freelance Team":
        return "bg-purple-600/20 border border-purple-500/30 text-purple-400";
      case "Internship":
        return "bg-green-600/20 border border-green-500/30 text-green-400";
      default:
        return "bg-gray-600/20 border border-gray-500/30 text-gray-400";
    }
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
        className={`relative w-[900px] max-w-full mx-4 max-h-[90vh] transition-all duration-300 text-justify transform ${
          isAnimating
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        <div className="bg-gray-900 border border-gray-500 rounded-xl shadow-2xl p-8">
          {/* Header */}
          <div
            className={`flex items-center justify-between mb-8 transition-all duration-500 delay-100 ${
              isAnimating
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 border border-blue-400/30 rounded-lg">
                <Briefcase className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Work Experience
                </h2>
                <p className="text-gray-400">
                  My professional journey and achievements
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-300 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div
            ref={scrollContainerRef}
            className={`hide-scrollbar space-y-6 max-h-[60vh] overflow-y-auto pr-2 pb-8 transition-all duration-500 delay-200 ${
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
            {/* Professional Summary - Now inside scrollable area */}
            <section
              ref={(el) => {
                sectionRefs.current[0] = el;
              }}
              className={`transition-all duration-700 ease-out ${
                visibleSections[0] ? "opacity-100" : "opacity-30"
              }`}
            >
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">
                    Professional Summary
                  </h3>
                </div>
                <p className="text-gray-200 leading-relaxed text-base">
                  Full-stack Software Engineer with progressive experience in
                  web and mobile development, specializing in JavaScript
                  ecosystems and cloud integration. Proven expertise in
                  implementing complex features including payment processing,
                  real-time tracking, and authentication systems. Committed to
                  continuous learning with focus on DevOps practices and
                  cloud-native technologies, delivering scalable solutions in
                  collaborative environments.
                </p>
              </div>
            </section>

            {workExperiences.map((experience, index) => (
              <section
                key={experience.id}
                ref={(el) => {
                  sectionRefs.current[index + 1] = el; // +1 because summary is now index 0
                }}
                className={`transition-all duration-700 ease-out ${
                  visibleSections[index + 1] ? "opacity-100" : "opacity-30"
                }`}
              >
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300">
                  {/* Experience Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">
                          {experience.title}
                        </h3>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium ${getTypeColor(
                            experience.type
                          )}`}
                        >
                          {experience.type}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-300 mb-2">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-blue-400" />
                          <span className="font-medium">
                            {experience.company}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{experience.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{experience.period}</span>
                      </div>

                      <p className="text-gray-200 text-sm leading-relaxed mb-4">
                        {experience.description}
                      </p>
                    </div>
                  </div>

                  {/* Key Achievements */}
                  <div className="mb-6">
                    <h4 className="text-gray-300 font-semibold text-sm mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-400" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, achIndex) => (
                        <li
                          key={achIndex}
                          className="flex items-start gap-2 text-sm text-gray-200"
                        >
                          <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Projects */}
                  {experience.projects && (
                    <div className="mb-6">
                      <h4 className="text-gray-300 font-semibold text-sm mb-3">
                        Notable Projects
                      </h4>
                      <div className="space-y-4">
                        {experience.projects.map((project, projIndex) => (
                          <div
                            key={projIndex}
                            className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50"
                          >
                            <h5 className="text-white font-medium text-sm mb-2">
                              {project.name}
                            </h5>
                            <ul className="space-y-1">
                              {project.details.map((detail, detailIndex) => (
                                <li
                                  key={detailIndex}
                                  className="flex items-start gap-2 text-xs text-gray-300"
                                >
                                  <span className="text-blue-400 mt-1">•</span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technologies Used */}
                  <div>
                    <h4 className="text-gray-300 font-semibold text-sm mb-3">
                      Technologies & Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-blue-500/20 border border-blue-400/30 text-blue-400 text-xs px-3 py-1 rounded-full font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Footer */}
          <div
            className={`mt-8 pt-6 border-t border-gray-700 transition-all duration-500 delay-[600ms] ${
              isAnimating
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-center text-gray-400 text-sm">
              Continuously growing and taking on new challenges in software
              engineering! 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkExperienceDialog;
