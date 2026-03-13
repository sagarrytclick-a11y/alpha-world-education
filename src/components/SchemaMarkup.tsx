'use client'

import { useEffect } from 'react'

interface SchemaMarkupProps {
  type?: 'Organization' | 'Website' | 'Article' | 'Course' | 'EducationOrganization'
  data?: Record<string, any>
  pageType?: 'home' | 'about' | 'contact' | 'blog' | 'exam' | 'country' | 'college' | 'service'
}

const SchemaMarkup = ({ type = 'Organization', data = {}, pageType = 'home' }: SchemaMarkupProps) => {
  useEffect(() => {
    // Remove existing schema if any
    const existingSchema = document.querySelector('script[data-schema="structured-data"]')
    if (existingSchema) {
      existingSchema.remove()
    }

    // Generate schema based on page type
    let schema = generateSchema(type, pageType, data)
    
    // Add schema to head
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-schema', 'structured-data')
    script.textContent = JSON.stringify(schema, null, 2)
    document.head.appendChild(script)

    return () => {
      // Cleanup on unmount
      const schemaScript = document.querySelector('script[data-schema="structured-data"]')
      if (schemaScript) {
        schemaScript.remove()
      }
    }
  }, [type, pageType, data])

  return null // This component doesn't render anything
}

function generateSchema(type: string, pageType: string, data: Record<string, any>) {
  const baseUrl = 'https://alphaworldeducation.com'

  switch (pageType) {
    case 'home':
      return {
        '@context': 'https://schema.org',
        '@type': 'EducationOrganization',
        name: 'Alpha World Education',
        url: baseUrl,
        logo: `${baseUrl}/images/logo.png`,
        description: 'Leading international education consultancy helping students achieve their dreams of studying abroad.',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'IN',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-XXXXXXXXXX',
          contactType: 'customer service',
          availableLanguage: ['English', 'Hindi'],
        },
        sameAs: [
          'https://www.facebook.com/AlphaWorldEducation',
          'https://www.instagram.com/AlphaWorldEducation',
          'https://www.linkedin.com/company/AlphaWorldEducation',
          'https://twitter.com/AlphaWorldEdu',
        ],
        offers: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Study Abroad Consultancy',
            description: 'Complete guidance for international education',
          },
        },
      }

    case 'about':
      return {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Alpha World Education',
        url: `${baseUrl}/about`,
        description: 'Learn about Alpha World Education, your trusted partner for international college admissions.',
        mainEntity: {
          '@type': 'Organization',
          name: 'Alpha World Education',
          foundingDate: '2012',
          description: '25+ years of experience in international education consulting',
          employee: {
            '@type': 'Person',
            name: 'Education Consultants',
            jobTitle: 'Education Counselor',
          },
        },
      }

    case 'contact':
      return {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Alpha World Education',
        url: `${baseUrl}/contact`,
        description: 'Contact Alpha World Education for expert guidance on international college admissions.',
        mainEntity: {
          '@type': 'Organization',
          name: 'Alpha World Education',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-XXXXXXXXXX',
            contactType: 'customer service',
            availableLanguage: ['English', 'Hindi'],
            email: 'info@alphaworldeducation.com',
          },
        },
      }

    case 'blog':
      return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: data.title || 'Education Blog',
        description: data.description || 'Latest education insights and study abroad tips',
        url: data.slug ? `${baseUrl}/blogs/${data.slug}` : `${baseUrl}/blogs`,
        datePublished: data.publishedAt || new Date().toISOString(),
        dateModified: data.updatedAt || new Date().toISOString(),
        author: {
          '@type': 'Organization',
          name: 'Alpha World Education',
          url: baseUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Alpha World Education',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/images/logo.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.slug ? `${baseUrl}/blogs/${data.slug}` : `${baseUrl}/blogs`,
        },
        image: data.image ? `${baseUrl}/images/${data.image}` : `${baseUrl}/images/blog-default.jpg`,
        keywords: data.tags?.join(', ') || 'education, study abroad, college admissions',
      }

    case 'exam':
      return {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: data.name || 'International Exam',
        description: data.description || 'Complete guide to international entrance exams',
        url: data.slug ? `${baseUrl}/exams/${data.slug}` : `${baseUrl}/exams`,
        provider: {
          '@type': 'Organization',
          name: 'Alpha World Education',
          url: baseUrl,
        },
        educationalLevel: 'Higher Education',
        about: 'International Education',
        teaches: data.shortName || 'Exam Preparation',
        coursePrerequisites: 'High School Diploma',
        totalHours: '120',
        inLanguage: 'English',
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Exam Preparation Guidance',
          },
          price: '0',
          priceCurrency: 'USD',
        },
      }

    case 'country':
      return {
        '@context': 'https://schema.org',
        '@type': 'TouristDestination',
        name: `Study in ${data.name || 'International'}`,
        description: data.description || 'Complete guide to studying abroad',
        url: data.slug ? `${baseUrl}/countries/${data.slug}` : `${baseUrl}/countries`,
        touristType: 'Student',
        includesAttraction: {
          '@type': 'EducationalOrganization',
          name: 'Universities and Colleges',
        },
        provider: {
          '@type': 'Organization',
          name: 'Alpha World Education',
          url: baseUrl,
        },
      }

    case 'college':
      return {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: data.name || 'International College',
        description: data.description || 'Leading international educational institution',
        url: data.slug ? `${baseUrl}/colleges/${data.slug}` : `${baseUrl}/colleges`,
        address: {
          '@type': 'PostalAddress',
          addressCountry: data.location || 'International',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Academic Programs',
          itemListElement: [
            {
              '@type': 'Course',
              name: 'Undergraduate Programs',
              description: 'Bachelor degree programs',
            },
            {
              '@type': 'Course', 
              name: 'Graduate Programs',
              description: 'Master and PhD programs',
            },
          ],
        },
        provider: {
          '@type': 'Organization',
          name: 'Alpha World Education',
          url: baseUrl,
        },
      }

    case 'service':
      return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'College Courses & Programs',
        description: 'Explore comprehensive college courses and study abroad programs at Alpha World Education. Find undergraduate, graduate, and professional programs across top universities worldwide.',
        url: `${baseUrl}/service`,
        provider: {
          '@type': 'Organization',
          name: 'Alpha World Education',
          url: baseUrl,
          description: 'Leading international education consultancy',
        },
        serviceType: 'Educational Consultancy',
        areaServed: 'Worldwide',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Educational Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'College Admission Guidance',
                description: 'Expert guidance for college admissions',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Study Abroad Programs',
                description: 'International education programs',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Visa Assistance',
                description: 'Student visa application support',
              },
            },
          ],
        },
      }

    default:
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Alpha World Education',
        url: baseUrl,
        description: 'Leading international education consultancy',
        publisher: {
          '@type': 'Organization',
          name: 'Alpha World Education',
          url: baseUrl,
        },
      }
  }
}

export default SchemaMarkup
