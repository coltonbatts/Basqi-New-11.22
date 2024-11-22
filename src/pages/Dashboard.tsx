import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '@/providers/SupabaseProvider';
import { Plus, Image, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useSupabase();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="pt-24">
      <div className="container mx-auto px-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-display uppercase">Dashboard</h1>
          <button 
            onClick={() => navigate('/upload')}
            className="inline-flex items-center space-x-2 bg-white text-black px-6 py-3 hover:bg-neutral-200 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="text-sm uppercase tracking-ultra font-bold">Upload Work</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Stats */}
          <div className="col-span-2 grid grid-cols-3 gap-4">
            <StatCard title="Total Works" value="0" />
            <StatCard title="Views" value="0" />
            <StatCard title="Followers" value="0" />
          </div>

          {/* Profile Preview */}
          <div className="bg-white/5 p-8 border-2 border-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display uppercase">Profile</h3>
              <button 
                onClick={() => navigate('/settings')}
                className="text-sm uppercase tracking-ultra font-bold hover:text-neutral-400 transition-colors"
              >
                Edit
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-neutral-400">Name</p>
              <p className="font-bold">{user.name || 'Add your name'}</p>
              <p className="text-neutral-400">Medium</p>
              <p className="font-bold">{user.medium || 'Add your medium'}</p>
              <p className="text-neutral-400">Bio</p>
              <p className="font-bold">{user.bio || 'Add your bio'}</p>
            </div>
          </div>
        </div>

        {/* Recent Works */}
        <section className="mt-16">
          <h2 className="text-2xl font-display uppercase mb-8">Recent Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <UploadCard />
          </div>
        </section>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-white/5 p-6 border-2 border-white">
    <p className="text-sm uppercase tracking-ultra font-bold text-neutral-400 mb-2">{title}</p>
    <p className="text-4xl font-display">{value}</p>
  </div>
);

const UploadCard = () => (
  <motion.div
    whileHover={{ scale: 0.98 }}
    className="border-2 border-white/50 border-dashed p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-white transition-colors"
  >
    <Image className="w-12 h-12 mb-4 text-neutral-400" />
    <p className="text-sm uppercase tracking-ultra font-bold">Upload Your First Work</p>
  </motion.div>
);

export default Dashboard;