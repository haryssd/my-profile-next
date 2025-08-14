function StatsCard() {
  return (
    <div className="bg-gray-900 border border-gray-500 rounded-xl shadow-lg hover:shadow-2xl h-full p-4 transition-all duration-300 hover:scale-[1.01]">
      {/* Main Stats Layout  */}
      <div className="grid grid-cols-3 gap-4 h-full">
        {/* Years Experience */}
        <div className="border-2 bg-gray-800/80 hover:bg-gray-700 border-gray-700 rounded-lg p-1 flex items-center justify-center transition-all duration-300 hover:border-blue-400 hover:shadow-md ">
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
        <div className="border-2 bg-gray-800/80 hover:bg-gray-700 border-gray-700 rounded-lg p-1 flex items-center justify-center transition-all duration-300 hover:border-blue-400 hover:shadow-md ">
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold text-white transition-colors duration-300 hover:text-blue-400">
              1+
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-sm font-semibold text-gray-300 leading-tight">
                Projects
              </div>
              <div className="text-xs text-gray-400 mt-1">Built & Deployed</div>
            </div>
          </div>
        </div>

        {/* Tech Skills */}
        <div className="border-2 bg-gray-800/80 hover:bg-gray-700 border-gray-700 rounded-lg p-1 flex items-center justify-center transition-all duration-300 hover:border-blue-400 hover:shadow-md ">
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold text-white transition-colors duration-300 hover:text-blue-400">
              10+
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-sm font-semibold text-gray-300 leading-tight">
                Tech Skills
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Frontend & Backend
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
