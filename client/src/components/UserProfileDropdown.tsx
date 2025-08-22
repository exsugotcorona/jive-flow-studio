import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { User, Edit, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/sonner';

const profileSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters').optional().or(z.literal('')),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits').optional().or(z.literal('')),
});

type ProfileForm = z.infer<typeof profileSchema>;

interface Profile {
  email: string;
  username?: string;
  phoneNumber?: string;
}

export const UserProfileDropdown = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: '',
      phoneNumber: '',
    },
  });

  useEffect(() => {
    if (user?.email) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const response = await fetch(`/api/profile?email=${encodeURIComponent(user?.email || '')}`);
      if (response.ok) {
        const profileData = await response.json();
        setProfile(profileData);
        form.reset({
          username: profileData.username || '',
          phoneNumber: profileData.phoneNumber || '',
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const onSubmit = async (data: ProfileForm) => {
    setLoading(true);
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user?.email,
          username: data.username || null,
          phoneNumber: data.phoneNumber || null,
        }),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setIsProfileDialogOpen(false);
        toast.success('Profile updated successfully!');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-sm font-medium px-3 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          <User className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Signed in as</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-2">
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Username: </span>
              <span className="text-muted-foreground">
                {profile?.username || 'Not set'}
              </span>
            </div>
            <div>
              <span className="font-medium">Phone: </span>
              <span className="text-muted-foreground">
                {profile?.phoneNumber || 'Not set'}
              </span>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit Profile</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Update your username and phone number here.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email (cannot be changed)</Label>
                  <Input
                    id="email"
                    value={user.email}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    {...form.register('username')}
                    placeholder="Enter your username"
                  />
                  {form.formState.errors.username && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.username.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    {...form.register('phoneNumber')}
                    placeholder="Enter your phone number"
                  />
                  {form.formState.errors.phoneNumber && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save changes'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};