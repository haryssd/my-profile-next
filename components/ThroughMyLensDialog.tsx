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
  title: string;
  description: string;
}

function ThroughMyLensDialog({ isOpen, onClose }: ThroughMyLensDialogProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedImageLoaded, setSelectedImageLoaded] = useState(false);
  const [isImageAnimating, setIsImageAnimating] = useState(false);

  const photos: Photo[] = useMemo(
    () => [
      {
        id: "img1",
        src: "/images/Mountain 1.webp",
        title: "Sikunir Hill",
        description: "Breathtaking view from the summit",
      },
      {
        id: "img2",
        src: "/images/Mountain 2.webp",
        title: "Bukit Batu Sawa",
        description: "Perfect light painting the sky",
      },
      {
        id: "img3",
        src: "/images/Waterfall 3.webp",
        title: "Madakaripura Waterfall",
        description: "Wandering through nature",
      },
      {
        id: "img4",
        src: "/images/Waterfall 1.webp",
        title: "Madakaripura Waterfall",
        description: "Wandering through nature",
      },
      {
        id: "img5",
        src: "/images/Waterfall 2.webp",
        title: "Tumpak Sewu Waterfall",
        description: "Wandering through nature",
      },
      {
        id: "img6",
        src: "/images/Beach 3.webp",
        title: "Mbuluk Beach",
        description: "Wandering through nature",
      },
      {
        id: "img7",
        src: "/images/Beach 2.webp",
        title: "Puncak Segoro",
        description: "Wandering through nature",
      },
      {
        id: "img8",
        src: "/images/Beach 4.webp",
        title: "Papuma Beach",
        description: "Wandering through nature",
      },
      {
        id: "img9",
        src: "/images/Beach.webp",
        title: "Papuma Beach",
        description: "Wandering through nature",
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

  // Animate dialog open/close
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
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/80"
        onClick={handleBackdropClick}
      />

      {/* Full Photo View */}
      {selectedPhoto && (
        <div
          className={`absolute inset-4 flex items-center justify-center z-10 transition-all duration-300 ${
            isImageAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center">
            {!selectedImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-white animate-spin" />
              </div>
            )}

            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              onLoad={handleSelectedImageLoad}
              className={`max-w-full max-h-full object-contain rounded-xl shadow-2xl transition-opacity duration-300 ${
                selectedImageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />

            {selectedImageLoaded && (
              <>
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white p-3 rounded-lg">
                  <h3 className="font-semibold">{selectedPhoto.title}</h3>
                  <p className="text-sm text-gray-300">
                    {selectedPhoto.description}
                  </p>
                </div>
                <button
                  onClick={handleClosePhoto}
                  className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-sm text-white rounded-lg hover:bg-black/80 transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Dialog */}
      <div
        className={`relative w-full max-w-6xl mx-4 max-h-[90vh] transition-all duration-300 transform ${
          selectedPhoto
            ? "opacity-0 scale-95 pointer-events-none"
            : isAnimating
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95"
        }`}
      >
        <div className="p-[2px] bg-gradient-to-r from-blue-400 via-gray-500 to-blue-400 bg-[length:200%_100%] animate-gradient rounded-xl">
          <div className="bg-white rounded-[10px] p-8 shadow-lg h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
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
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Photo Grid */}
            <div
              className="max-h-[60vh] overflow-y-auto scroll-smooth"
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
                  />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-200 text-center">
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

// Photo Card
interface PhotoCardProps {
  photo: Photo;
  index: number;
  onPhotoClick: (photo: Photo) => void;
}

function PhotoCard({ photo, onPhotoClick }: PhotoCardProps) {
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
      className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02] bg-gray-100"
      onClick={handleClick}
    >
      {!imageLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <X className="w-6 h-6 text-gray-400 mx-auto mb-1" />
            <p className="text-xs text-gray-500">Failed to load</p>
          </div>
        </div>
      )}
      <img
        src={photo.src}
        alt={photo.title}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="absolute bottom-3 left-3 text-white">
          <h4 className="font-semibold text-sm">{photo.title}</h4>
          <p className="text-xs text-gray-300">{photo.description}</p>
        </div>
        <div className="absolute top-3 right-3">
          <ZoomIn className="w-5 h-5 text-white/80" />
        </div>
      </div>
    </div>
  );
}

export default ThroughMyLensDialog;
