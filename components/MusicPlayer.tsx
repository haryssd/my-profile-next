"use client";

import { useState, useRef, useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [progress, setProgress] = useState(0);
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

  const onReady: YouTubeProps["onReady"] = (event) => setPlayer(event.target);

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (event.data === 1) setIsPlaying(true); // playing
    else if (event.data === 2) setIsPlaying(false); // paused
    else if (event.data === 0) {
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
    <div className="group rounded-xl transition-all duration-300 hover:scale-[1.02] h-full">
      <div className="h-full bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-500 overflow-hidden relative flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-6 h-6 bg-blue-500 group-hover:bg-blue-600 rounded-sm flex items-center justify-center transition-colors duration-300">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                <path d="M23 9.71a8.5 8.5 0 0 0-.91-4.13 2.92 2.92 0 0 0-1.72-1A78.36 78.36 0 0 0 12 4.27a78.36 78.36 0 0 0-8.34.3 2.87 2.87 0 0 0-1.46.74c-.9.83-1 2.25-1.1 3.45a48.29 48.29 0 0 0 0 4.61c.06 1.2.2 2.62 1.1 3.45a2.87 2.87 0 0 0 1.46.74 78.36 78.36 0 0 0 8.34.3 78.36 78.36 0 0 0 8.34-.3 2.92 2.92 0 0 0 1.72-1 8.5 8.5 0 0 0 .91-4.13 48.14 48.14 0 0 0 .08-2.4v-.24a48.14 48.14 0 0 0-.08-2.4z" />
                <path d="M9.74 14.85V8.15l5.92 3.35z" />
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-semibold text-white transition-colors duration-300">
              Music
            </span>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="flex space-x-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-1 bg-blue-400 group-hover:bg-blue-500 rounded transition-all duration-300 ${
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
        <div className="flex items-center space-x-3 sm:space-x-4 flex-1 relative z-10 mt-3 sm:mt-4">
          {/* Vinyl Player */}
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex-shrink-0">
            {/* Floating Music Notes */}
            {isPlaying && (
              <>
                {/* Music Note 1 */}
                <div
                  className="absolute -top-2 -right-1 text-blue-500 group-hover:text-blue-400 text-xs animate-bounce transition-colors duration-300"
                  style={{ animationDelay: "0s", animationDuration: "2s" }}
                >
                  ♪
                </div>
                {/* Music Note 2 */}
                <div
                  className="absolute -top-1 -left-2 text-blue-400 group-hover:text-blue-300 text-xs animate-bounce transition-colors duration-300"
                  style={{ animationDelay: "0.5s", animationDuration: "2.5s" }}
                >
                  ♫
                </div>
                {/* Music Note 3 */}
                <div
                  className="absolute -bottom-1 -right-2 text-blue-500 group-hover:text-blue-400 text-xs animate-bounce transition-colors duration-300"
                  style={{ animationDelay: "1s", animationDuration: "3s" }}
                >
                  ♪
                </div>
                {/* Music Note 4 */}
                <div
                  className="absolute -bottom-2 -left-1 text-blue-400 group-hover:text-blue-300 text-xs animate-bounce transition-colors duration-300"
                  style={{ animationDelay: "1.5s", animationDuration: "2.2s" }}
                >
                  ♬
                </div>

                {/* Pulsing Glow Effect */}
                <div className="absolute inset-0 w-16 h-16 rounded-full bg-blue-400/20 group-hover:bg-blue-500/30 animate-ping transition-colors duration-300"></div>
                <div
                  className="absolute inset-1 w-14 h-14 rounded-full bg-blue-300/30 group-hover:bg-blue-400/40 animate-ping transition-colors duration-300"
                  style={{ animationDelay: "0.5s" }}
                ></div>
              </>
            )}

            {/* Spinning vinyl Record */}
            <div
              className={`absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-gray-800 via-black to-gray-900 border-2 shadow-xl transition-all duration-500 group-hover:shadow-2xl ${
                isPlaying
                  ? "animate-spin border-blue-400 shadow-blue-400/50 group-hover:border-blue-500 group-hover:shadow-blue-500/60"
                  : "border-gray-700 group-hover:border-gray-600"
              }`}
              style={{
                animationDuration: "3s",
                boxShadow: isPlaying
                  ? "0 0 20px rgba(59, 130, 246, 0.3)"
                  : "0 4px 8px rgba(0,0,0,0.3)",
              }}
            >
              {/* Vinyl grooves */}
              <div className="absolute inset-1 rounded-full bg-gradient-to-r from-gray-900 to-black">
                <div className="absolute inset-1 rounded-full bg-black border border-gray-700 group-hover:border-gray-600 transition-colors duration-300">
                  {/* Center hole */}
                  <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-600 group-hover:bg-gray-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-300">
                    <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-gray-800 group-hover:bg-gray-700 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-300"></div>
                  </div>

                  {/* Vinyl groove lines */}
                  <div className="absolute inset-2 rounded-full border border-gray-700/50 group-hover:border-gray-600/60 transition-colors duration-300"></div>
                  <div className="absolute inset-3 rounded-full border border-gray-600/30 group-hover:border-gray-500/40 transition-colors duration-300"></div>
                  <div className="absolute inset-4 rounded-full border border-gray-500/20 group-hover:border-gray-400/30 transition-colors duration-300"></div>
                </div>
              </div>

              {/* Reflection effect */}
              <div className="absolute top-1 left-2 w-6 h-1 bg-gradient-to-r from-white/20 to-transparent rounded-full transform rotate-45 group-hover:from-white/30 transition-all duration-300"></div>
            </div>

            {/* Album Cover */}
            <div className="absolute top-1 left-1 w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl z-10 transition-shadow duration-300">
              <img
                src="/images/kanye.jpg"
                alt="Ghost Town Album Cover"
                className={`w-full h-full object-cover transition-all duration-300 ${
                  isPlaying ? "brightness-110 contrast-110" : ""
                } group-hover:brightness-105 group-hover:contrast-105`}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) {
                    fallback.style.display = "flex";
                  }
                }}
              />
              {/* Fallback */}
              <div
                className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 group-hover:from-blue-500 group-hover:to-blue-700 items-center justify-center transition-all duration-300"
                style={{ display: "none" }}
              >
                <span className="text-white text-xs font-bold">KW</span>
              </div>
            </div>

            {/* Play indicator overlay */}
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-4 h-4 bg-white/90 group-hover:bg-white rounded-full flex items-center justify-center animate-pulse transition-colors duration-300">
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 24 24"
                    fill="blue"
                    className="group-hover:fill-blue-600 transition-colors duration-300"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Song Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-base sm:text-lg truncate mb-1 transition-colors duration-300">
              Ghost Town
            </h3>
            <p className="text-gray-400 group-hover:text-gray-300 text-xs sm:text-sm truncate mb-2 transition-colors duration-300">
              Kanye West
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 group-hover:bg-gray-600 rounded-full h-1 mb-1 relative overflow-hidden transition-colors duration-300">
              <div
                className={`h-1 rounded-full transition-all duration-500 ${
                  isPlaying
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 group-hover:from-blue-400 group-hover:to-blue-500"
                    : "bg-blue-500 group-hover:bg-blue-400"
                }`}
                style={{ width: `${progress || 0}%` }}
              />
              {/* Animated progress shimmer */}
              {isPlaying && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              )}
            </div>

            {/* Time Display */}
            <div className="flex justify-between text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(PREVIEW_DURATION)}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center sm:justify-center items-center relative z-10 mt-3 sm:mt-4 sm:relative">
          <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300 hidden sm:block sm:absolute sm:left-0 sm:top-1/2 sm:transform sm:-translate-y-1/2">
            {currentTime >= PREVIEW_DURATION
              ? "Preview Complete"
              : isPlaying
              ? "Now Playing"
              : "Paused"}
          </div>

          <button
            onClick={togglePlay}
            className={`text-white rounded-lg px-4 py-2 sm:px-3 sm:py-1.5 text-sm sm:text-xs font-bold flex items-center space-x-1 transition-all duration-300 active:scale-95 shadow-md hover:shadow-lg ${
              isPlaying
                ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
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

        {/* Hidden YouTube Player */}
        <div className="absolute -top-96 left-0 opacity-0 pointer-events-none">
          <YouTube
            videoId="5S6az6odzPI"
            opts={opts}
            onReady={onReady}
            onStateChange={onStateChange}
          />
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
