import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { LogOut } from "lucide-react";

const Admin = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen">
      {/* Admin Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">Welcome, {user.email}</p>
          </div>
          <Button 
            onClick={handleSignOut}
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Dashboard Content */}
      <AdminDashboard />
    </div>
  );
};

export default Admin;