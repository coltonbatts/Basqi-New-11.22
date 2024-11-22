import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/lib/supabase';

interface SupabaseContextType {
  user: Profile | null;
  loading: boolean;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  async function fetchProfile(userId: string) {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Profile doesn't exist yet, create it
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: userId,
              email: userData.user?.email,
              name: '',
              medium: ''
            })
            .select()
            .single();

          if (insertError) throw insertError;
          setUser(newProfile);
        } else {
          throw error;
        }
      } else {
        setUser(data);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      // On error, sign out and redirect to login
      await supabase.auth.signOut();
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return null;
  }

  return (
    <SupabaseContext.Provider value={{ user, loading }}>
      {children}
    </SupabaseContext.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};