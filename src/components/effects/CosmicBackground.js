import React, { useEffect, useRef } from 'react';

// Global Cosmic Galaxy Background - constant throughout site
export default function CosmicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight * 3; // Taller to cover scroll

    // Create stars - more of them for a rich galaxy feel
    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.2,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.8 ? '#00a8ff' : Math.random() > 0.6 ? '#8b5cf6' : Math.random() > 0.4 ? '#a855f7' : '#ffffff'
    }));

    // Nebula clouds for depth
    const nebulae = [
      { x: w * 0.15, y: h * 0.1, rx: 400, ry: 300, color: 'rgba(139, 92, 246, 0.035)' },
      { x: w * 0.85, y: h * 0.25, rx: 500, ry: 350, color: 'rgba(0, 168, 255, 0.025)' },
      { x: w * 0.3, y: h * 0.5, rx: 450, ry: 280, color: 'rgba(236, 72, 153, 0.02)' },
      { x: w * 0.7, y: h * 0.7, rx: 380, ry: 250, color: 'rgba(139, 92, 246, 0.03)' },
      { x: w * 0.5, y: h * 0.9, rx: 500, ry: 300, color: 'rgba(0, 168, 255, 0.02)' },
    ];

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Draw gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, h);
      bgGradient.addColorStop(0, '#030308');
      bgGradient.addColorStop(0.3, '#050510');
      bgGradient.addColorStop(0.6, '#0a0a15');
      bgGradient.addColorStop(1, '#030308');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, w, h);

      // Draw nebulae
      nebulae.forEach(nebula => {
        const gradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.rx);
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(0.6, nebula.color.replace(/[\d.]+\)$/, '0.01)'));
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(nebula.x, nebula.y, nebula.rx, nebula.ry, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw twinkling stars
      const time = Date.now() * 0.001;
      stars.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 8 + star.twinklePhase);
        const alpha = 0.3 + twinkle * 0.5;
        const size = star.r * (1 + twinkle * 0.15);

        ctx.beginPath();
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, alpha);
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 3;
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight * 3;
      
      // Redistribute stars
      stars.forEach(star => {
        star.x = Math.random() * w;
        star.y = Math.random() * h;
      });
      
      // Update nebula positions
      nebulae[0].x = w * 0.15; nebulae[0].y = h * 0.1;
      nebulae[1].x = w * 0.85; nebulae[1].y = h * 0.25;
      nebulae[2].x = w * 0.3; nebulae[2].y = h * 0.5;
      nebulae[3].x = w * 0.7; nebulae[3].y = h * 0.7;
      nebulae[4].x = w * 0.5; nebulae[4].y = h * 0.9;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-[300vh] -z-50 pointer-events-none"
      aria-hidden="true"
    />
  );
}
