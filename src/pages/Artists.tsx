import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Palette, Brush, PenTool } from 'lucide-react';

const Artists = () => {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="min-h-[70vh] flex items-center border-b-2 border-white">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm uppercase tracking-mega font-bold mb-6 block">The Crew</span>
            <h1 className="text-[12vw] font-display uppercase leading-[0.8] mb-12">
              Raw
              <br />
              <span className="outline-text">Talent</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Artists Grid */}
      <section className="py-32">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {artists.map((artist, index) => (
              <ArtistCard key={index} {...artist} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const artists = [
  {
    name: "Sarah Chen",
    medium: "Photography",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
    description: "Capturing the raw energy of urban life",
    icon: Camera
  },
  {
    name: "Marcus Rivera",
    medium: "Digital Art",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    description: "Breaking boundaries in digital spaces",
    icon: PenTool
  },
  {
    name: "Emily Thompson",
    medium: "Oil Painting",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
    description: "Reimagining Texas through bold strokes",
    icon: Palette
  },
  {
    name: "David Kim",
    medium: "Mixed Media",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
    description: "Blending tradition with digital rebellion",
    icon: Brush
  }
];

const ArtistCard = ({ name, medium, image, description, icon: Icon }: {
  name: string;
  medium: string;
  image: string;
  description: string;
  icon: React.ElementType;
}) => (
  <motion.div
    whileHover={{ scale: 0.98 }}
    className="group border-2 border-white"
  >
    <div className="relative aspect-[3/4] overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
      />
      <div className="absolute top-4 right-4 w-12 h-12 bg-white text-black flex items-center justify-center">
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <div className="p-8 border-t-2 border-white">
      <h3 className="text-3xl font-display uppercase mb-2">{name}</h3>
      <p className="text-sm uppercase tracking-ultra font-bold text-neutral-400 mb-4">{medium}</p>
      <p className="text-xl">{description}</p>
    </div>
  </motion.div>
);

export default Artists;