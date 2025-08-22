import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Music,
  Users,
  Star,
  Award,
  Clock,
  Heart,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";

const Features = () => {
  const features = [
    {
      icon: Music,
      title: "Expert Instruction",
      description:
        "Learn from certified jive instructors with years of performance and teaching experience.",
      color: "text-primary",
    },
    {
      icon: Users,
      title: "Small Class Sizes",
      description:
        "Personalized attention with maximum 25 students per class for optimal learning.",
      color: "text-emerald-500",
    },
    {
      icon: Star,
      title: "Progressive Learning",
      description:
        "A structured path that turns beginners into confident dancers.",
      color: "text-amber-500",
    },
    {
      icon: Award,
      title: "Fun & Fitness",
      description:
        "Burn every calories, build confidence, and enjoy every spin.",
      color: "text-rose-500",
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description:
        "Multiple class times and make-up sessions to fit your busy lifestyle.",
      color: "text-blue-500",
    },
    {
      icon: Heart,
      title: "Community Spirit",
      description: "A dance family where partners become friends.",
      color: "text-purple-500",
    },
  ];

  return (
    <section className="py-32 px-4 bg-gradient-to-br from-background via-primary/5 to-purple-500/10 relative overflow-hidden">
      {/* Simplified decorative elements */}
      <div className="absolute top-20 right-10 text-primary/30 hidden lg:block animate-pulse">
        <Sparkles className="w-12 h-12" />
      </div>

      <div className="absolute bottom-20 left-10 text-purple-400/30 hidden lg:block animate-bounce">
        <Zap className="w-8 h-8" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="relative mb-8">
            <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
              <div className="bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-muted-foreground">
                Why Choose
              </div>
              <div className="relative mt-2">
                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                  DancePlanet
                </span>
                <span className="text-primary">?</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 blur-3xl -z-10 animate-pulse" />
              </div>
            </h2>
          </div>
          <p className="text-2xl md:text-3xl text-muted-foreground/80 max-w-4xl mx-auto leading-relaxed font-medium">
            Experience the difference with our comprehensive approach to jive
            dance education
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group hover:-translate-y-2 hover:scale-105 transition-transform duration-300"
            >
              <Card className="relative overflow-hidden bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-sm border-2 border-border/30 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Meteors number={5} />

                <CardHeader className="text-center pb-6 relative z-10">
                  <div className="mx-auto mb-6 p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 w-fit shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <feature.icon
                      className={`h-10 w-10 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                  </div>
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
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/20">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-lg font-medium text-foreground">
              Join thousands of happy dancers!
            </span>
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
