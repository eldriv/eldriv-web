"use client";

import { useState } from 'react';
import { Send, CheckCircle, Mail, User, MessageSquare, Hash } from 'lucide-react';
import { Card } from '@/components/card';
import { ScrollReveal } from '@/components/scroll-reveal';
import { SectionHeader } from '@/components/SectionHeader';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  submit?: string;
}

interface InputFieldProps {
  icon: React.ComponentType<any>;
  label: string;
  type?: string;
  name: keyof FormData;
  placeholder: string;
  rows?: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
}

// InputField component
const InputField: React.FC<InputFieldProps> = ({ 
  icon: Icon, 
  label, 
  type = 'text', 
  name, 
  placeholder, 
  rows, 
  value, 
  onChange, 
  error 
}) => {
  const isTextarea = type === 'textarea';
  const hasValue = value;
  const hasError = error;

  return (
    <div className="relative group">
      <Card className={`relative rounded-2xl ${isTextarea ? 'h-auto' : 'h-16'} transition-all duration-300 hover:border-white/20 focus-within:border-accent/60 focus-within:shadow-[0_0_0_4px_rgba(253,129,40,0.12)] ${
        hasError ? 'border-red-400/50' : ''
      }`}>
        {/* Icon */}
        <div className={`absolute left-5 ${isTextarea ? 'top-5' : 'top-1/2 -translate-y-1/2'} z-10 transition-colors duration-300 ${
          hasValue ? 'text-orange-500' : 'text-gray-400'
        }`}>
          <Icon size={20} />
        </div>

        {/* Input or textarea */}
        {isTextarea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            placeholder={placeholder}
            className="relative w-full bg-transparent border-0 outline-none text-white placeholder-zinc-500 pl-14 pr-5 pt-5 pb-5 resize-none z-10 text-base leading-relaxed md:text-sm"
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="relative w-full bg-transparent border-0 outline-none text-white placeholder-zinc-500 pl-14 pr-5 py-4 h-16 z-10 text-base md:text-sm"
          />
        )}

        {/* Floating label */}
        {hasValue && (
          <label className="absolute left-14 top-2 type-meta text-accent z-5 transition-all duration-300">
            {label}
          </label>
        )}
      </Card>

      {/* Error message */}
      {hasError && (
        <div className="mt-2 type-small text-red-400 flex items-center animate-in slide-in-from-left-2">
          <div className="w-1 h-1 bg-red-400 rounded-full mr-2" />
          {hasError}
        </div>
      )}
    </div>
  );
};

function UltraModernContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      
      const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
      
      if (!formspreeEndpoint) {
        setErrors({ submit: 'Form configuration error. Please contact the administrator.' });
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            _replyto: formData.email,
          }),
        });

        if (response.ok) {
          setIsSubmitted(true);
          setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              email: '',
              subject: '',
              message: ''
            });
          }, 5000);
        } else {
          const errorData = await response.json();
          setErrors({ submit: errorData.error || 'Failed to send message. Please try again.' });
        }
      } catch (error) {
        setErrors({ submit: 'Network error. Please check your connection and try again.' });
        console.error('Contact form error:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="w-full py-12 sm:py-16 lg:py-24" id="contact">
      <div className="relative z-10 flex justify-center px-5 sm:px-6 md:px-8">
        <div className="w-full max-w-[1280px]">
          <SectionHeader
            index={7}
            eyebrow="Contact"
            title="Get In Touch"
            description="Ready to bring your ideas to life? Let's start a conversation."
          />

          <ScrollReveal delay={0.1}>
          {/* Status indicator */}
          <div className="mt-12 sm:mt-16 lg:mt-20 mb-6 sm:mb-8 flex">
            <span className="glass-pill inline-flex items-center gap-2 rounded-full px-3 py-1.5 type-meta tracking-[0.2em] text-green-400">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Connected & Ready
            </span>
          </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} variant="scaleUp">
          {/* Form Container */}
          <Card className="p-5 sm:p-6 md:p-8 lg:p-12">
            {isSubmitted ? (
              <div className="text-center py-16 animate-in zoom-in-95 duration-500">
                <div className="bg-zinc-100 text-[#0c0c0f] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h2 className="type-section-title text-zinc-100 mb-4 md:mb-6">Message Sent!</h2>
                <p className="type-lead text-zinc-400 max-w-md mx-auto px-4">
                  Thanks for reaching out! I'll get back to you within 24 hours.
                </p>
                <div className="mt-8 flex justify-center">
                  <span className="glass-pill rounded-full px-3 py-1.5 type-meta tracking-[0.2em] text-white/60">
                    Redirecting in a few seconds...
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <InputField
                    icon={User}
                    label="Your Name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                  />
                  <InputField
                    icon={Mail}
                    label="Email Address"
                    type="email"
                    name="email"
                    placeholder="foo@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                  />
                </div>

                <InputField
                  icon={Hash}
                  label="Subject"
                  name="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleInputChange}
                  error={errors.subject}
                />

                <InputField
                  icon={MessageSquare}
                  label="Your Message"
                  type="textarea"
                  name="message"
                  rows={6}
                  placeholder="Tell me about your project, ideas, or just say hello..."
                  value={formData.message}
                  onChange={handleInputChange}
                  error={errors.message}
                />

                {/* Submit Error */}
                {errors.submit && (
                  <Card className="p-4 border-red-400/30 bg-red-500/10 animate-in slide-in-from-left-2">
                    <p className="type-body text-red-300 flex items-center">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3" />
                      {errors.submit}
                    </p>
                  </Card>
                )}     

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center type-body text-zinc-400 space-x-2">
                      <MessageSquare className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">eldriv@proton.me</span>
                  </div>
                  <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="relative group w-full sm:w-auto disabled:opacity-70"
                  >
                      <div className="btn-ink relative py-3 px-8 text-sm transition-all duration-300 group-hover:-translate-y-0.5">
                      {isLoading ? (
                          <div className="flex items-center space-x-3">
                          <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                          <span>Sending...</span>
                          </div>
                      ) : (
                          <div className="flex items-center space-x-3 group">
                          <Send className="w-5 h-5 transition-transform duration-300" />
                          <span>Submit</span>
                          </div>
                      )}
                      </div>
                  </button>
                </div>
              </div>
            )}
          </Card>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}

// Default export
export default UltraModernContactForm;

// Named export
export { UltraModernContactForm as ContactSection };
