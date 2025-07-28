export default function ProfileCard() {
  return (
    <div className="bg-gray-200 p-6 rounded-3xl shadow-lg h-full flex gap-4 items-start">
      {/* Profile Image */}
      <div className="flex-shrink-0">
        <img
          src="images/Haris2.jpg"
          alt="Haris Daniel"
          className="rounded-xl w-24 h-32 object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-sm text-gray-500 mb-1">Full-Stack Developer</p>
        <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
          Haris Daniel
          <br />
          Noh
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          I am a developer based in Selangor
        </p>
      </div>
    </div>
  );
}
