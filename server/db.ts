import { createClient } from '@supabase/supabase-js';

// Use the correct Supabase URL - the environment variable seems to have the wrong format
const supabaseUrl = "https://jopvqjrosznrtiyufowg.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvcHZxanJvc3pucnRpeXVmb3dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4NDE0OTYsImV4cCI6MjA3MDQxNzQ5Nn0.IQqUccHL6_yfbGhE9fymjNxuw401C3AD2hIwsG45UIY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For direct database queries, we'll use Supabase client instead of Drizzle
export const db = supabase;