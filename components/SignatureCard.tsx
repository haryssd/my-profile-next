function SignatureCard() {
  return (
    <div className="group bg-[#f7f7f7] hover:bg-[#eeeeee] border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] h-full flex flex-col justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1 font-medium tracking-wider uppercase">
          About Me
        </p>
        <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-900 transition-colors duration-300">
          My Story
        </h3>
        <p className="text-md text-gray-600 leading-relaxed">
          Discover my passion, journey, and what drives me as a developer.
        </p>
      </div>
      <div className="flex justify-end mt-5">
        {/* <button
          onClick={onOpen}
          aria-label="Open About Me Dialog"
          className="bg-gray-900 hover:bg-blue-900 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
        >
          <span className="text-lg leading-none">+</span>
        </button> */}
      </div>
    </div>
  );
}

export default SignatureCard;
