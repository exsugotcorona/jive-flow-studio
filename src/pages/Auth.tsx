import { SignIn, SignUp, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModernHero } from "@/components/ui/modern-hero";
import { motion } from "framer-motion";

const Auth = () => {
  const { isSignedIn } = useUser();

  // Redirect if already signed in
  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <ModernHero 
        title="Welcome Back" 
        subtitle="Sign in to access your dance journey"
      />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <Card className="border-primary/20 bg-card/95 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin" className="mt-6">
                  <div className="flex justify-center">
                    <SignIn 
                      fallbackRedirectUrl="/"
                      signUpUrl="/auth"
                      appearance={{
                        elements: {
                          rootBox: "w-full",
                          card: "shadow-none border-0 bg-transparent",
                        }
                      }}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="signup" className="mt-6">
                  <div className="flex justify-center">
                    <SignUp 
                      fallbackRedirectUrl="/"
                      signInUrl="/auth"
                      appearance={{
                        elements: {
                          rootBox: "w-full",
                          card: "shadow-none border-0 bg-transparent",
                        }
                      }}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;