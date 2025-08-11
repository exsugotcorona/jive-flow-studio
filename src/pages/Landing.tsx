import Hero from "./Hero";
import Features from "./Features";
import CourseLevels from "./CourseLevels";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <CourseLevels />
    </div>
  );
};

export default Landing;