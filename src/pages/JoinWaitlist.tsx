import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const JoinWaitlist = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    const medium = formData.get('medium') as string;

    try {
      // Create the user account
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            medium
          }
        }
      });

      if (signUpError) throw signUpError;

      // Redirect to profile page to complete setup
      navigate('/profile');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24">
      <section className="min-h-[70vh] flex items-center border-b-2 border-white">
        <div className="container mx-auto px-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-sm uppercase tracking-mega font-bold mb-6 block">Join Us</span>
              <h1 className="text-[12vw] font-display uppercase leading-[0.8] mb-12">Join Us</h1>
            </motion.div>

            {error && (
              <div className="bg-red-500/10 border-2 border-red-500 p-4 mb-6">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-12">
              <FormField
                label="What Should We Call You?"
                type="text"
                name="name"
                placeholder="Your full name"
                required
              />

              <FormField
                label="Email"
                type="email"
                name="email"
                placeholder="your@email.com"
                required
              />

              <FormField
                label="Password"
                type="password"
                name="password"
                placeholder="Choose a secure password"
                required
                minLength={6}
              />

              <div>
                <label className="text-sm uppercase tracking-ultra font-bold mb-4 block">
                  Your Medium
                </label>
                <select
                  name="medium"
                  required
                  className="w-full bg-black border-2 border-white px-8 py-4 text-white focus:outline-none focus:border-neutral-400 transition-colors"
                >
                  <option value="">Select your medium</option>
                  <option value="photography">Photography</option>
                  <option value="painting">Painting</option>
                  <option value="sculpture">Sculpture</option>
                  <option value="digital">Digital Art</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <FormField
                label="Your Story (Optional)"
                type="textarea"
                name="bio"
                placeholder="Tell us about your art and vision..."
                rows={4}
              />

              <motion.button
                whileHover={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full group bg-white text-black py-6 flex items-center justify-center space-x-4 hover:bg-neutral-200 transition-colors disabled:opacity-50"
              >
                <span className="text-sm uppercase tracking-ultra font-bold">
                  {loading ? 'Creating Account...' : 'Create Account'}
                </span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </motion.button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

const FormField = ({ 
  label, 
  type, 
  name,
  placeholder, 
  required, 
  rows,
  minLength
}: { 
  label: string; 
  type: string;
  name: string;
  placeholder: string; 
  required?: boolean;
  rows?: number;
  minLength?: number;
}) => (
  <div>
    <label className="text-sm uppercase tracking-ultra font-bold mb-4 block">
      {label}
    </label>
    {type === 'textarea' ? (
      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full bg-black border-2 border-white px-8 py-4 text-white focus:outline-none focus:border-neutral-400 transition-colors"
      />
    ) : (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        className="w-full bg-black border-2 border-white px-8 py-4 text-white focus:outline-none focus:border-neutral-400 transition-colors"
      />
    )}
  </div>
);

export default JoinWaitlist;