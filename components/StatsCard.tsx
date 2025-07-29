function StatsCard() {
  return (
    <div className="group p-[2px] bg-gradient-to-r from-blue-400 via-gray-500 to-blue-400 bg-[length:200%_100%] animate-gradient rounded-xl transition-all duration-300 hover:scale-[1.02] h-full">
      <div className="bg-white hover:bg-gray-50 rounded-[10px] p-2 shadow-lg hover:shadow-xl w-full h-full transition-all duration-300">
        {" "}
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
    </div>
  );
}

export default StatsCard;
