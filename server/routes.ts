import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import { profiles } from "../shared/schema";
import { eq } from "drizzle-orm";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
      // For now, return a mock response - authentication will be handled client-side
      res.json({ user: { id: '1', email }, error: null });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { email, password } = req.body;
      // For now, return a mock response - authentication will be handled client-side
      res.json({ user: { id: '1', email }, error: null });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Payment route - replacing instamojo-create-payment edge function
  app.post("/api/payment/create", async (req, res) => {
    try {
      const { amount, purpose, buyer_name, email, phone, redirect_url, product_id, product_type } = req.body;
      
      const apiKey = process.env.INSTAMOJO_PRIVATE_API_KEY;
      const authToken = process.env.INSTAMOJO_AUTH_TOKEN;

      if (!apiKey || !authToken) {
        return res.status(400).json({ error: "Missing Instamojo credentials" });
      }

      if (!amount || !purpose) {
        return res.status(400).json({ error: "Missing required fields: amount, purpose" });
      }

      const webhookUrl = `${req.protocol}://${req.get('host')}/api/payment/webhook`;

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
        return res.status(500).json({ error: data?.message || "Failed to create payment request" });
      }

      const url = data?.payment_request?.longurl;
      res.json({ url, raw: data });
    } catch (error: any) {
      console.error("Error in payment creation:", error);
      res.status(500).json({ error: error.message || "Unknown error" });
    }
  });

  // Payment webhook route - replacing instamojo-webhook edge function
  app.post("/api/payment/webhook", async (req, res) => {
    try {
      console.log("Payment webhook payload:", req.body);
      // TODO: Process payment webhook and update database records if needed
      res.json({ received: true });
    } catch (error: any) {
      console.error("Payment webhook error:", error);
      res.status(500).json({ error: error.message || "Unknown error" });
    }
  });

    // User profile routes
  app.get("/api/profile", async (req, res) => {
    try {
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      
      const userProfiles = await db
        .select()
        .from(profiles)
        .where(eq(profiles.email, String(email)))
        .limit(1);
      
      if (userProfiles.length === 0) {
        // Create a profile with just the email if it doesn't exist
        const newProfile = await db
          .insert(profiles)
          .values({ email: String(email) })
          .returning();
          
        return res.json(newProfile[0]);
      }
      
      res.json(userProfiles[0]);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/profile", async (req, res) => {
    try {
      const { email, username, phoneNumber } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      
      const updatedProfile = await db
        .update(profiles)
        .set({ 
          username: username || null,
          phoneNumber: phoneNumber || null,
          updatedAt: new Date()
        })
        .where(eq(profiles.email, email))
        .returning();
      
      if (updatedProfile.length === 0) {
        return res.status(404).json({ error: "Profile not found" });
      }
      
      res.json(updatedProfile[0]);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
