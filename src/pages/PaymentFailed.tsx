import { Link, useSearchParams } from "react-router-dom";

const PaymentFailed = () => {
  const [params] = useSearchParams();
  const reason = params.get("reason") || params.get("message");

  return (
    <main className="min-h-screen bg-background">
      <section className="py-16 px-4 text-center bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">Payment Failed</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't process your payment. {reason ? `Reason: ${reason}` : "Please try again or contact support."}
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/courses" className="underline">Try Courses Again</Link>
            <Link to="/merch" className="underline">Back to Shop</Link>
            <Link to="/contact" className="underline">Contact Support</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PaymentFailed;
