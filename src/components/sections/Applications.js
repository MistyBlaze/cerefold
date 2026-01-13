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

// Card sizes for bento layout
const cardConfigs = [
  { size: 'large', colSpan: 'sm:col-span-2 lg:col-span-2', rowSpan: 'row-span-2' },
  { size: 'large', colSpan: 'sm:col-span-2 lg:col-span-2', rowSpan: 'row-span-2' },
  { size: 'small', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { size: 'small', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { size: 'medium', colSpan: 'sm:col-span-2 lg:col-span-1', rowSpan: 'row-span-1' },
  { size: 'medium', colSpan: 'sm:col-span-2 lg:col-span-1', rowSpan: 'row-span-1' }
];

const colors = [
  { gradient: 'from-[#00a8ff] to-[#0066ff]', glow: 'rgba(0,168,255,0.15)', border: '#00a8ff' },
  { gradient: 'from-[#8b5cf6] to-[#a855f7]', glow: 'rgba(139,92,246,0.15)', border: '#8b5cf6' },
  { gradient: 'from-[#f472b6] to-[#ec4899]', glow: 'rgba(244,114,182,0.15)', border: '#f472b6' },
  { gradient: 'from-[#00ff88] to-[#10b981]', glow: 'rgba(0,255,136,0.15)', border: '#00ff88' },
  { gradient: 'from-[#06b6d4] to-[#0891b2]', glow: 'rgba(6,182,212,0.15)', border: '#06b6d4' },
  { gradient: 'from-[#eab308] to-[#f59e0b]', glow: 'rgba(234,179,8,0.15)', border: '#eab308' }
];

function ApplicationCard({ app, index, config }) {
  const IconComponent = iconMap[app.icon] || Brain;
  const color = colors[index];
  const isLarge = config.size === 'large';

  return (
    <div
      data-testid="application-card"
      className={`app-card group relative rounded-2xl bg-[#0a0a12]/80 backdrop-blur-sm border border-white/10 overflow-hidden cursor-pointer transition-all duration-300 hover:border-opacity-50 opacity-0 ${config.colSpan} ${config.rowSpan}`}
      style={{ 
        '--card-glow': color.glow,
        '--card-border': color.border
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--card-glow),transparent_70%)]" />
        {/* Neural pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id={`pattern-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.3" />
            <line x1="10" y1="10" x2="20" y2="0" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
            <line x1="10" y1="10" x2="20" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#pattern-${index})`} />
        </svg>
      </div>

      {/* Content */}
      <div className={`relative z-10 h-full flex flex-col ${isLarge ? 'p-6 lg:p-8' : 'p-5'}`}>
        {/* Icon */}
        <div 
          className={`${isLarge ? 'w-14 h-14' : 'w-11 h-11'} rounded-xl bg-gradient-to-br ${color.gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
          style={{ boxShadow: `0 0 20px ${color.glow}` }}
        >
          <IconComponent className={`${isLarge ? 'w-7 h-7' : 'w-5 h-5'} text-white`} />
        </div>

        {/* Title */}
        <h3 className={`${isLarge ? 'text-xl lg:text-2xl' : 'text-base lg:text-lg'} font-semibold text-white mb-2 group-hover:text-[var(--card-border)] transition-colors`}>
          {app.title}
        </h3>

        {/* Description */}
        <p className={`text-white/60 leading-relaxed ${isLarge ? 'text-base' : 'text-sm'} flex-grow`}>
          {app.description}
        </p>

        {/* Learn more */}
        <div className="mt-4 flex items-center gap-2 text-[var(--card-border)] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span className="text-sm font-medium">Explore</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Hover border glow */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px var(--card-border), 0 0 30px var(--card-glow)` }}
      />
    </div>
  );
}

export default function Applications() {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.15 });

  useEffect(() => {
    if (!hasIntersected) return;

    anime({
      targets: '.apps-header',
      translateY: [40, 0],
      opacity: [0, 1],
      filter: ['blur(10px)', 'blur(0px)'],
      duration: 800,
      easing: 'easeOutExpo'
    });

    anime({
      targets: '.app-card',
      translateY: [60, 0],
      opacity: [0, 1],
      duration: 700,
      easing: 'easeOutExpo',
      delay: anime.stagger(100, { start: 200, grid: [3, 2], from: 'first' })
    });
  }, [hasIntersected]);

  return (
    <section
      ref={ref}
      id="applications"
      data-testid="applications-section"
      className="relative py-20 lg:py-32 bg-[#080810]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,168,255,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.06),transparent_50%)]" />
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#00a8ff]/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
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

        {/* Bento Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[180px] lg:auto-rows-[200px]">
          {APPLICATIONS.map((app, index) => (
            <ApplicationCard 
              key={app.id} 
              app={app} 
              index={index} 
              config={cardConfigs[index]}
            />
          ))}
        </div>
      </div>

      {/* Float animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}
