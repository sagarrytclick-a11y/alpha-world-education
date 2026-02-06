"use client";

import { SITE_IDENTITY } from '@/site-identity';

export interface ContactInfo {
  emails: {
    info: string;
    contact: string;
    support: string;
    admissions: string;
    general: string;
  };
  phones: {
    primary: string;
    primaryRaw: string;
    additional: string[];
    all: string[];
  };
  socials: {
    whatsapp: string;
    instagram: string;
    linkedin: string;
  };
  address: {
    office: string;
    city: string;
    country: string;
    full: string;
  };
}

export function useContactInfo(): ContactInfo {
  const { contact } = SITE_IDENTITY;

  return {
    emails: {
      info: contact.email.general || contact.email.support,
      contact: contact.email.admissions,
      support: contact.email.support,
      admissions: contact.email.admissions,
      general: contact.email.general || contact.email.support,
    },
    phones: {
      primary: contact.phone.display,
      primaryRaw: contact.phone.raw,
      additional: contact.phone.additional || [],
      all: [contact.phone.display, ...(contact.phone.additional || [])],
    },
    socials: {
      whatsapp: contact.socials.whatsapp,
      instagram: contact.socials.instagram,
      linkedin: contact.socials.linkedin,
    },
    address: {
      office: contact.address.office,
      city: contact.address.city,
      country: contact.address.country,
      full: `${contact.address.office}, ${contact.address.city}, ${contact.address.country}`,
    },
  };
}

// Helper functions for common contact operations
export const createMailtoLink = (email: string, subject?: string) => {
  const params = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return `mailto:${email}${params}`;
};

export const createTelLink = (phone: string) => {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
};

export const createWhatsAppLink = (phone: string, message?: string) => {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  const params = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${cleanPhone}${params}`;
};
