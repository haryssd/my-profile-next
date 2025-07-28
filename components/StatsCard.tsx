import React from "react";

function StatsCard() {
  return (
    <div className="bg-gray-200 p-6 rounded-3xl shadow-lg w-full h-full">
      <div className="grid grid-cols-3 gap-4 h-full">
        <div className="bg-gray-400 rounded-2xl p-4 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-gray-900">1+</div>
          <div className="text-xs text-gray-700 text-center">
            Years Experience
          </div>
        </div>
        <div className="bg-gray-400 rounded-2xl p-4 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-gray-900">10+</div>
          <div className="text-xs text-gray-700 text-center">Tech Skills</div>
        </div>
        <div className="bg-gray-400 rounded-2xl p-4 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-gray-900">1+</div>
          <div className="text-xs text-gray-700 text-center">
            Major Projects
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
