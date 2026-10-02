import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';

type Fields = { name: string; email: string; message: string };

const emptyFields: Fields = { name: '', email: '', message: '' };

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<Fields>(emptyFields);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = () => {
    const newErrors = { ...emptyFields };
    if (!formState.name.trim()) newErrors.name = 'Name is required';
    if (!formState.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formState.email)) newErrors.email = 'Please enter a valid email address';
    if (!formState.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.message;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Fields]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Netlify Forms: post url-encoded data (including the hidden form-name) to any path.
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });
      if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);
      setIsSubmitted(true);
      setFormState(emptyFields);
    } catch {
      setSubmitError('Something went wrong sending your message. Please try again, or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name', autoComplete: 'name' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', autoComplete: 'email' },
  ] as const;

  return (
    <div>
      <h3 className="mb-3 px-1 text-[13px] font-semibold uppercase tracking-wider text-label-tertiary">Send a message</h3>
      <AnimatePresence mode="wait" initial={false}>
        {isSubmitted ? (
          <motion.div
            key="sent"
            className="flex flex-col items-center rounded-3xl px-6 py-12 text-center glass-well"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
          >
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 14 }}>
              <CheckCircle2 size={56} className="mb-5 text-emerald-400" />
            </motion.div>
            <h4 className="text-2xl font-bold">Message sent</h4>
            <p className="mt-2 text-label-secondary">Thanks for reaching out — I'll get back to you soon.</p>
            <button className="btn-glass mt-6" onClick={() => setIsSubmitted(false)}>
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Hidden inputs Netlify uses to route the submission and catch bots */}
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don't fill this out: <input name="bot-field" />
              </label>
            </p>

            {fields.map(({ name, label, type, placeholder, autoComplete }) => (
              <div key={name}>
                <label htmlFor={name} className="mb-1.5 block px-1 text-sm font-medium text-label-secondary">
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  autoComplete={autoComplete}
                  value={formState[name]}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                  aria-invalid={!!errors[name]}
                  aria-describedby={errors[name] ? `${name}-error` : undefined}
                  className="field"
                />
                {errors[name] && (
                  <p id={`${name}-error`} className="mt-1.5 px-1 text-sm text-red-400">
                    {errors[name]}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label htmlFor="message" className="mb-1.5 block px-1 text-sm font-medium text-label-secondary">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formState.message}
                onChange={handleInputChange}
                placeholder="What would you like to talk about?"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className="field resize-none"
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 px-1 text-sm text-red-400">
                  {errors.message}
                </p>
              )}
            </div>

            {submitError && (
              <p className="flex items-start gap-2 rounded-2xl px-4 py-3 text-sm text-red-400 glass-well" role="alert">
                <AlertCircle size={18} className="mt-px shrink-0" />
                {submitError}
              </p>
            )}

            <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <motion.span
                  className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                  aria-label="Sending"
                />
              ) : (
                <>
                  <Send size={17} />
                  Send message
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
