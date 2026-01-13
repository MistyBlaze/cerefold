import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { useIntersection } from '../../hooks/useIntersection';
import { BRAINWAVE_BANDS } from '../../utils/brainwaveData';

function LiveWaveform({ color, speed, amplitude, label }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth * 2;
    const height = canvas.height = 60;

    let offset = 0;

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Gradient line
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, `${color}20`);
      gradient.addColorStop(0.5, color);
      gradient.addColorStop(1, `${color}20`);

      ctx.beginPath();
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;

      for (let x = 0; x < width; x++) {
        const y = height / 2 +
          Math.sin((x + offset) * speed * 0.015) * amplitude * 12 +
          Math.sin((x + offset) * speed * 0.035) * amplitude * 6 +
          (Math.random() - 0.5) * 2;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();
      ctx.shadowBlur = 0;

      offset += speed * 0.6;
      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [color, speed, amplitude]);

  return (
    <div className="flex items-center gap-3">
      <span className="w-10 text-[10px] text-white/40 font-mono uppercase">{label}</span>
      <canvas ref={canvasRef} className="flex-1 h-[30px]" />
    </div>
  );
}

function MetricCard({ label, value, unit, color, trend, icon }) {
  const [displayValue, setDisplayValue] = useState(0);
  const { ref, hasIntersected } = useIntersection({ threshold: 0.5 });

  useEffect(() => {
    if (!hasIntersected) return;

    const numValue = parseFloat(value);
    const duration = 1500;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setDisplayValue(Math.round(numValue * easeProgress * 10) / 10);
      
      if (progress < 1) requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }, [hasIntersected, value]);

  return (
    <div
      ref={ref}
      className="p-4 rounded-xl bg-[#0a0a15]/80 border border-white/5 hover:border-white/10 transition-all group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-white/40 uppercase tracking-wider">{label}</span>
        <span className="text-lg">{icon}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold font-['Space_Grotesk'] group-hover:scale-105 transition-transform" style={{ color }}>
          {displayValue}
        </span>
        <span className="text-xs text-white/30">{unit}</span>
      </div>
      <div className={`text-[10px] mt-2 flex items-center gap-1 ${trend > 0 ? 'text-[#00ff88]' : 'text-[#f472b6]'}`}>
        <span>{trend > 0 ? '↑' : '↓'}</span>
        <span>{Math.abs(trend)}% from baseline</span>
      </div>
    </div>
  );
}

