import { supabase } from './supabase';
import type { Artwork, Profile } from './supabase';

export const api = {
  artworks: {
    list: async () => {
      const { data, error } = await supabase
        .from('artworks')
        .select(`
          *,
          profiles:artist_id (
            name,
            art_medium
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as (Artwork & { profiles: Profile })[];
    },

    create: async (artwork: Omit<Artwork, 'id' | 'created_at' | 'artist_id'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('artworks')
        .insert({
          ...artwork,
          artist_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    get: async (id: string) => {
      const { data, error } = await supabase
        .from('artworks')
        .select(`
          *,
          profiles:artist_id (
            name,
            art_medium,
            bio
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as (Artwork & { profiles: Profile });
    }
  },

  profiles: {
    get: async (id: string) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Profile;
    },

    update: async (profile: Partial<Profile>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data as Profile;
    }
  }
};