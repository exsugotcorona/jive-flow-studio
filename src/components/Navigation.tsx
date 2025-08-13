import { FloatingNav } from "@/components/ui/floating-navbar";
import { Home, BookOpen, ShoppingBag, Mail, Users } from "lucide-react";

const Navigation = () => {
  const navItems = [
    { name: "Home", link: "/", icon: <Home className="h-4 w-4" /> },
    { name: "About", link: "/about", icon: <Users className="h-4 w-4" /> },
    { name: "Courses", link: "/courses", icon: <BookOpen className="h-4 w-4" /> },
    { name: "Merch", link: "/merch", icon: <ShoppingBag className="h-4 w-4" /> },
    { name: "Contact", link: "/contact", icon: <Mail className="h-4 w-4" /> },
  ];

  return <FloatingNav navItems={navItems} />;
};

export default Navigation;