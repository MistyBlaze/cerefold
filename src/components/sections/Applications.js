import React, { useEffect } from 'react';
import anime from 'animejs';
import { useIntersection } from '../../hooks/useIntersection';
import { APPLICATIONS } from '../../utils/brainwaveData';
import { Brain, Moon, Activity, Flower2, Microscope, Cpu } from 'lucide-react';

const iconMap = {
  brain: Brain,
  moon: Moon,
  activity: Activity,
  flower: Flower2,
  microscope: Microscope,
  cpu: Cpu
};

function ApplicationCard({ app, index }) {
  const IconComponent = iconMap[app.icon] || Brain;
  const colors = [
    'from-[#00a8ff] to-[#0066ff]',
    'from-[#8b5cf6] to-[#a855f7]',
    'from-[#f472b6] to-[#ec4899]',
    'from-[#00ff88] to-[#10b981]',
    'from-[#06b6d4] to-[#0891b2]',
    'from-[#eab308] to-[#f59e0b]'
  ];

  return (
    <div
      data-testid="application-card"
      className="app-card group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 cursor-pointer opacity-0"
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[index]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <IconComponent className="w-6 h-6 text-white" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00a8ff] transition-colors">
        {app.title}
      </h3>
      <p className="text-white/60 text-sm leading-relaxed">
        {app.description}
      </p>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10">
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors[index]} opacity-10 blur-xl`} />
      </div>

      {/* Learn more indicator */}
      <div className="mt-4 flex items-center gap-2 text-[#00a8ff] opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-sm font-medium">Learn more</span>
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  );
}

export default function Applications() {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.2 });

  useEffect(() => {
    if (!hasIntersected) return;

    anime({
      targets: '.apps-header',
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo'
    });

    anime({
      targets: '.app-card',
      translateY: [60, 0],
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutExpo',
      delay: anime.stagger(100, { start: 200 })
    });
  }, [hasIntersected]);

  return (
    <section
      ref={ref}
      id="applications"
      data-testid="applications-section"
      className="relative py-20 lg:py-32 bg-[#080810]"
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#00a8ff]/30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="apps-header text-center mb-16 opacity-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 mb-6">
            <span className="text-xs font-semibold text-[#00ff88] uppercase tracking-wider">Use Cases</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-['Space_Grotesk']">
            Applications
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto text-lg">
            MindFlux powers the next generation of neural applications across research, healthcare, and consumer wellness.
          </p>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {APPLICATIONS.map((app, index) => (
            <ApplicationCard key={app.id} app={app} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
