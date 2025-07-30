"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useState, useEffect } from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything on server-side
  if (!isMounted) {
    return null;
  }

  const meteorCount = number || 20;
  const meteors = new Array(meteorCount).fill(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {meteors.map((_, idx) => {
        const position = idx * (800 / meteorCount) - 400;
        // Use deterministic values to avoid hydration mismatch
        const animationDelay = idx * 0.3 + "s";
        const animationDuration = 5 + (idx % 3) + "s";

        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] bg-blue-500 shadow-[0_0_0_1px_#3b82f610]",
              "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#3b82f6] before:to-transparent before:content-['']",
              className
            )}
            style={{
              top: "-40px",
              left: position + "px",
              animationDelay: animationDelay,
              animationDuration: animationDuration,
            }}
          />
        );
      })}
    </motion.div>
  );
};
