"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SITE_CONTACT } from '@/config/site-config';

interface FloatingWhatsAppProps {
  className?: string;
  showTooltip?: boolean;
  tooltipText?: string;
  size?: 'sm' | 'md' | 'lg';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  className = "",
  showTooltip = true,
  tooltipText = "Chat on WhatsApp",
  size = 'md',
  position = 'bottom-right'
}) => {
  // Size configurations
  const sizeConfig = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
  };

  // Icon size configurations
  const iconSize = {
    sm: 20,
    md: 24,
    lg: 28
  };

  // Position configurations
  const positionConfig = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'top-right': 'top-8 right-8',
    'top-left': 'top-8 left-8'
  };

  // Tooltip position based on button position
  const tooltipPosition = position.includes('right') ? 'right-full mr-3' : 'left-full ml-3';

  return (
    <a 
      href={SITE_CONTACT.socials.whatsapp} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`fixed ${positionConfig[position]} z-9999 group flex items-center justify-center ${sizeConfig[size]} bg-[#25D366] text-white rounded-full shadow-lg transition-all duration-300 hover:bg-[#128C7E] hover:scale-105 hover:shadow-xl ${className}`}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={iconSize[size]} fill="currentColor" />
      
      {showTooltip && (
        <span className={`absolute ${tooltipPosition} bg-slate-900 text-white px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg`}>
          {tooltipText}
        </span>
      )}
    </a>
  );
};

export default FloatingWhatsApp;
