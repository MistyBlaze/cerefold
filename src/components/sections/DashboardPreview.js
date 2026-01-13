import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { useIntersection } from '../../hooks/useIntersection';
import { BRAINWAVE_BANDS } from '../../utils/brainwaveData';

function LiveWaveform({ color, speed, amplitude }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth * 2;
    const height = canvas.height = 80;

    let offset = 0;

    function draw() {
      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;

      for (let x = 0; x < width; x++) {
        const y = height / 2 +
          Math.sin((x + offset) * speed * 0.02) * amplitude * 15 +
          Math.sin((x + offset) * speed * 0.05) * amplitude * 5 +
          Math.sin((x + offset) * speed * 0.01) * amplitude * 8;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      ctx.shadowBlur = 0;

      offset += speed * 0.5;
      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color, speed, amplitude]);

  return <canvas ref={canvasRef} className="w-full h-10" data-testid="preview-live-wave" />;
}

function AnimatedCounter({ value, suffix = '', duration = 1500 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const { ref, hasIntersected } = useIntersection({ threshold: 0.5 });

  useEffect(() => {
    if (!hasIntersected) return;

    const numValue = parseFloat(value);
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      
      setDisplayValue(Math.round(numValue * easeProgress * 10) / 10);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [hasIntersected, value, duration]);

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
}

function MetricCard({ label, value, unit, color, trend }) {
  return (
    <div
      data-testid="preview-metric"
      className="p-4 rounded-xl bg-black/30 border border-white/10 hover:border-white/20 transition-all group"
    >
      <div className="text-xs text-white/50 uppercase tracking-wider mb-2">{label}</div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold font-['Space_Grotesk'] group-hover:scale-105 transition-transform" style={{ color }}>
          <AnimatedCounter value={value} />
        </span>
        <span className="text-sm text-white/40">{unit}</span>
      </div>
      <div className={`text-xs mt-2 flex items-center gap-1 ${trend > 0 ? 'text-[#00ff88]' : 'text-[#f472b6]'}`}>
        <span className={`transform ${trend > 0 ? '' : 'rotate-180'}`}>↑</span>
        {Math.abs(trend)}% from baseline
      </div>
    </div>
  );
}

export default function DashboardPreview() {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.15 });

  useEffect(() => {
    if (!hasIntersected) return;

    anime({
      targets: '.dashboard-content',
      translateY: [40, 0],
      opacity: [0, 1],
      filter: ['blur(10px)', 'blur(0px)'],
      duration: 800,
      easing: 'easeOutExpo',
      delay: anime.stagger(100)
    });

    // Pulse the recording indicator
    anime({
      targets: '.recording-dot',
      scale: [1, 1.3, 1],
      opacity: [0.7, 1, 0.7],
      duration: 1500,
      easing: 'easeInOutSine',
      loop: true
    });

    // Animate heat map regions
    anime({
      targets: '.heat-spot',
      opacity: [0.3, 0.8, 0.3],
      scale: [0.95, 1.05, 0.95],
      duration: 2500,
      easing: 'easeInOutSine',
      loop: true,
      delay: anime.stagger(400)
    });
  }, [hasIntersected]);

  return (
    <section
      ref={ref}
      id="dashboard"
      data-testid="dashboard-section"
      className="relative py-20 lg:py-32 bg-[#101018]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="dashboard-content text-center mb-12 opacity-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-['Space_Grotesk']">
            See Your Brain in Real-Time
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto text-lg">
            The MindFlux dashboard provides comprehensive visualization of your neural activity.
          </p>
        </div>

        {/* Dashboard Mock */}
        <div className="dashboard-content max-w-6xl mx-auto opacity-0">
          <div className="rounded-2xl bg-[#0a0a12] border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
            {/* Dashboard Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-transparent via-white/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
                </div>
                <span className="text-white/60 text-sm font-medium">MindFlux Dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="recording-dot w-2 h-2 rounded-full bg-[#00ff88]" />
                <span className="text-[#00ff88] text-xs font-medium">Recording</span>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Live Waveforms Panel */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">Live EEG Channels</h3>
                    <div className="flex gap-1">
                      {['1s', '5s', '10s'].map((t, i) => (
                        <button
                          key={t}
                          className={`px-3 py-1 rounded text-xs transition-colors ${
                            i === 1 ? 'bg-[#00a8ff]/20 text-[#00a8ff]' : 'text-white/60 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Waveform channels */}
                  <div className="space-y-2 bg-black/30 rounded-xl p-4">
                    {['Fp1', 'Fp2', 'F3', 'F4', 'C3', 'C4'].map((channel, i) => (
                      <div key={channel} className="flex items-center gap-4">
                        <span className="w-8 text-xs text-white/40 font-mono">{channel}</span>
                        <div className="flex-1">
                          <LiveWaveform
                            color={BRAINWAVE_BANDS[i % 5].color}
                            speed={3 + i * 0.5}
                            amplitude={0.8 - i * 0.08}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cerebellar channels */}
                  <div className="mt-4">
                    <h4 className="text-[#8b5cf6] text-sm font-medium mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#8b5cf6] shadow-[0_0_8px_#8b5cf6]" />
                      Cerebellar Sensors
                    </h4>
                    <div className="space-y-2 bg-[#8b5cf6]/10 rounded-xl p-4 border border-[#8b5cf6]/20">
                      {['CB1', 'CB2'].map((channel, i) => (
                        <div key={channel} className="flex items-center gap-4">
                          <span className="w-8 text-xs text-[#8b5cf6] font-mono">{channel}</span>
                          <div className="flex-1">
                            <LiveWaveform
                              color="#8b5cf6"
                              speed={2 + i * 0.3}
                              amplitude={0.6}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Metrics Panel */}
                <div className="lg:col-span-4 space-y-4">
                  <h3 className="text-white font-semibold mb-4">Neural Metrics</h3>

                  <div className="grid grid-cols-2 gap-3">
                    <MetricCard
                      label="Focus Score"
                      value="87"
                      unit="%"
                      color="#00a8ff"
                      trend={12}
                    />
                    <MetricCard
                      label="Stress Index"
                      value="23"
                      unit="%"
                      color="#f472b6"
                      trend={-8}
                    />
                    <MetricCard
                      label="Coherence"
                      value="0.82"
                      unit=""
                      color="#00ff88"
                      trend={5}
                    />
                    <MetricCard
                      label="Alpha Power"
                      value="42"
                      unit="μV²"
                      color="#06b6d4"
                      trend={3}
                    />
                  </div>

                  {/* Brain Heat Map */}
                  <div className="mt-6 p-4 rounded-xl bg-black/30 border border-white/10">
                    <h4 className="text-white/60 text-xs uppercase tracking-wider mb-4">Activity Map</h4>
                    <div className="relative w-full aspect-square max-w-[200px] mx-auto">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Brain outline */}
                        <ellipse cx="50" cy="50" rx="42" ry="46" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                        {/* Heat spots with animation */}
                        <circle className="heat-spot" cx="35" cy="35" r="14" fill="url(#heatGradient1)" />
                        <circle className="heat-spot" cx="65" cy="35" r="12" fill="url(#heatGradient2)" />
                        <circle className="heat-spot" cx="50" cy="55" r="16" fill="url(#heatGradient3)" />
                        <circle className="heat-spot" cx="50" cy="80" r="10" fill="url(#heatGradient4)" />
                        <defs>
                          <radialGradient id="heatGradient1">
                            <stop offset="0%" stopColor="#00a8ff" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#00a8ff" stopOpacity="0" />
                          </radialGradient>
                          <radialGradient id="heatGradient2">
                            <stop offset="0%" stopColor="#00ff88" stopOpacity="0.7" />
                            <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
                          </radialGradient>
                          <radialGradient id="heatGradient3">
                            <stop offset="0%" stopColor="#eab308" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
                          </radialGradient>
                          <radialGradient id="heatGradient4">
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
