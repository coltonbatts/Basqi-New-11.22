import React from 'react';
import { motion } from 'framer-motion';
import { Circle, ArrowRight } from 'lucide-react';

const About = () => {
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
            <span className="text-sm uppercase tracking-mega font-bold mb-6 block">Manifesto</span>
            <h1 className="text-[12vw] font-display uppercase leading-[0.8] mb-12">
              Break
              <br />
              <span className="outline-text">The</span>
              <br />
              System
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-32 border-b-2 border-white">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-6xl font-display uppercase mb-8">Our Story</h2>
              <div className="space-y-6 text-xl">
                <p className="font-serif italic border-l-2 border-white pl-8">
                  Born in Fort Worth's underground, we're here to demolish the old ways 
                  of doing business in the art world.
                </p>
                <p>
                  No more middlemen taking their cut. No more arbitrary pricing. 
                  No more waiting to get paid.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Circle className="w-48 h-48 text-white" strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 border-b-2 border-white">
        <div className="container mx-auto px-8">
          <h2 className="text-6xl font-display uppercase mb-16">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <Value
              number="01"
              title="Raw Transparency"
              description="We expose the truth about pricing and payments in the art world."
            />
            <Value
              number="02"
              title="Artist First"
              description="Every feature we build serves the creator, not the gatekeepers."
            />
            <Value
              number="03"
              title="Power to People"
              description="We're building an army of artists ready to change the game."
            />
            <Value
              number="04"
              title="No Bullshit"
              description="Fair pay, clear terms, and zero tolerance for exploitation."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-6xl font-display uppercase mb-8 md:mb-0">Join The Revolution</h2>
            <motion.div
              whileHover={{ scale: 0.95 }}
              className="group cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <span className="text-sm uppercase tracking-ultra font-bold">Join Now</span>
                <div className="w-20 h-20 bg-white text-black flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                  <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Value = ({ number, title, description }: { number: string; title: string; description: string }) => (
  <motion.div 
    whileHover={{ x: 10 }}
    className="border-l-2 border-white pl-8"
  >
    <span className="text-sm uppercase tracking-ultra font-bold text-neutral-400 mb-2 block">
      {number}
    </span>
    <h3 className="text-3xl font-display uppercase mb-4">{title}</h3>
    <p className="text-xl">{description}</p>
  </motion.div>
);

export default About;