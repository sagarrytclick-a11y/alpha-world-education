'use client'

import { useContactInfo } from '@/hooks/useContactInfo'

export default function PrivacyPolicyPage() {
  const contactInfo = useContactInfo()

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 bg-white">
      
      {/* HERO / INTRO */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <span className="inline-block text-sm font-semibold tracking-widest text-emerald-700 uppercase">
          Alpha World Education
        </span>

        <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-700 leading-tight">
          Privacy Policy
        </h1>

     

        {/* TRUST STRIP */}
  
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto space-y-14 text-slate-700 leading-relaxed">

        <PolicyBlock
          title="1. Introduction"
          content="Alpha World Education respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our website or services."
        />

        <PolicyBlock
          title="2. Information We Collect"
          content={
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal information such as name, email address, and phone number</li>
              <li>Academic background and education preferences</li>
              <li>Country, course, and institution interests</li>
              <li>Information shared via enquiry or counselling forms</li>
              <li>Technical data such as IP address and browser details</li>
            </ul>
          }
        />

        <PolicyBlock
          title="3. How We Use Your Information"
          content={
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide personalised education counselling</li>
              <li>To respond to your enquiries and requests</li>
              <li>To improve our services and website experience</li>
              <li>To share relevant education updates and opportunities</li>
              <li>To meet legal and regulatory obligations</li>
            </ul>
          }
        />

        <PolicyBlock
          title="4. Data Security"
          content="We follow strict technical and organisational measures to protect your personal information from unauthorised access, misuse, or disclosure. Access is limited to authorised personnel only."
        />

        <PolicyBlock
          title="5. Sharing of Information"
          content="Alpha World Education does not sell or rent your personal data. Information may be shared only with trusted academic partners or service providers when required to deliver our services or comply with legal requirements."
        />

        <PolicyBlock
          title="6. Cookies & Tracking"
          content="Our website may use cookies to enhance functionality and analyse website traffic. You can manage or disable cookies through your browser settings."
        />

        <PolicyBlock
          title="7. Your Rights"
          content="You have the right to access, update, or request deletion of your personal information. You may also withdraw consent for data usage by contacting us."
        />

        <PolicyBlock
          title="8. Policy Updates"
          content="This Privacy Policy may be updated periodically to reflect changes in regulations or our practices. Any updates will be posted on this page."
        />

        {/* DYNAMIC CONTACT INFO */}
        <PolicyBlock
          title="9. Contact Information"
          content={
            <div className="space-y-3">
              <p>
                If you have any questions regarding this Privacy Policy or how
                your information is handled, please contact us:
              </p>

              <p>
                <strong>Email:</strong>{' '}
                <a
                  href={`mailto:${contactInfo.emails.general}`}
                  className="text-emerald-700 font-medium hover:underline"
                >
                  {contactInfo.emails.general}
                </a>
              </p>

              <p>
                <strong>Phone:</strong>{' '}
                <a
                  href={`tel:${contactInfo.phones.primaryRaw}`}
                  className="text-emerald-700 font-medium hover:underline"
                >
                  {contactInfo.phones.primary}
                </a>
              </p>

              <p>
                <strong>Address:</strong> {contactInfo.address.full}
              </p>
            </div>
          }
        />
      </div>
    </section>
  )
}

/* TRUST ITEM */
function TrustItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl sm:text-3xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  )
}

/* POLICY BLOCK */
function PolicyBlock({
  title,
  content
}: {
  title: string
  content: React.ReactNode
}) {
  return (
    <div className="border border-slate-200 rounded-2xl p-8 sm:p-10">
      <h2 className="text-xl sm:text-2xl font-bold text-emerald-700 mb-4">
        {title}
      </h2>
      <div className="text-slate-600 leading-relaxed">{content}</div>
    </div>
  )
}
