import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center border-b-2 border-white">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-sm uppercase tracking-mega font-bold mb-6 block text-white">
                Fort Worth's Premiere Art Platform
              </span>
              <h1 className="text-[16vw] font-display uppercase leading-[0.8] mb-12">
                Just
                <br />
                <span className="outline-text">Do</span>
                <br />
                Shit
              </h1>
              <div className="grid grid-cols-2 gap-8">
                <p className="text-2xl font-serif italic border-l-2 border-white pl-8">
                  A platform for artists
                </p>
                <div className="flex justify-end items-center space-x-6">
                  <Link
                    to="/login"
                    className="text-sm uppercase tracking-ultra font-bold hover:text-neutral-400 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/join-waitlist"
                    className="inline-flex items-center space-x-4 group"
                  >
                    <span className="text-sm uppercase tracking-ultra font-bold">Join Us</span>
                    <div className="w-20 h-20 bg-white text-black rounded-none flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                      <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-32 border-b-2 border-white">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <FeaturedWork
              title="Raw Energy"
              category="Photography"
              image="https://images.unsplash.com/photo-1533158628620-7e35717d36e8?w=800&q=80"
            />
            <FeaturedWork
              title="Urban Decay"
              category="Mixed Media"
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"
            />
          </div>
        </div>
      </section>

      {/* Scrolling Text */}
      <section className="py-32 overflow-hidden">
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: '-100%' }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="text-[20vw] font-display uppercase leading-none outline-text whitespace-nowrap"
        >
          Just Do Shit
        </motion.div>
      </section>
    </div>
  );
};

const FeaturedWork = ({ title, category, image }: { title: string; category: string; image: string }) => (
  <motion.div 
    whileHover={{ scale: 0.98 }}
    transition={{ duration: 0.3 }}
    className="group"
  >
    <div className="hover-image aspect-[3/4] mb-6 border-2 border-white overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
      />
    </div>
    <div className="space-y-2">
      <p className="text-sm uppercase tracking-ultra font-bold text-neutral-400">{category}</p>
      <h3 className="text-3xl font-display uppercase">{title}</h3>
    </div>
  </motion.div>
);

export default Home;