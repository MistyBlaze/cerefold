import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { useIntersection } from '../../hooks/useIntersection';
import { BRAINWAVE_BANDS } from '../../utils/brainwaveData';

function BrainwaveCard({ band, isActive, onClick, index }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = 300;
    const height = canvas.height = 100;

    let offset = 0;
    const frequency = band.avgFreq / 8;
    const baseAmplitude = band.amplitude * 30;

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Draw waveform
      ctx.beginPath();
      ctx.strokeStyle = band.color;
      ctx.lineWidth = isActive ? 2.5 : 2;
      ctx.shadowColor = band.color;
      ctx.shadowBlur = isActive ? 20 : 8;

      const amplitude = baseAmplitude * (isActive ? 1.2 : 1);

      for (let x = 0; x < width; x++) {
        const y = height / 2 + 
          Math.sin((x + offset) * frequency * 0.05) * amplitude +
          Math.sin((x + offset) * frequency * 0.02) * (amplitude * 0.3);
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      ctx.shadowBlur = 0;

      // Add subtle noise dots
      for (let x = 0; x < width; x += 6) {
        const y = height / 2 + Math.sin((x + offset) * frequency * 0.05) * amplitude;
        const noise = (Math.random() - 0.5) * 6;
        ctx.fillStyle = `${band.color}30`;
        ctx.fillRect(x, y + noise - 1, 2, 2);
      }

      offset += band.avgFreq / 4;
      animationRef.current = requestAnimationFrame(draw);
    }

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [band, isActive]);

  return (
    <div
      data-testid="neural-band-card"
      onClick={onClick}
      className={`band-card relative p-4 rounded-xl cursor-pointer transition-all duration-300 opacity-0 ${
        isActive
          ? 'bg-white/10 shadow-lg scale-[1.02]'
          : 'bg-white/5 hover:bg-white/8'
      }`}
      style={{
        border: isActive ? `2px solid ${band.color}` : '1px solid rgba(255,255,255,0.1)',
        boxShadow: isActive ? `0 0 40px ${band.color}25, inset 0 0 30px ${band.color}10` : undefined,
        background: isActive ? `linear-gradient(135deg, ${band.color}10 0%, transparent 70%)` : undefined
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full transition-all duration-300"
            style={{ 
              backgroundColor: band.color, 
              boxShadow: isActive ? `0 0 15px ${band.color}` : `0 0 8px ${band.color}80`
            }}
          />
          <span className="text-white font-semibold">{band.name}</span>
        </div>
        <span className="text-white/50 text-sm font-mono">{band.frequency}</span>
      </div>

      {/* Waveform Canvas */}
      <div className="relative h-[100px] overflow-hidden rounded-lg bg-black/30">
        <canvas ref={canvasRef} className="w-full h-full" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* Description */}
      <p className="mt-3 text-white/60 text-sm leading-relaxed">
        {band.description}
      </p>
    </div>
  );
}

