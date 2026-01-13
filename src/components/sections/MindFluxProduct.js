import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { useIntersection } from '../../hooks/useIntersection';
import { PRODUCT_FEATURES } from '../../utils/brainwaveData';

export default function MindFluxProduct() {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.2 });
  const orbitRef = useRef(null);

  useEffect(() => {
    if (!hasIntersected) return;

    // Animate content
    anime({
      targets: '.product-content',
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo',
      delay: anime.stagger(100)
    });

    // Animate orbit items
    anime({
      targets: '.orbit-item',
      scale: [0, 1],
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutBack',
      delay: anime.stagger(100, { start: 500 })
    });

    // Pulse sensors on headset
    anime({
      targets: '.sensor-dot',
      scale: [1, 1.4, 1],
      opacity: [0.5, 1, 0.5],
      duration: 1500,
      easing: 'easeInOutSine',
      loop: true,
      delay: anime.stagger(200, { from: 'center' })
    });

    // Orbit rotation
    const orbitAnimation = anime({
      targets: orbitRef.current,
      rotate: 360,
      duration: 60000,
      easing: 'linear',
      loop: true
    });

    return () => {
      orbitAnimation.pause();
    };
  }, [hasIntersected]);

  return (
    <section
      ref={ref}
      id="mindflux"
      data-testid="mindflux-section"
      className="relative py-20 lg:py-32 bg-[#050510] overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(0,168,255,0.05),transparent_40%)]" />
      </div>

      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="product-content inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 mb-6 opacity-0">
            <span className="text-xs font-semibold text-[#8b5cf6] uppercase tracking-wider">Introducing</span>
          </div>
          <h2 className="product-content text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-['Space_Grotesk'] opacity-0">
            MindFlux
          </h2>
          <p className="product-content mt-4 text-xl text-[#8b5cf6] font-medium opacity-0">
            Full-Spectrum Neural Intelligence
          </p>
          <p className="product-content mt-6 text-white/70 max-w-2xl mx-auto text-lg opacity-0">
            MindFlux is a breakthrough EEG platform engineered to capture the complete neural picture. 
            Our proprietary sensor array and signal processing algorithms decode cerebellar rhythms 
            and autonomic signatures that conventional systems simply cannot see.
          </p>
        </div>

        {/* Product Visualization with Orbiting Features */}
        <div className="relative flex justify-center items-center min-h-[600px] lg:min-h-[700px]">
          {/* Central Product */}
          <div className="relative z-20">
            {/* EEG Headset SVG */}
            <div className="relative w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px]">
              <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
                {/* Headset band */}
                <ellipse
                  cx="100"
                  cy="100"
                  rx="80"
                  ry="85"
                  fill="none"
                  stroke="url(#headsetGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Inner structure */}
                <ellipse
                  cx="100"
                  cy="100"
                  rx="60"
                  ry="65"
                  fill="none"
                  stroke="rgba(139,92,246,0.3)"
                  strokeWidth="3"
                />
                {/* Sensor positions */}
                {[
                  { cx: 30, cy: 80 },
                  { cx: 40, cy: 50 },
                  { cx: 60, cy: 30 },
                  { cx: 100, cy: 20 },
                  { cx: 140, cy: 30 },
                  { cx: 160, cy: 50 },
                  { cx: 170, cy: 80 },
                  { cx: 170, cy: 120 },
                  { cx: 160, cy: 150 },
                  { cx: 100, cy: 175 },
                  { cx: 40, cy: 150 },
                  { cx: 30, cy: 120 },
                ].map((pos, i) => (
                  <circle
                    key={i}
                    className="sensor-dot"
                    cx={pos.cx}
                    cy={pos.cy}
                    r="6"
                    fill="#00a8ff"
                    filter="url(#glow)"
                  />
                ))}
                {/* Cerebellar sensors (back of head) */}
                <circle className="sensor-dot" cx="80" cy="170" r="6" fill="#8b5cf6" filter="url(#glowPurple)" />
                <circle className="sensor-dot" cx="120" cy="170" r="6" fill="#8b5cf6" filter="url(#glowPurple)" />
                
                {/* Gradients and filters */}
                <defs>
                  <linearGradient id="headsetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00a8ff" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#00ff88" />
                  </linearGradient>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="glowPurple" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>

              {/* Glow effect behind headset */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(139,92,246,0.3)_0%,transparent_70%)] -z-10" />
            </div>
          </div>

          {/* Orbiting Features */}
          <div
            ref={orbitRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformOrigin: 'center center' }}
          >
            <div className="relative w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] lg:w-[700px] lg:h-[700px]">
              {PRODUCT_FEATURES.map((feature, index) => {
                const angle = (index / PRODUCT_FEATURES.length) * 360;
                const radian = (angle * Math.PI) / 180;
                const radius = 45; // percentage from center

                return (
                  <div
                    key={index}
                    data-testid="orbit-feature-card"
                    className="orbit-item absolute opacity-0"
                    style={{
                      left: `${50 + radius * Math.cos(radian)}%`,
                      top: `${50 + radius * Math.sin(radian)}%`,
                      transform: 'translate(-50%, -50%) rotate(0deg)',
                    }}
                  >
                    <div className="w-[160px] sm:w-[180px] p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#00a8ff]/50 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00a8ff] to-[#8b5cf6] flex items-center justify-center mb-3">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-[#00a8ff] transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-white/50 text-xs leading-relaxed">
                        {feature.description.substring(0, 60)}...
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Orbit ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] lg:w-[700px] lg:h-[700px] rounded-full border border-dashed border-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
