import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Circle, LogOut } from 'lucide-react';
import { useSupabase } from '@/providers/SupabaseProvider';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
  const { user } = useSupabase();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b-2 border-white">
      <div className="container mx-auto px-8">
        <div className="flex justify-between items-center h-24">
          <Link to="/" className="flex items-center space-x-3">
            <Circle className="h-8 w-8 text-white" strokeWidth={3} />
            <span className="text-xl font-display tracking-ultra uppercase">
              Basqi
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-12">
            {user ? (
              <>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/artists">Artists</NavLink>
                <NavLink to="/about">About</NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-sm uppercase tracking-ultra font-bold hover:text-neutral-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/login">Login</NavLink>
                <Link
                  to="/join-waitlist"
                  className="px-8 py-3 bg-white text-black uppercase tracking-ultra text-sm font-bold hover:bg-neutral-200 transition-colors duration-300"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link 
    to={to} 
    className="nav-link text-sm uppercase tracking-ultra font-bold hover:text-neutral-300"
  >
    {children}
  </Link>
);