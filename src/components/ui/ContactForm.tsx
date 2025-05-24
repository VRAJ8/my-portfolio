import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', message: '' };
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was a problem submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <motion.div
      className="glass-panel dark:glass-panel rounded-card p-8 border border-text-primary-light/10 dark:border-white/10 shadow-glass-light dark:shadow-glass hover:border-accent/30 dark:hover:border-accent/30 transition-all duration-300"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 className="text-2xl font-bold mb-6 text-text-primary-light dark:text-white">Send a Message</h3>
      
      {isSubmitted ? (
        <div className="p-12 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          >
            <CheckCircle size={64} className="text-success mb-6" />
          </motion.div>
          <h3 className="text-2xl font-bold mb-4 text-text-primary-light dark:text-white">Message Sent!</h3>
          <p className="text-text-primary-light/80 dark:text-white/80 mb-6">
            Thank you for reaching out. I'll get back to you as soon as possible.
          </p>
          <button
            className="px-6 py-3 rounded-lg bg-glass-darker dark:bg-glass-darker text-text-primary-light dark:text-white hover:bg-accent hover:text-white transition-all duration-300"
            onClick={() => setIsSubmitted(false)}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form 
          name="contact" 
          method="POST" 
          data-netlify="true" 
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit} 
          className="space-y-6"
        >
          {/* Hidden input for Netlify form handling */}
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="bot-field" />
          
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium mb-2 text-text-primary-light dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-glass-darker dark:bg-glass-darker border border-text-primary-light/10 dark:border-white/10 text-text-primary-light dark:text-white placeholder-text-primary-light/50 dark:placeholder-white/50 focus:outline-none focus:border-accent/50 transition-colors duration-300"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-error">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium mb-2 text-text-primary-light dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-glass-darker dark:bg-glass-darker border border-text-primary-light/10 dark:border-white/10 text-text-primary-light dark:text-white placeholder-text-primary-light/50 dark:placeholder-white/50 focus:outline-none focus:border-accent/50 transition-colors duration-300"
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-error">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label 
              htmlFor="message" 
              className="block text-sm font-medium mb-2 text-text-primary-light dark:text-white"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-glass-darker dark:bg-glass-darker border border-text-primary-light/10 dark:border-white/10 text-text-primary-light dark:text-white placeholder-text-primary-light/50 dark:placeholder-white/50 focus:outline-none focus:border-accent/50 transition-colors duration-300 resize-none"
              placeholder="Your message..."
            />
            {errors.message && (
              <p className="mt-2 text-sm text-error">{errors.message}</p>
            )}
          </div>
          
          <motion.button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <motion.div
                className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <>
                <Send size={20} className="mr-2" />
                Send Message
              </>
            )}
          </motion.button>
        </form>
      )}
    </motion.div>
  );
};

export default ContactForm;