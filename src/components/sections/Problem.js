import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { useIntersection } from '../../hooks/useIntersection';

const problems = [
  'Conventional systems focus only on cortical activity',
  'Cerebellar signals — critical for motor control, timing, and cognition — go undetected',
  'Autonomic neural signatures that reveal stress, focus, and emotional state are ignored',
  "You can't optimize what you can't measure"
];

export default function Problem() {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.3 });
  const brainRef = useRef(null);
  const problemsRef = useRef([]);

  useEffect(() => {
    if (!hasIntersected) return;

    // Animate brain regions
    anime({
      targets: '.brain-region',
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 800,
      easing: 'easeOutExpo',
      delay: anime.stagger(200)
    });

    // Animate problem points
    anime({
      targets: '.problem-point',
      translateX: [-30, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo',
      delay: anime.stagger(200, { start: 400 })
    });

    // Pulse effect on brain
    anime({
      targets: '.brain-pulse',
      scale: [1, 1.1, 1],
      opacity: [0.5, 0.8, 0.5],
      duration: 2000,
      easing: 'easeInOutSine',
      loop: true
    });
  }, [hasIntersected]);

  return (
    <section
      ref={ref}
      id="problem"
      data-testid="problem-section"
      className="relative py-20 lg:py-32 bg-[#0a0a0f]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
      </div>

      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Brain Visualization */}
          <div ref={brainRef} className="relative flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
              {/* Brain SVG */}
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full"
                fill="none"
              >
                {/* Brain outline */}
                <path
                  className="brain-region"
                  d="M100 20C60 20 30 50 30 90c0 30 15 55 40 70v20h60v-20c25-15 40-40 40-70 0-40-30-70-70-70z"
                  fill="rgba(0,168,255,0.1)"
                  stroke="rgba(0,168,255,0.5)"
                  strokeWidth="2"
                />
                {/* Cerebellum (highlighted) */}
                <ellipse
                  className="brain-region brain-pulse"
                  cx="100"
                  cy="160"
                  rx="40"
                  ry="25"
                  fill="rgba(139,92,246,0.3)"
                  stroke="rgba(139,92,246,0.8)"
                  strokeWidth="2"
                />
                {/* Cortex regions */}
                <path
                  className="brain-region"
                  d="M50 70c20-15 40-20 60-15s35 20 40 40"
                  fill="none"
                  stroke="rgba(0,168,255,0.3)"
                  strokeWidth="1.5"
                />
                <path
                  className="brain-region"
                  d="M60 90c15-10 30-15 45-10s25 15 30 30"
                  fill="none"
                  stroke="rgba(0,168,255,0.3)"
                  strokeWidth="1.5"
                />
                {/* Neural connections */}
                {[...Array(12)].map((_, i) => (
                  <circle
                    key={i}
                    className="brain-region"
                    cx={60 + Math.random() * 80}
                    cy={50 + Math.random() * 80}
                    r="2"
                    fill="rgba(0,255,136,0.8)"
                  />
                ))}
                {/* Brainstem */}
                <rect
                  className="brain-region brain-pulse"
                  x="90"
                  y="175"
                  width="20"
                  height="20"
                  rx="4"
                  fill="rgba(16,185,129,0.3)"
                  stroke="rgba(16,185,129,0.8)"
                  strokeWidth="2"
                />
              </svg>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(139,92,246,0.2),transparent_60%)]" />

              {/* Labels */}
              <div className="absolute top-[20%] left-[-20%] text-xs text-white/60 flex items-center gap-2 brain-region opacity-0">
                <span className="w-8 h-[1px] bg-white/30" />
                Cortex (Standard EEG)
              </div>
              <div className="absolute bottom-[25%] right-[-10%] text-xs text-[#8b5cf6] flex items-center gap-2 brain-region opacity-0">
                Cerebellum (MindFlux)
                <span className="w-8 h-[1px] bg-[#8b5cf6]/50" />
              </div>
              <div className="absolute bottom-[5%] left-[40%] text-xs text-[#10b981] brain-region opacity-0">
                Autonomic
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f472b6]/10 border border-[#f472b6]/20 mb-6">
              <span className="text-xs font-semibold text-[#f472b6] uppercase tracking-wider">The Challenge</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-['Space_Grotesk'] leading-tight">
              Traditional EEG Misses{' '}
              <span className="text-[#f472b6]">90%</span> of the Story
            </h2>

            <div className="mt-10 space-y-6">
              {problems.map((problem, index) => (
                <div
                  key={index}
                  ref={(el) => (problemsRef.current[index] = el)}
                  className="problem-point flex items-start gap-4 opacity-0"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#f472b6]/10 border border-[#f472b6]/20 flex items-center justify-center">
                    <span className="text-[#f472b6] font-semibold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {problem}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#research"
              data-testid="problem-learn-more-link"
              className="inline-flex items-center gap-2 mt-10 text-[#00a8ff] hover:text-[#33bbff] transition-colors group"
            >
              <span className="font-medium">Learn more about our research</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
