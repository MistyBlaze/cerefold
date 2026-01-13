import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import CosmicBackground from '../effects/CosmicBackground';
import ActiveBrainVisualization from '../effects/ActiveBrainVisualization';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    // Animate hero content with blur reveal
    anime({
      targets: '.hero-content > *',
      translateY: [60, 0],
      opacity: [0, 1],
      filter: ['blur(20px)', 'blur(0px)'],
      duration: 1200,
      easing: 'easeOutExpo',
      delay: anime.stagger(150, { start: 400 })
    });

    // Animate brain visualization
    anime({
      targets: '.hero-brain-wrapper',
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 1500,
      easing: 'easeOutExpo',
      delay: 600
    });
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Cosmic Background */}
      <CosmicBackground intensity={1.2} />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030308]/50 to-[#030308] -z-10" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.15),transparent_60%)] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,168,255,0.1),transparent_60%)] -z-10" />

      {/* Content */}
      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10 py-20 lg:py-32 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text Content */}
          <div className="hero-content">
            {/* Label */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8 opacity-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]"></span>
              </span>
              <span className="text-sm text-white/80 font-medium tracking-wide">Next-Generation Neural Interface</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white font-['Space_Grotesk'] tracking-tight leading-[1.1] opacity-0">
              Decode the
              <br />
              <span className="bg-gradient-to-r from-[#00a8ff] via-[#8b5cf6] to-[#00ff88] bg-clip-text text-transparent">
                Language of Mind
              </span>
            </h1>

            {/* Subline */}
            <p className="mt-8 text-lg sm:text-xl text-white/60 max-w-xl leading-relaxed opacity-0">
              MindFlux captures what others miss — cerebellar rhythms, autonomic signatures, 
              and subtle neural patterns that reveal how your brain truly functions.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4 opacity-0">
              <a
                href="#mindflux"
                data-testid="hero-explore-button"
                onClick={(e) => scrollToSection(e, '#mindflux')}
                className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#00a8ff] to-[#0066ff] text-white px-8 py-4 font-semibold text-base tracking-wide overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,168,255,0.4)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore MindFlux
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0066ff] to-[#00a8ff] opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="#research"
                data-testid="hero-research-button"
                onClick={(e) => scrollToSection(e, '#research')}
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white px-8 py-4 font-medium text-base hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                View Research
              </a>
            </div>

            {/* Stats */}
            <div className="mt-16 flex flex-wrap gap-12 opacity-0">
              {[
                { value: '64+', label: 'Channels', color: '#00a8ff' },
                { value: '<10ms', label: 'Latency', color: '#8b5cf6' },
                { value: '99.9%', label: 'Accuracy', color: '#00ff88' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div 
                    className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk']"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/40 mt-1 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Brain Visualization */}
          <div className="hero-brain-wrapper opacity-0 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 -m-8 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.2),transparent_70%)] animate-pulse" style={{ animationDuration: '3s' }} />
              
              <ActiveBrainVisualization size={450} />
              
              {/* Caption */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center">
                <span className="text-xs text-white/40 uppercase tracking-widest">Real-Time Neural Capture</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2">
          <div className="w-1 h-3 rounded-full bg-gradient-to-b from-[#00a8ff] to-transparent animate-bounce" />
        </div>
      </div>
    </section>
  );
}
