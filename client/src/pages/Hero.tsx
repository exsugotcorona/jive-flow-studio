import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Music } from "lucide-react";

const Hero = () => {
  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/5">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <BackgroundBeams className="absolute inset-0" />
      
      {/* Floating decorative elements */}
      <motion.div 
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear",
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-20 right-20 text-primary/20 hidden lg:block"
      >
        <Music className="w-12 h-12" />
      </motion.div>
      
      <motion.div 
        animate={{ 
          rotate: -360,
          y: [-10, 10, -10],
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "linear",
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-32 left-16 text-primary/15 hidden lg:block"
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="text-5xl md:text-8xl font-extrabold leading-tight">
              <div className="bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-muted-foreground">
                Master the Art of
              </div>
              <div className="relative mt-2">
                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                  Jive
                </span>
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 blur-2xl -z-10"
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <TextGenerateEffect 
              words="Learn the energetic and exciting world of Jive dancing with our expert instructors. From basic steps to advanced techniques, we'll guide you through every rhythm."
              className="text-xl md:text-2xl text-muted-foreground/80 leading-relaxed font-medium"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12"
          >
            <Link to="/courses">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <Button 
                  size="lg" 
                  className="relative px-10 py-7 text-xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 hover:from-primary/90 hover:via-purple-600/90 hover:to-pink-600/90 shadow-2xl hover:shadow-primary/25 transition-all duration-500 overflow-hidden border-0"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10">Start Dancing</span>
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform relative z-10" />
                </Button>
              </motion.div>
            </Link>
            <Link to="/merch">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-10 py-7 text-xl font-semibold border-2 border-primary/30 bg-background/50 backdrop-blur-sm hover:border-primary hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                >
                  <Play className="mr-3 h-6 w-6" />
                  Shop Merch
                </Button>
              </motion.div>
            </Link>
          </motion.div>
          
          {/* Stats or features section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-wrap justify-center items-center gap-8 pt-16 text-sm md:text-base text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Expert Instructors</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span>All Skill Levels</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span>Fun & Energetic</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;