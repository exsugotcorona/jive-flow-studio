import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { XCircle, RefreshCw, MessageCircle, ArrowLeft } from "lucide-react";

const PaymentFailed = () => {
  const [params] = useSearchParams();
  const reason = params.get("reason") || params.get("message");

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
              className="mx-auto w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mb-8"
            >
              <XCircle className="h-12 w-12 text-white" />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground">
              Payment <span className="text-red-500">Failed</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We couldn't process your payment. Please try again or contact support.
              {reason && (
                <span className="block mt-2 text-sm bg-muted/50 p-2 rounded-lg">
                  Reason: {reason}
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
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Try Courses Again
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-primary/20 hover:border-primary/50 hover:bg-primary/10">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Contact Support
                </Button>
              </Link>
              <Link to="/merch">
                <Button variant="ghost" size="lg" className="hover:bg-muted/50">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back to Shop
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default PaymentFailed;
