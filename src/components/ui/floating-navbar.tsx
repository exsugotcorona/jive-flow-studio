"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { User, LogOut, Settings } from "lucide-react";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === 'admin' || user?.emailAddresses[0]?.emailAddress === 'admin@example.com';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Always show navbar on non-home pages, hide/show on home page based on scroll
      if (location.pathname !== "/") {
        setVisible(true);
      } else {
        setVisible(currentScrollY < 50 || currentScrollY < window.innerHeight * 0.1);
      }
    };

    handleScroll(); // Call immediately to set initial state
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent rounded-full bg-background/80 backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link-${idx}`}
            to={navItem.link}
            className={cn(
              "relative items-center flex space-x-1 text-foreground hover:text-primary transition-colors",
              location.pathname === navItem.link && "text-primary"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
            {location.pathname === navItem.link && (
              <motion.span
                layoutId="navbar"
                className="absolute inset-0 h-full w-full bg-primary/10 rounded-full"
                transition={{
                  type: "spring",
                  bounce: 0.25,
                  stiffness: 130,
                  damping: 9,
                }}
              />
            )}
          </Link>
        ))}
        
            {/* Authentication buttons */}
            <SignedOut>
              <Link
                to="/auth"
                className="text-sm font-medium px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Sign In
              </Link>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center space-x-2">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-sm font-medium px-3 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
      </motion.div>
    </AnimatePresence>
  );
};