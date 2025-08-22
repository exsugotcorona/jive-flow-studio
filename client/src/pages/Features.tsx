import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Users, Star, Award, Clock, Heart, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";

const Features = () => {
  const features = [
    {
      icon: Music,
      title: "Expert Instruction",
      description: "Learn from certified jive instructors with years of performance and teaching experience.",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Small Class Sizes",
      description: "Personalized attention with maximum 12 students per class for optimal learning.",
      color: "text-emerald-500"
    },
    {
      icon: Star,
      title: "Progressive Learning",
      description: "Structured curriculum that builds skills systematically from beginner to advanced.",
      color: "text-amber-500"
    },
    {
      icon: Award,
      title: "Performance Ready",
      description: "Prepare for competitions and showcases with our advanced performance training.",
      color: "text-rose-500"
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Multiple class times and make-up sessions to fit your busy lifestyle.",
      color: "text-blue-500"
    },
    {
      icon: Heart,
      title: "Community Focus",
      description: "Join a welcoming community of dancers who share your passion for jive.",
      color: "text-purple-500"
    }
  ];

  return (
    <section className="py-32 px-4 bg-gradient-to-br from-background via-primary/5 to-purple-500/10 relative overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div 
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "linear",
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-20 right-10 text-primary/20 hidden lg:block"
      >
        <Sparkles className="w-16 h-16" />
      </motion.div>
      
      <motion.div 
        animate={{ 
          rotate: [360, 0],
          x: [-10, 10, -10],
          y: [-5, 5, -5]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear",
          x: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-20 left-10 text-purple-400/25 hidden lg:block"
      >
        <Zap className="w-12 h-12" />
      </motion.div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative mb-8"
          >
            <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
              <div className="bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-muted-foreground">
                Why Choose 
              </div>
              <div className="relative mt-2">
                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                  DancePlanet
                </span>
                <span className="text-primary">?</span>
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.4, 0.7, 0.4]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 blur-3xl -z-10"
                />
              </div>
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl text-muted-foreground/80 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            Experience the difference with our comprehensive approach to jive dance education
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.25, 0.4, 0.25, 1]
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-sm border-2 border-border/30 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Meteors number={8} />
                
                {/* Glowing background effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-30 blur-xl"
                  initial={false}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                <CardHeader className="text-center pb-6 relative z-10">
                  <motion.div 
                    className="mx-auto mb-6 p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 w-fit shadow-lg"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -10, 10, 0],
                      boxShadow: "0 20px 40px -10px rgba(139, 92, 246, 0.3)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className={`h-10 w-10 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                  </motion.div>
                  <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors duration-300 mb-2">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-center text-lg leading-relaxed text-muted-foreground group-hover:text-muted-foreground/90 transition-colors duration-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                
                {/* Bottom gradient accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom decorative section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/20">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-lg font-medium text-foreground">Join thousands of happy dancers!</span>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;