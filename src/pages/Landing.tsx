import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Master the Art of <span className="text-primary">Jive</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Learn the energetic and exciting world of Jive dancing with our expert instructors. 
            From basic steps to advanced techniques, we'll guide you through every rhythm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" className="px-8">
                Start Dancing
              </Button>
            </Link>
            <Link to="/merch">
              <Button variant="outline" size="lg" className="px-8">
                Shop Merch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose JiveStudio?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <Music className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Expert Instruction</CardTitle>
                <CardDescription>
                  Learn from certified jive instructors with years of experience
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Small Class Sizes</CardTitle>
                <CardDescription>
                  Personalized attention with maximum 12 students per class
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <Star className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Progressive Learning</CardTitle>
                <CardDescription>
                  Structured curriculum from basic to advanced levels
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Course Levels Preview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Course Levels</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Badge variant="secondary" className="w-fit">Basic</Badge>
                <CardTitle>Foundation Level</CardTitle>
                <CardDescription>
                  Perfect for beginners. Learn the fundamental steps, basic timing, and core techniques.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Basic jive steps</li>
                  <li>• Rhythm and timing</li>
                  <li>• Partner connection</li>
                  <li>• Simple footwork patterns</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Badge variant="secondary" className="w-fit">Intermediate</Badge>
                <CardTitle>Development Level</CardTitle>
                <CardDescription>
                  Build on your foundation with more complex moves and improved technique.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Advanced footwork</li>
                  <li>• Spins and turns</li>
                  <li>• Lead and follow techniques</li>
                  <li>• Musical interpretation</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Badge variant="secondary" className="w-fit">Advanced</Badge>
                <CardTitle>Mastery Level</CardTitle>
                <CardDescription>
                  Master complex combinations and develop your own style and flair.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Complex combinations</li>
                  <li>• Performance techniques</li>
                  <li>• Individual style development</li>
                  <li>• Competition preparation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/courses">
              <Button size="lg">View All Courses</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;