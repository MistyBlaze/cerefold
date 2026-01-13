import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

// Brain Visualization Component with neural pathways and sensors
function BrainVisualization() {
  const svgRef = useRef(null);

  useEffect(() => {
    // Animate sensor pulses
    anime({
      targets: '.sensor-node',
      scale: [1, 1.3, 1],
      opacity: [0.6, 1, 0.6],
      duration: 2000,
      easing: 'easeInOutSine',
      loop: true,
      delay: anime.stagger(150, { from: 'center' })
    });

    // Animate neural pathway pulses
    anime({
      targets: '.neural-path',
      strokeDashoffset: [anime.setDashoffset, 0],
      opacity: [0.3, 0.8, 0.3],
      duration: 3000,
      easing: 'easeInOutSine',
      loop: true,
      delay: anime.stagger(200)
    });

    // Animate the brainwave line
    anime({
      targets: '.brainwave-line',
      strokeDashoffset: [0, -100],
      duration: 2000,
      easing: 'linear',
      loop: true
    });

    // Glow pulse effect
    anime({
      targets: '.brain-glow',
      opacity: [0.3, 0.6, 0.3],
      scale: [0.98, 1.02, 0.98],
      duration: 3000,
      easing: 'easeInOutSine',
      loop: true
    });
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px]">
      {/* Glow background */}
      <div className="brain-glow absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,168,255,0.15),transparent_70%)]" />
      
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        className="w-full h-full"
        fill="none"
      >
        {/* Definitions */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glowStrong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00a8ff" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Brain outline - side profile */}
        <path
          className="brain-outline"
          d="M200 50 C280 50 340 100 350 160 C360 220 340 280 300 320 C260 360 220 370 200 370 C180 370 140 360 100 320 C60 280 40 220 50 160 C60 100 120 50 200 50"
          fill="url(#brainGradient)"
          stroke="rgba(0,168,255,0.4)"
          strokeWidth="2"
          filter="url(#glow)"
        />

        {/* Brain folds/sulci */}
        <g className="brain-folds" opacity="0.4">
          <path d="M100 150 Q150 130 200 150 Q250 170 300 150" stroke="#00a8ff" strokeWidth="1.5" fill="none" />
          <path d="M90 200 Q140 180 200 200 Q260 220 310 200" stroke="#00a8ff" strokeWidth="1.5" fill="none" />
          <path d="M100 250 Q150 230 200 250 Q250 270 300 250" stroke="#00a8ff" strokeWidth="1.5" fill="none" />
          <path d="M120 300 Q160 280 200 300 Q240 320 280 300" stroke="#8b5cf6" strokeWidth="1.5" fill="none" />
        </g>

        {/* Cerebellum region (back/bottom) - highlighted */}
        <ellipse
          cx="200"
          cy="340"
          rx="60"
          ry="30"
          fill="rgba(139,92,246,0.3)"
          stroke="#8b5cf6"
          strokeWidth="2"
          filter="url(#glow)"
          className="cerebellum-region"
        />

        {/* Neural connection paths */}
        <g className="neural-connections">
          {/* Connections between sensor nodes */}
          <path className="neural-path" d="M120 120 Q160 100 200 120" stroke="#00a8ff" strokeWidth="1.5" strokeDasharray="5,5" fill="none" opacity="0.6" />
          <path className="neural-path" d="M200 120 Q240 100 280 120" stroke="#00a8ff" strokeWidth="1.5" strokeDasharray="5,5" fill="none" opacity="0.6" />
          <path className="neural-path" d="M100 180 Q150 200 200 180" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="5,5" fill="none" opacity="0.6" />
          <path className="neural-path" d="M200 180 Q250 200 300 180" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="5,5" fill="none" opacity="0.6" />
          <path className="neural-path" d="M120 120 Q100 150 100 180" stroke="#00ff88" strokeWidth="1.5" strokeDasharray="5,5" fill="none" opacity="0.6" />
          <path className="neural-path" d="M280 120 Q300 150 300 180" stroke="#00ff88" strokeWidth="1.5" strokeDasharray="5,5" fill="none" opacity="0.6" />
          <path className="neural-path" d="M100 180 Q80 220 100 260" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="5,5" fill="none" opacity="0.6" />
          <path className="neural-path" d="M300 180 Q320 220 300 260" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="5,5" fill="none" opacity="0.6" />
          {/* Central connections */}
          <path className="neural-path" d="M200 120 L200 180" stroke="#00a8ff" strokeWidth="2" strokeDasharray="5,5" fill="none" opacity="0.8" />
          <path className="neural-path" d="M200 180 L200 260" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5" fill="none" opacity="0.8" />
          <path className="neural-path" d="M200 260 L200 340" stroke="#ec4899" strokeWidth="2" strokeDasharray="5,5" fill="none" opacity="0.8" />
        </g>

        {/* EEG Sensor nodes - 10-20 system inspired */}
        <g className="sensors" filter="url(#glow)">
          {/* Frontal sensors */}
          <circle className="sensor-node" cx="200" cy="80" r="8" fill="#00a8ff" />
          <circle className="sensor-node" cx="140" cy="100" r="7" fill="#00a8ff" />
          <circle className="sensor-node" cx="260" cy="100" r="7" fill="#00a8ff" />
          
          {/* Central sensors */}
          <circle className="sensor-node" cx="120" cy="150" r="7" fill="#00ff88" />
          <circle className="sensor-node" cx="200" cy="140" r="8" fill="#00ff88" />
          <circle className="sensor-node" cx="280" cy="150" r="7" fill="#00ff88" />
          
          {/* Temporal sensors */}
          <circle className="sensor-node" cx="80" cy="200" r="6" fill="#06b6d4" />
          <circle className="sensor-node" cx="320" cy="200" r="6" fill="#06b6d4" />
          
          {/* Parietal sensors */}
          <circle className="sensor-node" cx="140" cy="220" r="7" fill="#8b5cf6" />
          <circle className="sensor-node" cx="200" cy="200" r="8" fill="#8b5cf6" />
          <circle className="sensor-node" cx="260" cy="220" r="7" fill="#8b5cf6" />
          
          {/* Occipital sensors */}
          <circle className="sensor-node" cx="160" cy="280" r="6" fill="#ec4899" />
          <circle className="sensor-node" cx="200" cy="290" r="7" fill="#ec4899" />
          <circle className="sensor-node" cx="240" cy="280" r="6" fill="#ec4899" />
          
          {/* Cerebellar sensors - highlighted */}
          <circle className="sensor-node" cx="160" cy="340" r="6" fill="#8b5cf6" filter="url(#glowStrong)" />
          <circle className="sensor-node" cx="200" cy="350" r="7" fill="#8b5cf6" filter="url(#glowStrong)" />
          <circle className="sensor-node" cx="240" cy="340" r="6" fill="#8b5cf6" filter="url(#glowStrong)" />
        </g>

        {/* Animated brainwave line at bottom */}
        <path
          className="brainwave-line"
          d="M50 380 Q80 360 110 380 Q140 400 170 380 Q200 360 230 380 Q260 400 290 380 Q320 360 350 380"
          stroke="#00a8ff"
          strokeWidth="2"
          fill="none"
          strokeDasharray="10,5"
          filter="url(#glow)"
        />

        {/* Floating data points */}
        {[...Array(8)].map((_, i) => (
          <circle
            key={i}
            className="floating-particle"
            cx={100 + Math.random() * 200}
            cy={100 + Math.random() * 200}
            r="2"
            fill="#00ff88"
            opacity="0.6"
          >
            <animate
              attributeName="cy"
              values={`${100 + Math.random() * 200};${80 + Math.random() * 200};${100 + Math.random() * 200}`}
              dur={`${3 + Math.random() * 2}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur={`${2 + Math.random() * 2}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      {/* Labels */}
      <div className="absolute top-[15%] right-[10%] text-xs text-[#00a8ff] font-medium opacity-70">
        Frontal Cortex
      </div>
      <div className="absolute top-[45%] right-[5%] text-xs text-[#8b5cf6] font-medium opacity-70">
        Parietal
      </div>
      <div className="absolute bottom-[25%] right-[15%] text-xs text-[#ec4899] font-medium opacity-70">
        Occipital
      </div>
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-xs text-[#8b5cf6] font-semibold">
        Cerebellum (MindFlux)
      </div>
    </div>
  );
}

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    // Create neural network nodes
    const nodes = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      pulsePhase: Math.random() * Math.PI * 2
    }));

    // Traveling particles
    const particles = [];

    function createParticle(startNode, endNode) {
      particles.push({
        startX: startNode.x,
        startY: startNode.y,
        endX: endNode.x,
        endY: endNode.y,
        progress: 0,
        speed: 0.006 + Math.random() * 0.006
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);

          if (d < 120) {
            const alpha = (1 - d / 120) * 0.25;
            ctx.strokeStyle = `rgba(0, 168, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            if (Math.random() < 0.0003) {
              createParticle(a, b);
            }
          }
        }
      }

      // Draw traveling particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          particles.splice(i, 1);
          continue;
        }

        const x = p.startX + (p.endX - p.startX) * p.progress;
        const y = p.startY + (p.endY - p.startY) * p.progress;

        ctx.beginPath();
        ctx.fillStyle = `rgba(0, 255, 136, ${1 - p.progress})`;
        ctx.shadowColor = 'rgba(0, 255, 136, 0.8)';
        ctx.shadowBlur = 8;
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw nodes
      const time = Date.now() * 0.001;
      for (const n of nodes) {
        const pulse = Math.sin(time * 2 + n.pulsePhase) * 0.3 + 1;
        const currentR = n.r * pulse;

        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 168, 255, 0.8)';
        ctx.shadowColor = 'rgba(0, 168, 255, 0.5)';
        ctx.shadowBlur = 10;
        ctx.arc(n.x, n.y, currentR, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Animate hero content
    anime({
      targets: '.hero-content > *',
      translateY: [40, 0],
      opacity: [0, 1],
      filter: ['blur(10px)', 'blur(0px)'],
      duration: 1000,
      easing: 'easeOutExpo',
      delay: anime.stagger(150, { start: 300 })
    });

    // Animate brain visualization
    anime({
      targets: '.hero-brain',
      translateX: [60, 0],
      opacity: [0, 1],
      duration: 1200,
      easing: 'easeOutExpo',
      delay: 600
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
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
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Neural Network Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#050508] via-[#0a0a12] to-[#050510] opacity-90" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_top_right,rgba(0,168,255,0.1),transparent_70%)] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.1),transparent_70%)] -z-10" />

      {/* Content */}
      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10 py-20 lg:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text Content */}
          <div className="hero-content">
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 opacity-0">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="text-sm text-white/70 font-medium">Next-Gen Neural Interface</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white font-['Space_Grotesk'] tracking-tight leading-[1.05] opacity-0">
              Decode the Language of the{' '}
              <span className="bg-gradient-to-r from-[#00a8ff] via-[#8b5cf6] to-[#00ff88] bg-clip-text text-transparent">
                Mind
              </span>
            </h1>

            {/* Subline */}
            <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed opacity-0">
              MindFlux captures what others miss — cerebellar rhythms, autonomic signatures, 
              and the subtle neural patterns that reveal how your brain truly functions.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4 opacity-0">
              <a
                href="#mindflux"
                data-testid="hero-explore-button"
                onClick={(e) => scrollToSection(e, '#mindflux')}
                className="group relative inline-flex items-center justify-center rounded-lg bg-[#00a8ff] text-[#0a0a0f] px-6 py-4 font-semibold text-base tracking-wide shadow-[0_0_40px_rgba(0,168,255,0.35)] hover:bg-[#33bbff] hover:shadow-[0_0_50px_rgba(0,168,255,0.5)] transition-all duration-300"
              >
                <span>Explore MindFlux</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#research"
                data-testid="hero-research-button"
                onClick={(e) => scrollToSection(e, '#research')}
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm text-white px-6 py-4 font-medium text-base hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                View Research
              </a>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-md opacity-0">
              {[
                { value: '64+', label: 'Channels' },
                { value: '<10ms', label: 'Latency' },
                { value: '99.9%', label: 'Accuracy' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#00a8ff] font-['Space_Grotesk']">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Brain Visualization */}
          <div className="hero-brain opacity-0 hidden lg:block">
            <BrainVisualization />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-white/40 tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00a8ff] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