export default function NeuralSignatures() {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.15 });
  const [activeBand, setActiveBand] = useState(2);
  const [comparisonMode, setComparisonMode] = useState('mindflux');

  useEffect(() => {
    if (!hasIntersected) return;

    anime({
      targets: '.signatures-content',
      translateY: [40, 0],
      opacity: [0, 1],
      filter: ['blur(10px)', 'blur(0px)'],
      duration: 800,
      easing: 'easeOutExpo',
      delay: anime.stagger(100)
    });

    anime({
      targets: '.band-card',
      scale: [0.9, 1],
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutBack',
      delay: anime.stagger(80, { start: 300 })
    });
  }, [hasIntersected]);

  // Animate comparison bars when mode changes
  useEffect(() => {
    anime({
      targets: '.comparison-bar',
      width: (el) => el.getAttribute('data-width'),
      duration: 800,
      easing: 'easeOutExpo',
      delay: anime.stagger(100)
    });
  }, [comparisonMode]);

  return (
    <section
      ref={ref}
      id="research"
      data-testid="neural-signatures-section"
      className="relative py-20 lg:py-32 bg-gradient-to-b from-[#0a0a0f] to-[#0f0f18]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="signatures-content text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-['Space_Grotesk'] opacity-0">
            The Signals That Matter
          </h2>
          <p className="signatures-content mt-4 text-white/60 max-w-2xl mx-auto text-lg opacity-0">
            Different brainwave frequencies reveal different aspects of neural activity. 
            MindFlux captures the complete spectrum.
          </p>
        </div>

        {/* Brainwave Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {BRAINWAVE_BANDS.map((band, index) => (
            <BrainwaveCard
              key={band.name}
              band={band}
              index={index}
              isActive={activeBand === index}
              onClick={() => setActiveBand(index)}
            />
          ))}
        </div>

        {/* Comparison Section */}
        <div className="signatures-content bg-white/5 rounded-2xl border border-white/10 p-6 lg:p-8 opacity-0">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
            <h3 className="text-xl font-semibold text-white">MindFlux Difference</h3>
            <div className="flex gap-2 p-1 bg-white/5 rounded-lg">
              <button
                onClick={() => setComparisonMode('traditional')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  comparisonMode === 'traditional'
                    ? 'bg-white/15 text-white shadow-inner'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                Traditional EEG
              </button>
              <button
                onClick={() => setComparisonMode('mindflux')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  comparisonMode === 'mindflux'
                    ? 'bg-[#00a8ff] text-[#0a0a0f] shadow-[0_0_20px_rgba(0,168,255,0.3)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                MindFlux
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Comparison visualization */}
            <div className="space-y-4">
              {BRAINWAVE_BANDS.map((band, index) => {
                const traditionalWidth = index < 3 ? '30%' : '0%';
                const mindfluxWidth = '100%';
                const currentWidth = comparisonMode === 'mindflux' ? mindfluxWidth : traditionalWidth;
                
                return (
                  <div key={band.name} className="flex items-center gap-4">
                    <div className="w-20 text-sm text-white/60">{band.name}</div>
                    <div className="flex-1 h-5 bg-black/30 rounded-full overflow-hidden">
                      <div
                        className="comparison-bar h-full rounded-full transition-all duration-500"
                        data-width={currentWidth}
                        style={{
                          backgroundColor: band.color,
                          width: 0,
                          opacity: comparisonMode === 'mindflux' ? 1 : 0.5,
                          boxShadow: comparisonMode === 'mindflux' ? `0 0 15px ${band.color}60` : 'none'
                        }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-white/40">
                      {comparisonMode === 'mindflux' ? '100%' : index < 3 ? '30%' : '0%'}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Description */}
            <div className="flex flex-col justify-center">
              {comparisonMode === 'traditional' ? (
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-lg font-semibold text-white/80 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    Traditional EEG Limitations
                  </h4>
                  <ul className="space-y-3 text-white/60">
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-0.5">×</span>
                      <span>Limited to cortical surface activity</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-0.5">×</span>
                      <span>Misses cerebellar oscillations entirely</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-0.5">×</span>
                      <span>No autonomic signal integration</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-0.5">×</span>
                      <span>High artifact contamination</span>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-[#00a8ff]/5 border border-[#00a8ff]/20">
                  <h4 className="text-lg font-semibold text-[#00a8ff] mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88]" />
                    MindFlux Full Spectrum
                  </h4>
                  <ul className="space-y-3 text-white/70">
                    <li className="flex items-start gap-3">
                      <span className="text-[#00ff88] mt-0.5">✓</span>
                      <span>Complete cortical and subcortical capture</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00ff88] mt-0.5">✓</span>
                      <span>Dedicated cerebellar sensor array</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00ff88] mt-0.5">✓</span>
                      <span>Integrated autonomic biosensors</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#00ff88] mt-0.5">✓</span>
                      <span>AI-powered artifact rejection</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
