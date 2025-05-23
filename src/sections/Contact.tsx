"use client";

import { useState } from 'react';
import { Send, CheckCircle, Mail, User, MessageSquare, Hash } from 'lucide-react';
import { Card } from '@/components/card'; // Import your custom Card component

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

// Move InputField outside to prevent recreation on each render
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
      <Card className={`relative ${isTextarea ? 'h-auto' : 'h-16'} transition-all duration-300 ${
        hasError ? 'border-red-400/50' : ''
      }`}>
        {/* Icon */}
        <div className={`absolute left-5 ${isTextarea ? 'top-5' : 'top-1/2 -translate-y-1/2'} z-10 transition-colors duration-300 ${
          hasValue ? 'text-orange-500' : 'text-gray-400'
        }`}>
          <Icon size={20} />
        </div>

        {/* Input - Fixed: Use explicit input/textarea instead of dynamic Component */}
        {isTextarea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={rows}
            placeholder={placeholder}
            className="relative w-full bg-transparent border-0 outline-none text-white placeholder-gray-400 pl-14 pr-5 pt-5 pb-5 resize-none z-10 text-lg font-medium"
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="relative w-full bg-transparent border-0 outline-none text-white placeholder-gray-400 pl-14 pr-5 py-4 h-16 z-10 text-lg font-medium"
          />
        )}

        {/* Floating label */}
        {hasValue && (
          <label className="absolute left-14 top-2 text-xs text-orange-500 font-medium z-5 transition-all duration-300">
            {label}
          </label>
        )}
      </Card>

      {/* Error message */}
      {hasError && (
        <div className="mt-2 text-red-400 text-sm flex items-center animate-in slide-in-from-left-2">
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
      
      // API
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
    <div className="min-h-screen mb-40" id="contact">
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-[1400px]">
          {/* Status indicator */}
          <div className="flex items-center justify-center mb-8">
            <Card className="px-6 py-3 border-green-400/30">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm font-medium">Connected & Ready</span>
              </div>
            </Card>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Get In Touch
            </h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
              Ready to bring your ideas to life? Let's start a conversation.
            </p>
          </div>

          {/* Form Container */}
          <Card className="p-8 md:p-12 shadow-2xl animate-in zoom-in-95 duration-1000 delay-400">
            {isSubmitted ? (
              <div className="text-center py-16 animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-white mb-6">Message Sent!</h2>
                <p className="text-gray-300 text-lg leading-relaxed max-w-md mx-auto">
                  Thanks for reaching out! I'll get back to you within 24 hours.
                </p>
                <div className="mt-8 flex justify-center">
                  <Card className="px-6 py-3">
                    <span className="text-white/80 text-sm">Redirecting in a few seconds...</span>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
         
                {/* Form Grid */}
                <div className="grid md:grid-cols-2 gap-6">
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
                    <p className="text-red-300 text-sm flex items-center">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3" />
                      {errors.submit}
                    </p>
                  </Card>
                )}     
                <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-400 text-sm space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Typically responds within 24 hours</span>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="relative group"
                >
                    <div className="absolute -inset-1 bg-orange-500 rounded-2xl transition-opacity duration-300" />
                    <div className="relative text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 flex hover:bg-orange-600">
                    {isLoading ? (
                        <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3 group">
                        <Send className="w-5 h-5 transition-transform duration-300" />
                        <span>Send Message</span>
                        </div>
                    )}
                    </div>
                </button>
                </div>

              </div>
            )}
          </Card>  
        </div>
      </div>
    </div>
  );
}

// Default export
export default UltraModernContactForm;

// Named export for compatibility with your page.tsx import
export { UltraModernContactForm as ContactSection };