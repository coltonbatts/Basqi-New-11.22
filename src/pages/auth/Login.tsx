import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { ArrowRight } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/profile');
    } catch (error: any) {
      setError(error.message || 'Error logging in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="max-w-md w-full px-8">
        <h1 className="text-4xl font-display uppercase mb-8">Login</h1>
        
        {error && (
          <div className="bg-red-500/10 border-2 border-red-500 p-4 mb-6">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-sm uppercase tracking-ultra font-bold mb-2 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-black border-2 border-white px-4 py-3 text-white focus:outline-none focus:border-neutral-400 transition-colors"
            />
          </div>

          <div>
            <label className="text-sm uppercase tracking-ultra font-bold mb-2 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-black border-2 border-white px-4 py-3 text-white focus:outline-none focus:border-neutral-400 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full group bg-white text-black py-4 flex items-center justify-center space-x-4 hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            <span className="text-sm uppercase tracking-ultra font-bold">
              {loading ? 'Logging in...' : 'Login'}
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-neutral-400">Don't have an account?</p>
          <Link 
            to="/join-waitlist" 
            className="text-sm uppercase tracking-ultra font-bold hover:text-neutral-400 transition-colors mt-2 inline-block"
          >
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
}