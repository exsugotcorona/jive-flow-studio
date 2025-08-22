import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Users, Star, Award, Clock, Heart } from "lucide-react";
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
    <section className="py-24 px-4 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why Choose <span className="text-primary">DancePlanet</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the difference with our comprehensive approach to jive dance education
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden group hover:shadow-[var(--shadow-soft)] transition-all duration-300 border-border/50 hover:border-primary/20">
                <Meteors number={5} />
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-background to-muted w-fit">
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;