import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '@/providers/SupabaseProvider';
import { Camera, Save, ArrowLeft, Plus, Grid, List } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import type { Artwork } from '@/lib/supabase';

const Profile = () => {
  const { user } = useSupabase();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.profile_image || '');
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('artist_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArtworks(data || []);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      let profile_image = user.profile_image;

      if (avatar) {
        const fileExt = avatar.name.split('.').pop();
        const fileName = `${user.id}-avatar.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatar, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);

        profile_image = publicUrl;
      }

      const formData = new FormData(e.currentTarget);
      
      const { error } = await supabase
        .from('profiles')
        .update({
          name: formData.get('name'),
          medium: formData.get('medium'),
          bio: formData.get('bio'),
          profile_image,
          instagram: formData.get('instagram'),
          twitter: formData.get('twitter'),
          website: formData.get('website')
        })
        .eq('id', user.id);

      if (error) throw error;
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-8">
        <div className="flex justify-between items-center mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-sm uppercase tracking-ultra font-bold hover:text-neutral-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setView('grid')}
              className={`p-2 hover:text-neutral-400 transition-colors ${view === 'grid' ? 'text-white' : 'text-neutral-400'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 hover:text-neutral-400 transition-colors ${view === 'list' ? 'text-white' : 'text-neutral-400'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Profile Form */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-display uppercase mb-8">Profile Info</h2>

            {error && (
              <div className="bg-red-500/10 border-2 border-red-500 p-4 mb-6">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="text-sm uppercase tracking-ultra font-bold mb-2 block">
                  Profile Image
                </label>
                <div className="relative w-32 h-32 mb-8">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                    id="avatar"
                  />
                  <label htmlFor="avatar">
                    <motion.div
                      whileHover={{ scale: 0.95 }}
                      className="w-full h-full border-2 border-white cursor-pointer overflow-hidden group"
                    >
                      {avatarPreview ? (
                        <div className="relative w-full h-full">
                          <img 
                            src={avatarPreview} 
                            alt="Avatar preview" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Camera className="w-8 h-8" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Camera className="w-8 h-8" />
                        </div>
                      )}
                    </motion.div>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm uppercase tracking-ultra font-bold mb-2 block">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user.name}
                  required
                  placeholder="Your full name"
                  className="w-full bg-black border-2 border-white px-6 py-4 text-white focus:outline-none focus:border-neutral-400 transition-colors"
                />
              </div>

              <div>
                <label className="text-sm uppercase tracking-ultra font-bold mb-2 block">
                  Medium
                </label>
                <select
                  name="medium"
                  defaultValue={user.medium}
                  required
                  className="w-full bg-black border-2 border-white px-6 py-4 text-white focus:outline-none focus:border-neutral-400 transition-colors"
                >
                  <option value="">Select your medium</option>
                  <option value="photography">Photography</option>
                  <option value="painting">Painting</option>
                  <option value="sculpture">Sculpture</option>
                  <option value="digital">Digital Art</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm uppercase tracking-ultra font-bold mb-2 block">
                  Bio
                </label>
                <textarea
                  name="bio"
                  defaultValue={user.bio || ''}
                  placeholder="Tell us about yourself and your art..."
                  rows={4}
                  className="w-full bg-black border-2 border-white px-6 py-4 text-white focus:outline-none focus:border-neutral-400 transition-colors"
                />
              </div>

              <div>
                <label className="text-sm uppercase tracking-ultra font-bold mb-2 block">
                  Social Links
                </label>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="instagram"
                    placeholder="Instagram username"
                    className="w-full bg-black border-2 border-white px-6 py-4 text-white focus:outline-none focus:border-neutral-400 transition-colors"
                  />
                  <input
                    type="text"
                    name="twitter"
                    placeholder="Twitter username"
                    className="w-full bg-black border-2 border-white px-6 py-4 text-white focus:outline-none focus:border-neutral-400 transition-colors"
                  />
                  <input
                    type="url"
                    name="website"
                    placeholder="Personal website"
                    className="w-full bg-black border-2 border-white px-6 py-4 text-white focus:outline-none focus:border-neutral-400 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full group bg-white text-black py-4 flex items-center justify-center space-x-4 hover:bg-neutral-200 transition-colors disabled:opacity-50"
              >
                <span className="text-sm uppercase tracking-ultra font-bold">
                  {saving ? 'Saving...' : 'Save Profile'}
                </span>
                <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </form>
          </div>

          {/* Artworks */}
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-display uppercase">Your Work</h2>
              <button
                onClick={() => navigate('/upload')}
                className="inline-flex items-center space-x-2 bg-white text-black px-6 py-3 hover:bg-neutral-200 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span className="text-sm uppercase tracking-ultra font-bold">Upload Work</span>
              </button>
            </div>

            {loading ? (
              <p>Loading your work...</p>
            ) : artworks.length === 0 ? (
              <div className="text-center py-12 border-2 border-white/50 border-dashed">
                <p className="text-neutral-400 mb-4">No artworks yet</p>
                <button
                  onClick={() => navigate('/upload')}
                  className="text-sm uppercase tracking-ultra font-bold hover:text-neutral-400 transition-colors"
                >
                  Upload Your First Work
                </button>
              </div>
            ) : (
              <div className={view === 'grid' ? 'grid grid-cols-2 gap-8' : 'space-y-8'}>
                {artworks.map((artwork) => (
                  <ArtworkCard 
                    key={artwork.id} 
                    artwork={artwork} 
                    view={view}
                    onDelete={fetchArtworks}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ArtworkCard = ({ 
  artwork, 
  view,
  onDelete 
}: { 
  artwork: Artwork; 
  view: 'grid' | 'list';
  onDelete: () => void;
}) => {
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this artwork?')) return;

    try {
      const { error } = await supabase
        .from('artworks')
        .delete()
        .eq('id', artwork.id);

      if (error) throw error;
      onDelete();
    } catch (error) {
      console.error('Error deleting artwork:', error);
    }
  };

  if (view === 'list') {
    return (
      <motion.div
        whileHover={{ x: 10 }}
        className="border-2 border-white p-6 flex items-center justify-between group"
      >
        <div className="flex items-center space-x-6">
          <img 
            src={artwork.image_url} 
            alt={artwork.title}
            className="w-24 h-24 object-cover"
          />
          <div>
            <h3 className="text-xl font-display uppercase">{artwork.title}</h3>
            <p className="text-neutral-400">${artwork.price}</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition-opacity"
        >
          Delete
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 0.98 }}
      className="border-2 border-white group"
    >
      <div className="aspect-square">
        <img 
          src={artwork.image_url} 
          alt={artwork.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-display uppercase">{artwork.title}</h3>
            <p className="text-neutral-400">${artwork.price}</p>
          </div>
          <button
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition-opacity"
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;