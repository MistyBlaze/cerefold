import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { useIntersection } from '../../hooks/useIntersection';

const problems = [
  'Conventional systems focus only on cortical activity',
  'Cerebellar signals — critical for motor control, timing, and cognition — go undetected',
  'Autonomic neural signatures that reveal stress, focus, and emotional state are ignored',
  "You can't optimize what you can't measure"
];

// Detailed anatomical brain SVG component
function AnatomicalBrain({ isVisible }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!isVisible) return;

    // Animate cortex dimming
    anime({
      targets: '.cortex-region',
      opacity: [0.8, 0.3],
      duration: 2000,
      easing: 'easeInOutSine',
      delay: 1000
    });

    // Animate cerebellum glowing
    anime({
      targets: '.cerebellum-region',
      opacity: [0.3, 1],
      scale: [1, 1.02, 1],
      duration: 2000,
      easing: 'easeInOutSine',
      delay: 1500,
      loop: true,
      direction: 'alternate'
    });

    // Animate brainstem glowing
    anime({
      targets: '.brainstem-region',
      opacity: [0.3, 0.9],
      duration: 2000,
      easing: 'easeInOutSine',
      delay: 1800,
      loop: true,
      direction: 'alternate'
    });

    // Sensor pulses
    anime({
      targets: '.brain-sensor',
      scale: [1, 1.4, 1],
      opacity: [0.5, 1, 0.5],
      duration: 1500,
      easing: 'easeInOutSine',
      loop: true,
      delay: anime.stagger(200, { from: 'center' })
    });

    // Neural path animation
    anime({
      targets: '.neural-connection',
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 2000,
      easing: 'easeInOutSine',
      delay: anime.stagger(150),
      loop: true
    });
  }, [isVisible]);

  return (
    <div className="relative w-full max-w-[500px] mx-auto">
      {/* Glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_70%,rgba(139,92,246,0.2),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_90%,rgba(236,72,153,0.15),transparent_50%)]" />
      
      <svg
        ref={svgRef}
        viewBox="0 0 400 450"
        className="w-full h-auto"
        fill="none"
      >
        <defs>
          <filter id="brainGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="sensorGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="cortexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00a8ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="cerebellumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Brain outline - side profile silhouette */}
        <path
          className="brain-outline"
          d="M200 30 
             C120 30 60 80 50 150
             C40 220 50 280 80 330
             C100 365 140 390 180 400
             L180 420
             L220 420
             L220 400
             C260 390 300 365 320 330
             C350 280 360 220 350 150
             C340 80 280 30 200 30Z"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
        />

        {/* Cortex region - top/front (will dim) */}
        <path
          className="cortex-region"
          d="M200 40
             C130 40 75 85 65 145
             C55 200 65 250 85 290
             L200 290
             L315 290
             C335 250 345 200 335 145
             C325 85 270 40 200 40Z"
          fill="url(#cortexGrad)"
          stroke="#00a8ff"
          strokeWidth="1.5"
          opacity="0.8"
        />

        {/* Brain folds in cortex */}
        <g className="cortex-folds" opacity="0.4">
          <path d="M80 120 Q140 100 200 120 Q260 140 320 120" stroke="#00a8ff" strokeWidth="1" fill="none" />
          <path d="M75 170 Q140 150 200 170 Q260 190 325 170" stroke="#00a8ff" strokeWidth="1" fill="none" />
          <path d="M80 220 Q140 200 200 220 Q260 240 320 220" stroke="#00a8ff" strokeWidth="1" fill="none" />
          <path d="M90 270 Q145 250 200 270 Q255 290 310 270" stroke="#00a8ff" strokeWidth="1" fill="none" />
        </g>

        {/* Cerebellum region - back/bottom (will glow bright) */}
        <ellipse
          className="cerebellum-region"
          cx="200"
          cy="360"
          rx="80"
          ry="35"
          fill="url(#cerebellumGrad)"
          stroke="#8b5cf6"
          strokeWidth="2"
          filter="url(#brainGlow)"
          opacity="0.3"
        />
        
        {/* Cerebellum texture */}
        <g className="cerebellum-texture" opacity="0.5">
          <path d="M130 355 Q165 345 200 355 Q235 365 270 355" stroke="#a855f7" strokeWidth="1" fill="none" />
          <path d="M140 370 Q170 360 200 370 Q230 380 260 370" stroke="#a855f7" strokeWidth="1" fill="none" />
        </g>

        {/* Brainstem - bottom (will glow) */}
        <path
          className="brainstem-region"
          d="M180 395 L180 430 Q180 445 200 445 Q220 445 220 430 L220 395"
          fill="rgba(236,72,153,0.4)"
          stroke="#ec4899"
          strokeWidth="2"
          filter="url(#brainGlow)"
          opacity="0.3"
        />

        {/* Neural connections */}
        <g className="connections">
          <path className="neural-connection" d="M150 100 Q175 150 200 200" stroke="#00a8ff" strokeWidth="1.5" strokeDasharray="4,4" fill="none" opacity="0.5" />
          <path className="neural-connection" d="M250 100 Q225 150 200 200" stroke="#00a8ff" strokeWidth="1.5" strokeDasharray="4,4" fill="none" opacity="0.5" />
          <path className="neural-connection" d="M200 200 L200 290" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4,4" fill="none" opacity="0.6" />
          <path className="neural-connection" d="M200 290 L200 360" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4,4" fill="none" opacity="0.7" />
          <path className="neural-connection" d="M200 360 L200 400" stroke="#ec4899" strokeWidth="2" strokeDasharray="4,4" fill="none" opacity="0.7" />
        </g>

        {/* EEG Sensor points */}
        <g className="sensors" filter="url(#sensorGlow)">
          {/* Frontal - Cyan (standard EEG) */}
          <circle className="brain-sensor" cx="200" cy="60" r="6" fill="#00a8ff" opacity="0.5" />
          <circle className="brain-sensor" cx="140" cy="80" r="5" fill="#00a8ff" opacity="0.5" />
          <circle className="brain-sensor" cx="260" cy="80" r="5" fill="#00a8ff" opacity="0.5" />
          
          {/* Central */}
          <circle className="brain-sensor" cx="100" cy="140" r="5" fill="#06b6d4" opacity="0.5" />
          <circle className="brain-sensor" cx="200" cy="130" r="6" fill="#06b6d4" opacity="0.5" />
          <circle className="brain-sensor" cx="300" cy="140" r="5" fill="#06b6d4" opacity="0.5" />
          
          {/* Parietal */}
          <circle className="brain-sensor" cx="120" cy="220" r="5" fill="#00a8ff" opacity="0.5" />
          <circle className="brain-sensor" cx="200" cy="200" r="6" fill="#00a8ff" opacity="0.5" />
          <circle className="brain-sensor" cx="280" cy="220" r="5" fill="#00a8ff" opacity="0.5" />
          
          {/* Occipital */}
          <circle className="brain-sensor" cx="150" cy="290" r="5" fill="#00a8ff" opacity="0.5" />
          <circle className="brain-sensor" cx="200" cy="300" r="5" fill="#00a8ff" opacity="0.5" />
          <circle className="brain-sensor" cx="250" cy="290" r="5" fill="#00a8ff" opacity="0.5" />
          
          {/* Cerebellar sensors - Purple (MindFlux exclusive) */}
          <circle className="brain-sensor cerebellum-sensor" cx="140" cy="355" r="6" fill="#8b5cf6" />
          <circle className="brain-sensor cerebellum-sensor" cx="200" cy="365" r="7" fill="#8b5cf6" />
          <circle className="brain-sensor cerebellum-sensor" cx="260" cy="355" r="6" fill="#8b5cf6" />
          
          {/* Autonomic sensors - Pink (MindFlux exclusive) */}
          <circle className="brain-sensor autonomic-sensor" cx="185" cy="420" r="5" fill="#ec4899" />
          <circle className="brain-sensor autonomic-sensor" cx="215" cy="420" r="5" fill="#ec4899" />
        </g>

        {/* Region labels */}
        <text x="200" y="175" textAnchor="middle" fill="#00a8ff" fontSize="11" opacity="0.6" className="font-medium">Cortex</text>
        <text x="200" y="355" textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="600" className="cerebellum-label">Cerebellum</text>
        <text x="200" y="455" textAnchor="middle" fill="#ec4899" fontSize="10" opacity="0.8">Autonomic</text>
      </svg>

      {/* Legend */}
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 space-y-3 hidden xl:block">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-[#00a8ff] opacity-50" />
          <span className="text-white/50">Standard EEG</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-[#8b5cf6]" />
          <span className="text-[#8b5cf6]">MindFlux</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-[#ec4899]" />
          <span className="text-[#ec4899]">Autonomic</span>
        </div>
      </div>
    </div>
  );
}

export default function Problem() {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.2 });
  const problemsRef = useRef([]);

  useEffect(() => {
    if (!hasIntersected) return;

    // Animate problem points
    anime({
      targets: '.problem-point',
      translateX: [-30, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo',
      delay: anime.stagger(200, { start: 400 })
    });

    // Animate section header
    anime({
      targets: '.problem-header',
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo'
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
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.06),transparent_40%)]" />
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Brain Visualization */}
          <div className="order-2 lg:order-1">
            <AnatomicalBrain isVisible={hasIntersected} />
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <div className="problem-header opacity-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f472b6]/10 border border-[#f472b6]/20 mb-6">
                <span className="text-xs font-semibold text-[#f472b6] uppercase tracking-wider">The Challenge</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-['Space_Grotesk'] leading-tight">
                Traditional EEG Misses{' '}
                <span className="text-[#f472b6]">90%</span> of the Story
              </h2>
            </div>

            <div className="mt-10 space-y-6">
              {problems.map((problem, index) => (
                <div
                  key={index}
                  ref={(el) => (problemsRef.current[index] = el)}
                  className="problem-point flex items-start gap-4 opacity-0"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#f472b6]/20 to-[#ec4899]/10 border border-[#f472b6]/20 flex items-center justify-center">
                    <span className="text-[#f472b6] font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed pt-2">
                    {problem}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#research"
              data-testid="problem-learn-more-link"
              className="inline-flex items-center gap-2 mt-10 text-[#00a8ff] hover:text-[#33bbff] transition-colors group"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#research')?.scrollIntoView({ behavior: 'smooth' });
              }}
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
