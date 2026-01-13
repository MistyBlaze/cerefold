import React, { useEffect, useRef } from 'react';
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
          Math.sin((x + offset) * speed * 0.05) * amplitude * 5;

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

function MetricCard({ label, value, unit, color, trend }) {
  return (
    <div
      data-testid="preview-metric"
      className="p-4 rounded-xl bg-black/30 border border-white/10"
    >
      <div className="text-xs text-white/50 uppercase tracking-wider mb-2">{label}</div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold font-['Space_Grotesk']" style={{ color }}>
          {value}
        </span>
        <span className="text-sm text-white/40">{unit}</span>
      </div>
      <div className={`text-xs mt-2 ${trend > 0 ? 'text-[#00ff88]' : 'text-[#f472b6]'}`}>
        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from baseline
      </div>
    </div>
  );
}

export default function DashboardPreview() {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.2 });

  useEffect(() => {
    if (!hasIntersected) return;

    anime({
      targets: '.dashboard-content',
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo',
      delay: anime.stagger(100)
    });

    // Animate metric counters
    anime({
      targets: '.metric-value',
      innerHTML: (el) => [0, el.getAttribute('data-value')],
      round: 1,
      easing: 'easeInOutExpo',
      duration: 1500,
      delay: anime.stagger(200, { start: 500 })
    });
  }, [hasIntersected]);

  return (
    <section
      ref={ref}
      id="dashboard"
      data-testid="dashboard-section"
      className="relative py-20 lg:py-32 bg-[#101018]"
    >
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
          <div className="rounded-2xl bg-[#0a0a12] border border-white/10 overflow-hidden shadow-2xl">
            {/* Dashboard Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
                </div>
                <span className="text-white/60 text-sm">MindFlux Dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
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
                    <div className="flex gap-2">
                      {['1s', '5s', '10s'].map((t) => (
                        <button
                          key={t}
                          className="px-3 py-1 rounded text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors"
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
                            amplitude={0.8 - i * 0.1}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cerebellar channels */}
                  <div className="mt-4">
                    <h4 className="text-[#8b5cf6] text-sm font-medium mb-3">Cerebellar Sensors</h4>
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
                        <ellipse cx="50" cy="50" rx="40" ry="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                        {/* Heat spots */}
                        <circle cx="35" cy="35" r="12" fill="url(#heatGradient1)" className="animate-pulse" style={{ animationDuration: '2s' }} />
                        <circle cx="65" cy="35" r="10" fill="url(#heatGradient2)" className="animate-pulse" style={{ animationDuration: '2.5s' }} />
                        <circle cx="50" cy="55" r="15" fill="url(#heatGradient3)" className="animate-pulse" style={{ animationDuration: '3s' }} />
                        <circle cx="50" cy="80" r="8" fill="url(#heatGradient4)" className="animate-pulse" style={{ animationDuration: '1.5s' }} />
                        <defs>
                          <radialGradient id="heatGradient1">
                            <stop offset="0%" stopColor="#00a8ff" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#00a8ff" stopOpacity="0" />
                          </radialGradient>
                          <radialGradient id="heatGradient2">
                            <stop offset="0%" stopColor="#00ff88" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
                          </radialGradient>
                          <radialGradient id="heatGradient3">
                            <stop offset="0%" stopColor="#eab308" stopOpacity="0.7" />
                            <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
                          </radialGradient>
                          <radialGradient id="heatGradient4">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
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
