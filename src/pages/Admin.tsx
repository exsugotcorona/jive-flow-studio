import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ModernHero } from "@/components/ui/modern-hero";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { motion } from "framer-motion";

interface SiteSettings {
  site_title: string;
  site_description: string;
  contact_email: string;
  contact_phone: string;
  studio_address: string;
}

const Admin = () => {
  const { isSignedIn, user } = useUser();
  const [settings, setSettings] = useState<SiteSettings>({
    site_title: "",
    site_description: "",
    contact_email: "",
    contact_phone: "",
    studio_address: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  // Check if user is admin (you can customize this logic)
  const isAdmin = user?.publicMetadata?.role === 'admin' || user?.emailAddresses[0]?.emailAddress === 'admin@example.com';

  // Redirect if not signed in or not admin
  if (!isSignedIn) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    if (isAdmin) {
      fetchSettings();
    }
  }, [isAdmin]);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

      if (error) throw error;

      if (data && data.length > 0) {
        const settingsObj: Partial<SiteSettings> = {};
        data.forEach((setting: any) => {
          settingsObj[setting.key as keyof SiteSettings] = setting.value;
        });
        setSettings({ ...settings, ...settingsObj });
      }
    } catch (error: any) {
      toast.error('Failed to fetch settings: ' + error.message);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const settingsArray = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
      }));

      const { error } = await supabase
        .from('site_settings')
        .upsert(settingsArray, { onConflict: 'key' });

      if (error) throw error;

      toast.success('Settings saved successfully!');
    } catch (error: any) {
      toast.error('Failed to save settings: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = (key: keyof SiteSettings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <ModernHero 
        title="Admin Dashboard" 
        subtitle="Manage your dance studio settings"
      />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border-primary/20 bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Site Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="site_title">Site Title</Label>
                <Input
                  id="site_title"
                  value={settings.site_title}
                  onChange={(e) => updateSetting('site_title', e.target.value)}
                  placeholder="Your Dance Studio Name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="site_description">Site Description</Label>
                <Textarea
                  id="site_description"
                  value={settings.site_description}
                  onChange={(e) => updateSetting('site_description', e.target.value)}
                  placeholder="A brief description of your dance studio..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_email">Contact Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={settings.contact_email}
                  onChange={(e) => updateSetting('contact_email', e.target.value)}
                  placeholder="contact@yourstudio.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_phone">Contact Phone</Label>
                <Input
                  id="contact_phone"
                  value={settings.contact_phone}
                  onChange={(e) => updateSetting('contact_phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="studio_address">Studio Address</Label>
                <Textarea
                  id="studio_address"
                  value={settings.studio_address}
                  onChange={(e) => updateSetting('studio_address', e.target.value)}
                  placeholder="123 Dance Street, City, State 12345"
                  rows={2}
                />
              </div>

              <Button 
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-elegant)]"
              >
                {isSaving ? 'Saving...' : 'Save Settings'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;