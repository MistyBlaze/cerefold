import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { useIntersection } from '../../hooks/useIntersection';
import { PRODUCT_FEATURES } from '../../utils/brainwaveData';

// Large detailed EEG Headset visualization
function HeadsetVisualization() {
  useEffect(() => {
    // Animate sensor pulses in sequence
    anime({
      targets: '.headset-sensor',
      scale: [1, 1.5, 1],
      opacity: [0.6, 1, 0.6],
      duration: 1800,
      easing: 'easeInOutSine',
      loop: true,
      delay: anime.stagger(100, { from: 'center' })
    });

    // Data flow animation
    anime({
      targets: '.data-flow-particle',
      translateY: [-20, 20],
      opacity: [0, 1, 0],
      duration: 1500,
      easing: 'easeInOutSine',
      loop: true,
      delay: anime.stagger(200)
    });

    // Headset glow pulse
    anime({
      targets: '.headset-glow',
      opacity: [0.3, 0.6, 0.3],
      scale: [0.98, 1.02, 0.98],
      duration: 3000,
      easing: 'easeInOutSine',
      loop: true
    });

    // Ring animation
    anime({
      targets: '.headset-ring',
      strokeDashoffset: [0, -50],
      duration: 4000,
      easing: 'linear',
      loop: true
    });
  }, []);

  return (
    <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[450px] lg:h-[450px]">
      {/* Glow background */}
      <div className="headset-glow absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.25),transparent_65%)]" />
      
      <svg viewBox="0 0 300 300" className="w-full h-full" fill="none">
        <defs>
          <filter id="headsetGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="sensorGlowStrong" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="headbandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00a8ff" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#00ff88" />
          </linearGradient>
          <linearGradient id="innerRingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#00a8ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Outer decorative ring */}
        <circle
          cx="150"
          cy="150"
          r="140"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
        />

        {/* Animated ring */}
        <circle
          className="headset-ring"
          cx="150"
          cy="150"
          r="135"
          fill="none"
          stroke="url(#innerRingGradient)"
          strokeWidth="2"
          strokeDasharray="20,10"
          opacity="0.5"
        />

        {/* Main headband - outer */}
        <ellipse
          cx="150"
          cy="150"
          rx="110"
          ry="115"
          fill="none"
          stroke="url(#headbandGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          filter="url(#headsetGlow)"
        />

        {/* Inner structure ring */}
        <ellipse
          cx="150"
          cy="150"
          rx="85"
          ry="90"
          fill="none"
          stroke="rgba(139,92,246,0.4)"
          strokeWidth="4"
        />

        {/* Cross supports */}
        <line x1="150" y1="35" x2="150" y2="75" stroke="rgba(139,92,246,0.3)" strokeWidth="3" />
        <line x1="150" y1="225" x2="150" y2="265" stroke="rgba(139,92,246,0.3)" strokeWidth="3" />
        <line x1="40" y1="150" x2="65" y2="150" stroke="rgba(139,92,246,0.3)" strokeWidth="3" />
        <line x1="235" y1="150" x2="260" y2="150" stroke="rgba(139,92,246,0.3)" strokeWidth="3" />

        {/* Center hub */}
        <circle cx="150" cy="150" r="25" fill="rgba(10,10,15,0.9)" stroke="#8b5cf6" strokeWidth="2" />
        <circle cx="150" cy="150" r="15" fill="#8b5cf6" opacity="0.3" />
        <circle cx="150" cy="150" r="8" fill="#00a8ff" filter="url(#sensorGlowStrong)" />

        {/* Sensor positions - 10-20 system */}
        {/* Frontal row */}
        <circle className="headset-sensor" cx="150" cy="38" r="8" fill="#00a8ff" filter="url(#headsetGlow)" />
        <circle className="headset-sensor" cx="100" cy="50" r="7" fill="#00a8ff" filter="url(#headsetGlow)" />
        <circle className="headset-sensor" cx="200" cy="50" r="7" fill="#00a8ff" filter="url(#headsetGlow)" />
        <circle className="headset-sensor" cx="60" cy="75" r="6" fill="#00a8ff" filter="url(#headsetGlow)" />
        <circle className="headset-sensor" cx="240" cy="75" r="6" fill="#00a8ff" filter="url(#headsetGlow)" />

        {/* Central row */}
        <circle className="headset-sensor" cx="40" cy="120" r="6" fill="#00ff88" filter="url(#headsetGlow)" />
        <circle className="headset-sensor" cx="260" cy="120" r="6" fill="#00ff88" filter="url(#headsetGlow)" />
        
        {/* Temporal */}
        <circle className="headset-sensor" cx="35" cy="150" r="7" fill="#06b6d4" filter="url(#headsetGlow)" />
        <circle className="headset-sensor" cx="265" cy="150" r="7" fill="#06b6d4" filter="url(#headsetGlow)" />

        {/* Parietal row */}
        <circle className="headset-sensor" cx="40" cy="180" r="6" fill="#00ff88" filter="url(#headsetGlow)" />
        <circle className="headset-sensor" cx="260" cy="180" r="6" fill="#00ff88" filter="url(#headsetGlow)" />

        {/* Occipital row */}
        <circle className="headset-sensor" cx="60" cy="220" r="6" fill="#00a8ff" filter="url(#headsetGlow)" />
        <circle className="headset-sensor" cx="240" cy="220" r="6" fill="#00a8ff" filter="url(#headsetGlow)" />
        <circle className="headset-sensor" cx="100" cy="245" r="7" fill="#00a8ff" filter="url(#headsetGlow)" />
        <circle className="headset-sensor" cx="200" cy="245" r="7" fill="#00a8ff" filter="url(#headsetGlow)" />

        {/* Cerebellar sensors - MindFlux exclusive (purple, highlighted) */}
        <circle className="headset-sensor" cx="120" cy="262" r="8" fill="#8b5cf6" filter="url(#sensorGlowStrong)" />
        <circle className="headset-sensor" cx="150" cy="268" r="9" fill="#8b5cf6" filter="url(#sensorGlowStrong)" />
        <circle className="headset-sensor" cx="180" cy="262" r="8" fill="#8b5cf6" filter="url(#sensorGlowStrong)" />

        {/* Data flow particles from sensors to center */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const startX = 150 + Math.cos(rad) * 100;
          const startY = 150 + Math.sin(rad) * 105;
          return (
            <circle
              key={i}
              className="data-flow-particle"
              cx={startX}
              cy={startY}
              r="3"
              fill="#00ff88"
              filter="url(#headsetGlow)"
              opacity="0"
            />
          );
        })}

        {/* Electrode labels */}
        <text x="150" y="25" textAnchor="middle" fill="#00a8ff" fontSize="8" opacity="0.7">Fz</text>
        <text x="150" y="285" textAnchor="middle" fill="#8b5cf6" fontSize="9" fontWeight="600">CB</text>
      </svg>

      {/* Labels */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full pb-2 text-center">
        <span className="text-xs text-[#00a8ff] font-medium">Frontal Sensors</span>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-2 text-center">
        <span className="text-xs text-[#8b5cf6] font-semibold">Cerebellar Array</span>
        <span className="block text-[10px] text-white/40">MindFlux Exclusive</span>
      </div>
    </div>
  );
}