export default function DashboardPreview() {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.1 });

  useEffect(() => {
    if (!hasIntersected) return;

    anime({
      targets: '.dashboard-header',
      translateY: [40, 0],
      opacity: [0, 1],
      filter: ['blur(15px)', 'blur(0px)'],
      duration: 1000,
      easing: 'easeOutExpo'
    });

    anime({
      targets: '.dashboard-mock',
      scale: [0.95, 1],
      opacity: [0, 1],
      duration: 1200,
      easing: 'easeOutExpo',
      delay: 300
    });

    anime({
      targets: '.recording-indicator',
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      duration: 1500,
      easing: 'easeInOutSine',
      loop: true
    });
  }, [hasIntersected]);

  const channels = [
    { label: 'Fp1', color: '#00a8ff', speed: 4, amp: 0.8 },
    { label: 'Fp2', color: '#00a8ff', speed: 3.5, amp: 0.75 },
    { label: 'F3', color: '#06b6d4', speed: 5, amp: 0.7 },
    { label: 'F4', color: '#06b6d4', speed: 4.5, amp: 0.65 },
    { label: 'C3', color: '#00ff88', speed: 6, amp: 0.6 },
    { label: 'C4', color: '#00ff88', speed: 5.5, amp: 0.55 },
  ];

  const cerebellarChannels = [
    { label: 'CB1', color: '#8b5cf6', speed: 3, amp: 0.7 },
    { label: 'CB2', color: '#a855f7', speed: 2.5, amp: 0.65 },
  ];

  return (
    <section
      ref={ref}
      id="dashboard"
      data-testid="dashboard-section"
      className="relative py-24 lg:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] to-[#050510]">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="dashboard-header text-center mb-12 opacity-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-['Space_Grotesk']">
            Real-Time Neural Dashboard
          </h2>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto text-lg">
            Comprehensive visualization of brain activity with millisecond precision.
          </p>
        </div>

        {/* Dashboard Mock */}
        <div className="dashboard-mock max-w-6xl mx-auto opacity-0">
          <div className="rounded-2xl bg-[#0a0a15] border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
            {/* Dashboard Header */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-transparent via-white/[0.02] to-transparent">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
                </div>
                <span className="text-white/50 text-sm font-medium">MindFlux Dashboard v2.1</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-white/30 text-xs">Session: 00:14:32</span>
                <div className="flex items-center gap-2">
                  <span className="recording-indicator w-2 h-2 rounded-full bg-[#00ff88]" />
                  <span className="text-[#00ff88] text-xs font-medium">LIVE</span>
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Waveforms Panel */}
                <div className="lg:col-span-8 space-y-4">
                  {/* Standard EEG */}
                  <div className="rounded-xl bg-black/30 border border-white/5 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#00a8ff]" />
                        <span className="text-white/70 text-sm font-medium">Standard EEG Channels</span>
                      </div>
                      <div className="flex gap-1">
                        {['1s', '5s', '10s'].map((t, i) => (
                          <button
                            key={t}
                            className={`px-2 py-1 rounded text-[10px] transition-colors ${
                              i === 1 ? 'bg-[#00a8ff]/20 text-[#00a8ff]' : 'text-white/40 hover:text-white/60'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      {channels.map((ch) => (
                        <LiveWaveform key={ch.label} {...ch} />
                      ))}
                    </div>
                  </div>

                  {/* Cerebellar */}
                  <div className="rounded-xl bg-[#8b5cf6]/5 border border-[#8b5cf6]/20 p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2 h-2 rounded-full bg-[#8b5cf6] shadow-[0_0_8px_#8b5cf6]" />
                      <span className="text-[#8b5cf6] text-sm font-medium">Cerebellar Array</span>
                      <span className="text-white/30 text-[10px] ml-2">MindFlux Exclusive</span>
                    </div>
                    <div className="space-y-1">
                      {cerebellarChannels.map((ch) => (
                        <LiveWaveform key={ch.label} {...ch} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Metrics Panel */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="text-white/70 text-sm font-medium mb-2">Neural Metrics</div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <MetricCard label="Focus" value="87" unit="%" color="#00a8ff" trend={12} icon="🎯" />
                    <MetricCard label="Stress" value="23" unit="%" color="#f472b6" trend={-8} icon="😌" />
                    <MetricCard label="Coherence" value="0.82" unit="" color="#00ff88" trend={5} icon="🔄" />
                    <MetricCard label="Alpha" value="42" unit="μV²" color="#06b6d4" trend={3} icon="🌊" />
                  </div>

                  {/* Mini Brain Map */}
                  <div className="rounded-xl bg-black/30 border border-white/5 p-4">
                    <div className="text-white/40 text-[10px] uppercase tracking-wider mb-3">Activity Map</div>
                    <div className="relative w-full max-w-[160px] mx-auto aspect-square">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <ellipse cx="50" cy="50" rx="42" ry="46" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                        <circle cx="35" cy="35" r="14" fill="url(#hg1)" className="animate-pulse" style={{ animationDuration: '2s' }} />
                        <circle cx="65" cy="35" r="12" fill="url(#hg2)" className="animate-pulse" style={{ animationDuration: '2.5s' }} />
                        <circle cx="50" cy="55" r="16" fill="url(#hg3)" className="animate-pulse" style={{ animationDuration: '3s' }} />
                        <circle cx="50" cy="80" r="10" fill="url(#hg4)" className="animate-pulse" style={{ animationDuration: '1.5s' }} />
                        <defs>
                          <radialGradient id="hg1">
                            <stop offset="0%" stopColor="#00a8ff" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#00a8ff" stopOpacity="0" />
                          </radialGradient>
                          <radialGradient id="hg2">
                            <stop offset="0%" stopColor="#00ff88" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
                          </radialGradient>
                          <radialGradient id="hg3">
                            <stop offset="0%" stopColor="#eab308" stopOpacity="0.7" />
                            <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
                          </radialGradient>
                          <radialGradient id="hg4">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
