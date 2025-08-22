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
      
      {/* Simplified floating elements */}
      <div className="absolute top-20 right-20 text-primary/30 hidden lg:block animate-pulse">
        <Music className="w-10 h-10" />
      </div>
      
      <div className="absolute bottom-32 left-16 text-primary/20 hidden lg:block animate-bounce">
        <Sparkles className="w-6 h-6" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="text-5xl md:text-8xl font-extrabold leading-tight">
            <div className="bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-muted-foreground">
              Master the Art of
            </div>
            <div className="relative mt-2">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                Jive
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 blur-2xl -z-10 animate-pulse" />
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-muted-foreground/80 leading-relaxed font-medium">
              Learn the energetic and exciting world of Jive dancing with our expert instructors. From basic steps to advanced techniques, we'll guide you through every rhythm.
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12"
          >
            <Link to="/courses">
              <Button 
                size="lg" 
                className="px-10 py-7 text-xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 hover:scale-105 shadow-2xl hover:shadow-primary/25 transition-all duration-300 border-0 group"
              >
                Start Dancing
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/merch">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-10 py-7 text-xl font-semibold border-2 border-primary/30 bg-background/50 hover:scale-105 hover:border-primary hover:bg-primary/10 transition-all duration-300"
              >
                <Play className="mr-3 h-6 w-6" />
                Shop Merch
              </Button>
            </Link>
          </motion.div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 pt-16 text-sm md:text-base text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Expert Instructors</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>All Skill Levels</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Fun & Energetic</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;