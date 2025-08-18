"use client";
import { useEffect, useState, useRef } from "react";
import { X, Code, Heart, Target, GraduationCap } from "lucide-react";

interface AboutMeDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function AboutMeDialog({ isOpen, onClose }: AboutMeDialogProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [visibleSections, setVisibleSections] = useState<boolean[]>([]);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  // Smooth scroll reveal effect with blur
  useEffect(() => {
    const observerOptions = {
      root: scrollContainerRef.current,
      rootMargin: "-30% 0px -30% 0px", // Less aggressive margins for mobile
      threshold: [0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5], // Lower initial threshold
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = sectionRefs.current.findIndex(
          (ref) => ref === entry.target
        );
        if (index !== -1) {
          setVisibleSections((prev) => {
            const newVisible = [...prev];
            // Section is "active" when it's minimally visible in the center zone
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

  const educationData = [
    {
      school: "Sekolah Kebangsaan Sri Suria 1",
      type: "Primary Education",
      color: "green",
    },
    {
      school: "SMK Dato' Mahmud Paduka Raja (1)",
      type: "Secondary Education",
      color: "blue",
    },
    {
      school: "MARA Junior Science College Kuala Krai",
      type: "Science College",
      color: "purple",
    },
    {
      school: "Perlis Matriculation College",
      type: "Pre-University",
      color: "orange",
    },
    {
      school: "University Tun Hussein Onn Malaysia",
      type: "University",
      color: "red",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: "text-green-400 bg-green-500/20 border-green-400/30",
      blue: "text-blue-400 bg-blue-500/20 border-blue-400/30",
      purple: "text-purple-400 bg-purple-500/20 border-purple-400/30",
      orange: "text-orange-400 bg-orange-500/20 border-orange-400/30",
      red: "text-red-400 bg-red-500/20 border-red-400/30",
    };
    return (
      colorMap[color as keyof typeof colorMap] ||
      "text-gray-400 bg-gray-500/20 border-gray-400/30"
    );
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
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                About Me
              </h2>
              <p className="text-gray-400">Get to know me better</p>
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
            {/* Introduction */}
            <section
              ref={(el) => {
                sectionRefs.current[0] = el;
              }}
              className={`transition-all duration-700 ease-out ${
                visibleSections[0] ? "opacity-100" : "opacity-30"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 border border-blue-400/30 rounded-lg">
                  <Heart className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Who I Am</h3>
              </div>
              <div className="transition-all duration-700 ease-out">
                <p className="text-gray-300 leading-relaxed mb-4">
                  Hey there! I'm{" "}
                  <strong className="text-white">Haris Daniel Bin Noh</strong>,
                  born in Hospital Tanah Merah, Kelantan. I'm the third of four
                  siblings, and honestly, growing up in the kampung shaped so
                  much of who I am today. Life was simple back then, no
                  smartphones, just endless games of hide and seek in the trees,
                  swimming in rivers, and playing football in muddy fields with
                  leeches stuck to our legs. Good times, seriously.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Now I'm based in Klang Valley, KL, chasing my career as a
                  software engineer but those childhood memories in the kampung?
                  Still the best part of me. The simplicity, the quiet moments,
                  they shaped how I see the world. I've always been someone who
                  reflects a lot, not just in my work, but in how I live,
                  observe, and process life around me.
                </p>
              </div>
            </section>

            {/* Education Journey */}
            <section
              ref={(el) => {
                sectionRefs.current[1] = el;
              }}
              className={`transition-all duration-700 ease-out ${
                visibleSections[1] ? "opacity-100" : "opacity-30"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/20 border border-blue-400/30 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  Educational Journey
                </h3>
              </div>
              <div className="transition-all duration-700 ease-out">
                <p className="text-gray-300 leading-relaxed mb-6">
                  My educational path has been quite the adventure, taking me
                  from the humble beginnings in Kelantan all the way to pursuing
                  my passion for technology.
                </p>

                {/* Education Timeline */}
                <div className="transition-all duration-500">
                  <div className="relative pl-8">
                    {/* Vertical Line */}
                    <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-400 via-blue-500 to-gray-600"></div>

                    <div className="space-y-4 sm:space-y-6">
                      {educationData.map((edu, index) => (
                        <div key={index} className="relative">
                          {/* Timeline Dot */}
                          <div className="absolute -left-[1.125rem] top-2 w-4 h-4 bg-blue-500 border-2 border-gray-900 rounded-full shadow-sm"></div>

                          {/* Content Card */}
                          <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 sm:p-4 hover:bg-gray-750 transition-all duration-300 hover:shadow-md ml-2">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-white text-base sm:text-lg">
                                  {edu.school}
                                </h4>
                              </div>
                              <span
                                className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getColorClasses(
                                  edu.color
                                )}`}
                              >
                                {edu.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* What Drives Me */}
            <section
              ref={(el) => {
                sectionRefs.current[2] = el;
              }}
              className={`transition-all duration-700 ease-out ${
                visibleSections[2] ? "opacity-100" : "opacity-30"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 border border-blue-400/30 rounded-lg">
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  What Really Drives Me
                </h3>
              </div>
              <div className="transition-all duration-700 ease-out">
                <p className="text-gray-300 leading-relaxed mb-4">
                  My biggest goal in life? Honestly, it's to help the people who
                  need it the most. I think that all started when I used to
                  watch this show Bersamamu as a kid. It's about people going
                  around kampungs, talking to families going through tough
                  times. I'd sit there watching with my dad, and sometimes we'd
                  just cry quietly together.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  That show really opened my eyes. Since then, I've always
                  carried this feeling that I want to do something meaningful
                  with my life. It's one of the reasons I work hard and aim
                  higher. Not just to "be successful", but so I can actually
                  give back one day and make a difference.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  I've also found that hiking became more than just a hobby for
                  me. It's my reset button. Being up there in the mountains,
                  away from the noise, just surrounded by nature... it gives me
                  space to think, breathe, and feel grounded again. Since I
                  started working, I've made it a promise to myself, at least
                  one mountain every year. It keeps me balanced, reminds me what
                  really matters. And sure, 'Awan Carpet' is nice and all, but
                  nothing beats a quiet night under the stars, just taking it
                  all in.
                </p>
              </div>
            </section>

            {/* Technical Journey */}
            <section
              ref={(el) => {
                sectionRefs.current[3] = el;
              }}
              className={`pb-9 transition-all duration-700 ease-out ${
                visibleSections[3] ? "opacity-100" : "opacity-30"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 border border-blue-400/30 rounded-lg">
                  <Code className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  How It All Started – and Where It's Going
                </h3>
              </div>
              <div className="transition-all duration-700 ease-out">
                <p className="text-gray-300 leading-relaxed mb-4">
                  I've been curious about tech since I was 14, messing around
                  with BackTrack and Kali Linux, exploring ethical hacking just
                  for fun. That curiosity naturally pulled me into the world of
                  software engineering. The best part? That moment when a bug
                  you've been chasing for hours finally clicks, there's no
                  feeling quite like it. And what makes it even more exciting?
                  You're always learning something new. Tech moves fast, so
                  you're constantly picking up new stuff, whether it's a
                  framework, a tool, or just a better way to do things. It keeps
                  things fresh and fun. There's always something cool to
                  explore.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  But it doesn't stop at coding. I'm big on self-growth, both
                  professionally and personally. Just this year (2025), I earned
                  my IBM Software Engineering certificates, built this portfolio
                  site, learned to tread water, gained some serious muscle (from
                  56kg to 75kg) and even climbed Mount Berbabu, which was no
                  joke.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  I'm always looking to improve, whether it's picking up new
                  skills in tech or challenging myself personally. I don't
                  really see success as a final goal. It's more about steady
                  progress and just getting better over time.
                </p>
              </div>
            </section>
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
              Thanks for taking the time to learn about me!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMeDialog;
