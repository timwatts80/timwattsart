'use client';

import NebulaBackground from './NebulaBackground';
import AnimatedArrow from './AnimatedArrow';

export default function OnTheWork() {
  // Disable WebGL in development for faster reloads
  const isDev = process.env.NODE_ENV === 'development';
  
  return (
    <section className="relative h-screen overflow-hidden flex items-center">
      {!isDev && (
        <NebulaBackground
          colors={[
            [0.2, 0.2, 0.2],
            [0.4, 0.4, 0.4],
            [0.3, 0.3, 0.3],
            [0.5, 0.5, 0.5],
            [0.6, 0.6, 0.6]
          ]}
          style={{
            position: 'absolute',
            zIndex: 0
          }}
        />
      )}
      {/* Dark filter overlay */}
      <div className={`absolute inset-0 ${isDev ? 'bg-gray-900' : 'bg-black/60'} z-[1]`}></div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <h2 className="text-sm font-light mb-6 text-gray-300 uppercase">On The Work</h2>
        <p className="text-xl text-white mb-8 leading-relaxed">
          Art doesn't need to be impressive, expressive, or resolved to be meaningful.
          In this space, it's used as a way of staying with what's present rather than shaping it into output, identity, or improvement.
        </p>
        <p className="text-lg text-gray-300 mb-12 mx-auto">
          The work here isn't about mastery or interpretation, but about attention
          and what becomes possible when attention is allowed to settle without expectation.
        </p>
        <div className="flex justify-end">
          <AnimatedArrow color="white" href="#highlight-artwork-2"/>
        </div>
      </div>
    </section>
  );
}
