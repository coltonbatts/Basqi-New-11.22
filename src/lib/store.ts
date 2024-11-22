import { create } from 'zustand';
import { supabase } from './supabase';
import type { Profile } from './supabase';

interface AuthState {
  user: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, artMedium: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profile: Partial<Profile>) => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: true,
  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  },
  signUp: async (email, password, name, artMedium) => {
    const { error: signUpError, data } = await supabase.auth.signUp({
      email,
      password,
    });
    if (signUpError) throw signUpError;

    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          name,
          art_medium: artMedium,
          email,
        });
      if (profileError) throw profileError;
    }
  },
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null });
  },
  updateProfile: async (profile) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No user logged in');

    const { error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', user.id);

    if (error) throw error;
  },
}));