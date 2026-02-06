'use client'

import React from 'react'
import { useFormModal } from '@/context/FormModalContext'
import { X } from 'lucide-react' // Using lucide for a cleaner icon if available

export const FormModal: React.FC = () => {
  const { isOpen, closeModal, formData, updateFormData, resetForm } = useFormModal()

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setTimeout(() => {
          resetForm()
          closeModal()
          setSubmitStatus('idle')
        }, 2000)
      } else {
        throw new Error('Failed to send email')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    resetForm()
    setSubmitStatus('idle')
    closeModal()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop - Darker for better contrast with the white modal */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 w-full max-w-md overflow-hidden transform transition-all">
        
        {/* Header - Subtle Mint background */}
        <div className="flex items-center justify-between p-6 sm:p-8 bg-slate-50/50 border-b border-slate-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Get in Touch</h2>
            <p className="text-xs sm:text-sm font-medium text-slate-500">We&apos;ll get back to you shortly.</p>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl p-2 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 sm:space-y-5">
          {[
            { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Name', value: formData.name },
            { id: 'email', label: 'Email Address', type: 'email', placeholder: 'example@gmail.com', value: formData.email },
            { id: 'number', label: 'Phone Number', type: 'tel', placeholder: '+91 XXXXXXXXXX', value: formData.number },
            { id: 'city', label: 'City', type: 'text', placeholder: 'City', value: formData.city }
          ].map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-xs sm:text-sm font-bold text-slate-700 mb-2 ml-1">
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.id}
                required
                value={field.value}
                onChange={(e) => updateFormData({ [field.id]: e.target.value })}
                className="w-full px-4 sm:px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 focus:bg-white outline-none transition-all font-medium text-sm sm:text-base"
                placeholder={field.placeholder}
              />
            </div>
          ))}

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-2xl">
              <p className="text-green-800 font-medium text-center">✓ Message sent successfully!</p>
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
              <p className="text-red-800 font-medium text-center">✗ Failed to send message. Please try again.</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-4 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-4 text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20 rounded-2xl transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}