import { FloatingNav } from "@/components/ui/floating-navbar";
import { Home, BookOpen, ShoppingBag, Mail, Users, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const Navigation = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const navItems = [
    { name: "Home", link: "/", icon: <Home className="h-4 w-4" /> },
    { name: "About", link: "/about", icon: <Users className="h-4 w-4" /> },
    { name: "Courses", link: "/courses", icon: <BookOpen className="h-4 w-4" /> },
    { name: "Merch", link: "/merch", icon: <ShoppingBag className="h-4 w-4" /> },
    { name: "Contact", link: "/contact", icon: <Mail className="h-4 w-4" /> },
    { 
      name: `Cart${cartCount > 0 ? ` (${cartCount})` : ''}`, 
      link: "/cart", 
      icon: (
        <div className="relative">
          <ShoppingCart className="h-4 w-4" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </div>
      ) 
    },
  ];

  return <FloatingNav navItems={navItems} />;
};

export default Navigation;