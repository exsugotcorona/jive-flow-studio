import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/30">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <BackgroundBeams className="absolute inset-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground">
            Master the Art of{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Jive
            </span>
          </div>
          
          <TextGenerateEffect 
            words="Learn the energetic and exciting world of Jive dancing with our expert instructors. From basic steps to advanced techniques, we'll guide you through every rhythm."
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Link to="/courses">
              <Button size="lg" className="px-8 py-6 text-lg group bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
                Start Dancing
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/merch">
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300">
                <Play className="mr-2 h-5 w-5" />
                Shop Merch
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;