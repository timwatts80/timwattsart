'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white font-sans">
      <Header />
      <div className="pt-16"></div>
      {/* Hero Section */}
      <div className="relative flex flex-col lg:flex-row">
        {/* Left Side — Text Content */}
        <div className="relative lg:w-1/2 flex items-center order-2 lg:order-1 bg-gradient-to-b from-gray-900 via-gray-800 to-black">
          <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-32 py-16 lg:py-0">
            <div className="max-w-xl space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                I work with art as a way of paying attention, not as a skill to perform or resolve. The work begins without a plan and ends when it no longer asks to be shaped.
              </p>
              <p>
                I’m less interested in meaning than in what happens when attention stays long enough to soften its edges. The process is slow and deliberately unoptimized. What matters isn’t the outcome, but the conditions under which the work is made.
              </p>
              <p>
                Some of this work lives quietly on the page. Some enters shared space through events. All of it comes from the same place: attention, allowed to remain without direction.
              </p>        
              
              <div className="pt-6">
                <Link
                  href="/gallery"
                  className="inline-block w-full sm:w-auto bg-white text-black px-8 py-4 rounded-lg font-semibold text-center hover:bg-gray-200 transition-colors duration-300"
                >
                  Selected work →
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side — Image */}
        <div className="relative lg:w-1/2 h-[50vh] lg:h-screen order-1 lg:order-2">
          <Image
            src="/images/SLC_Trish_Headshot_250919 1.jpg"
            alt="Portrait of Tim Watts in the studio"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Signature Overlay - Centered across entire screen */}
        <div className="absolute inset-0 flex justify-center items-start pt-[calc(50vh-80px)] lg:items-center lg:pt-0 pointer-events-none z-40">
          <Image
            src="/images/tim_signature_white.svg"
            alt="Tim Watts signature"
            width={100}
            height={48}
            className="opacity-90 lg:w-[200px] lg:h-[200px]"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}