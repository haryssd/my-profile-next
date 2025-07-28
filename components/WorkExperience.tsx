function WorkExperience() {
  return (
    <div className="bg-gray-200 p-6 rounded-3xl shadow-lg w-full h-full flex items-center justify-between">
      <div>
        <div className="flex space-x-4 mb-4">
          {/* Code Icon */}
          <div className="text-3xl">👨‍💻</div>
          {/* Cloud Icon */}
          <div className="text-3xl">☁️</div>
          {/* Tool Icon */}
          <div className="text-3xl">🔧</div>
          {/* Laptop Icon */}
          <div className="text-3xl">💻</div>
        </div>
        <p className="text-sm text-gray-600">My Professional Journey</p>
        <h3 className="text-xl font-bold text-gray-900">Work Experience</h3>
      </div>
      <button className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
        <span className="text-lg">+</span>
      </button>
    </div>
  );
}

export default WorkExperience;
