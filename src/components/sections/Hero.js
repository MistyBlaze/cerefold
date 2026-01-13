import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import CosmicBackground from '../effects/CosmicBackground';

// Brain with waves and sensors - LARGER and clearer
function HeroBrainVisualization() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const size = 600;
    const w = canvas.width = size;
    const h = canvas.height = size;
    const cx = w / 2;
    const cy = h / 2;
    let animationId;
    let time = 0;

    // Emanating waves from brain
    const waves = [];
    
    // Sensor positions (10-20 system)
    const sensors = [
      { angle: -90, dist: 145, label: 'Fz', color: '#00a8ff', size: 10 },
      { angle: -50, dist: 155, label: 'F3', color: '#00a8ff', size: 9 },
      { angle: -130, dist: 155, label: 'F4', color: '#00a8ff', size: 9 },
      { angle: -20, dist: 160, label: 'C3', color: '#00ff88', size: 9 },
      { angle: -160, dist: 160, label: 'C4', color: '#00ff88', size: 9 },
      { angle: 10, dist: 165, label: 'T3', color: '#06b6d4', size: 8 },
      { angle: 170, dist: 165, label: 'T4', color: '#06b6d4', size: 8 },
      { angle: 40, dist: 155, label: 'P3', color: '#8b5cf6', size: 9 },
      { angle: 140, dist: 155, label: 'P4', color: '#8b5cf6', size: 9 },
      { angle: 70, dist: 145, label: 'O1', color: '#ec4899', size: 8 },
      { angle: 110, dist: 145, label: 'O2', color: '#ec4899', size: 8 },
      { angle: 90, dist: 135, label: 'Oz', color: '#ec4899', size: 10 },
      // Cerebellar - highlighted
      { angle: 75, dist: 115, label: 'CB1', color: '#a855f7', size: 12, special: true },
      { angle: 90, dist: 105, label: 'CB2', color: '#a855f7', size: 14, special: true },
      { angle: 105, dist: 115, label: 'CB3', color: '#a855f7', size: 12, special: true },
    ];

    function createWave() {
      waves.push({
        radius: 80,
        maxRadius: 250,
        opacity: 0.6,
        speed: 0.6 + Math.random() * 0.3,
        color: Math.random() > 0.5 ? '#00a8ff' : '#8b5cf6'
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Create waves periodically
      if (Math.random() < 0.025) createWave();

      // Draw emanating waves
      for (let i = waves.length - 1; i >= 0; i--) {
        const wave = waves[i];
        wave.radius += wave.speed;
        wave.opacity -= 0.004;

        if (wave.opacity <= 0) {
          waves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.globalAlpha = wave.opacity * 0.6;
        ctx.lineWidth = 2;
        ctx.arc(cx, cy, wave.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Draw brain glow
      const brainGlow = ctx.createRadialGradient(cx, cy, 30, cx, cy, 120);
      brainGlow.addColorStop(0, 'rgba(139, 92, 246, 0.25)');
      brainGlow.addColorStop(0.5, 'rgba(0, 168, 255, 0.1)');
      brainGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = brainGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 120, 0, Math.PI * 2);
      ctx.fill();

      // Draw brain outline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 75, 90, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Brain folds
      ctx.strokeStyle = 'rgba(0, 168, 255, 0.3)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 5; i++) {
        const yOff = -50 + i * 25;
        ctx.beginPath();
        ctx.moveTo(cx - 55, cy + yOff);
        ctx.quadraticCurveTo(cx, cy + yOff + (i % 2 ? -12 : 12), cx + 55, cy + yOff);
        ctx.stroke();
      }

      // Cerebellum highlight
      ctx.fillStyle = 'rgba(168, 85, 247, 0.2)';
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.ellipse(cx, cy + 70, 45, 22, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Neural activity inside brain
      for (let i = 0; i < 15; i++) {
        const angle = (i / 15) * Math.PI * 2 + time * 0.5;
        const r = 30 + Math.sin(time * 2 + i) * 15;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r * 1.1;
        const pulse = Math.sin(time * 4 + i * 0.8) * 0.5 + 0.5;
        
        ctx.beginPath();
        ctx.fillStyle = `rgba(0, 255, 136, ${0.3 + pulse * 0.5})`;
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 6;
        ctx.arc(x, y, 3 + pulse * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw sensors
      sensors.forEach((sensor, idx) => {
        const rad = (sensor.angle * Math.PI) / 180;
        const x = cx + Math.cos(rad) * sensor.dist;
        const y = cy + Math.sin(rad) * sensor.dist;
        const pulse = Math.sin(time * 3 + idx * 0.4) * 0.25 + 0.75;

        // Connection line
        ctx.beginPath();
        ctx.strokeStyle = `${sensor.color}30`;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.moveTo(x, y);
        const innerX = cx + Math.cos(rad) * 75;
        const innerY = cy + Math.sin(rad) * 90;
        ctx.lineTo(innerX, innerY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Glow ring for special sensors
        if (sensor.special) {
          ctx.beginPath();
          ctx.strokeStyle = `${sensor.color}50`;
          ctx.lineWidth = 2;
          ctx.arc(x, y, sensor.size + 6 + pulse * 4, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Sensor dot
        ctx.beginPath();
        ctx.fillStyle = sensor.color;
        ctx.shadowColor = sensor.color;
        ctx.shadowBlur = sensor.special ? 18 : 10;
        ctx.globalAlpha = 0.7 + pulse * 0.3;
        ctx.arc(x, y, sensor.size * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Label
        ctx.fillStyle = `${sensor.color}90`;
        ctx.font = `${sensor.special ? 'bold ' : ''}10px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(sensor.label, x, y - sensor.size - 6);
      });

      // Draw EEG waveform at bottom
      const waveY = h - 80;
      ctx.strokeStyle = '#00a8ff';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#00a8ff';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      for (let x = 80; x < w - 80; x++) {
        const y = waveY + 
          Math.sin((x + time * 120) * 0.025) * 20 +
          Math.sin((x + time * 90) * 0.04) * 12 +
          Math.sin((x + time * 60) * 0.08) * 6;
        if (x === 80) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Waveform label
      ctx.fillStyle = '#00a8ff';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('LIVE EEG SIGNAL', 80, waveY - 35);

      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full max-w-[600px] max-h-[600px]"
      style={{ width: '100%', height: 'auto', aspectRatio: '1/1' }}
    />
  );
}

export default function Hero() {
  useEffect(() => {
    anime({
      targets: '.hero-animate',
      translateY: [50, 0],
      opacity: [0, 1],
      filter: ['blur(15px)', 'blur(0px)'],
      duration: 1200,
      easing: 'easeOutExpo',
      delay: anime.stagger(120, { start: 300 })
    });

    anime({
      targets: '.hero-brain',
      scale: [0.85, 1],
      opacity: [0, 1],
      duration: 1400,
      easing: 'easeOutExpo',
      delay: 500
    });
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" data-testid="hero-section" className="relative min-h-screen flex items-center">
      <CosmicBackground />
      
      <div className="mx-auto max-w-[1400px] w-full px-6 lg:px-12 py-20 lg:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div>
            <div className="hero-animate opacity-0 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur border border-white/10 mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00ff88]"></span>
              </span>
              <span className="text-sm text-white/80 font-medium">Next-Generation Neural Interface</span>
            </div>

            <h1 className="hero-animate opacity-0 text-5xl sm:text-6xl lg:text-7xl font-bold text-white font-['Space_Grotesk'] leading-[1.1]">
              Decode the
              <br />
              <span className="bg-gradient-to-r from-[#00a8ff] via-[#8b5cf6] to-[#00ff88] bg-clip-text text-transparent">
                Language of Mind
              </span>
            </h1>

            <p className="hero-animate opacity-0 mt-8 text-xl text-white/60 max-w-lg leading-relaxed">
              MindFlux captures what others miss — cerebellar rhythms, autonomic signatures, and subtle neural patterns that reveal how your brain truly functions.
            </p>

            <div className="hero-animate opacity-0 mt-10 flex flex-wrap gap-4">
              <a
                href="#mindflux"
                onClick={(e) => scrollTo(e, '#mindflux')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#00a8ff] to-[#0066ff] text-white font-semibold hover:shadow-[0_0_40px_rgba(0,168,255,0.4)] transition-all"
              >
                Explore MindFlux
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#research"
                onClick={(e) => scrollTo(e, '#research')}
                className="inline-flex items-center px-8 py-4 rounded-xl border border-white/20 bg-white/5 text-white font-medium hover:bg-white/10 transition-all"
              >
                View Research
              </a>
            </div>

            <div className="hero-animate opacity-0 mt-14 flex gap-12">
              {[
                { value: '64+', label: 'CHANNELS', color: '#00a8ff' },
                { value: '<10ms', label: 'LATENCY', color: '#8b5cf6' },
                { value: '99.9%', label: 'ACCURACY', color: '#00ff88' }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl font-bold font-['Space_Grotesk']" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/40 mt-1 tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Brain Visualization - LARGER */}
          <div className="hero-brain opacity-0 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[550px]">
              <div className="absolute inset-0 -m-10 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)]" />
              <HeroBrainVisualization />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-white/30 tracking-widest">SCROLL</span>
        <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2">
          <div className="w-1 h-3 rounded-full bg-gradient-to-b from-[#00a8ff] to-transparent animate-bounce" />
        </div>
      </div>
    </section>
  );
}
