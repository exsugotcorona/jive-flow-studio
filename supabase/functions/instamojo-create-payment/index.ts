import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { amount, purpose, buyer_name, email, phone, redirect_url, product_id, product_type } = body ?? {};

    const apiKey = Deno.env.get("INSTAMOJO_PRIVATE_API_KEY");
    const authToken = Deno.env.get("INSTAMOJO_AUTH_TOKEN");

    if (!apiKey || !authToken) {
      return new Response(
        JSON.stringify({ error: "Missing Instamojo classic credentials (INSTAMOJO_PRIVATE_API_KEY / INSTAMOJO_AUTH_TOKEN)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!amount || !purpose) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: amount, purpose" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const webhookUrl = `https://jopvqjrosznrtiyufowg.supabase.co/functions/v1/instamojo-webhook`;

    const params = new URLSearchParams();
    params.append("purpose", String(purpose));
    params.append("amount", String(amount));
    if (buyer_name) params.append("buyer_name", String(buyer_name));
    if (email) params.append("email", String(email));
    if (phone) params.append("phone", String(phone));
    if (redirect_url) params.append("redirect_url", String(redirect_url));
    params.append("webhook", webhookUrl);
    params.append("allow_repeated_payments", "false");
    params.append("send_email", email ? "true" : "false");
    params.append("send_sms", phone ? "true" : "false");
    params.append("currency", "INR");
    if (product_id) params.append("note", `${product_type ?? "item"}:${product_id}`);

    const response = await fetch("https://www.instamojo.com/api/1.1/payment-requests/", {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
        "X-Auth-Token": authToken,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (!response.ok || data?.success === false) {
      console.error("Instamojo create-payment error:", data);
      return new Response(
        JSON.stringify({ error: data?.message || "Failed to create payment request" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const url = data?.payment_request?.longurl;

    return new Response(
      JSON.stringify({ url, raw: data }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in instamojo-create-payment:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
