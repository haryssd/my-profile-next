function WorkExperience() {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl w-full h-full flex items-center justify-between transition-all duration-300 hover:scale-[1.02] border border-gray-100 hover:border-gray-200 group">
      <div>
        <div className="flex space-x-4 mb-4">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300">
            <div className="w-4 h-4 bg-gray-400 rounded group-hover:bg-blue-600 transition-colors duration-300"></div>
          </div>
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300">
            <div className="w-4 h-4 bg-gray-400 rounded group-hover:bg-blue-600 transition-colors duration-300"></div>
          </div>
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300">
            <div className="w-4 h-4 bg-gray-400 rounded group-hover:bg-blue-600 transition-colors duration-300"></div>
          </div>
        </div>
        <p className="text-sm text-gray-500 font-medium tracking-wide">
          My Professional Journey
        </p>
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors duration-300">
          Work Experience
        </h3>
      </div>
      <button className="bg-gray-900 hover:bg-blue-900 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg">
        <span className="text-lg">+</span>
      </button>
    </div>
  );
}

export default WorkExperience;
