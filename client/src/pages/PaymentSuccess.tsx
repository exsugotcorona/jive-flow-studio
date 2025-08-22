import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const paymentId = params.get("payment_id") || params.get("payment_request_id");
  const status = params.get("payment_status") || "success";

  return (
    <main className="min-h-screen bg-background pt-20">
      <section className="py-24 px-4 text-center bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", bounce: 0.4 }}
              className="mx-auto w-24 h-24 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mb-8"
            >
              <CheckCircle className="h-12 w-12 text-white" />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground">
              Payment <span className="text-emerald-500">Successful</span>!
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Thank you! Your payment was processed successfully.
              {paymentId && (
                <span className="block mt-2 text-sm font-mono bg-muted/50 p-2 rounded-lg">
                  Reference: {paymentId}
                </span>
              )}
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <Link to="/courses">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-elegant)] transition-all duration-300 group">
                  Browse Courses
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/merch">
                <Button variant="outline" size="lg" className="border-primary/20 hover:border-primary/50 hover:bg-primary/10">
                  Shop More
                </Button>
              </Link>
              <Link to="/">
                <Button variant="ghost" size="lg" className="hover:bg-muted/50">
                  Go Home
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default PaymentSuccess;
