import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function Hero() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    // Create neural network nodes
    const nodes = Array.from({ length: 100 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.8,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      pulsePhase: Math.random() * Math.PI * 2
    }));

    // Traveling particles along connections
    const particles = [];

    function createParticle(startNode, endNode) {
      particles.push({
        startX: startNode.x,
        startY: startNode.y,
        endX: endNode.x,
        endY: endNode.y,
        progress: 0,
        speed: 0.008 + Math.random() * 0.008
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

          if (d < 160) {
            const alpha = (1 - d / 160) * 0.3;
            ctx.strokeStyle = `rgba(0, 168, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            // Occasionally create traveling particles
            if (Math.random() < 0.0005) {
              createParticle(a, b);
            }
          }
        }
      }

      // Draw and update traveling particles
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
        ctx.shadowBlur = 10;
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw and update nodes
      const time = Date.now() * 0.001;
      for (const n of nodes) {
        // Pulse effect
        const pulse = Math.sin(time * 2 + n.pulsePhase) * 0.3 + 1;
        const currentR = n.r * pulse;

        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 168, 255, 0.9)';
        ctx.shadowColor = 'rgba(0, 168, 255, 0.6)';
        ctx.shadowBlur = 15;
        ctx.arc(n.x, n.y, currentR, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Update position
        n.x += n.vx;
        n.y += n.vy;

        // Bounce off edges
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
      ref={heroRef}
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

      {/* Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#050508] via-[#0a0a12] to-[#050510] opacity-80" />

      {/* Content */}
      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10 py-20 lg:py-32 w-full">
        <div className="hero-content max-w-3xl">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-sm text-white/70 font-medium">Next-Gen Neural Interface</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white font-['Space_Grotesk'] tracking-tight leading-[1.05]">
            Decode the Language of the{' '}
            <span className="bg-gradient-to-r from-[#00a8ff] via-[#8b5cf6] to-[#00ff88] bg-clip-text text-transparent">
              Mind
            </span>
          </h1>

          {/* Subline */}
          <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
            MindFlux captures what others miss — cerebellar rhythms, autonomic signatures, 
            and the subtle neural patterns that reveal how your brain truly functions.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
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
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg">
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
