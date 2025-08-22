"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Meteors } from "@/components/ui/meteors";
import { cn } from "@/lib/utils";

export const ModernCard = ({
  children,
  className,
  variant = "default",
  hoverable = true,
  meteors = false,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "glow";
  hoverable?: boolean;
  meteors?: boolean;
} & React.ComponentProps<typeof Card>) => {
  const cardVariants = {
    default: "border-border/50 hover:border-primary/30",
    gradient: "bg-gradient-to-br from-background to-muted/50 border-border/50 hover:border-primary/30",
    glow: "border-primary/20 hover:shadow-[var(--shadow-elegant)] hover:border-primary/40"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card 
        className={cn(
          "relative overflow-hidden group transition-all duration-500",
          hoverable && "hover:shadow-[var(--shadow-soft)]",
          cardVariants[variant],
          className
        )}
        {...props}
      >
        {meteors && <Meteors number={5} />}
        {children}
      </Card>
    </motion.div>
  );
};