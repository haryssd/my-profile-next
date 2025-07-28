"use client";

import { useState, useRef, useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [playbackStartTime, setPlaybackStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const PREVIEW_DURATION = 30;

  const opts: YouTubeProps["opts"] = {
    height: "200",
    width: "100%",
    playerVars: {
      autoplay: 0,
      start: 13,
      modestbranding: 1,
      rel: 0,
      controls: 0,
    },
  };

  const onReady: YouTubeProps["onReady"] = (event) => {
    setPlayer(event.target);
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (event.data === 1) {
      // Playing
      setIsPlaying(true);
    } else if (event.data === 2) {
      // Paused
      setIsPlaying(false);
    } else if (event.data === 0) {
      // Ended
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    }
  };

  useEffect(() => {
    if (isPlaying && player) {
      intervalRef.current = setInterval(() => {
        try {
          const videoCurrentTime = player.getCurrentTime();
          const elapsedTime = videoCurrentTime - 13;

          if (elapsedTime >= PREVIEW_DURATION) {
            player.pauseVideo();
            setIsPlaying(false);
            setProgress(100);
            setCurrentTime(PREVIEW_DURATION);
            return;
          }

          const progressPercent = (elapsedTime / PREVIEW_DURATION) * 100;
          setProgress(Math.max(0, Math.min(progressPercent, 100)));
          setCurrentTime(Math.max(0, elapsedTime));
        } catch (error) {
          console.log("Error getting time:", error);
        }
      }, 500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, player]);

  const togglePlay = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        if (currentTime >= PREVIEW_DURATION) {
          player.seekTo(13, true);
          setProgress(0);
          setCurrentTime(0);
          setPlaybackStartTime(13);
        }
        player.playVideo();
      }
    }
  };

  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-gradient-to-br from-red-50 via-red-100 to-pink-100 p-4 rounded-3xl shadow-lg w-full h-full flex flex-col justify-between relative overflow-hidden border border-red-200/50">
      {/* Header */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-red-500 rounded-sm flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
              <path d="M23 9.71a8.5 8.5 0 0 0-.91-4.13 2.92 2.92 0 0 0-1.72-1A78.36 78.36 0 0 0 12 4.27a78.36 78.36 0 0 0-8.34.3 2.87 2.87 0 0 0-1.46.74c-.9.83-1 2.25-1.1 3.45a48.29 48.29 0 0 0 0 4.61c.06 1.2.2 2.62 1.1 3.45a2.87 2.87 0 0 0 1.46.74 78.36 78.36 0 0 0 8.34.3 78.36 78.36 0 0 0 8.34-.3 2.92 2.92 0 0 0 1.72-1 8.5 8.5 0 0 0 .91-4.13 48.14 48.14 0 0 0 .08-2.4v-.24a48.14 48.14 0 0 0-.08-2.4z" />
              <path d="M9.74 14.85V8.15l5.92 3.35z" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-gray-700">YouTube</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-1 bg-red-400 rounded transition-all duration-300 ${
                  isPlaying ? "animate-pulse" : ""
                }`}
                style={{
                  height: isPlaying ? `${12 + i * 4}px` : "8px",
                  animationDelay: `${i * 100}ms`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center space-x-4 flex-1 relative z-10">
        {/* Vinyl Player */}
        <div className="relative w-16 h-16 flex-shrink-0">
          {/* Floating Music Notes */}
          {isPlaying && (
            <>
              {/* Music Note 1 */}
              <div
                className="absolute -top-2 -right-1 text-red-500 text-xs animate-bounce"
                style={{ animationDelay: "0s", animationDuration: "2s" }}
              >
                ♪
              </div>
              {/* Music Note 2 */}
              <div
                className="absolute -top-1 -left-2 text-pink-500 text-xs animate-bounce"
                style={{ animationDelay: "0.5s", animationDuration: "2.5s" }}
              >
                ♫
              </div>
              {/* Music Note 3 */}
              <div
                className="absolute -bottom-1 -right-2 text-red-400 text-xs animate-bounce"
                style={{ animationDelay: "1s", animationDuration: "3s" }}
              >
                ♪
              </div>
              {/* Music Note 4 */}
              <div
                className="absolute -bottom-2 -left-1 text-pink-400 text-xs animate-bounce"
                style={{ animationDelay: "1.5s", animationDuration: "2.2s" }}
              >
                ♬
              </div>

              {/* Pulsing Glow Effect */}
              <div className="absolute inset-0 w-16 h-16 rounded-full bg-red-400/20 animate-ping"></div>
              <div
                className="absolute inset-1 w-14 h-14 rounded-full bg-red-300/30 animate-ping"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </>
          )}

          {/* Spinning vinyl Record */}
          <div
            className={`absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-r from-gray-800 via-black to-gray-900 border-2 shadow-xl transition-all duration-500 ${
              isPlaying
                ? "animate-spin border-red-400 shadow-red-400/50"
                : "border-gray-700"
            }`}
            style={{
              animationDuration: "3s",
              boxShadow: isPlaying
                ? "0 0 20px rgba(239, 68, 68, 0.3)"
                : "0 4px 8px rgba(0,0,0,0.3)",
            }}
          >
            {/* Vinyl grooves */}
            <div className="absolute inset-1 rounded-full bg-gradient-to-r from-gray-900 to-black">
              <div className="absolute inset-1 rounded-full bg-black border border-gray-700">
                {/* Center hole */}
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-600 rounded-full transform -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                {/* Vinyl groove lines */}
                <div className="absolute inset-2 rounded-full border border-gray-700/50"></div>
                <div className="absolute inset-3 rounded-full border border-gray-600/30"></div>
                <div className="absolute inset-4 rounded-full border border-gray-500/20"></div>
              </div>
            </div>

            {/* Reflection effect */}
            <div className="absolute top-1 left-2 w-6 h-1 bg-gradient-to-r from-white/20 to-transparent rounded-full transform rotate-45"></div>
          </div>

          {/* Album Cover */}
          <div className="absolute top-1 left-1 w-10 h-10 rounded-lg overflow-hidden shadow-lg z-10">
            <img
              src="/images/kanye.jpg"
              alt="Ghost Town Album Cover"
              className={`w-full h-full object-cover transition-all duration-300 ${
                isPlaying ? "brightness-110 contrast-110" : ""
              }`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.nextElementSibling?.classList.remove("hidden");
              }}
            />
            {/* Fallback */}
            <div className="hidden w-full h-full bg-gradient-to-br from-orange-400 to-yellow-400 items-center justify-center">
              <span className="text-white text-xs font-bold">KW</span>
            </div>
          </div>

          {/* Play indicator overlay */}
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-4 h-4 bg-white/90 rounded-full flex items-center justify-center animate-pulse">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="red">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Song Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-sm truncate mb-1">
            Ghost Town
          </h3>
          <p className="text-gray-600 text-xs truncate mb-2">Kanye West</p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-1 mb-1 relative overflow-hidden">
            <div
              className={`h-1 rounded-full transition-all duration-500 ${
                isPlaying
                  ? "bg-gradient-to-r from-red-500 to-pink-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${progress || 0}%` }}
            />
            {/* Animated progress shimmer */}
            {isPlaying && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            )}
          </div>

          {/* Time Display */}
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(PREVIEW_DURATION)}</span>
          </div>
        </div>
      </div>

      {/* Hidden YouTube Player */}
      <div className="absolute -top-96 left-0 opacity-0 pointer-events-none">
        <YouTube
          videoId="5S6az6odzPI"
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between relative z-10">
        <div className="text-xs text-gray-500">
          {currentTime >= PREVIEW_DURATION
            ? "Preview Complete"
            : isPlaying
            ? "Now Playing"
            : "Paused"}
        </div>

        <button
          onClick={togglePlay}
          className={`text-white rounded-full px-3 py-1.5 text-xs font-bold flex items-center space-x-1 transition-all duration-200 active:scale-95 shadow-md ${
            isPlaying
              ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          <svg width="8" height="8" viewBox="0 0 16 16" fill="currentColor">
            {isPlaying ? (
              <path d="M3 3h4v10H3V3zm6 0h4v10H9V3z" />
            ) : (
              <path d="M3 13.1231V2.87688C3 1.42024 4.55203 0.520516 5.77196 1.26995L14.1114 6.39307C15.2962 7.12093 15.2962 8.87907 14.1114 9.60693L5.77196 14.73C4.55203 15.4795 3 14.5798 3 13.1231Z" />
            )}
          </svg>
          <span>
            {currentTime >= PREVIEW_DURATION
              ? "Replay"
              : isPlaying
              ? "Pause"
              : "Play"}
          </span>
        </button>
      </div>
    </div>
  );
}

export default MusicPlayer;
