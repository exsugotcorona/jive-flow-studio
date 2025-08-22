"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ModernHero = ({
  title,
  subtitle,
  children,
  className,
  backgroundPattern = false,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  backgroundPattern?: boolean;
}) => {
  return (
    <section className={cn(
      "relative py-24 md:py-32 px-4 text-center overflow-hidden",
      backgroundPattern ? "bg-gradient-to-b from-background via-muted/20 to-background" : "bg-muted/30",
      className
    )}>
      {backgroundPattern && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      )}
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-4"
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};