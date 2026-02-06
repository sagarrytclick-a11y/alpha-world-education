"use client";
import React from "react";
import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowRight, Globe, Users, Award, CheckCircle, Star, Instagram, Linkedin } from "lucide-react";
import { useContactInfo, createMailtoLink, createTelLink, createWhatsAppLink } from "@/hooks/useContactInfo";
import { useFormModal } from "@/context/FormModalContext";

export default function ContactPage() {
  const { emails, phones, address, socials } = useContactInfo();
  const { openModal } = useFormModal();

  return (
    <div className="bg-white pt-20 lg:pt-28 pb-20">
      {/* Header Section */}
      <section className="relative overflow-hidden py-20 bg-slate-900">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-green-400 uppercase bg-green-400/10 rounded-full">
            Contact Us
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Get in <span className="text-green-500">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Have questions about studying abroad? Our expert consultants are available through multiple channels to help you achieve your dreams.
          </p>
          
          <div className="mt-8">
            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl transition-all duration-300 px-8 py-4 text-lg shadow-xl hover:shadow-2xl"
            >
              Quick Inquiry
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Methods */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Phone Item */}
                <div className="group flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300">
                    <Phone className="w-6 h-6 text-green-600 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Call Us</p>
                    <a href={createTelLink(phones.primary)} className="text-lg font-semibold text-slate-900 hover:text-green-600 transition-colors">
                      {phones.primary}
                    </a>
                    <p className="text-sm text-slate-500 mt-1">Mon-Fri: 9AM-6PM</p>
                  </div>
                </div>

                {/* Email Item */}
                <div className="group flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                    <Mail className="w-6 h-6 text-blue-600 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Email Us</p>
                    <a href={createMailtoLink(emails.info)} className="text-lg font-semibold text-slate-900 hover:text-green-600 transition-colors">
                      {emails.info}
                    </a>
                    <p className="text-sm text-slate-500 mt-1">24/7 Support</p>
                  </div>
                </div>

                {/* WhatsApp Item */}
                <div className="group flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-300">
                    <MessageCircle className="w-6 h-6 text-emerald-600 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">WhatsApp</p>
                    <a href={createWhatsAppLink(phones.primaryRaw)} className="text-lg font-semibold text-slate-900 hover:text-green-600 transition-colors">
                      Instant Chat
                    </a>
                    <p className="text-sm text-slate-500 mt-1">Quick Responses</p>
                  </div>
                </div>

                {/* Location Item */}
                <div className="group flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-orange-600 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Visit Office</p>
                    <p className="text-lg font-semibold text-slate-900 leading-snug">
                      {address.office}
                    </p>
                    <p className="text-sm text-slate-600">
                      {address.city}, {address.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-slate-400" />
                <h3 className="text-2xl font-bold text-slate-900">Office Hours</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm font-medium text-slate-600 mb-1">Monday - Friday</p>
                  <p className="text-xl font-bold text-slate-900">9:00 - 18:00</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm font-medium text-slate-600 mb-1">Saturday</p>
                  <p className="text-xl font-bold text-slate-900">10:00 - 16:00</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <p className="text-sm font-medium text-red-600 mb-1">Sunday</p>
                  <p className="text-xl font-bold text-red-700">Closed</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-2xl hover:scale-110 transition-transform shadow-lg"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-700 text-white p-4 rounded-2xl hover:scale-110 transition-transform shadow-lg"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href={createWhatsAppLink(phones.primaryRaw)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white p-4 rounded-2xl hover:scale-110 transition-transform shadow-lg"
                >
                  <MessageCircle size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 p-8 rounded-2xl text-white shadow-lg">
              <h3 className="text-xl font-bold mb-6">Why AlphaWorld?</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-8 h-8 text-green-200" />
                  <div>
                    <div className="text-2xl font-extrabold">98%</div>
                    <p className="text-green-100 text-xs font-medium uppercase tracking-widest">Visa Success</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Users className="w-8 h-8 text-green-200" />
                  <div>
                    <div className="text-2xl font-extrabold">5k+</div>
                    <p className="text-green-100 text-xs font-medium uppercase tracking-widest">Global Students</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Globe className="w-8 h-8 text-green-200" />
                  <div>
                    <div className="text-2xl font-extrabold">15+</div>
                    <p className="text-green-100 text-xs font-medium uppercase tracking-widest">Countries</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Award className="w-8 h-8 text-green-200" />
                  <div>
                    <div className="text-2xl font-extrabold">500+</div>
                    <p className="text-green-100 text-xs font-medium uppercase tracking-widest">Universities</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick CTA */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Need Help?</h3>
              <p className="text-slate-600 mb-6">Our education consultants are ready to answer all your questions about studying abroad.</p>
              <button
                onClick={openModal}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl transition-all duration-300 px-6 py-4 shadow-lg hover:shadow-xl"
              >
                Start Conversation
              </button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}