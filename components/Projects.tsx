function Projects() {
  return (
    <div className="bg-gray-200 p-6 rounded-xl shadow-lg w-full h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <div className="text-3xl">💼</div>
          <div className="text-3xl">🚀</div>
          <div className="text-3xl">⚡</div>
        </div>
        <p className="text-sm text-gray-600 mb-1">My Latest Work</p>
        <h3 className="text-xl font-bold text-gray-900">Projects</h3>
      </div>
      <div className="flex justify-end">
        <button className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
          <span className="text-lg">+</span>
        </button>
      </div>
    </div>
  );
}

export default Projects;
