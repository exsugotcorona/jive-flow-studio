"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "m-373 -197c0 0 68 405 532 532 464 127 532 532 532 532",
    "m-373 -197c0 0 68 405 532 532 464 127 532 532 532 532",
    "m-373 -197c0 0 68 405 532 532 464 127 532 532 532 532",
  ];

  return (
    <div
      className={cn(
        "absolute h-full w-full inset-0 [mask-image:radial-gradient(900px_at_center,white,transparent)]",
        className
      )}
    >
      <svg
        className="absolute h-full w-full inset-0 z-0"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.5">
          {paths.map((path, index) => (
            <motion.path
              key={index}
              d={path}
              stroke={`url(#linearGradient-${index})`}
              strokeOpacity="0.4"
              strokeWidth="0.5"
              initial={{
                pathLength: 0,
                opacity: 0,
              }}
              animate={{
                pathLength: 1,
                opacity: 1,
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 10,
              }}
            />
          ))}
        </g>
        <defs>
          {paths.map((_, index) => (
            <linearGradient
              key={index}
              id={`linearGradient-${index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0"
              />
              <stop
                offset="50%"
                stopColor="hsl(var(--primary))"
                stopOpacity="1"
              />
              <stop
                offset="100%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0"
              />
            </linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
};