import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";

const CourseLevels = () => {
  const levels = [
    {
      level: "Basic Beginners",
      title: "Foundation Level",
      description:
        "For those taking their very first step on the dance floor. No partner or prior experience needed.",
      duration: "6 weeks",
      skills: [
        "Learn the fundamentals of Social Jive footwork and rhythm",
        "Simple partner connections and easy turns",
        "Build confidence and comfort movinf to music",
        "Simple turns and spins",
      ],
      color: "bg-gradient-to-br from-emerald-500/10 to-emerald-600/20",
      badge: "secondary",
    },
    {
      level: "Intermediate",
      title: "Development Level",
      description:
        "Build on your foundation with more complex moves, improved technique, and better musicality to take your dancing to the next level.",
      duration: "8 weeks",
      skills: [
        "Advanced footwork patterns",
        "Multiple spin combinations",
        "Lead and follow refinement",
        "Musical interpretation and style",
      ],
      color: "bg-gradient-to-br from-primary/10 to-primary/20",
      badge: "default",
    },
    {
      level: "Advanced",
      title: "Mastery Level",
      description:
        "Master complex combinations and develop your unique style. Focus on performance quality and competition preparation.",
      duration: "10 weeks",
      skills: [
        "Complex combination sequences",
        "Performance techniques and stage presence",
        "Individual style development",
        "Competition choreography preparation",
      ],
      color: "bg-gradient-to-br from-rose-500/10 to-rose-600/20",
      badge: "destructive",
    },
  ];

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-primary">Course Levels</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Structured progression designed to take you from your first steps to
            dance floor mastery
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {levels.map((level, index) => (
            <motion.div
              key={level.level}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card
                className={`h-full relative overflow-hidden group hover:shadow-[var(--shadow-elegant)] transition-all duration-500 border-border/50 hover:border-primary/30 ${level.color}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant={level.badge as any}
                      className="text-xs font-medium"
                    >
                      {level.level}
                    </Badge>
                    <span className="text-sm font-medium text-muted-foreground bg-background/50 px-3 py-1 rounded-full">
                      {level.duration}
                    </span>
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                    {level.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {level.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">
                      What You'll Master:
                    </h4>
                    <ul className="space-y-2">
                      {level.skills.map((skill, skillIndex) => (
                        <li
                          key={skillIndex}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/courses">
            <Button
              size="lg"
              className="px-8 py-6 text-lg group bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-elegant)] transition-all duration-300"
            >
              Explore All Courses
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CourseLevels;
