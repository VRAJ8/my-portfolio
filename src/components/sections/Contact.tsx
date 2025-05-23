import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import AnimatedText from '../ui/AnimatedText';
import ContactForm from '../ui/ContactForm';

const Contact: React.FC = () => {
  const contactInfo = [
    {
      title: 'Email',
      value: 'vrajp8918@gmail.com',
      href: 'mailto:vrajp8918@gmail.com',
      icon: <Mail size={24} className="text-accent" />
    },
    {
      title: 'Location',
      value: 'Ankleshwar, Gujarat, India',
      href: 'https://maps.google.com/?q=Ankleshwar,+Gujarat,+India',
      icon: <MapPin size={24} className="text-accent" />
    },
    {
      title: 'Phone',
      value: '+91 8200995401',
      href: 'tel:+918200995401',
      icon: <Phone size={24} className="text-accent" />
    }
  ];

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="section-container">
        <AnimatedText 
          text="Get In Touch"
          className="section-title text-center mb-16 text-text-primary-light dark:text-white group"
          delay={0.2}
        >
          <span className="block w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-1/4 mt-2 mx-auto" />
        </AnimatedText>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            className="flex flex-col justify-between"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-text-primary-light dark:text-white group">
                Let's Connect
                <span className="block w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-1/3 mt-2" />
              </h3>
              <p className="text-text-primary-light/80 dark:text-white/80 mb-8 max-w-md">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
              </p>
              
              <div className="space-y-6 mb-12">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    target={info.title === 'Location' ? '_blank' : undefined}
                    rel={info.title === 'Location' ? 'noopener noreferrer' : undefined}
                    className="glass-panel dark:glass-panel rounded-card p-4 flex items-center hover:bg-glass-lighter transition-all duration-300 border border-text-primary-light/10 dark:border-white/10 shadow-glass-light dark:shadow-glass hover:border-accent/30 dark:hover:border-accent/30"
                    whileHover={{ x: 5, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div 
                      className="mr-4"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {info.icon}
                    </motion.div>
                    <div>
                      <h4 className="font-medium text-text-primary-light dark:text-white">{info.title}</h4>
                      <p className="text-text-primary-light/80 dark:text-white/80">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
            
            <motion.div
              className="glass-panel dark:glass-panel rounded-card p-6 max-w-md border border-text-primary-light/10 dark:border-white/10 shadow-glass-light dark:shadow-glass hover:border-accent/30 dark:hover:border-accent/30 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            >
              <p className="text-text-primary-light/80 dark:text-white/80 italic">
                "The future of computing is spatial, and it's already here. Let's build it together."
              </p>
            </motion.div>
          </motion.div>
          
          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;