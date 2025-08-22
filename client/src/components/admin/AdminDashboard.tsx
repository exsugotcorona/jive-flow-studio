import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
// Removed Supabase import - now using server API
import { Settings, Users, Edit, Save, Globe, Phone, Mail, MapPin } from 'lucide-react';

const siteSettingsSchema = z.object({
  siteName: z.string().min(1, 'Site name is required'),
  tagline: z.string().min(1, 'Tagline is required'),
  description: z.string().min(1, 'Description is required'),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email('Valid email is required'),
  address: z.string().min(1, 'Address is required'),
  socialMedia: z.object({
    facebook: z.string().url().optional().or(z.literal('')),
    instagram: z.string().url().optional().or(z.literal('')),
    youtube: z.string().url().optional().or(z.literal('')),
    whatsapp: z.string().optional().or(z.literal(''))
  })
});

type SiteSettingsForm = z.infer<typeof siteSettingsSchema>;

const heroContentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  ctaText: z.string().min(1, 'CTA text is required')
});

type HeroContentForm = z.infer<typeof heroContentSchema>;

export const AdminDashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('site-settings');

  const siteForm = useForm<SiteSettingsForm>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      siteName: 'Dance Planet',
      tagline: 'Pure happiness! This is what dancing is all about..',
      description: 'Learn dance from professional choreographers',
      phone: '+91 98200 36969',
      email: 'info@danceplanet.com',
      address: 'Mumbai, India',
      socialMedia: {
        facebook: '',
        instagram: '',
        youtube: '',
        whatsapp: ''
      }
    }
  });

  const heroForm = useForm<HeroContentForm>({
    resolver: zodResolver(heroContentSchema),
    defaultValues: {
      title: 'Welcome to Dance Planet',
      subtitle: 'Learn from the best choreographers',
      ctaText: 'Start Dancing'
    }
  });

  useEffect(() => {
    loadSiteSettings();
  }, []);

  const loadSiteSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        if (data.site_info) {
          siteForm.reset(data.site_info);
        }
        if (data.hero_content) {
          heroForm.reset(data.hero_content);
        }
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSiteSettings = async (data: SiteSettingsForm) => {
    setLoading(true);
    try {
      const response = await fetch('/api/settings/site_info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Site settings updated successfully',
        });
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to update site settings',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const saveHeroContent = async (data: HeroContentForm) => {
    setLoading(true);
    try {
      const response = await fetch('/api/settings/hero_content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Hero content updated successfully',
        });
      } else {
        throw new Error('Failed to save hero content');
      }
    } catch (error) {
      console.error('Error saving hero content:', error);
      toast({
        title: 'Error',
        description: 'Failed to update hero content',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/10 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your site content and settings
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="site-settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Site Settings
            </TabsTrigger>
            <TabsTrigger value="hero-content" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Hero Content
            </TabsTrigger>
            <TabsTrigger value="content-management" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="user-management" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="site-settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Site Settings
                </CardTitle>
                <CardDescription>
                  Configure basic site information and contact details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={siteForm.handleSubmit(saveSiteSettings)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input
                        id="siteName"
                        {...siteForm.register('siteName')}
                        placeholder="Dance Planet"
                      />
                      {siteForm.formState.errors.siteName && (
                        <p className="text-sm text-destructive">
                          {siteForm.formState.errors.siteName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tagline">Tagline</Label>
                      <Input
                        id="tagline"
                        {...siteForm.register('tagline')}
                        placeholder="Pure happiness! This is what dancing is all about.."
                      />
                      {siteForm.formState.errors.tagline && (
                        <p className="text-sm text-destructive">
                          {siteForm.formState.errors.tagline.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      {...siteForm.register('description')}
                      placeholder="Learn dance from professional choreographers"
                      rows={3}
                    />
                    {siteForm.formState.errors.description && (
                      <p className="text-sm text-destructive">
                        {siteForm.formState.errors.description.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        {...siteForm.register('phone')}
                        placeholder="+91 98200 36969"
                      />
                      {siteForm.formState.errors.phone && (
                        <p className="text-sm text-destructive">
                          {siteForm.formState.errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...siteForm.register('email')}
                        placeholder="info@danceplanet.com"
                      />
                      {siteForm.formState.errors.email && (
                        <p className="text-sm text-destructive">
                          {siteForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Address
                      </Label>
                      <Input
                        id="address"
                        {...siteForm.register('address')}
                        placeholder="Mumbai, India"
                      />
                      {siteForm.formState.errors.address && (
                        <p className="text-sm text-destructive">
                          {siteForm.formState.errors.address.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Social Media Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="facebook">Facebook URL</Label>
                        <Input
                          id="facebook"
                          {...siteForm.register('socialMedia.facebook')}
                          placeholder="https://facebook.com/danceplanet"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="instagram">Instagram URL</Label>
                        <Input
                          id="instagram"
                          {...siteForm.register('socialMedia.instagram')}
                          placeholder="https://instagram.com/danceplanet"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="youtube">YouTube URL</Label>
                        <Input
                          id="youtube"
                          {...siteForm.register('socialMedia.youtube')}
                          placeholder="https://youtube.com/danceplanet"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="whatsapp">WhatsApp Number</Label>
                        <Input
                          id="whatsapp"
                          {...siteForm.register('socialMedia.whatsapp')}
                          placeholder="+91 98200 36969"
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" disabled={loading} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    {loading ? 'Saving...' : 'Save Settings'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hero-content">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Hero Section Content
                </CardTitle>
                <CardDescription>
                  Edit the main hero section content on your homepage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={heroForm.handleSubmit(saveHeroContent)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="heroTitle">Hero Title</Label>
                    <Input
                      id="heroTitle"
                      {...heroForm.register('title')}
                      placeholder="Welcome to Dance Planet"
                    />
                    {heroForm.formState.errors.title && (
                      <p className="text-sm text-destructive">
                        {heroForm.formState.errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                    <Textarea
                      id="heroSubtitle"
                      {...heroForm.register('subtitle')}
                      placeholder="Learn from the best choreographers"
                      rows={3}
                    />
                    {heroForm.formState.errors.subtitle && (
                      <p className="text-sm text-destructive">
                        {heroForm.formState.errors.subtitle.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ctaText">Call-to-Action Button Text</Label>
                    <Input
                      id="ctaText"
                      {...heroForm.register('ctaText')}
                      placeholder="Start Dancing"
                    />
                    {heroForm.formState.errors.ctaText && (
                      <p className="text-sm text-destructive">
                        {heroForm.formState.errors.ctaText.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" disabled={loading} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    {loading ? 'Saving...' : 'Save Hero Content'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content-management">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit className="h-5 w-5" />
                  Content Management
                </CardTitle>
                <CardDescription>
                  Manage your site's content sections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Edit className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Content Management</h3>
                  <p className="text-muted-foreground">
                    Advanced content management features coming soon...
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="user-management">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Management
                </CardTitle>
                <CardDescription>
                  Manage user accounts and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">User Management</h3>
                  <p className="text-muted-foreground">
                    User management features coming soon...
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};