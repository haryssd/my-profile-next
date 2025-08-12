function StatsCard() {
  return (
    <div className="p-[2px] bg-gradient-to-r from-blue-400 via-gray-500 to-blue-400 bg-[length:200%_100%] animate-gradient rounded-xl h-full">
      <div className="bg-white rounded-[10px] p-4 shadow-lg w-full h-full transition-all duration-300">
        {/* Main Stats Layout  */}
        <div className="grid grid-cols-3 gap-4 h-full">
          {/* Years Experience */}
          <div className="border-2 border-gray-200 rounded-lg p-1 flex items-center justify-center transition-all duration-300 hover:border-blue-300 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-gray-900 transition-colors duration-300 hover:text-blue-900">
                1+
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-sm font-semibold text-gray-700 leading-tight">
                  Years Experience
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Software Engineering
                </div>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="border-2 border-gray-200 rounded-lg p-1 flex items-center justify-center transition-all duration-300 hover:border-blue-300 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-gray-900 transition-colors duration-300 hover:text-blue-900">
                1+
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-sm font-semibold text-gray-700 leading-tight">
                  Projects
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Built & Deployed
                </div>
              </div>
            </div>
          </div>

          {/* Tech Skills */}
          <div className="border-2 border-gray-200 rounded-lg p-1 flex items-center justify-center transition-all duration-300 hover:border-blue-300 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-gray-900 transition-colors duration-300 hover:text-blue-900">
                10+
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-sm font-semibold text-gray-700 leading-tight">
                  Tech Skills
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Frontend & Backend
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
