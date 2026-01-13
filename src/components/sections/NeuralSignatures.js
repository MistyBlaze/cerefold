import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { useIntersection } from '../../hooks/useIntersection';
import { BRAINWAVE_BANDS } from '../../utils/brainwaveData';

function BrainwaveCard({ band, isActive, onClick }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = 280;
    const height = canvas.height = 100;

    let offset = 0;
    const frequency = band.avgFreq / 10; // Scale for visibility
    const amplitude = band.amplitude * 35;

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Draw waveform
      ctx.beginPath();
      ctx.strokeStyle = band.color;
      ctx.lineWidth = 2;
      ctx.shadowColor = band.color;
      ctx.shadowBlur = isActive ? 15 : 5;

      for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin((x + offset) * frequency * 0.05) * amplitude;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      ctx.shadowBlur = 0;

      // Add some noise for realism
      for (let x = 0; x < width; x += 4) {
        const y = height / 2 + Math.sin((x + offset) * frequency * 0.05) * amplitude;
        const noise = (Math.random() - 0.5) * 4;
        ctx.fillStyle = `${band.color}40`;
        ctx.fillRect(x, y + noise - 1, 2, 2);
      }

      offset += band.avgFreq / 5;
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
      className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 ${
        isActive
          ? 'bg-white/10 border-2 shadow-lg'
          : 'bg-white/5 border border-white/10 hover:bg-white/10'
      }`}
      style={{
        borderColor: isActive ? band.color : undefined,
        boxShadow: isActive ? `0 0 30px ${band.color}30` : undefined
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: band.color, boxShadow: `0 0 10px ${band.color}` }}
          />
          <span className="text-white font-semibold">{band.name}</span>
        </div>
        <span className="text-white/50 text-sm font-mono">{band.frequency}</span>
      </div>

      {/* Waveform Canvas */}
      <div className="relative h-[100px] overflow-hidden rounded-lg bg-black/20">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Description */}
      <p className="mt-3 text-white/60 text-sm leading-relaxed">
        {band.description}
      </p>
    </div>
  );
}

export default function NeuralSignatures() {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.2 });
  const [activeBand, setActiveBand] = useState(2); // Alpha by default
  const [comparisonMode, setComparisonMode] = useState('mindflux');

  useEffect(() => {
    if (!hasIntersected) return;

    anime({
      targets: '.signatures-content',
      translateY: [40, 0],
      opacity: [0, 1],
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
      delay: anime.stagger(100, { start: 300 })
    });
  }, [hasIntersected]);

  return (
    <section
      ref={ref}
      id="research"
      data-testid="neural-signatures-section"
      className="relative py-20 lg:py-32 bg-gradient-to-b from-[#0a0a0f] to-[#0f0f18]"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]" />
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
            <div key={band.name} className="band-card opacity-0">
              <BrainwaveCard
                band={band}
                isActive={activeBand === index}
                onClick={() => setActiveBand(index)}
              />
            </div>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="signatures-content bg-white/5 rounded-2xl border border-white/10 p-6 lg:p-8 opacity-0">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
            <h3 className="text-xl font-semibold text-white">MindFlux Difference</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setComparisonMode('traditional')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  comparisonMode === 'traditional'
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                Traditional EEG
              </button>
              <button
                onClick={() => setComparisonMode('mindflux')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  comparisonMode === 'mindflux'
                    ? 'bg-[#00a8ff] text-[#0a0a0f]'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                MindFlux
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Comparison visualization */}
            <div className="space-y-4">
              {BRAINWAVE_BANDS.map((band, index) => (
                <div key={band.name} className="flex items-center gap-4">
                  <div className="w-20 text-sm text-white/60">{band.name}</div>
                  <div className="flex-1 h-4 bg-black/30 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: band.color,
                        width: comparisonMode === 'mindflux' ? '100%' : index < 3 ? '30%' : '0%',
                        opacity: comparisonMode === 'mindflux' ? 1 : 0.5,
                        boxShadow: comparisonMode === 'mindflux' ? `0 0 10px ${band.color}` : 'none'
                      }}
                    />
                  </div>
                  <div className="w-16 text-right text-sm font-mono text-white/40">
                    {comparisonMode === 'mindflux' ? '100%' : index < 3 ? '30%' : '0%'}
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="flex flex-col justify-center">
              {comparisonMode === 'traditional' ? (
                <div>
                  <h4 className="text-lg font-semibold text-white/80 mb-3">Traditional EEG Limitations</h4>
                  <ul className="space-y-2 text-white/60">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">×</span>
                      Limited to cortical surface activity
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">×</span>
                      Misses cerebellar oscillations entirely
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">×</span>
                      No autonomic signal integration
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">×</span>
                      High artifact contamination
                    </li>
                  </ul>
                </div>
              ) : (
                <div>
                  <h4 className="text-lg font-semibold text-[#00a8ff] mb-3">MindFlux Full Spectrum</h4>
                  <ul className="space-y-2 text-white/60">
                    <li className="flex items-start gap-2">
                      <span className="text-[#00ff88] mt-1">✓</span>
                      Complete cortical and subcortical capture
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00ff88] mt-1">✓</span>
                      Dedicated cerebellar sensor array
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00ff88] mt-1">✓</span>
                      Integrated autonomic biosensors
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00ff88] mt-1">✓</span>
                      AI-powered artifact rejection
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
