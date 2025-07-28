function Contact() {
  return (
    <div className="bg-gray-200 p-6 rounded-3xl shadow-lg w-full h-full flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Contact</h3>
        <p className="text-sm text-gray-600 mb-2">Let's connect</p>
        <p className="text-lg font-semibold text-gray-900">Get In Touch</p>
      </div>
      <div className="flex justify-end">
        <button className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
          <span className="text-lg">+</span>
        </button>
      </div>
    </div>
  );
}

export default Contact;
