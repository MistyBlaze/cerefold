import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { useIntersection } from '../../hooks/useIntersection';
import CosmicBackground from '../effects/CosmicBackground';

const problems = [
  { text: 'Conventional systems focus only on cortical activity', icon: '🧠' },
  { text: 'Cerebellar signals critical for motor control go undetected', icon: '⚠️' },
  { text: 'Autonomic signatures revealing stress and focus are ignored', icon: '❤️' },
  { text: "You can't optimize what you can't measure", icon: '📊' }
];

// Brain visualization - cleaner and larger
function BrainDiagram({ isVisible }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const w = canvas.width = 500;
    const h = canvas.height = 550;
    const cx = w / 2;
    const cy = h / 2 - 30;
    let animationId;
    let time = 0;
    let cortexAlpha = 0.8;
    let cerebellumAlpha = 0.3;

    setTimeout(() => {
      const interval = setInterval(() => {
        if (cortexAlpha > 0.25) cortexAlpha -= 0.008;
        if (cerebellumAlpha < 0.95) cerebellumAlpha += 0.01;
        else clearInterval(interval);
      }, 25);
    }, 800);

    function draw() {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Background glow
      const bgGlow = ctx.createRadialGradient(cx, cy, 50, cx, cy, 200);
      bgGlow.addColorStop(0, `rgba(139, 92, 246, ${0.12 * cerebellumAlpha})`);
      bgGlow.addColorStop(0.5, `rgba(0, 168, 255, ${0.05 * cortexAlpha})`);
      bgGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, w, h);

      // === CORTEX ===
      ctx.globalAlpha = cortexAlpha;
      ctx.fillStyle = 'rgba(0, 168, 255, 0.12)';
      ctx.strokeStyle = '#00a8ff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(cx, cy - 20, 100, 115, 0, -Math.PI, 0);
      ctx.fill();
      ctx.stroke();

      // Cortex folds
      ctx.strokeStyle = 'rgba(0, 168, 255, 0.4)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(cx - 75 + i * 8, cy - 95 + i * 18);
        ctx.quadraticCurveTo(cx, cy - 105 + i * 22, cx + 75 - i * 8, cy - 95 + i * 18);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // === CEREBELLUM === (highlighted)
      ctx.globalAlpha = cerebellumAlpha;
      ctx.fillStyle = `rgba(139, 92, 246, ${0.25 * cerebellumAlpha})`;
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#8b5cf6';
      ctx.shadowBlur = 20 * cerebellumAlpha;
      ctx.beginPath();
      ctx.ellipse(cx, cy + 115, 70, 35, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Cerebellum folds
      ctx.strokeStyle = `rgba(168, 85, 247, ${0.5 * cerebellumAlpha})`;
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(cx - 50 + i * 5, cy + 108 + i * 7);
        ctx.quadraticCurveTo(cx, cy + 100 + i * 12, cx + 50 - i * 5, cy + 108 + i * 7);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // === BRAINSTEM ===
      ctx.globalAlpha = cerebellumAlpha;
      ctx.fillStyle = 'rgba(236, 72, 153, 0.25)';
      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#ec4899';
      ctx.shadowBlur = 15 * cerebellumAlpha;
      ctx.beginPath();
      ctx.moveTo(cx - 18, cy + 145);
      ctx.lineTo(cx - 22, cy + 195);
      ctx.quadraticCurveTo(cx - 22, cy + 215, cx, cy + 215);
      ctx.quadraticCurveTo(cx + 22, cy + 215, cx + 22, cy + 195);
      ctx.lineTo(cx + 18, cy + 145);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // === SENSORS ===
      const sensors = [
        // Cortical (cyan - dims)
        { x: cx, y: cy - 135, color: '#00a8ff', standard: true, size: 8 },
        { x: cx - 60, y: cy - 115, color: '#00a8ff', standard: true, size: 7 },
        { x: cx + 60, y: cy - 115, color: '#00a8ff', standard: true, size: 7 },
        { x: cx - 85, y: cy - 70, color: '#06b6d4', standard: true, size: 7 },
        { x: cx + 85, y: cy - 70, color: '#06b6d4', standard: true, size: 7 },
        { x: cx - 100, y: cy - 10, color: '#00a8ff', standard: true, size: 6 },
        { x: cx + 100, y: cy - 10, color: '#00a8ff', standard: true, size: 6 },
        // Cerebellar (purple - glows)
        { x: cx - 45, y: cy + 110, color: '#8b5cf6', standard: false, size: 10 },
        { x: cx, y: cy + 125, color: '#a855f7', standard: false, size: 12 },
        { x: cx + 45, y: cy + 110, color: '#8b5cf6', standard: false, size: 10 },
        // Autonomic (pink - glows)
        { x: cx - 12, y: cy + 185, color: '#ec4899', standard: false, size: 8 },
        { x: cx + 12, y: cy + 185, color: '#ec4899', standard: false, size: 8 },
      ];

      sensors.forEach((s, i) => {
        const pulse = Math.sin(time * 3 + i * 0.4) * 0.25 + 0.75;
        const alpha = s.standard ? cortexAlpha : cerebellumAlpha;

        // Glow ring for MindFlux sensors
        if (!s.standard) {
          ctx.beginPath();
          ctx.strokeStyle = `${s.color}50`;
          ctx.lineWidth = 2;
          ctx.arc(s.x, s.y, s.size + 5 + pulse * 4, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = s.standard ? 6 : 15;
        ctx.globalAlpha = alpha * (0.6 + pulse * 0.4);
        ctx.arc(s.x, s.y, s.size * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      // === LABELS ===
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = `rgba(0, 168, 255, ${cortexAlpha})`;
      ctx.fillText('Cortex', cx, cy - 55);
      ctx.fillStyle = `rgba(6, 182, 212, ${cortexAlpha})`;
      ctx.fillText('Temporal', cx - 110, cy + 10);
      ctx.font = 'bold 14px sans-serif';
      ctx.fillStyle = `rgba(139, 92, 246, ${cerebellumAlpha})`;
      ctx.fillText('Cerebellum', cx, cy + 165);
      ctx.font = '13px sans-serif';
      ctx.fillStyle = `rgba(236, 72, 153, ${cerebellumAlpha})`;
      ctx.fillText('Autonomic', cx, cy + 235);

      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, [isVisible]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full max-w-[500px] h-auto"
        style={{ aspectRatio: '500/550' }}
      />
      {/* Legend */}
      <div className="absolute bottom-4 right-4 space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#00a8ff] opacity-40" />
          <span className="text-white/40">Standard EEG</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#8b5cf6] shadow-[0_0_8px_#8b5cf6]" />
          <span className="text-[#8b5cf6] font-medium">MindFlux</span>
        </div>
      </div>
    </div>
  );
}

export default function Problem() {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.15 });

  useEffect(() => {
    if (!hasIntersected) return;

    anime({
      targets: '.problem-animate',
      translateY: [40, 0],
      opacity: [0, 1],
      filter: ['blur(10px)', 'blur(0px)'],
      duration: 1000,
      easing: 'easeOutExpo',
      delay: anime.stagger(120)
    });
  }, [hasIntersected]);

  return (
    <section ref={ref} id="problem" data-testid="problem-section" className="relative py-28 lg:py-36">
      <CosmicBackground />
      
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Brain Visualization */}
          <div className="order-2 lg:order-1 flex justify-center">
            <BrainDiagram isVisible={hasIntersected} />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="problem-animate opacity-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f472b6]/10 border border-[#f472b6]/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#f472b6]" />
              <span className="text-sm font-medium text-[#f472b6] uppercase tracking-wider">The Challenge</span>
            </div>

            <h2 className="problem-animate opacity-0 text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-['Space_Grotesk'] leading-tight">
              Traditional EEG Misses
              <br />
              <span className="text-[#f472b6]">90%</span> of the Story
            </h2>

            <div className="mt-10 space-y-6">
              {problems.map((p, i) => (
                <div key={i} className="problem-animate opacity-0 flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#f472b6]/15 to-[#ec4899]/5 border border-[#f472b6]/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {p.icon}
                  </div>
                  <p className="text-white/60 text-lg leading-relaxed pt-3 group-hover:text-white/80 transition-colors">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#research"
              className="problem-animate opacity-0 inline-flex items-center gap-2 mt-10 text-[#00a8ff] hover:text-[#33bbff] font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#research')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See how MindFlux solves this
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
