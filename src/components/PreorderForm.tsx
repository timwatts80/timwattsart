'use client'

import { useState } from 'react'

interface PreorderFormProps {
  isOpen: boolean
  onClose: () => void
  artworkTitle: string
  artworkId: number
  artworkSrc: string
}

export default function PreorderForm({ isOpen, onClose, artworkTitle, artworkId, artworkSrc }: PreorderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)
    
    // Add artwork info to form data
    formData.append('artwork', artworkTitle)
    formData.append('artworkId', artworkId.toString())

    try {
      // Use the same Formspree endpoint as commission form
      const response = await fetch('https://formspree.io/f/xyznyrbg', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        setIsSubmitted(true)
        form.reset()
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose()
          setIsSubmitted(false)
        }, 2000)
      } else {
        throw new Error('Failed to send preorder')
      }
    } catch (err) {
      setError('Failed to send preorder. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-md relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>

          <div className="p-8">
            {!isSubmitted ? (
              <>
                <h2 className="text-2xl font-light mb-4">Print Notification</h2>
                
                {/* Artwork Preview */}
                <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <img 
                    src={artworkSrc} 
                    alt={artworkTitle}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{artworkTitle}</h3>
                    <p className="text-sm text-gray-600">Limited edition print</p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-6">
                  Get notified when prints of this artwork are ready. No commitment required.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:border-black focus:outline-none bg-white"
                      style={{ color: '#000000' }}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:border-black focus:outline-none bg-white"
                      style={{ color: '#000000' }}
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Hidden fields for form identification */}
                  <input type="hidden" name="_subject" value={`Print Notification Request: ${artworkTitle}`} />
                  
                  {error && (
                    <div className="text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Updated note */}
                  <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
                    <strong>Note:</strong> You will be notified when the final prints are produced and can order your copy when you're ready. No payment required now.
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="btn-secondary flex-1"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary flex-1"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Notify Me'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-light mb-2">You're on the list!</h3>
                <p className="text-gray-600 text-sm">
                  I'll notify you when prints of this artwork are ready to order.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}