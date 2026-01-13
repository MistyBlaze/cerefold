import React, { useEffect, useRef } from 'react';

// Cosmic Galaxy Background with stars and nebula
export default function CosmicBackground({ intensity = 1 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    // Create stars
    const stars = Array.from({ length: Math.floor(150 * intensity) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.7 ? '#00a8ff' : Math.random() > 0.5 ? '#8b5cf6' : '#ffffff'
    }));

    // Create nebula clouds
    const nebulae = [
      { x: w * 0.2, y: h * 0.3, rx: 300, ry: 200, color: 'rgba(139, 92, 246, 0.04)', rotation: 0 },
      { x: w * 0.8, y: h * 0.7, rx: 400, ry: 250, color: 'rgba(0, 168, 255, 0.03)', rotation: Math.PI / 4 },
      { x: w * 0.5, y: h * 0.5, rx: 500, ry: 300, color: 'rgba(236, 72, 153, 0.02)', rotation: -Math.PI / 6 }
    ];

    // Shooting stars
    const shootingStars = [];

    function createShootingStar() {
      if (Math.random() < 0.002 * intensity && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.5,
          vx: 3 + Math.random() * 4,
          vy: 1 + Math.random() * 2,
          life: 1,
          decay: 0.015 + Math.random() * 0.01
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Draw nebulae (soft gradient clouds)
      nebulae.forEach(nebula => {
        ctx.save();
        ctx.translate(nebula.x, nebula.y);
        ctx.rotate(nebula.rotation);
        
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, nebula.rx);
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(0.5, nebula.color.replace(/[\d.]+\)$/, '0.02)'));
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(0, 0, nebula.rx, nebula.ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw stars with twinkling
      const time = Date.now() * 0.001;
      stars.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 10 + star.twinklePhase);
        const alpha = 0.4 + twinkle * 0.4;
        const size = star.r * (1 + twinkle * 0.2);

        ctx.beginPath();
        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 4;
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      // Create and draw shooting stars
      createShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life -= ss.decay;

        if (ss.life <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }

        // Draw shooting star trail
        const gradient = ctx.createLinearGradient(
          ss.x, ss.y,
          ss.x - ss.vx * 20, ss.y - ss.vy * 20
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${ss.life})`);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.vx * 20, ss.y - ss.vy * 20);
        ctx.stroke();

        // Draw head
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${ss.life})`;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      
      // Update star positions
      stars.forEach(star => {
        star.x = Math.random() * w;
        star.y = Math.random() * h;
      });
      
      // Update nebula positions
      nebulae[0].x = w * 0.2;
      nebulae[0].y = h * 0.3;
      nebulae[1].x = w * 0.8;
      nebulae[1].y = h * 0.7;
      nebulae[2].x = w * 0.5;
      nebulae[2].y = h * 0.5;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 pointer-events-none"
      style={{ background: 'linear-gradient(180deg, #030308 0%, #0a0a15 50%, #050510 100%)' }}
      aria-hidden="true"
    />
  );
}
