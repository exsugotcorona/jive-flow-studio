import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

const Merch = () => {
  const products = [
    {
      id: 1,
      name: "DancePlanet T-Shirt",
      description: "Premium cotton t-shirt with our signature logo. Perfect for practice sessions.",
      price: "₹1,800",
      image: "/placeholder.svg",
      category: "Apparel",
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: 2,
      name: "Dance Practice Shoes",
      description: "Professional suede-soled shoes designed specifically for jive and swing dancing.",
      price: "₹6,500",
      image: "/placeholder.svg", 
      category: "Footwear",
      sizes: ["6", "7", "8", "9", "10", "11"]
    },
    {
      id: 3,
      name: "DancePlanet Hoodie",
      description: "Comfortable fleece hoodie for staying warm during practice or casual wear.",
      price: "₹3,200",
      image: "/placeholder.svg",
      category: "Apparel", 
      sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
      id: 4,
      name: "Practice Skirt",
      description: "Flowy practice skirt that moves beautifully with jive spins and turns.",
      price: "₹2,500",
      image: "/placeholder.svg",
      category: "Apparel",
      sizes: ["XS", "S", "M", "L", "XL"]
    },
    {
      id: 5,
      name: "Jive Music Collection",
      description: "Curated playlist of classic and modern jive tracks for practice and performance.",
      price: "₹999",
      image: "/placeholder.svg",
      category: "Music",
      sizes: ["Digital Download"]
    },
    {
      id: 6,
      name: "Dance Bag",
      description: "Spacious bag with compartments for shoes, clothes, and accessories.",
      price: "₹4,000",
      image: "/placeholder.svg",
      category: "Accessories",
      sizes: ["One Size"]
    }
  ];

  const categories = ["All", "Apparel", "Footwear", "Music", "Accessories"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 px-4 text-center bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            DancePlanet Merchandise
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get equipped with high-quality dance apparel, shoes, and accessories. 
            Everything you need to look and feel great while dancing.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="h-full flex flex-col">
                <CardHeader>
                  <div className="aspect-square bg-muted rounded-md mb-4 flex items-center justify-center">
                    <span className="text-muted-foreground">Product Image</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{product.category}</Badge>
                    <span className="text-xl font-bold text-primary">{product.price}</span>
                  </div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {product.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                  <div>
                    <h4 className="font-medium mb-2">Available Sizes:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <Badge key={size} variant="outline" className="text-xs">
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button className="w-full">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Info */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Shopping Information</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">
                Free shipping on orders over ₹5,000 within India.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Easy Returns</h3>
              <p className="text-muted-foreground">
                30-day return policy on all merchandise in original condition.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Student Discount</h3>
              <p className="text-muted-foreground">
                Current students receive 15% off all merchandise purchases.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Merch;