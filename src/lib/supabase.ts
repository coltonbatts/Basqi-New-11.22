import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  name: string;
  email: string;
  medium: string;
  bio: string | null;
  profile_image: string | null;
  created_at: string;
}

export type Artwork = {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  artist_id: string;
  created_at: string;
  category: string;
}