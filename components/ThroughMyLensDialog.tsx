"use client";
import { useEffect, useState } from "react";
import {
  X,
  Camera,
  Mountain,
  Trees,
  CloudSun,
  Eye,
  Heart,
  ZoomIn,
} from "lucide-react";

interface ThroughMyLensDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Photo {
  id: string;
  src: string;
  title: string;
  category: "mountains" | "nature" | "skies";
  description: string;
  icon: React.ReactNode;
}

function ThroughMyLensDialog({ isOpen, onClose }: ThroughMyLensDialogProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [filter, setFilter] = useState<
    "all" | "mountains" | "nature" | "skies"
  >("all");

  // Your photo collection with categorization
  const photos: Photo[] = [
    {
      id: "img1",
      src: "/images/IMG_0185.jpg",
      title: "Mountain Vista",
      category: "mountains",
      description: "Breathtaking view from the summit",
      icon: <Mountain className="w-4 h-4" />,
    },
    {
      id: "img2",
      src: "/images/IMG_0977.JPG",
      title: "Golden Hour",
      category: "skies",
      description: "Perfect light painting the sky",
      icon: <CloudSun className="w-4 h-4" />,
    },
    {
      id: "img3",
      src: "/images/IMG_1088.JPG",
      title: "Forest Path",
      category: "nature",
      description: "Wandering through nature",
      icon: <Trees className="w-4 h-4" />,
    },
    {
      id: "img4",
      src: "/images/IMG_3488.heic",
      title: "Peak Serenity",
      category: "mountains",
      description: "Quiet moments at altitude",
      icon: <Mountain className="w-4 h-4" />,
    },
    {
      id: "img5",
      src: "/images/IMG_3897.HEIC",
      title: "Nature's Canvas",
      category: "nature",
      description: "Colors beyond imagination",
      icon: <Trees className="w-4 h-4" />,
    },
    {
      id: "img6",
      src: "/images/IMG_3906.HEIC",
      title: "Sky Dreams",
      category: "skies",
      description: "When clouds tell stories",
      icon: <CloudSun className="w-4 h-4" />,
    },
    {
      id: "img7",
      src: "/images/IMG_4082.heic",
      title: "Summit Sunrise",
      category: "mountains",
      description: "First light on the peaks",
      icon: <Mountain className="w-4 h-4" />,
    },
    {
      id: "img8",
      src: "/images/IMG_5139.HEIC",
      title: "Wild Beauty",
      category: "nature",
      description: "Untamed natural wonder",
      icon: <Trees className="w-4 h-4" />,
    },
    {
      id: "img9",
      src: "/images/IMG_5482.HEIC",
      title: "Celestial View",
      category: "skies",
      description: "Stars better than Awan Carpet",
      icon: <CloudSun className="w-4 h-4" />,
    },
    {
      id: "img10",
      src: "/images/IMG_5737.HEIC",
      title: "Trail Memories",
      category: "nature",
      description: "Every step tells a story",
      icon: <Trees className="w-4 h-4" />,
    },
    {
      id: "img11",
      src: "/images/IMG_5767.HEIC",
      title: "Mountain Soul",
      category: "mountains",
      description: "Where I find my peace",
      icon: <Mountain className="w-4 h-4" />,
    },
  ];

  const filteredPhotos =
    filter === "all"
      ? photos
      : photos.filter((photo) => photo.category === filter);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedPhoto) {
          setSelectedPhoto(null);
        } else {
          handleClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, selectedPhoto]);

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  const handleClose = () => {
    setSelectedPhoto(null);
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-all duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => (selectedPhoto ? setSelectedPhoto(null) : handleClose())}
      />

      {/* Full Photo View */}
      {selectedPhoto && (
        <div className="absolute inset-4 flex items-center justify-center z-10">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white p-3 rounded-lg">
              <h3 className="font-semibold">{selectedPhoto.title}</h3>
              <p className="text-sm text-gray-300">
                {selectedPhoto.description}
              </p>
            </div>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-sm text-white rounded-lg hover:bg-black/80 transition-colors duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Main Dialog */}
      <div
        className={`relative w-full max-w-6xl mx-4 max-h-[90vh] transition-all duration-300 transform ${
          selectedPhoto
            ? "opacity-0 pointer-events-none"
            : isAnimating
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        <div className="p-[2px] bg-gradient-to-r from-blue-400 via-gray-500 to-blue-400 bg-[length:200%_100%] animate-gradient rounded-xl">
          <div className="bg-white rounded-[10px] p-8 shadow-lg h-full">
            {/* Header */}
            <div
              className={`flex items-center justify-between mb-6 transition-all duration-500 delay-100 ${
                isAnimating
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex items-center gap-3">
                <Camera className="w-8 h-8 text-blue-600" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-1">
                    Through My Lens
                  </h2>
                  <p className="text-gray-600">
                    Capturing nature's beauty • {filteredPhotos.length} photos
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div
              className={`flex gap-2 mb-6 transition-all duration-500 delay-200 ${
                isAnimating
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {[
                {
                  key: "all",
                  label: "All Photos",
                  icon: <Eye className="w-4 h-4" />,
                },
                {
                  key: "mountains",
                  label: "Mountains",
                  icon: <Mountain className="w-4 h-4" />,
                },
                {
                  key: "nature",
                  label: "Nature",
                  icon: <Trees className="w-4 h-4" />,
                },
                {
                  key: "skies",
                  label: "Skies",
                  icon: <CloudSun className="w-4 h-4" />,
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    filter === tab.key
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Photo Grid */}
            <div
              className={`max-h-[50vh] overflow-y-auto transition-all duration-500 delay-300 ${
                isAnimating
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pr-2">
                {filteredPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                    onClick={() => handlePhotoClick(photo)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-3 left-3 text-white">
                        <div className="flex items-center gap-1 mb-1">
                          {photo.icon}
                          <span className="text-xs font-medium">
                            {photo.category}
                          </span>
                        </div>
                        <h4 className="font-semibold text-sm">{photo.title}</h4>
                      </div>
                      <div className="absolute top-3 right-3">
                        <ZoomIn className="w-5 h-5 text-white/80" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div
              className={`mt-6 pt-4 border-t border-gray-200 text-center transition-all duration-500 delay-400 ${
                isAnimating
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                <Heart className="w-4 h-4 text-red-400" />
                Captured during my monthly mountain adventures
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThroughMyLensDialog;
