import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { useIntersection } from '../../hooks/useIntersection';

const problems = [
  { text: 'Conventional systems focus only on cortical activity', icon: '🧠' },
  { text: 'Cerebellar signals critical for motor control go undetected', icon: '⚠️' },
  { text: 'Autonomic signatures revealing stress and focus are ignored', icon: '❤️' },
  { text: "You can't optimize what you can't measure", icon: '📊' }
];

// Enhanced anatomical brain visualization
function EnhancedBrain({ isVisible }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const w = canvas.width = 400;
    const h = canvas.height = 450;
    let animationId;
    let time = 0;
    let cortexOpacity = 0.8;
    let cerebellumOpacity = 0.3;

    // Animate opacity transition
    setTimeout(() => {
      const fadeInterval = setInterval(() => {
        if (cortexOpacity > 0.25) cortexOpacity -= 0.01;
        if (cerebellumOpacity < 0.9) cerebellumOpacity += 0.01;
        else clearInterval(fadeInterval);
      }, 30);
    }, 1000);

    function draw() {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      const cx = w / 2;
      const cy = h / 2 - 20;

      // Brain glow background
      const bgGlow = ctx.createRadialGradient(cx, cy, 50, cx, cy, 180);
      bgGlow.addColorStop(0, `rgba(139, 92, 246, ${0.1 * cerebellumOpacity})`);
      bgGlow.addColorStop(0.5, `rgba(0, 168, 255, ${0.05 * cortexOpacity})`);
      bgGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, w, h);

      // Draw brain outline (side profile)
      ctx.save();
      ctx.translate(cx, cy);

      // Cortex (frontal/parietal) - will dim
      ctx.globalAlpha = cortexOpacity;
      ctx.strokeStyle = '#00a8ff';
      ctx.lineWidth = 2;
      ctx.fillStyle = 'rgba(0, 168, 255, 0.1)';
      
      ctx.beginPath();
      ctx.ellipse(0, -20, 80, 95, 0, -Math.PI, 0);
      ctx.fill();
      ctx.stroke();

      // Cortex folds
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0, 168, 255, 0.5)';
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(-60 + i * 10, -80 + i * 15);
        ctx.quadraticCurveTo(0, -90 + i * 20, 60 - i * 10, -80 + i * 15);
        ctx.stroke();
      }

      // Temporal lobe
      ctx.beginPath();
      ctx.ellipse(-70, 20, 25, 40, Math.PI / 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.1)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
      ctx.stroke();

      ctx.globalAlpha = 1;

      // Cerebellum - will glow brighter
      ctx.globalAlpha = cerebellumOpacity;
      ctx.fillStyle = `rgba(139, 92, 246, ${0.3 * cerebellumOpacity})`;
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#8b5cf6';
      ctx.shadowBlur = 15 * cerebellumOpacity;
      
      ctx.beginPath();
      ctx.ellipse(0, 100, 55, 30, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Cerebellum texture
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(168, 85, 247, ${0.6 * cerebellumOpacity})`;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(-40 + i * 5, 95 + i * 5);
        ctx.quadraticCurveTo(0, 85 + i * 10, 40 - i * 5, 95 + i * 5);
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // Brainstem - autonomic
      ctx.fillStyle = 'rgba(236, 72, 153, 0.3)';
      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#ec4899';
      ctx.shadowBlur = 10 * cerebellumOpacity;
      
      ctx.beginPath();
      ctx.moveTo(-15, 125);
      ctx.lineTo(-20, 170);
      ctx.quadraticCurveTo(-20, 185, 0, 185);
      ctx.quadraticCurveTo(20, 185, 20, 170);
      ctx.lineTo(15, 125);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.restore();

      // Draw sensor points
      const sensors = [
        // Cortical (cyan - standard)
        { x: cx, y: cy - 115, color: '#00a8ff', standard: true },
        { x: cx - 50, y: cy - 100, color: '#00a8ff', standard: true },
        { x: cx + 50, y: cy - 100, color: '#00a8ff', standard: true },
        { x: cx - 70, y: cy - 60, color: '#06b6d4', standard: true },
        { x: cx + 70, y: cy - 60, color: '#06b6d4', standard: true },
        { x: cx - 80, y: cy, color: '#00a8ff', standard: true },
        { x: cx + 80, y: cy, color: '#00a8ff', standard: true },
        // Cerebellar (purple - MindFlux)
        { x: cx - 35, y: cy + 95, color: '#8b5cf6', standard: false },
        { x: cx, y: cy + 105, color: '#a855f7', standard: false },
        { x: cx + 35, y: cy + 95, color: '#8b5cf6', standard: false },
        // Autonomic (pink - MindFlux)
        { x: cx - 10, y: cy + 155, color: '#ec4899', standard: false },
        { x: cx + 10, y: cy + 155, color: '#ec4899', standard: false },
      ];

      sensors.forEach((sensor, idx) => {
        const pulse = Math.sin(time * 3 + idx * 0.5) * 0.3 + 0.7;
        const size = sensor.standard ? 5 : 7;
        const alpha = sensor.standard ? cortexOpacity : cerebellumOpacity;

        // Glow ring for MindFlux sensors
        if (!sensor.standard) {
          ctx.beginPath();
          ctx.strokeStyle = `${sensor.color}60`;
          ctx.lineWidth = 2;
          ctx.arc(sensor.x, sensor.y, size + 4 + pulse * 3, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.fillStyle = sensor.color;
        ctx.shadowColor = sensor.color;
        ctx.shadowBlur = sensor.standard ? 5 : 12;
        ctx.globalAlpha = alpha * (0.6 + pulse * 0.4);
        ctx.arc(sensor.x, sensor.y, size * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      // Labels
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      
      ctx.fillStyle = `rgba(0, 168, 255, ${cortexOpacity})`;
      ctx.fillText('Cortex', cx, cy - 50);
      ctx.fillStyle = `rgba(6, 182, 212, ${cortexOpacity})`;
      ctx.fillText('Temporal', cx - 85, cy + 30);
      
      ctx.fillStyle = `rgba(139, 92, 246, ${cerebellumOpacity})`;
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('Cerebellum', cx, cy + 145);
      ctx.fillStyle = `rgba(236, 72, 153, ${cerebellumOpacity})`;
      ctx.font = '11px sans-serif';
      ctx.fillText('Autonomic', cx, cy + 200);

      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animationId);
  }, [isVisible]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full max-w-[400px] h-auto"
        style={{ aspectRatio: '400/450' }}
      />
      {/* Legend */}
      <div className="absolute bottom-0 right-0 space-y-2 text-[10px]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00a8ff] opacity-40" />
          <span className="text-white/30">Standard EEG</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#8b5cf6] shadow-[0_0_6px_#8b5cf6]" />
          <span className="text-[#8b5cf6]">MindFlux</span>
        </div>
      </div>
    </div>
  );
}

export default function Problem() {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.2 });

  useEffect(() => {
    if (!hasIntersected) return;

    anime({
      targets: '.problem-header',
      translateY: [40, 0],
      opacity: [0, 1],
      filter: ['blur(15px)', 'blur(0px)'],
      duration: 1000,
      easing: 'easeOutExpo'
    });

    anime({
      targets: '.problem-point',
      translateX: [-40, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo',
      delay: anime.stagger(150, { start: 400 })
    });
  }, [hasIntersected]);

  return (
    <section
      ref={ref}
      id="problem"
      data-testid="problem-section"
      className="relative py-24 lg:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030308] via-[#0a0a15] to-[#050510]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(139,92,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(236,72,153,0.05),transparent_40%)]" />
      </div>

      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Brain Visualization */}
          <div className="order-2 lg:order-1 flex justify-center">
            <EnhancedBrain isVisible={hasIntersected} />
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <div className="problem-header opacity-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f472b6]/10 border border-[#f472b6]/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#f472b6]" />
                <span className="text-sm font-medium text-[#f472b6] uppercase tracking-wider">The Challenge</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-['Space_Grotesk'] leading-tight">
                Traditional EEG Misses
                <br />
                <span className="text-[#f472b6]">90%</span> of the Story
              </h2>
            </div>

            <div className="mt-10 space-y-5">
              {problems.map((problem, index) => (
                <div
                  key={index}
                  className="problem-point flex items-start gap-4 opacity-0 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#f472b6]/20 to-[#ec4899]/5 border border-[#f472b6]/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {problem.icon}
                  </div>
                  <p className="text-white/70 text-lg leading-relaxed pt-2 group-hover:text-white/90 transition-colors">
                    {problem.text}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#research"
              className="inline-flex items-center gap-2 mt-10 text-[#00a8ff] hover:text-[#33bbff] transition-colors group"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#research')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="font-medium">See how MindFlux solves this</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
