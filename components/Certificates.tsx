function Certificates() {
  return (
    <div className="bg-gray-200 p-6 rounded-xl shadow-lg w-full h-full flex flex-col justify-between">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-6xl">🏆</div>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-1">Growing with me</p>
        <h3 className="text-xl font-bold text-gray-900">Certificates</h3>
      </div>
      <div className="flex justify-end mt-4">
        <button className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
          <span className="text-lg">+</span>
        </button>
      </div>
    </div>
  );
}

export default Certificates;
