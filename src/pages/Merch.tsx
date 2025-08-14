import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { motion } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Product Carousel Component
const ProductCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative group">
      <div className="aspect-square bg-background rounded-lg overflow-hidden relative">
        <img 
          src={images[currentIndex]} 
          alt="Product image"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Merch = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const products = [
    {
      id: 1,
      name: "Jive Being T-Shirt - Black",
      description: "100% Organic Spirited Flow. Premium black t-shirt with the iconic 'Jive Being' design. Perfect for expressing your dance spirit.",
      price: "₹1,800",
      images: [
        "/lovable-uploads/ffd76e88-7195-4bbb-bd98-c472ec762780.png",
        "/lovable-uploads/7ecd3a23-4e1e-4be4-b3ff-6752bf184695.png",
        "/lovable-uploads/5b56d68e-4573-4a10-9688-2b761008d52c.png"
      ],
      category: "Apparel",
      sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
      id: 2,
      name: "Jive Being T-Shirt - White",
      description: "100% Organic Spirited Flow. Premium white t-shirt with the iconic 'Jive Being' design. Made with love and powered by coffee & beats.",
      price: "₹1,800",
      images: [
        "/lovable-uploads/8a2c494d-d467-4a55-a8b8-1f7a676505c4.png",
        "/lovable-uploads/f182330d-30e8-4b75-94d0-9a7b121d66c8.png"
      ],
      category: "Apparel",
      sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
      id: 3,
      name: "Jive Being Tote Bag",
      description: "100% Organic Spirited Flow tote bag. Spacious canvas bag with the 'Jive Being' design. Perfect for carrying your dance essentials with style.",
      price: "₹1,200",
      images: [
        "/lovable-uploads/1aefbaa9-cb4f-442c-818a-9f7d5d376c0e.png"
      ],
      category: "Accessories",
      sizes: ["One Size"]
    }
  ];

  const categories = ["All", "Apparel", "Accessories"];

  const parseAmount = (price: string) => Number(price.replace(/[^\d]/g, ""));

  const createPayment = async (product: typeof products[number]) => {
    if (!isSignedIn) {
      toast.error("Please sign in to purchase items");
      navigate("/auth");
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke("instamojo-create-payment", {
        body: {
          amount: parseAmount(product.price),
          purpose: product.name,
          product_id: product.id,
          product_type: "merch",
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
      {/* Hero Section */}
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
              DancePlanet <span className="text-primary">Merchandise</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get equipped with high-quality dance apparel, shoes, and accessories. 
              Everything you need to look and feel great while dancing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Button
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                  className={category === "All" ? "bg-gradient-to-r from-primary to-primary-glow" : "hover:border-primary/50"}
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full flex flex-col relative overflow-hidden group hover:shadow-[var(--shadow-elegant)] transition-all duration-500 border-border/50 hover:border-primary/30 bg-gradient-to-br from-background to-muted/30">
                  <Meteors number={3} />
                  <CardHeader>
                    <ProductCarousel images={product.images} />
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {product.category}
                      </Badge>
                      <span className="text-xl font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {product.price}
                      </span>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {product.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <div>
                      <h4 className="font-medium mb-2 text-foreground">Available Sizes:</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                          <Badge key={size} variant="outline" className="text-xs border-primary/30 hover:border-primary/50">
                            {size}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-elegant)] transition-all duration-300" 
                      onClick={() => createPayment(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Buy Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Info */}
      <section className="py-24 px-4 bg-gradient-to-b from-muted/30 to-background relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
              Shopping <span className="text-primary">Information</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-sm">
              {[
                {
                  title: "Free Shipping",
                  description: "Free shipping on orders over ₹5,000 within India."
                },
                {
                  title: "Easy Returns", 
                  description: "30-day return policy on all merchandise in original condition."
                },
                {
                  title: "Student Discount",
                  description: "Current students receive 15% off all merchandise purchases."
                }
              ].map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-background/50 backdrop-blur-sm p-6 rounded-lg border border-border/50"
                >
                  <h3 className="font-semibold mb-2 text-foreground">{info.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {info.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Merch;