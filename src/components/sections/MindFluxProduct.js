import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { useIntersection } from '../../hooks/useIntersection';
import CosmicBackground from '../effects/CosmicBackground';

// System Architecture - LARGER and clearer
function SystemArchitecture() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const w = canvas.width = 1000;
    const h = canvas.height = 400;
    let animationId;
    let time = 0;

    const particles = [];

    function createParticle(sx, sy, ex, ey, color) {
      particles.push({
        sx, sy, ex, ey, progress: 0,
        speed: 0.008 + Math.random() * 0.004,
        color, size: 4 + Math.random() * 3
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Positions
      const brainX = 120, brainY = h / 2;
      const deviceX = 340, deviceY = h / 2;
      const appX = 580, appY = h / 2;
      const cloudX = 850, cloudY = h / 2;

      // Draw connection lines
      const drawConn = (x1, y1, x2, y2, color) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      };

      drawConn(brainX + 60, brainY, deviceX - 70, deviceY, 'rgba(0, 168, 255, 0.25)');
      drawConn(deviceX + 70, deviceY, appX - 80, appY, 'rgba(0, 255, 136, 0.25)');
      drawConn(appX + 80, appY, cloudX - 70, cloudY, 'rgba(139, 92, 246, 0.25)');

      // Create particles
      if (Math.random() < 0.06) createParticle(brainX + 60, brainY, deviceX - 70, deviceY, '#00a8ff');
      if (Math.random() < 0.05) createParticle(deviceX + 70, deviceY, appX - 80, appY, '#00ff88');
      if (Math.random() < 0.04) createParticle(appX + 80, appY, cloudX - 70, cloudY, '#8b5cf6');

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.progress += p.speed;
        if (p.progress >= 1) { particles.splice(i, 1); continue; }

        const x = p.sx + (p.ex - p.sx) * p.progress;
        const y = p.sy + (p.ey - p.sy) * p.progress;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // === BRAIN ===
      ctx.save();
      ctx.translate(brainX, brainY);
      
      const brainGlow = ctx.createRadialGradient(0, 0, 15, 0, 0, 60);
      brainGlow.addColorStop(0, 'rgba(0, 168, 255, 0.3)');
      brainGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = brainGlow;
      ctx.beginPath();
      ctx.arc(0, 0, 60, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#00a8ff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(0, 0, 45, 55, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Brain activity nodes
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + time;
        const x = Math.cos(a) * 25;
        const y = Math.sin(a) * 30;
        const pulse = Math.sin(time * 4 + i) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.fillStyle = `rgba(0, 255, 136, ${0.4 + pulse * 0.6})`;
        ctx.arc(x, y, 4 + pulse * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Label
      ctx.fillStyle = '#ffffff60';
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Brain Signals', brainX, brainY + 90);

      // === DEVICE ===
      ctx.save();
      ctx.translate(deviceX, deviceY);
      
      ctx.fillStyle = 'rgba(5, 5, 15, 0.95)';
      ctx.strokeStyle = '#00ff88';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(-65, -45, 130, 90, 15);
      ctx.fill();
      ctx.stroke();

      ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = 20;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#00ff88';
      ctx.font = 'bold 14px Space Grotesk, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('MINDFLUX', 0, -10);
      ctx.fillStyle = '#ffffff70';
      ctx.font = '11px sans-serif';
      ctx.fillText('WEARABLE', 0, 8);

      // Indicators
      for (let i = 0; i < 3; i++) {
        const pulse = Math.sin(time * 5 + i) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.fillStyle = `rgba(0, 255, 136, ${0.4 + pulse * 0.6})`;
        ctx.arc(-25 + i * 25, 28, 6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      ctx.fillStyle = '#ffffff60';
      ctx.fillText('EEG Capture', deviceX, deviceY + 90);

      // === APP ===
      ctx.save();
      ctx.translate(appX, appY);
      
      ctx.fillStyle = 'rgba(5, 5, 15, 0.95)';
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(-55, -80, 110, 160, 15);
      ctx.fill();
      ctx.stroke();

      ctx.shadowColor = '#8b5cf6';
      ctx.shadowBlur = 20;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Screen
      ctx.fillStyle = 'rgba(139, 92, 246, 0.1)';
      ctx.beginPath();
      ctx.roundRect(-45, -68, 90, 120, 8);
      ctx.fill();

      // Waveform on screen
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = -35; x < 35; x++) {
        const y = Math.sin((x + time * 60) * 0.12) * 18;
        if (x === -35) ctx.moveTo(x, y - 20);
        else ctx.lineTo(x, y - 20);
      }
      ctx.stroke();

      ctx.fillStyle = '#ffffff70';
      ctx.font = '11px sans-serif';
      ctx.fillText('USER APP', 0, 20);
      ctx.fillText('Analytics', 0, 40);
      ctx.restore();

      ctx.fillStyle = '#ffffff60';
      ctx.fillText('Processing', appX, appY + 105);

      // === CLOUD ===
      ctx.save();
      ctx.translate(cloudX, cloudY);
      
      ctx.fillStyle = 'rgba(5, 5, 15, 0.95)';
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(0, 0, 65, 45, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 20;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Servers
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = 'rgba(168, 85, 247, 0.6)';
        ctx.beginPath();
        ctx.roundRect(-38 + i * 28, -12, 22, 28, 3);
        ctx.fill();
        
        const blink = Math.sin(time * 6 + i * 2) > 0;
        ctx.fillStyle = blink ? '#00ff88' : '#00ff8840';
        ctx.beginPath();
        ctx.arc(-27 + i * 28, -4, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#ffffff70';
      ctx.font = '11px sans-serif';
      ctx.fillText('AI CLOUD', 0, -28);
      ctx.restore();

      ctx.fillStyle = '#ffffff60';
      ctx.fillText('Analytics', cloudX, cloudY + 75);

      // Connection labels
      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#00a8ff80';
      ctx.fillText('Neural Data', (brainX + deviceX) / 2, brainY - 70);
      ctx.fillStyle = '#00ff8880';
      ctx.fillText('Processed', (deviceX + appX) / 2, deviceY - 70);
      ctx.fillStyle = '#8b5cf680';
      ctx.fillText('Insights', (appX + cloudX) / 2, cloudY - 70);

      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ maxWidth: '1000px', aspectRatio: '1000/400' }}
    />
  );
}

function FeatureCard({ icon, title, description, color }) {
  return (
    <div className="feature-card opacity-0 p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 group">
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-2xl group-hover:scale-110 transition-transform"
        style={{ backgroundColor: `${color}15`, boxShadow: `0 0 30px ${color}20` }}
      >
        {icon}
      </div>
      <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[var(--c)] transition-colors" style={{ '--c': color }}>
        {title}
      </h4>
      <p className="text-white/50 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default function MindFluxProduct() {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.1 });

  useEffect(() => {
    if (!hasIntersected) return;

    anime({
      targets: '.mindflux-animate',
      translateY: [40, 0],
      opacity: [0, 1],
      filter: ['blur(10px)', 'blur(0px)'],
      duration: 1000,
      easing: 'easeOutExpo',
      delay: anime.stagger(100)
    });

    anime({
      targets: '.system-arch',
      scale: [0.95, 1],
      opacity: [0, 1],
      duration: 1200,
      easing: 'easeOutExpo',
      delay: 300
    });

    anime({
      targets: '.feature-card',
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo',
      delay: anime.stagger(80, { start: 500 })
    });
  }, [hasIntersected]);

  const features = [
    { icon: '🧠', title: 'Cerebellar Capture', description: 'Dedicated posterior sensors for 4-8Hz theta and 8-12Hz alpha oscillations.', color: '#8b5cf6' },
    { icon: '💓', title: 'Autonomic Decoding', description: 'Heart-brain coherence and vagal tone through integrated biosensors.', color: '#ec4899' },
    { icon: '📊', title: 'High-Density Array', description: '64+ channels with medical-grade signal fidelity.', color: '#00a8ff' },
    { icon: '⚡', title: 'Real-Time Processing', description: 'Sub-10ms latency neural state classification.', color: '#00ff88' },
    { icon: '🤖', title: 'Adaptive Filtering', description: 'AI-powered artifact rejection for clean signals.', color: '#06b6d4' },
    { icon: '🔒', title: 'Secure Pipeline', description: 'End-to-end encrypted with HIPAA compliance.', color: '#eab308' },
  ];

  return (
    <section ref={ref} id="mindflux" data-testid="mindflux-section" className="relative py-28 lg:py-36">
      {/* Cosmic background continues */}
      <CosmicBackground />
      
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mindflux-animate opacity-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#8b5cf6] animate-pulse" />
            <span className="text-sm font-medium text-[#8b5cf6] uppercase tracking-wider">Product</span>
          </div>
          <h2 className="mindflux-animate opacity-0 text-5xl sm:text-6xl font-bold text-white font-['Space_Grotesk']">
            MindFlux
          </h2>
          <p className="mindflux-animate opacity-0 mt-4 text-xl text-white/40">Full-Spectrum Neural Intelligence Platform</p>
          <p className="mindflux-animate opacity-0 mt-6 text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            A breakthrough EEG system capturing the complete neural picture — from cortical activity to cerebellar rhythms and autonomic signatures.
          </p>
        </div>

        {/* System Architecture */}
        <div className="system-arch opacity-0 flex justify-center mb-20">
          <SystemArchitecture />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
