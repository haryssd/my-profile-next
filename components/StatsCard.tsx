function StatsCard() {
  return (
    <div className="bg-white rounded-xl p-2 shadow-lg hover:shadow-xl w-full h-full transition-all duration-300 hover:scale-[1.02] border border-gray-100 hover:border-gray-200 group">
      <div className="grid grid-cols-3 gap-6 h-full">
        <div className="bg-gray-50 hover:bg-blue-50 rounded-2xl m-3 flex flex-col items-center justify-center transition-all duration-300 hover:scale-100 border border-gray-100 group-hover:border-blue-200">
          <div className="text-xl font-bold text-gray-900 mb-1">1+</div>
          <div className="text-xs text-gray-500 text-center font-medium tracking-wide leading-tight">
            Years Experience
          </div>
        </div>
        <div className="bg-gray-50 hover:bg-blue-50 rounded-2xl m-3 flex flex-col items-center justify-center transition-all duration-300 hover:scale-100 border border-gray-100 group-hover:border-blue-200">
          <div className="text-xl font-bold text-gray-900 mb-1">10+</div>
          <div className="text-xs text-gray-500 text-center font-medium tracking-wide leading-tight">
            Tech Skills
          </div>
        </div>
        <div className="bg-gray-50 hover:bg-blue-50 rounded-2xl m-3 flex flex-col items-center justify-center transition-all duration-300 hover:scale-100 border border-gray-100 group-hover:border-blue-200">
          <div className="text-xl font-bold text-gray-900 mb-1">1+</div>
          <div className="text-xs text-gray-500 text-center font-medium tracking-wide leading-tight">
            Major Projects
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
