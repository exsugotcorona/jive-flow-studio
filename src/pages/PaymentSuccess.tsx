import { Link, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const paymentId = params.get("payment_id") || params.get("payment_request_id");
  const status = params.get("payment_status") || "success";

  return (
    <main className="min-h-screen bg-background">
      <section className="py-16 px-4 text-center bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">Payment Successful</h1>
          <p className="text-muted-foreground mb-6">
            Thank you! Your payment was processed successfully.
            {paymentId ? ` Reference: ${paymentId}` : ""}
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/courses" className="underline">Browse Courses</Link>
            <Link to="/merch" className="underline">Shop More</Link>
            <Link to="/" className="underline">Go Home</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PaymentSuccess;
