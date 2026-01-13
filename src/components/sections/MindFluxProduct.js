import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { useIntersection } from '../../hooks/useIntersection';

// System architecture visualization inspired by the MindFlux diagrams
function SystemArchitecture() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const w = canvas.width = 800;
    const h = canvas.height = 500;
    let animationId;
    let time = 0;

    // Data particles flowing through the system
    const dataParticles = [];

    function createDataParticle(startX, startY, endX, endY, color) {
      dataParticles.push({
        startX, startY, endX, endY,
        progress: 0,
        speed: 0.008 + Math.random() * 0.005,
        color,
        size: 3 + Math.random() * 2
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Component positions
      const brainX = 100, brainY = h / 2;
      const wearableX = 250, wearableY = h / 2;
      const mobileX = 480, mobileY = h / 2;
      const cloudX = 700, cloudY = h / 2;

      // Draw connections (curved paths)
      const drawConnection = (x1, y1, x2, y2, color, isData = true) => {
        const cp1x = x1 + (x2 - x1) * 0.4;
        const cp2x = x1 + (x2 - x1) * 0.6;
        
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.setLineDash(isData ? [] : [5, 5]);
        ctx.moveTo(x1, y1);
        ctx.bezierCurveTo(cp1x, y1, cp2x, y2, x2, y2);
        ctx.stroke();
        ctx.setLineDash([]);
      };

      // Draw connections
      drawConnection(brainX + 40, brainY, wearableX - 60, wearableY, 'rgba(0, 168, 255, 0.3)');
      drawConnection(wearableX + 60, wearableY, mobileX - 80, mobileY, 'rgba(0, 255, 136, 0.3)');
      drawConnection(mobileX + 80, mobileY, cloudX - 60, cloudY, 'rgba(139, 92, 246, 0.3)');

      // Create data particles periodically
      if (Math.random() < 0.05) {
        createDataParticle(brainX + 40, brainY, wearableX - 60, wearableY, '#00a8ff');
      }
      if (Math.random() < 0.04) {
        createDataParticle(wearableX + 60, wearableY, mobileX - 80, mobileY, '#00ff88');
      }
      if (Math.random() < 0.03) {
        createDataParticle(mobileX + 80, mobileY, cloudX - 60, cloudY, '#8b5cf6');
      }

      // Update and draw data particles
      for (let i = dataParticles.length - 1; i >= 0; i--) {
        const p = dataParticles[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          dataParticles.splice(i, 1);
          continue;
        }

        const t = p.progress;
        const cp1x = p.startX + (p.endX - p.startX) * 0.4;
        const cp2x = p.startX + (p.endX - p.startX) * 0.6;

        // Bezier curve position
        const x = Math.pow(1-t, 3) * p.startX + 
                  3 * Math.pow(1-t, 2) * t * cp1x + 
                  3 * (1-t) * Math.pow(t, 2) * cp2x + 
                  Math.pow(t, 3) * p.endX;
        const y = Math.pow(1-t, 3) * p.startY + 
                  3 * Math.pow(1-t, 2) * t * p.startY + 
                  3 * (1-t) * Math.pow(t, 2) * p.endY + 
                  Math.pow(t, 3) * p.endY;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw brain (source)
      ctx.save();
      ctx.translate(brainX, brainY);
      
      // Brain glow
      const brainGlow = ctx.createRadialGradient(0, 0, 10, 0, 0, 50);
      brainGlow.addColorStop(0, 'rgba(0, 168, 255, 0.3)');
      brainGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = brainGlow;
      ctx.beginPath();
      ctx.arc(0, 0, 50, 0, Math.PI * 2);
      ctx.fill();

      // Brain outline
      ctx.strokeStyle = '#00a8ff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, 0, 35, 42, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Brain activity
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + time;
        const x = Math.cos(angle) * 20;
        const y = Math.sin(angle) * 24;
        const pulse = Math.sin(time * 3 + i) * 0.5 + 0.5;
        
        ctx.beginPath();
        ctx.fillStyle = `rgba(0, 255, 136, ${0.4 + pulse * 0.6})`;
        ctx.arc(x, y, 3 + pulse * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Draw wearable device
      ctx.save();
      ctx.translate(wearableX, wearableY);
      
      // Device body
      ctx.fillStyle = 'rgba(10, 10, 20, 0.9)';
      ctx.strokeStyle = '#00ff88';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-55, -35, 110, 70, 12);
      ctx.fill();
      ctx.stroke();

      // Device label
      ctx.fillStyle = '#00ff88';
      ctx.font = 'bold 10px Space Grotesk, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('MINDFLUX', 0, -15);
      ctx.fillStyle = '#ffffff80';
      ctx.font = '8px sans-serif';
      ctx.fillText('WEARABLE DEVICE', 0, 0);

      // Signal indicators
      for (let i = 0; i < 3; i++) {
        const pulse = Math.sin(time * 4 + i * 0.5) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.fillStyle = `rgba(0, 255, 136, ${0.3 + pulse * 0.7})`;
        ctx.arc(-25 + i * 25, 18, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Draw mobile device
      ctx.save();
      ctx.translate(mobileX, mobileY);
      
      // Phone body
      ctx.fillStyle = 'rgba(10, 10, 20, 0.9)';
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-45, -70, 90, 140, 12);
      ctx.fill();
      ctx.stroke();

      // Screen
      ctx.fillStyle = 'rgba(139, 92, 246, 0.1)';
      ctx.beginPath();
      ctx.roundRect(-38, -60, 76, 110, 6);
      ctx.fill();

      // Screen content - mini waveform
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = -30; x < 30; x++) {
        const y = Math.sin((x + time * 50) * 0.15) * 15;
        if (x === -30) ctx.moveTo(x, y - 20);
        else ctx.lineTo(x, y - 20);
      }
      ctx.stroke();

      ctx.fillStyle = '#ffffff80';
      ctx.font = '8px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('USER APP', 0, 15);
      ctx.fillText('Real-time Analytics', 0, 35);
      ctx.restore();

      // Draw cloud/computing center
      ctx.save();
      ctx.translate(cloudX, cloudY);
      
      // Cloud shape
      ctx.fillStyle = 'rgba(10, 10, 20, 0.9)';
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, 0, 50, 35, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Server indicators
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = 'rgba(168, 85, 247, 0.8)';
        ctx.beginPath();
        ctx.roundRect(-30 + i * 22, -10, 16, 20, 2);
        ctx.fill();
        
        // Blinking lights
        const blink = Math.sin(time * 5 + i * 2) > 0;
        ctx.fillStyle = blink ? '#00ff88' : '#00ff8840';
        ctx.beginPath();
        ctx.arc(-22 + i * 22, -3, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#ffffff80';
      ctx.font = '8px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('COMPUTING', 0, -25);
      ctx.fillText('CENTER', 0, 25);
      ctx.restore();

      // Labels
      ctx.fillStyle = '#ffffff40';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Brain Signals', brainX, brainY + 70);
      ctx.fillText('EEG Capture', wearableX, wearableY + 55);
      ctx.fillText('Processing', mobileX, mobileY + 90);
      ctx.fillText('AI Analytics', cloudX, cloudY + 55);

      // Signal type labels on connections
      ctx.font = '8px sans-serif';
      ctx.fillStyle = '#00a8ff80';
      ctx.fillText('Neural Data', (brainX + wearableX) / 2, brainY - 60);
      ctx.fillStyle = '#00ff8880';
      ctx.fillText('Processed', (wearableX + mobileX) / 2, wearableY - 60);
      ctx.fillStyle = '#8b5cf680';
      ctx.fillText('Analytics', (mobileX + cloudX) / 2, cloudY - 60);

      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full max-w-[800px] h-auto"
      style={{ aspectRatio: '800/500' }}
    />
  );
}

// Feature card component
function FeatureCard({ icon, title, description, color, delay }) {
  return (
    <div
      className="feature-card opacity-0 p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
        style={{ backgroundColor: `${color}20` }}
      >
        <span className="text-2xl">{icon}</span>
      </div>
      <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[var(--card-color)] transition-colors" style={{ '--card-color': color }}>
        {title}
      </h4>
      <p className="text-white/50 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function MindFluxProduct() {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.1 });

  useEffect(() => {
    if (!hasIntersected) return;

    anime({
      targets: '.mindflux-header',
      translateY: [50, 0],
      opacity: [0, 1],
      filter: ['blur(15px)', 'blur(0px)'],
      duration: 1000,
      easing: 'easeOutExpo'
    });

    anime({
      targets: '.system-arch',
      scale: [0.9, 1],
      opacity: [0, 1],
      duration: 1200,
      easing: 'easeOutExpo',
      delay: 300
    });

    anime({
      targets: '.feature-card',
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo',
      delay: anime.stagger(100, { start: 600 })
    });
  }, [hasIntersected]);

  const features = [
    { icon: '🧠', title: 'Cerebellar Capture', description: 'Dedicated posterior sensors targeting 4-8Hz theta and 8-12Hz alpha oscillations.', color: '#8b5cf6' },
    { icon: '💓', title: 'Autonomic Decoding', description: 'Heart-brain coherence and vagal tone through integrated biosensors.', color: '#ec4899' },
    { icon: '📊', title: 'High-Density Array', description: '64+ channels with medical-grade signal fidelity for research applications.', color: '#00a8ff' },
    { icon: '⚡', title: 'Real-Time Processing', description: 'Sub-10ms latency neural state classification using edge AI.', color: '#00ff88' },
    { icon: '🤖', title: 'Adaptive Filtering', description: 'AI-powered artifact rejection for clean signals in any environment.', color: '#06b6d4' },
    { icon: '🔒', title: 'Secure Pipeline', description: 'End-to-end encrypted data transmission with HIPAA compliance.', color: '#eab308' },
  ];

  return (
    <section
      ref={ref}
      id="mindflux"
      data-testid="mindflux-section"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#050510]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="mindflux-header text-center mb-16 opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#8b5cf6] animate-pulse" />
            <span className="text-sm font-medium text-[#8b5cf6] uppercase tracking-wider">Product</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-['Space_Grotesk']">
            MindFlux
          </h2>
          <p className="mt-4 text-xl text-white/40 font-medium">
            Full-Spectrum Neural Intelligence Platform
          </p>
          <p className="mt-6 text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            A breakthrough EEG system engineered to capture the complete neural picture — 
            from cortical activity to cerebellar rhythms and autonomic signatures.
          </p>
        </div>

        {/* System Architecture Visualization */}
        <div className="system-arch opacity-0 flex justify-center mb-20">
          <div className="relative">
            <div className="absolute inset-0 -m-4 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1),transparent_70%)]" />
            <SystemArchitecture />
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
              <span className="text-xs text-white/30 uppercase tracking-widest">MindFlux Technology High-Level Architecture</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
