"use client";

import { useState } from "react";
import { Mail, Phone, Send, CheckCircle, User, MapPin, MessageCircle } from "lucide-react";
import { useContactInfo } from "@/hooks/useContactInfo";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
}

interface ContactFormProps {
  onClose?: () => void;
  isModal?: boolean;
  collegeName?: string;
}

export default function ContactForm({ onClose, isModal = false, collegeName }: ContactFormProps) {
  const { emails, phones, socials } = useContactInfo();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    city: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.city.trim()) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!validateForm()) return;

  //   setIsSubmitting(true);

  //   // Simulate form submission
  //   await new Promise(resolve => setTimeout(resolve, 2000));

  //   setIsSubmitting(false);
  //   setIsSubmitted(true);

  //   // Reset form after 3 seconds
  //   setTimeout(() => {
  //     setIsSubmitted(false);
  //     setFormData({
  //       name: "",
  //       email: "",
  //       phone: "",
  //       city: ""
  //     });
  //     if (onClose) onClose();
  //   }, 3000);
  // };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
    const submissionData = {
      ...formData,
      collegeName: collegeName || null,
      type: collegeName ? 'college_application' : 'general_inquiry'
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submissionData),
    });

    if (!res.ok) throw new Error();

    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
      });
      if (onClose) onClose();
    }, 3000);
  } catch {
    alert("Failed to send message. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Thank You!</h3>
        <p className="text-slate-600">
          Your message has been sent successfully. We'll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className={`${isModal ? 'max-h-[70vh] overflow-y-auto' : ''}`}>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Get In Touch
        </h3>
        <p className="text-slate-600 text-sm">
          Fill out form below and we\'ll get back to you soon.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${
                errors.name ? 'border-red-300 bg-red-50' : 'border-slate-300'
              }`}
              placeholder="Enter your full name"
            />
          </div>
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${
                errors.email ? 'border-red-300 bg-red-50' : 'border-slate-300'
              }`}
              placeholder="your.email@example.com"
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${
                errors.phone ? 'border-red-300 bg-red-50' : 'border-slate-300'
              }`}
              placeholder="+91-XXX-XXXXXXX"
            />
          </div>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* City Field */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1">
            City *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all ${
                errors.city ? 'border-red-300 bg-red-50' : 'border-slate-300'
              }`}
              placeholder="Enter your city"
            />
          </div>
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              {collegeName ? 'Submit Application' : 'Send Message'}
            </>
          )}
        </button>

        <p className="text-xs text-slate-500 text-center">
          * All fields are required. We'll respond within 24 hours.
        </p>
      </form>

      {/* Contact Information
      <div className="mt-6 pt-6 border-t border-slate-200">
        <p className="text-sm font-medium text-slate-700 mb-3">Or contact us directly:</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Phone size={14} />
            <a href={createTelLink(phones.primary)} className="hover:text-green-600 transition-colors">
              {phones.primary}
            </a>
          </div>
          {phones.additional.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Phone size={14} />
              <a href={createTelLink(phones.additional[0])} className="hover:text-green-600 transition-colors">
                {phones.additional[0]}
              </a>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Mail size={14} />
            <a href={createMailtoLink(emails.info)} className="hover:text-green-600 transition-colors">
              {emails.info}
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MessageCircle size={14} />
            <a href={createWhatsAppLink(phones.primaryRaw)} className="hover:text-green-600 transition-colors">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
}






