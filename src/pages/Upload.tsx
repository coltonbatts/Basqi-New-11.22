import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '@/providers/SupabaseProvider';
import { Upload as UploadIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Upload = () => {
  const { user } = useSupabase();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('artworks')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('artworks')
        .getPublicUrl(filePath);

      // Create artwork record
      const { error: dbError } = await supabase
        .from('artworks')
        .insert({
          title: e.currentTarget.title.value,
          description: e.currentTarget.description.value,
          price: parseFloat(e.currentTarget.price.value),
          image_url: publicUrl,
          category: e.currentTarget.category.value,
          artist_id: user.id
        });

      if (dbError) throw dbError;
      navigate('/dashboard');
    } catch (error) {
      console.error('Error uploading artwork:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="pt-24">
      <div className="container mx-auto px-8 max-w-4xl">
        <h1 className="text-4xl font-display uppercase mb-12">Upload Work</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="artwork"
              required
            />
            <label
              htmlFor="artwork"
              className="block cursor-pointer"
            >
              {preview ? (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={preview}
                  alt="Preview"
                  className="w-full aspect-[3/2] object-cover border-2 border-white"
                />
              ) : (
                <motion.div
                  whileHover={{ scale: 0.98 }}
                  className="w-full aspect-[3/2] border-2 border-white/50 border-dashed flex flex-col items-center justify-center hover:border-white transition-colors"
                >
                  <UploadIcon className="w-12 h-12 mb-4 text-neutral-400" />
                  <p className="text-sm uppercase tracking-ultra font-bold">Upload Image</p>
                </motion.div>
              )}
            </label>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <input
              type="text"
              name="title"
              placeholder="Title"
              required
              className="bg-black border-2 border-white px-6 py-4 text-white focus:outline-none focus:border-neutral-400 transition-colors"
            />
            <input
              type="number"
              name="price"
              placeholder="Price (USD)"
              required
              min="0"
              step="0.01"
              className="bg-black border-2 border-white px-6 py-4 text-white focus:outline-none focus:border-neutral-400 transition-colors"
            />
          </div>

          <select
            name="category"
            required
            className="w-full bg-black border-2 border-white px-6 py-4 text-white focus:outline-none focus:border-neutral-400 transition-colors"
          >
            <option value="">Select Category</option>
            <option value="painting">Painting</option>
            <option value="photography">Photography</option>
            <option value="digital">Digital Art</option>
            <option value="sculpture">Sculpture</option>
            <option value="other">Other</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            rows={4}
            required
            className="w-full bg-black border-2 border-white px-6 py-4 text-white focus:outline-none focus:border-neutral-400 transition-colors"
          />

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-white text-black py-4 text-sm uppercase tracking-ultra font-bold hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload Work'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;