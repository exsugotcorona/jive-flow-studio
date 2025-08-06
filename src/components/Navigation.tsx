import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              DancePlanet
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={cn(
                "text-foreground hover:text-primary transition-colors",
                isActive("/") && "text-primary font-medium"
              )}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className={cn(
                "text-foreground hover:text-primary transition-colors",
                isActive("/courses") && "text-primary font-medium"
              )}
            >
              Dance Courses
            </Link>
            <Link
              to="/merch"
              className={cn(
                "text-foreground hover:text-primary transition-colors",
                isActive("/merch") && "text-primary font-medium"
              )}
            >
              Merch
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;