export default function MindFluxProduct() {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.15 });
  const orbitRef = useRef(null);

  useEffect(() => {
    if (!hasIntersected) return;

    // Animate content
    anime({
      targets: '.product-content',
      translateY: [50, 0],
      opacity: [0, 1],
      filter: ['blur(10px)', 'blur(0px)'],
      duration: 800,
      easing: 'easeOutExpo',
      delay: anime.stagger(100)
    });

    // Animate headset
    anime({
      targets: '.headset-visual',
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutExpo',
      delay: 300
    });

    // Animate orbit items
    anime({
      targets: '.orbit-item',
      scale: [0, 1],
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutBack',
      delay: anime.stagger(100, { start: 600 })
    });

    // Slow orbit rotation
    const orbitAnimation = anime({
      targets: orbitRef.current,
      rotate: 360,
      duration: 80000,
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.12),transparent_60%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(0,168,255,0.06),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />
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
        <div className="relative flex justify-center items-center min-h-[650px] lg:min-h-[750px]">
          {/* Central Product */}
          <div className="headset-visual relative z-20 opacity-0">
            <HeadsetVisualization />
          </div>

          {/* Orbiting Features */}
          <div
            ref={orbitRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ transformOrigin: 'center center' }}
          >
            <div className="relative w-[550px] h-[550px] sm:w-[650px] sm:h-[650px] lg:w-[800px] lg:h-[800px]">
              {PRODUCT_FEATURES.map((feature, index) => {
                const angle = (index / PRODUCT_FEATURES.length) * 360 - 90;
                const radian = (angle * Math.PI) / 180;
                const radius = 48;

                return (
                  <div
                    key={index}
                    data-testid="orbit-feature-card"
                    className="orbit-item absolute opacity-0 pointer-events-auto"
                    style={{
                      left: `${50 + radius * Math.cos(radian)}%`,
                      top: `${50 + radius * Math.sin(radian)}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="w-[170px] sm:w-[190px] p-4 rounded-xl bg-[#0a0a12]/80 backdrop-blur-xl border border-white/10 hover:border-[#00a8ff]/50 hover:bg-white/5 hover:shadow-[0_0_30px_rgba(0,168,255,0.15)] transition-all duration-300 cursor-pointer group">
                      {/* Connection line indicator */}
                      <div className="absolute top-1/2 left-1/2 w-px h-16 bg-gradient-to-b from-[#00a8ff]/30 to-transparent -translate-x-1/2 origin-top opacity-50 group-hover:opacity-100 transition-opacity" style={{ transform: `rotate(${-angle - 90}deg)` }} />
                      
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00a8ff] to-[#8b5cf6] flex items-center justify-center mb-3 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,168,255,0.4)] transition-all duration-300">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-[#00a8ff] transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-white/50 text-xs leading-relaxed">
                        {feature.description.substring(0, 55)}...
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Orbit ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[550px] h-[550px] sm:w-[650px] sm:h-[650px] lg:w-[800px] lg:h-[800px] rounded-full border border-dashed border-white/5" />
            <div className="absolute w-[450px] h-[450px] sm:w-[550px] sm:h-[550px] lg:w-[680px] lg:h-[680px] rounded-full border border-white/5" />
          </div>
        </div>
      </div>
    </section>
  );
}
