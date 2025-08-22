"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ModernSection = ({
  children,
  className,
  animate = true,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
}) => {
  if (!animate) {
    return (
      <section className={cn("py-16 px-4", className)}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className={cn("py-16 px-4", className)}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </motion.section>
  );
};