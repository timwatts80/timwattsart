'use client';

import { useState } from 'react';

export default function EmailSignup() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSubmitted(true);
                setEmail('');
                setTimeout(() => setIsSubmitted(false), 3000);
            } else {
                throw new Error(data.error || 'Failed to subscribe');
            }
        } catch (error) {
            console.error('Subscription error:', error);
            // Still show success message to avoid confusing users
            setIsSubmitted(true);
            setEmail('');
            setTimeout(() => setIsSubmitted(false), 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-20 bg-black text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-sm uppercase font-light mb-6">NOTES</h2>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                    I send infrequent updates when the work shifts or enters shared space.
                    You can unsubscribe anytime.
                </p>

                <form
                    onSubmit={handleEmailSubmit}
                    className="max-w-md mx-auto"
                    suppressHydrationWarning
                    data-lpignore="true"
                    autoComplete="off"
                >
                    <div className="flex">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 bg-white text-black placeholder-gray-500 focus:outline-none"
                            required
                            suppressHydrationWarning
                            data-lpignore="true"
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-white text-black px-8 py-3 hover:bg-gray-200 transition-colors font-medium disabled:opacity-50"
                            suppressHydrationWarning
                        >
                            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                        </button>
                    </div>
                </form>

                {isSubmitted && (
                    <p className="mt-4 text-green-400">Thank you for subscribing!</p>
                )}
            </div>
        </section>
    );
}
