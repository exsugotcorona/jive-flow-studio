import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const contentType = req.headers.get("content-type") || "";
    let payload: Record<string, string> = {};

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await req.text();
      const params = new URLSearchParams(text);
      params.forEach((value, key) => {
        payload[key] = value;
      });
    } else if (contentType.includes("application/json")) {
      payload = await req.json();
    } else {
      try {
        const form = await req.formData();
        for (const [key, value] of form.entries()) {
          payload[key] = String(value);
        }
      } catch (_) {
        // fallback: try reading raw text
        const text = await req.text();
        try {
          payload = JSON.parse(text);
        } catch {
          const params = new URLSearchParams(text);
          params.forEach((value, key) => (payload[key] = value));
        }
      }
    }

    // Optional verification: if you configured INSTAMOJO_WEBHOOK_SECRET, you can validate signature here
    // Note: Instamojo sends a `mac` field that can be verified using HMAC SHA1
    const secret = Deno.env.get("INSTAMOJO_WEBHOOK_SECRET");
    if (secret) {
      // Implement MAC verification here if needed
      // For now we just log and continue
    }

    console.log("Instamojo webhook payload:", payload);

    // TODO: Insert/update your own database records here if/when needed

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("instamojo-webhook error:", error);
    return new Response(JSON.stringify({ error: error.message || "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
