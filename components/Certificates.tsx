function Certificates() {
  return (
    <div className="group p-[2px] bg-gradient-to-r from-blue-400 via-gray-500 to-blue-400 bg-[length:200%_100%] animate-gradient rounded-3xl transition-all duration-300 hover:scale-[1.02] h-full">
      <div className="bg-white hover:bg-gray-50 rounded-[22px] p-6 shadow-lg hover:shadow-xl w-full h-full flex flex-col justify-between transition-all duration-300">
        {" "}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300">
            <div className="w-8 h-8 bg-gray-400 rounded-lg group-hover:bg-blue-600 transition-colors duration-300"></div>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-2 font-medium tracking-wide">
            Growing with me
          </p>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors duration-300">
            Certificates
          </h3>
        </div>
        <div className="flex justify-end mt-4">
          <button className="bg-gray-900 hover:bg-blue-900 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg">
            <span className="text-lg">+</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Certificates;
