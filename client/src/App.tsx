import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
import Landing from "./pages/Landing";
import About from "./pages/About";
import DanceCourses from "./pages/DanceCourses";
import Merch from "./pages/Merch";
import Contact from "./pages/Contact";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Navigation from "./components/Navigation";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen">
            <Navigation />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<DanceCourses />} />
              <Route path="/merch" element={<Merch />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/failed" element={<PaymentFailed />} />
              <Route path="/cart" element={<Cart />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
