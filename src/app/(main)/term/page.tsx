'use client'

import { useContactInfo } from '@/hooks/useContactInfo'

export default function TermsAndConditionsPage() {
  const contactInfo = useContactInfo()

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 bg-white">
      
      {/* HERO */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <span className="text-sm font-semibold tracking-widest text-emerald-700 uppercase">
          Alpha World Education
        </span>

        <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-700 leading-tight">
          Terms & Conditions
        </h1>

    

      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto space-y-14 text-slate-700 leading-relaxed">

        <TermsBlock
          title="1. Acceptance of Terms"
          content="By accessing or using Alpha World Education’s website or services, you agree to comply with these Terms & Conditions. If you do not agree, you should discontinue use of our services."
        />

        <TermsBlock
          title="2. Scope of Services"
          content="Alpha World Education provides education counseling and informational services related to colleges, universities, exams, and study destinations. Final admissions, visas, and academic decisions are made by the respective institutions and authorities."
        />

        <TermsBlock
          title="3. Use of Website"
          content={
            <ul className="list-disc pl-6 space-y-2">
              <li>You agree to use the website only for lawful purposes</li>
              <li>You must not attempt to misuse, copy, or disrupt the website</li>
              <li>Content may not be reused without written permission</li>
            </ul>
          }
        />

        <TermsBlock
          title="4. Accuracy of Information"
          content="While we strive to maintain accurate and updated information, Alpha World Education does not guarantee completeness or real-time accuracy of details related to institutions, fees, policies, or immigration requirements."
        />

        <TermsBlock
          title="5. Counseling Disclaimer"
          content="All guidance provided is based on experience, student inputs, and available information. Outcomes such as admissions and visas are subject to third-party decisions beyond our control."
        />

        <TermsBlock
          title="6. Intellectual Property"
          content="All website content, branding, text, and design elements are the intellectual property of Alpha World Education and may not be copied or distributed without permission."
        />

        <TermsBlock
          title="7. Limitation of Liability"
          content="Alpha World Education shall not be liable for any direct or indirect losses arising from the use of this website or reliance on the information provided."
        />

        <TermsBlock
          title="8. Privacy & Data Protection"
          content="Your use of our services is governed by our Privacy Policy, which outlines how we collect, store, and protect personal information."
        />

        <TermsBlock
          title="9. Updates to Terms"
          content="We reserve the right to update these Terms & Conditions at any time. Continued use of the website constitutes acceptance of the revised terms."
        />

        {/* DYNAMIC CONTACT INFO */}
        <TermsBlock
          title="10. Contact Information"
          content={
            <div className="space-y-2">
              <p>
                For any questions regarding these Terms & Conditions, you may
                contact us through the details below:
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

/* TERMS BLOCK */
function TermsBlock({
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
