import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 px-4 text-center bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Jive Dance Courses
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the joy of jive dancing through our structured learning program. 
            Each level builds upon the previous, ensuring steady progress and confidence.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <Card key={course.level} className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={getBadgeVariant(course.level)}>
                      {course.level}
                    </Badge>
                    <span className="text-2xl font-bold text-primary">{course.price}</span>
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      {course.duration}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      {course.classSize}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {course.schedule}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">What You'll Learn:</h4>
                    <ul className="space-y-1">
                      {course.features.map((feature, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button className="w-full">
                    Enroll Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to Start Your Jive Journey?</h2>
          <p className="text-muted-foreground mb-8">
            All courses include practice music, step-by-step instruction, and ongoing support. 
            Students can repeat any level at a 50% discount to perfect their skills.
          </p>
          <div className="text-center">
            <Link to="/contact">
              <Button size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DanceCourses;