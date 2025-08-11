import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { motion } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";

const DanceCourses = () => {
  const courses = [
    {
      level: "Basic",
      title: "Jive Fundamentals",
      description: "Perfect for complete beginners. Learn the essential jive steps, basic timing, and partner connection in a fun and supportive environment.",
      duration: "6 weeks",
      classSize: "8-12 students",
      schedule: "Tuesdays 7:00-8:00 PM",
      price: "₹8,000",
      features: [
        "Basic jive steps and timing",
        "Rock step and chasse",
        "Simple turns and spins",
        "Partner connection basics",
        "Footwork fundamentals"
      ]
    },
    {
      level: "Intermediate",
      title: "Jive Development", 
      description: "Build on your foundation with more complex moves, improved technique, and better musicality. Prerequisite: Basic level completion.",
      duration: "8 weeks",
      classSize: "6-10 students", 
      schedule: "Thursdays 7:30-8:30 PM",
      price: "₹12,000",
      features: [
        "Advanced footwork patterns",
        "Multiple spin combinations",
        "Lead and follow refinement",
        "Musical interpretation",
        "Style and expression"
      ]
    },
    {
      level: "Advanced",
      title: "Jive Mastery",
      description: "Master complex combinations and develop your unique style. Focus on performance quality and competition preparation.",
      duration: "10 weeks",
      classSize: "4-8 students",
      schedule: "Saturdays 6:00-7:30 PM", 
      price: "₹18,000",
      features: [
        "Complex combination sequences",
        "Performance techniques",
        "Individual style development", 
        "Competition choreography",
        "Teaching methodology basics"
      ]
    }
  ];

  const getBadgeVariant = (level: string) => {
    switch (level) {
      case "Basic": return "secondary";
      case "Intermediate": return "default"; 
      case "Advanced": return "destructive";
      default: return "secondary";
    }
  };

  const parseAmount = (price: string) => Number(price.replace(/[^\d]/g, ""));

  const createPayment = async (course: typeof courses[number]) => {
    try {
      const { data, error } = await supabase.functions.invoke("instamojo-create-payment", {
        body: {
          amount: parseAmount(course.price),
          purpose: course.title,
          product_id: course.level,
          product_type: "course",
          redirect_url: `${window.location.origin}/payment/success`,
        },
      });

      if (error) throw error as any;
      const url = (data as any)?.url;
      if (url) {
        window.location.href = url;
      } else {
        toast.error("Failed to start payment. Please try again.");
      }
    } catch (e: any) {
      toast.error(e?.message || "Payment error");
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section with padding for navbar */}
      <section className="py-24 px-4 text-center bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground">
              Jive Dance <span className="text-primary">Courses</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover the joy of jive dancing through our structured learning program. 
              Each level builds upon the previous, ensuring steady progress and confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full flex flex-col relative overflow-hidden group hover:shadow-[var(--shadow-elegant)] transition-all duration-500 border-border/50 hover:border-primary/30 bg-gradient-to-br from-background to-muted/30">
                  <Meteors number={3} />
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={getBadgeVariant(course.level) as any}>
                        {course.level}
                      </Badge>
                      <span className="text-2xl font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {course.price}
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {course.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center text-sm text-muted-foreground bg-muted/50 p-2 rounded-lg">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        {course.duration}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground bg-muted/50 p-2 rounded-lg">
                        <Users className="h-4 w-4 mr-2 text-primary" />
                        {course.classSize}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground bg-muted/50 p-2 rounded-lg">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        {course.schedule}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3 text-foreground">What You'll Learn:</h4>
                      <ul className="space-y-2">
                        {course.features.map((feature, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <span className="text-primary mr-2">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-elegant)] transition-all duration-300"
                      onClick={() => createPayment(course)}
                    >
                      Enroll Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-24 px-4 bg-gradient-to-b from-muted/30 to-background relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
              Ready to Start Your <span className="text-primary">Jive Journey</span>?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              All courses include practice music, step-by-step instruction, and ongoing support. 
              Students can repeat any level at a 50% discount to perfect their skills.
            </p>
            <div className="text-center">
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-elegant)] transition-all duration-300 px-8 py-6 text-lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DanceCourses;