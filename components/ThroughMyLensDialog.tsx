"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { X, Camera, Heart, ZoomIn, Loader2 } from "lucide-react";

interface ThroughMyLensDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Photo {
  id: string;
  src: string;
  thumbnail?: string;
  title: string;
  description: string;
}

function ThroughMyLensDialog({ isOpen, onClose }: ThroughMyLensDialogProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedImageLoaded, setSelectedImageLoaded] = useState(false);
  const [isImageAnimating, setIsImageAnimating] = useState(false);

  // Fixed photos array with thumbnails
  const photos: Photo[] = useMemo(
    () => [
      {
        id: "img1",
        src: "/images/Mountain 1.png",
        thumbnail: "/images/thumbs/Mountain 1.webp",
        title: "Sikunir Hill",
        description: "Famous for its golden sunrise view above the clouds.",
      },
      {
        id: "img2",
        src: "/images/Mountain 2.jpg",
        thumbnail: "/images/thumbs/Mountain 2.webp",
        title: "Bukit Batu Sawa",
        description: "A peaceful hilltop with panoramic mountain scenery.",
      },
      {
        id: "img3",
        src: "/images/Waterfall 3.jpg",
        thumbnail: "/images/thumbs/Waterfall 3.webp",
        title: "Madakaripura Waterfall",
        description: "A tall, narrow waterfall hidden deep in a lush canyon.",
      },
      {
        id: "img4",
        src: "/images/Waterfall 1.png",
        thumbnail: "/images/thumbs/Waterfall 1.webp",
        title: "Madakaripura Waterfall",
        description: "Known for its dramatic drops and mystical atmosphere.",
      },
      {
        id: "img5",
        src: "/images/Waterfall 2.png",
        thumbnail: "/images/thumbs/Waterfall 2.webp",
        title: "Tumpak Sewu Waterfall",
        description:
          "Nicknamed 'A Thousand Waterfalls' for its grand curtain of water.",
      },
      {
        id: "img6",
        src: "/images/Beach 3.png",
        thumbnail: "/images/thumbs/Beach 3.webp",
        title: "Mbuluk Beach",
        description:
          "A quiet sandy cove perfect for relaxing and watching sunsets.",
      },
      {
        id: "img7",
        src: "/images/Beach 2.png",
        thumbnail: "/images/thumbs/Beach 2.webp",
        title: "Puncak Segoro",
        description:
          "Clifftop views over turquoise waters and rugged coastlines.",
      },
      {
        id: "img8",
        src: "/images/Beach 4.png",
        thumbnail: "/images/thumbs/Beach 4.webp",
        title: "Papuma Beach",
        description:
          "A scenic beach with rock formations and crystal-clear waves.",
      },
      {
        id: "img9",
        src: "/images/Beach.png",
        thumbnail: "/images/thumbs/Beach.webp",
        title: "Papuma Beach",
        description: "A popular coastal spot for photography and beach walks.",
      },
    ],
    []
  );

  // Escape key close
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedPhoto) {
          handleClosePhoto();
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

  // Smooth dialog animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsAnimating(true));
      });
    } else {
      setIsAnimating(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setSelectedPhoto(null);
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const handleClosePhoto = useCallback(() => {
    setIsImageAnimating(false);
    setTimeout(() => {
      setSelectedImageLoaded(false);
      setSelectedPhoto(null);
    }, 300);
  }, []);

  const handlePhotoClick = useCallback((photo: Photo) => {
    setSelectedImageLoaded(false);
    setSelectedPhoto(photo);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsImageAnimating(true));
    });
  }, []);

  const handleSelectedImageLoad = useCallback(() => {
    setSelectedImageLoaded(true);
  }, []);

  const handleBackdropClick = useCallback(() => {
    if (selectedPhoto) {
      handleClosePhoto();
    } else {
      handleClose();
    }
  }, [selectedPhoto, handleClose, handleClosePhoto]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Smooth backdrop */}
      <div
        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-all duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleBackdropClick}
      />

      {/* Full Photo View with smooth transitions */}
      {selectedPhoto && (
        <div
          className={`absolute inset-4 flex items-center justify-center z-10 transition-all duration-300 ${
            isImageAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center">
            {/* Loading state */}
            {!selectedImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-white animate-spin" />
              </div>
            )}

            {/* Full quality image */}
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              onLoad={handleSelectedImageLoad}
              className={`max-w-full max-h-full object-contain rounded-xl shadow-2xl transition-all duration-500 ${
                selectedImageLoaded
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
            />

            {/* Animated overlay elements */}
            <div
              className={`absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white p-3 rounded-lg transition-all duration-300 delay-200 ${
                selectedImageLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <h3 className="font-semibold">{selectedPhoto.title}</h3>
              <p className="text-sm text-gray-300">
                {selectedPhoto.description}
              </p>
            </div>

            <button
              onClick={handleClosePhoto}
              className={`absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-sm text-white rounded-lg hover:bg-black/80 transition-all duration-300 delay-100 hover:scale-110 ${
                selectedImageLoaded
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-75"
              }`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Main Dialog with enhanced animations */}
      <div
        className={`relative w-full max-w-6xl mx-4 max-h-[90vh] transition-all duration-300 transform ${
          selectedPhoto
            ? "opacity-0 scale-95 pointer-events-none"
            : isAnimating
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-8"
        }`}
      >
        <div className="p-[2px] bg-gradient-to-r from-blue-400 via-gray-500 to-blue-400 bg-[length:200%_100%] animate-gradient rounded-xl">
          <div className="bg-white rounded-[10px] p-8 shadow-lg h-full">
            {/* Header with staggered animation */}
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
                    Capturing nature's beauty • {photos.length} photos
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 text-gray-500 hover:text-gray-700 hover:scale-110"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Photo Grid with staggered animation */}
            <div
              className={`max-h-[60vh] overflow-y-auto scroll-smooth transition-all duration-500 delay-200 ${
                isAnimating
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#cbd5e1 #f1f5f9",
              }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pr-2">
                {photos.map((photo, index) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    index={index}
                    onPhotoClick={handlePhotoClick}
                    isAnimating={isAnimating}
                  />
                ))}
              </div>
            </div>

            {/* Footer with staggered animation */}
            <div
              className={`mt-6 pt-4 border-t border-gray-200 text-center transition-all duration-500 delay-300 ${
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

// Enhanced Photo Card with smooth animations and progressive loading
interface PhotoCardProps {
  photo: Photo;
  index: number;
  onPhotoClick: (photo: Photo) => void;
  isAnimating: boolean;
}

function PhotoCard({
  photo,
  index,
  onPhotoClick,
  isAnimating,
}: PhotoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => setImageLoaded(true), []);
  const handleError = useCallback(() => setHasError(true), []);
  const handleClick = useCallback(
    () => onPhotoClick(photo),
    [photo, onPhotoClick]
  );

  return (
    <div
      className={`group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-gray-100 transition-all duration-300 hover:scale-[1.05] hover:shadow-xl ${
        isAnimating
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95"
      }`}
      onClick={handleClick}
      style={{
        transitionDelay: `${Math.min(index * 100, 600)}ms`,
        willChange: "transform, opacity",
      }}
    >
      {/* Loading placeholder */}
      {!imageLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <X className="w-6 h-6 text-gray-400 mx-auto mb-1" />
            <p className="text-xs text-gray-500">Failed to load</p>
          </div>
        </div>
      )}

      {/* Progressive image loading - thumbnail first */}
      <img
        src={photo.thumbnail || photo.src}
        alt={photo.title}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          willChange: "transform, opacity",
        }}
      />

      {/* Enhanced overlay with smooth animations */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="absolute bottom-3 left-3 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h4 className="font-semibold text-sm">{photo.title}</h4>
          <p className="text-xs text-gray-300">{photo.description}</p>
        </div>
        <div className="absolute top-3 right-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
          <ZoomIn className="w-5 h-5 text-white/80" />
        </div>
      </div>
    </div>
  );
}

export default ThroughMyLensDialog;
