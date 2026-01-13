import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { useIntersection } from '../../hooks/useIntersection';
import { Cpu, Layers, Radio } from 'lucide-react';

const architectureLayers = [
  {
    title: 'MindFlux Intelligence Layer',
    subtitle: 'Pattern Recognition & Analytics',
    description: 'Neural state classification, cognitive metrics, insights',
    icon: Cpu,
    color: '#00a8ff',
    bgPattern: 'circuit',
    features: ['Real-time state detection', 'Cognitive load metrics', 'Predictive analytics']
  },
  {
    title: 'Signal Processing Engine',
    subtitle: 'Adaptive Filtering & Decoding',
    description: 'Artifact rejection, filtering, feature extraction',
    icon: Layers,
    color: '#8b5cf6',
    bgPattern: 'waves',
    features: ['AI artifact rejection', 'Adaptive filtering', 'Feature extraction']
  },
  {
    title: 'Sensor Array Hardware',
    subtitle: 'Cerebellar + Autonomic Capture',
    description: '64+ channel EEG, biosensors, low-noise amplification',
    icon: Radio,
    color: '#00ff88',
    bgPattern: 'nodes',
    features: ['64+ EEG channels', 'Cerebellar sensors', 'Autonomic biosensors']
  }
];

// Data flow particles component
function DataFlowParticles({ isVisible }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isVisible) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    let animationId;

    // Canvas sizing
    const updateSize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    updateSize();

    // Create particles
    const createParticle = () => {
      const startY = canvas.height / 2 + 50;
      particles.push({
        x: canvas.width / 4 + Math.random() * 20 - 10,
        y: startY,
        vy: -1.5 - Math.random(),
        size: 2 + Math.random() * 2,
        opacity: 1,
        color: ['#00ff88', '#00a8ff', '#8b5cf6'][Math.floor(Math.random() * 3)]
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new particles
      if (Math.random() < 0.15) createParticle();

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y += p.vy;
        p.opacity -= 0.008;

        if (p.opacity <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute left-0 top-0 w-full h-full pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default function TechnologyArchitecture() {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.15 });

  useEffect(() => {
    if (!hasIntersected) return;

    anime({
      targets: '.arch-header',
      translateY: [40, 0],
      opacity: [0, 1],
      filter: ['blur(10px)', 'blur(0px)'],
      duration: 800,
      easing: 'easeOutExpo'
    });

    anime({
      targets: '.arch-layer',
      translateY: [60, 0],
      opacity: [0, 1],
      duration: 700,
      easing: 'easeOutExpo',
      delay: anime.stagger(200, { start: 300 })
    });

    // Pulse animation for layer numbers
    anime({
      targets: '.layer-number',
      scale: [1, 1.1, 1],
      duration: 2000,
      easing: 'easeInOutSine',
      loop: true,
      delay: anime.stagger(300)
    });

    // Connector line animation
    anime({
      targets: '.connector-line',
      height: [0, '100%'],
      duration: 1000,
      easing: 'easeOutExpo',
      delay: anime.stagger(200, { start: 800 })
    });
  }, [hasIntersected]);

  return (
    <section
      ref={ref}
      id="technology"
      data-testid="technology-section"
      className="relative py-20 lg:py-32 bg-[#0a0a12]"
    >
      {/* Blueprint background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,168,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,168,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="arch-header text-center mb-16 opacity-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00a8ff]/10 border border-[#00a8ff]/20 mb-6">
            <span className="text-xs font-semibold text-[#00a8ff] uppercase tracking-wider">Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-['Space_Grotesk']">
            Technology Stack
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto text-lg">
            A three-layer architecture designed for comprehensive neural capture and real-time intelligence.
          </p>
        </div>

        {/* Architecture Stack */}
        <div className="relative max-w-4xl mx-auto">
          {/* Data flow visualization */}
          <div className="absolute inset-0">
            <DataFlowParticles isVisible={hasIntersected} />
          </div>

          {/* Layers */}
          <div className="relative space-y-6">
            {architectureLayers.map((layer, index) => {
              const Icon = layer.icon;
              const isLast = index === architectureLayers.length - 1;
              
              return (
                <div
                  key={index}
                  data-testid="tech-arch-layer-card"
                  className="arch-layer relative opacity-0"
                >
                  <div
                    className="relative p-6 lg:p-8 rounded-2xl bg-[#0a0a15]/90 backdrop-blur-sm border border-white/10 overflow-hidden group hover:border-opacity-30 transition-all duration-300"
                    style={{ borderColor: `${layer.color}30` }}
                  >
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      {layer.bgPattern === 'circuit' && (
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(0,168,255,0.1)_49%,rgba(0,168,255,0.1)_51%,transparent_52%)] bg-[size:20px_20px]" />
                      )}
                      {layer.bgPattern === 'waves' && (
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <path d="M0,50 Q25,30 50,50 Q75,70 100,50" fill="none" stroke="rgba(139,92,246,0.2)" strokeWidth="0.5" />
                          <path d="M0,60 Q25,40 50,60 Q75,80 100,60" fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="0.5" />
                        </svg>
                      )}
                      {layer.bgPattern === 'nodes' && (
                        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,255,136,0.1)_1px,transparent_1px)] bg-[size:15px_15px]" />
                      )}
                    </div>

                    {/* Layer number indicator */}
                    <div
                      className="layer-number absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                      style={{ 
                        backgroundColor: layer.color, 
                        color: '#0a0a0f',
                        boxShadow: `0 0 20px ${layer.color}50`
                      }}
                    >
                      {index + 1}
                    </div>

                    <div className="relative flex flex-col lg:flex-row lg:items-center gap-6 pl-6">
                      {/* Icon */}
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                        style={{ 
                          backgroundColor: `${layer.color}20`,
                          boxShadow: `0 0 30px ${layer.color}20`
                        }}
                      >
                        <Icon className="w-8 h-8" style={{ color: layer.color }} />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-[var(--layer-color)] transition-colors" style={{ '--layer-color': layer.color }}>
                          {layer.title}
                        </h3>
                        <p className="text-sm font-medium mb-2" style={{ color: layer.color }}>
                          {layer.subtitle}
                        </p>
                        <p className="text-white/60 text-sm">
                          {layer.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 lg:w-72">
                        {layer.features.map((feature, fi) => (
                          <span
                            key={fi}
                            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 group-hover:scale-105"
                            style={{
                              backgroundColor: `${layer.color}15`,
                              color: layer.color,
                              boxShadow: `0 0 10px ${layer.color}10`
                            }}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ boxShadow: `inset 0 0 60px ${layer.color}10, 0 0 40px ${layer.color}10` }}
                    />
                  </div>

                  {/* Connector to next layer */}
                  {!isLast && (
                    <div className="absolute left-1/2 -bottom-6 w-px h-6 overflow-hidden">
                      <div 
                        className="connector-line w-full bg-gradient-to-b from-white/20 to-transparent"
                        style={{ height: 0 }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Signal flow visualization */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-white/60 text-sm font-medium">Signal Flow:</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88]" />
                  <span className="text-[#00ff88] text-sm font-medium">Raw EEG</span>
                </div>
                <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8b5cf6] shadow-[0_0_8px_#8b5cf6]" />
                  <span className="text-[#8b5cf6] text-sm font-medium">Filtered</span>
                </div>
                <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00a8ff] shadow-[0_0_8px_#00a8ff]" />
                  <span className="text-[#00a8ff] text-sm font-medium">Brain State</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
