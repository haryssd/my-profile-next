"use client";
import { useEffect, useState, useRef } from "react";
import {
  X,
  Award,
  Calendar,
  ExternalLink,
  CheckCircle,
  BookOpen,
  Code,
  Shield,
  Monitor,
  GitBranch,
} from "lucide-react";

interface CertificatesDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  certificateUrl: string;
  description: string[];
  skills: string[];
  courses: string[];
  duration: string;
  totalCourses: number;
}

function CertificatesDialog({ isOpen, onClose }: CertificatesDialogProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [visibleSections, setVisibleSections] = useState<boolean[]>([]);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const certificates: Certificate[] = [
    {
      id: "ibm-devops",
      name: "IBM DevOps and Software Engineering",
      issuer: "IBM",
      issueDate: "July 15, 2025",
      credentialId: "CQY1IGZNA6F2",
      certificateUrl:
        "https://www.coursera.org/account/accomplishments/professional-cert/CQY1IGZNA6F2",
      description: [
        "Develop a DevOps mindset, practice Agile philosophy & Scrum methodology - essential to succeed in the era of Cloud Native Software Engineering",
        "Build applications composed of microservices and deploy using containers (e.g. Docker, Kubernetes, and OpenShift) & serverless technologies",
        "Create applications using Python language, using various programming constructs and logic, including functions, REST APIs, and libraries",
        "Employ tools for automation, continuous integration (CI) and continuous deployment (CD) including Chef, Puppet, GitHub Actions, Tekton and Travis",
      ],
      skills: [
        "User Story",
        "Continuous Integration",
        "Grafana",
        "Git (Version Control System)",
        "Software Engineering",
        "Gherkin (Scripting Language)",
        "Data Import/Export",
        "Istio",
        "Application Deployment",
        "DevOps",
        "Cloud Computing",
        "Agile Development",
        "Scrum",
        "Linux Commands",
        "Shell Scripting",
        "Python",
        "Flask",
        "Docker",
        "Kubernetes",
        "OpenShift",
        "Microservices",
        "Serverless",
        "Test Driven Development",
        "CI/CD",
        "Application Security",
        "Monitoring",
        "Observability",
      ],
      courses: [
        "Introduction to DevOps",
        "Introduction to Cloud Computing",
        "Introduction to Agile Development and Scrum",
        "Introduction to Software Engineering",
        "Getting Started with Git and GitHub",
        "Hands-on Introduction to Linux Commands and Shell Scripting",
        "Python for Data Science, AI & Development",
        "Developing AI Applications with Python and Flask",
        "Introduction to Containers w/ Docker, Kubernetes & OpenShift",
        "Application Development using Microservices and Serverless",
        "Introduction to Test and Behavior Driven Development",
        "Continuous Integration and Continuous Delivery (CI/CD)",
        "Application Security for Developers and DevOps Professionals",
        "Monitoring and Observability for Development and DevOps",
        "DevOps Capstone Project",
      ],
      duration: "6 months",
      totalCourses: 15,
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

  const getCourseIcon = (courseName: string) => {
    if (courseName.toLowerCase().includes("security"))
      return <Shield className="w-4 h-4" />;
    if (
      courseName.toLowerCase().includes("git") ||
      courseName.toLowerCase().includes("ci/cd")
    )
      return <GitBranch className="w-4 h-4" />;
    if (
      courseName.toLowerCase().includes("monitoring") ||
      courseName.toLowerCase().includes("observability")
    )
      return <Monitor className="w-4 h-4" />;
    if (
      courseName.toLowerCase().includes("python") ||
      courseName.toLowerCase().includes("development")
    )
      return <Code className="w-4 h-4" />;
    return <BookOpen className="w-4 h-4" />;
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
                <Award className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Professional Certifications
                </h2>
                <p className="text-gray-400">
                  Demonstrating expertise and continuous learning
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
            {certificates.map((certificate, index) => (
              <section
                key={certificate.id}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className={`transition-all duration-700 ease-out ${
                  visibleSections[index] ? "opacity-100" : "opacity-30"
                }`}
              >
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:bg-gray-750 transition-all duration-300">
                  {/* Certificate Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Award className="w-6 h-6 text-yellow-400" />
                        <h3 className="text-xl font-bold text-white">
                          {certificate.name}
                        </h3>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="font-medium">Issuer:</span>
                            <span className="text-blue-400 font-medium">
                              {certificate.issuer}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>Issued: {certificate.issueDate}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="font-medium">Credential ID:</span>
                            <span className="text-gray-400 font-mono text-xs">
                              {certificate.credentialId}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="font-medium">Courses:</span>
                            <span className="text-green-400">
                              {certificate.totalCourses} completed
                            </span>
                          </div>
                        </div>
                      </div>

                      <a
                        href={certificate.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300 text-sm font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Certificate
                      </a>
                    </div>
                  </div>

                  {/* Learning Outcomes */}
                  <div className="mb-6">
                    <h4 className="text-gray-300 font-semibold text-sm mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Key Learning Outcomes
                    </h4>
                    <ul className="space-y-3">
                      {certificate.description.map((outcome, outcomeIndex) => (
                        <li
                          key={outcomeIndex}
                          className="flex items-start gap-3 text-sm text-gray-200"
                        >
                          <span className="text-blue-400 mt-1 font-bold">
                            {outcomeIndex + 1}.
                          </span>
                          <span className="leading-relaxed">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Course Curriculum */}
                  <div className="mb-6">
                    <h4 className="text-gray-300 font-semibold text-sm mb-4">
                      Course Curriculum ({certificate.totalCourses} Courses)
                    </h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {certificate.courses.map((course, courseIndex) => (
                        <div
                          key={courseIndex}
                          className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600/50 hover:bg-gray-700/50 transition-colors duration-200"
                        >
                          <div className="text-blue-400 flex-shrink-0">
                            {getCourseIcon(course)}
                          </div>
                          <span className="text-gray-200 text-xs font-medium leading-tight">
                            {course}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills & Technologies */}
                  <div>
                    <h4 className="text-gray-300 font-semibold text-sm mb-3">
                      Skills & Technologies Mastered
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {certificate.skills.map((skill, skillIndex) => (
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

            {/* Future Learning Section */}
            <section
              ref={(el) => {
                sectionRefs.current[certificates.length] = el;
              }}
              className={`transition-all duration-700 ease-out ${
                visibleSections[certificates.length]
                  ? "opacity-100"
                  : "opacity-30"
              }`}
            >
              <div className="bg-gray-800/50 border border-gray-600/50 rounded-xl p-6 border-dashed">
                <div className="text-center">
                  <Award className="w-8 h-8 text-gray-500 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">
                    Continuous Learning Journey
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Always exploring new technologies and expanding expertise.
                    More certifications coming soon!
                  </p>
                </div>
              </div>
            </section>
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
              Committed to lifelong learning and professional development in
              technology!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificatesDialog;
