import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const parseAmount = (priceStr: string) => {
    return parseFloat(priceStr.replace('₹', '').replace(',', ''));
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please sign in to checkout');
      navigate('/auth');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    try {
      // Create a single payment for all cart items
      const totalAmount = getCartTotal();
      const itemDescriptions = items.map(item => 
        `${item.name}${item.size ? ` (${item.size})` : ''} x${item.quantity}`
      ).join(', ');

      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmount,
          purpose: `Cart Checkout: ${itemDescriptions}`,
          product_type: 'cart',
          redirect_url: `${window.location.origin}/payment/success`,
          email: user.email,
        }),
      });

      const data = await response.json();
      if (response.ok && data.url) {
        // Clear cart on successful payment initiation
        clearCart();
        window.location.href = data.url;
      } else {
        toast.error(data.error || 'Failed to start checkout. Please try again.');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Checkout error');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-6">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground" />
            <h1 className="text-3xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground">
              Add some amazing dance merchandise to get started!
            </p>
            <Button onClick={() => navigate('/merch')} className="px-8 py-3">
              Shop Merch
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <Card key={`${item.id}-${item.size || 'no-size'}-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        {item.size && (
                          <p className="text-muted-foreground">Size: {item.size}</p>
                        )}
                        <p className="text-xl font-bold text-primary mt-2">{item.price}</p>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                              className="w-8 h-8"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="font-semibold min-w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                              className="w-8 h-8"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeFromCart(item.id, item.size)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {items.map((item, index) => (
                      <div 
                        key={`${item.id}-${item.size || 'no-size'}-summary-${index}`}
                        className="flex justify-between text-sm"
                      >
                        <span>{item.name} {item.size && `(${item.size})`} x{item.quantity}</span>
                        <span>₹{(parseAmount(item.price) * item.quantity).toFixed(0)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{getCartTotal().toFixed(0)}</span>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full mt-6"
                    onClick={handleCheckout}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full mt-2"
                    onClick={() => navigate('/merch')}
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;