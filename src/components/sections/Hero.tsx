import React from 'react';
import { Github, Linkedin, Instagram, ChevronDown } from 'lucide-react';
import AnimatedText from '../ui/AnimatedText';
import Atropos from 'atropos/react';
import 'atropos/css';
import Avatar3D from '../ui/Avatar3D';

const Hero: React.FC = () => {
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/VRAJ8', icon: <Github size={20} /> },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/vraj-patel-86338a25a/', icon: <Linkedin size={20} /> },
    { name: 'Instagram', href: 'https://www.instagram.com/vraj._.8/', icon: <Instagram size={20} /> },
  ];

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden"
    >
      <Atropos
        className="w-full max-w-7xl"
        highlight={false}
        shadow={false}
        rotateXMax={3}
        rotateYMax={3}
        rotateTouch={false}
        activeOffset={40}
        duration={400}
      >
        <div className="glass-panel rounded-[32px] p-12 md:p-16 relative overflow-hidden">
          {/* Enhanced Background Layers */}
          <div 
            data-atropos-offset="-2"
            className="absolute inset-0 pointer-events-none"
          >
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-accent/5 to-transparent" />
            
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-accent/10 animate-pulse-slow" />
            
            {/* Grid pattern */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                                 linear-gradient(to bottom, white 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}
            />
            
            {/* Glowing orbs */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            {/* Avatar Section */}
            <div 
              data-atropos-offset="1"
              className="flex justify-center md:justify-start"
            >
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <div className="w-full h-full glass-panel rounded-[32px] overflow-hidden transform-gpu hover:scale-105 transition-transform duration-500 ease-apple">
                  <Avatar3D className="w-full h-full" />
                </div>
                <div 
                  data-atropos-offset="2"
                  className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-accent/20 to-transparent blur-xl -z-10"
                />
              </div>
            </div>

            {/* Content Section */}
            <div 
              data-atropos-offset="1"
              className="text-center md:text-left"
            >
              <AnimatedText 
                text="Hello, I'm Vraj" 
                className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 leading-tight pb-1" 
                delay={0.5}
              />
              
              <AnimatedText 
                text="Creative Developer & Designer" 
                className="text-xl md:text-2xl text-text-secondary mb-6" 
                delay={0.7}
              />
              
              <p className="text-text-secondary mb-8 max-w-lg">
                Crafting immersive digital experiences through the fusion of design and technology.
                Specializing in spatial computing and innovative user interfaces.
              </p>
              
              {/* Social links */}
              <div 
                data-atropos-offset="0.5"
                className="flex justify-center md:justify-start space-x-4 mb-8"
              >
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass-panel hover:bg-glass-lighter text-text-primary transition-all duration-300 hover:-translate-y-1"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
              
              {/* CTA Button */}
              <a
                href="#projects"
                className="inline-flex items-center accent-button hover:scale-105 transition-transform duration-300"
              >
                View My Work
              </a>
            </div>
          </div>
        </div>
      </Atropos>
      
      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center glass-panel p-3 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-300 hover:translate-y-1"
        aria-label="Scroll to About section"
      >
        <ChevronDown size={20} className="text-text-primary" />
      </a>
    </section>
  );
};

export default Hero;