import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { ModernHero } from '@/components/ui/modern-hero';
import { motion } from 'framer-motion';
import { Settings, Save } from 'lucide-react';

interface SiteSettings {
  site_title: string;
  site_description: string;
  contact_email: string;
  contact_phone: string;
  studio_address: string;
}

const Admin = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const [settings, setSettings] = useState<SiteSettings>({
    site_title: '',
    site_description: '',
    contact_email: '',
    contact_phone: '',
    studio_address: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      fetchSettings();
    }
  }, [isAdmin]);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');

      if (error) throw error;

      const settingsObj: any = {};
      data?.forEach((setting) => {
        settingsObj[setting.key] = setting.value;
      });

      setSettings(settingsObj);
    } catch (error) {
      toast.error('Failed to load settings');
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updates = Object.entries(settings).map(([key, value]) => ({
        key,
        value: JSON.stringify(value),
        updated_by: user?.id,
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('site_settings')
          .upsert(update, { onConflict: 'key' });

        if (error) throw error;
      }

      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return <div className="min-h-screen bg-background pt-20" />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <ModernHero
        title="Admin Dashboard"
        subtitle="Manage your dance studio settings and configuration"
      />
      
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Site Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="site_title">Site Title</Label>
                    <Input
                      id="site_title"
                      value={settings.site_title}
                      onChange={(e) => setSettings(prev => ({ ...prev, site_title: e.target.value }))}
                      placeholder="DancePlanet"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact_email">Contact Email</Label>
                    <Input
                      id="contact_email"
                      type="email"
                      value={settings.contact_email}
                      onChange={(e) => setSettings(prev => ({ ...prev, contact_email: e.target.value }))}
                      placeholder="info@danceplanet.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact_phone">Contact Phone</Label>
                    <Input
                      id="contact_phone"
                      value={settings.contact_phone}
                      onChange={(e) => setSettings(prev => ({ ...prev, contact_phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site_description">Site Description</Label>
                  <Textarea
                    id="site_description"
                    value={settings.site_description}
                    onChange={(e) => setSettings(prev => ({ ...prev, site_description: e.target.value }))}
                    placeholder="Learn to dance with professional instructors"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="studio_address">Studio Address</Label>
                  <Textarea
                    id="studio_address"
                    value={settings.studio_address}
                    onChange={(e) => setSettings(prev => ({ ...prev, studio_address: e.target.value }))}
                    placeholder="123 Dance Street, Mumbai, India"
                    rows={3}
                  />
                </div>
                
                <Button onClick={handleSave} disabled={isSaving} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Settings'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Admin;