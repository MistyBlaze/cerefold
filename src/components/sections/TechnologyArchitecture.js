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
    features: ['Real-time state detection', 'Cognitive load metrics', 'Predictive analytics']
  },
  {
    title: 'Signal Processing Engine',
    subtitle: 'Adaptive Filtering & Decoding',
    description: 'Artifact rejection, filtering, feature extraction',
    icon: Layers,
    color: '#8b5cf6',
    features: ['AI artifact rejection', 'Adaptive filtering', 'Feature extraction']
  },
  {
    title: 'Sensor Array Hardware',
    subtitle: 'Cerebellar + Autonomic Capture',
    description: '64+ channel EEG, biosensors, low-noise amplification',
    icon: Radio,
    color: '#00ff88',
    features: ['64+ EEG channels', 'Cerebellar sensors', 'Autonomic biosensors']
  }
];

export default function TechnologyArchitecture() {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.2 });
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!hasIntersected) return;

    anime({
      targets: '.arch-header',
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo'
    });

    anime({
      targets: '.arch-layer',
      translateY: [60, 0],
      opacity: [0, 1],
      duration: 700,
      easing: 'easeOutExpo',
      delay: anime.stagger(150, { start: 300 })
    });

    // Animate data flow particles
    anime({
      targets: '.data-particle',
      translateY: [-20, -200],
      opacity: [1, 0],
      duration: 2000,
      easing: 'easeInOutSine',
      loop: true,
      delay: anime.stagger(300, { from: 'last' })
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
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,168,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,168,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
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
          {/* Data flow particles container */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="data-particle absolute w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_10px_#00ff88]"
                style={{
                  left: '-4px',
                  bottom: `${i * 15}%`
                }}
              />
            ))}
          </div>

          {/* Layers */}
          <div className="space-y-6">
            {architectureLayers.map((layer, index) => {
              const Icon = layer.icon;
              return (
                <div
                  key={index}
                  data-testid="tech-arch-layer-card"
                  className="arch-layer relative opacity-0"
                >
                  <div
                    className="relative p-6 lg:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-opacity-30 transition-all duration-300 group"
                    style={{ borderColor: `${layer.color}30` }}
                  >
                    {/* Layer number indicator */}
                    <div
                      className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ backgroundColor: layer.color, color: '#0a0a0f' }}
                    >
                      {index + 1}
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Icon */}
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${layer.color}20` }}
                      >
                        <Icon className="w-8 h-8" style={{ color: layer.color }} />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-1">
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
                      <div className="flex flex-wrap gap-2 lg:w-64">
                        {layer.features.map((feature, fi) => (
                          <span
                            key={fi}
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: `${layer.color}15`,
                              color: layer.color
                            }}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Glow effect on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                      style={{
                        boxShadow: `0 0 60px ${layer.color}20`
                      }}
                    />
                  </div>

                  {/* Connector line to next layer */}
                  {index < architectureLayers.length - 1 && (
                    <div className="absolute left-1/2 -bottom-6 w-px h-6 bg-gradient-to-b from-white/20 to-transparent" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Signal flow visualization */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10">
              <span className="text-white/60 text-sm">Signal Flow:</span>
              <div className="flex items-center gap-2">
                <span className="text-[#00ff88] text-sm font-medium">Raw EEG</span>
                <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span className="text-[#8b5cf6] text-sm font-medium">Filtered</span>
                <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span className="text-[#00a8ff] text-sm font-medium">Brain State</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
