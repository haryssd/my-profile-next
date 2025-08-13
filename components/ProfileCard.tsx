"use client";

import { Meteors } from "./ui/meteors";

export default function ProfileCard() {
  return (
    <div className="  rounded-xl transition-all duration-300 hover:scale-[1.01] h-full">
      <div className="bg-gray-900 hover:bg-gray-800 rounded-[10px] p-6 shadow-lg hover:shadow-2xl transition-all duration-300 h-full overflow-hidden relative">
        {/* Meteor Background */}
        <Meteors number={15} className="opacity-20" />

        {/* Header Section */}
        <div className="flex gap-4 items-start mb-6 relative z-10">
          {/* Profile Image */}
          <div className="flex-shrink-0 relative">
            <img
              src="images/Haris2.jpg"
              alt="Haris Daniel"
              className="rounded-2xl w-35 h-40 object-cover shadow-lg group-hover:shadow-2xl transition-shadow duration-300 ring-2 ring-gray-700"
            />
            {/* Online Status Indicator */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900 shadow-lg"></div>
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <p className="text-sm text-gray-400 mb-1 font-medium tracking-wider uppercase">
              Full-Stack Developer
            </p>
            <h2 className="text-3xl font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors duration-300">
              Haris Daniel Noh
            </h2>
            <p className="text-md text-gray-300 leading-relaxed">
              I am a developer based in Selangor
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-700 relative z-10"></div>

        {/* Social Links Section */}
        <div className="mt-5 relative z-10">
          <div className="flex space-x-3">
            {/* GitHub */}
            <a
              href="https://github.com/haryssd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gray-800 hover:bg-gray-100 p-3 rounded-xl transition-all duration-300 hover:scale-105 group/social border border-gray-700 hover:border-gray-300"
            >
              <div className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gray-400 group-hover/social:text-gray-900 transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/harisdanielnoh/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gray-800 hover:bg-blue-600 p-3 rounded-xl transition-all duration-300 hover:scale-105 group/social border border-gray-700 hover:border-blue-600"
            >
              <div className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gray-400 group-hover/social:text-white transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/haryssd/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 p-3 rounded-xl transition-all duration-300 hover:scale-105 group/social border border-gray-700 hover:border-transparent"
            >
              <div className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gray-400 group-hover/social:text-white transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
