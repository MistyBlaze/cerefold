import React, { useEffect, useRef } from 'react';

// Active brain with emanating waves and sensor points
export default function ActiveBrainVisualization({ size = 400 }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const w = canvas.width = size * 2;
    const h = canvas.height = size * 2;
    const cx = w / 2;
    const cy = h / 2;

    let animationId;
    let time = 0;

    // Brain wave rings that emanate outward
    const waves = [];
    
    // Sensor positions around the brain (10-20 system inspired)
    const sensors = [
      { angle: -90, distance: 0.85, label: 'Fz', color: '#00a8ff' },
      { angle: -60, distance: 0.9, label: 'F3', color: '#00a8ff' },
      { angle: -120, distance: 0.9, label: 'F4', color: '#00a8ff' },
      { angle: -30, distance: 0.95, label: 'C3', color: '#00ff88' },
      { angle: -150, distance: 0.95, label: 'C4', color: '#00ff88' },
      { angle: 0, distance: 1, label: 'T3', color: '#06b6d4' },
      { angle: 180, distance: 1, label: 'T4', color: '#06b6d4' },
      { angle: 30, distance: 0.95, label: 'P3', color: '#8b5cf6' },
      { angle: 150, distance: 0.95, label: 'P4', color: '#8b5cf6' },
      { angle: 60, distance: 0.9, label: 'O1', color: '#ec4899' },
      { angle: 120, distance: 0.9, label: 'O2', color: '#ec4899' },
      { angle: 90, distance: 0.85, label: 'Oz', color: '#ec4899' },
      // Cerebellar sensors (highlighted)
      { angle: 70, distance: 0.75, label: 'CB1', color: '#a855f7', isCerebellar: true },
      { angle: 90, distance: 0.7, label: 'CB2', color: '#a855f7', isCerebellar: true },
      { angle: 110, distance: 0.75, label: 'CB3', color: '#a855f7', isCerebellar: true },
    ];

    function createWave() {
      waves.push({
        radius: 60,
        maxRadius: 180,
        opacity: 0.8,
        speed: 0.8 + Math.random() * 0.4,
        color: Math.random() > 0.5 ? '#00a8ff' : '#8b5cf6'
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      // Create new waves periodically
      if (Math.random() < 0.03) createWave();

      // Draw emanating waves
      for (let i = waves.length - 1; i >= 0; i--) {
        const wave = waves[i];
        wave.radius += wave.speed;
        wave.opacity -= 0.008;

        if (wave.opacity <= 0) {
          waves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.globalAlpha = wave.opacity * 0.5;
        ctx.lineWidth = 2;
        ctx.arc(cx, cy, wave.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Draw brain outline (side profile style)
      ctx.save();
      ctx.translate(cx, cy);
      
      // Brain glow
      const brainGradient = ctx.createRadialGradient(0, 0, 20, 0, 0, 80);
      brainGradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
      brainGradient.addColorStop(0.5, 'rgba(0, 168, 255, 0.15)');
      brainGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = brainGradient;
      ctx.beginPath();
      ctx.arc(0, 0, 80, 0, Math.PI * 2);
      ctx.fill();

      // Brain outline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, 0, 55, 65, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Brain folds (sulci)
      ctx.strokeStyle = 'rgba(0, 168, 255, 0.4)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        const yOffset = -30 + i * 20;
        ctx.beginPath();
        ctx.moveTo(-40, yOffset);
        ctx.quadraticCurveTo(0, yOffset + (i % 2 ? -10 : 10), 40, yOffset);
        ctx.stroke();
      }

      // Cerebellum region (highlighted)
      ctx.fillStyle = 'rgba(168, 85, 247, 0.3)';
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, 55, 35, 18, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Neural activity nodes inside brain
      for (let i = 0; i < 12; i++) {
        const nodeX = Math.cos(i * 0.5 + time * 2) * 25 + Math.sin(time + i) * 10;
        const nodeY = Math.sin(i * 0.5 + time * 2) * 30 + Math.cos(time * 0.5 + i) * 10;
        const pulse = Math.sin(time * 3 + i) * 0.5 + 0.5;
        
        ctx.beginPath();
        ctx.fillStyle = `rgba(0, 255, 136, ${0.4 + pulse * 0.4})`;
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 8;
        ctx.arc(nodeX, nodeY - 10, 2 + pulse * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.restore();

      // Draw sensors around brain
      sensors.forEach((sensor, idx) => {
        const rad = (sensor.angle * Math.PI) / 180;
        const baseDistance = 90 * sensor.distance;
        const x = cx + Math.cos(rad) * baseDistance;
        const y = cy + Math.sin(rad) * baseDistance;
        
        const pulse = Math.sin(time * 2 + idx * 0.5) * 0.3 + 0.7;
        const sensorSize = sensor.isCerebellar ? 8 : 6;

        // Connection line to brain
        ctx.beginPath();
        ctx.strokeStyle = `${sensor.color}40`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.moveTo(x, y);
        ctx.lineTo(cx + Math.cos(rad) * 55, cy + Math.sin(rad) * 55);
        ctx.stroke();
        ctx.setLineDash([]);

        // Sensor glow ring
        if (sensor.isCerebellar) {
          ctx.beginPath();
          ctx.strokeStyle = `${sensor.color}60`;
          ctx.lineWidth = 2;
          ctx.arc(x, y, sensorSize + 6 + pulse * 4, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Sensor dot
        ctx.beginPath();
        ctx.fillStyle = sensor.color;
        ctx.shadowColor = sensor.color;
        ctx.shadowBlur = sensor.isCerebellar ? 15 : 10;
        ctx.globalAlpha = 0.7 + pulse * 0.3;
        ctx.arc(x, y, sensorSize * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Signal wave animation from sensor
        if (Math.sin(time * 4 + idx) > 0.8) {
          const waveRadius = ((time * 50 + idx * 10) % 30);
          ctx.beginPath();
          ctx.strokeStyle = `${sensor.color}${Math.floor((1 - waveRadius / 30) * 80).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 1;
          ctx.arc(x, y, waveRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Draw EEG waveform at bottom
      const waveY = h - 60;
      const waveWidth = w - 80;
      const waveStartX = 40;

      ctx.strokeStyle = '#00a8ff';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#00a8ff';
      ctx.shadowBlur = 5;
      ctx.beginPath();
      for (let x = 0; x < waveWidth; x++) {
        const xPos = waveStartX + x;
        const y = waveY + 
          Math.sin((x + time * 100) * 0.03) * 15 +
          Math.sin((x + time * 80) * 0.05) * 8 +
          Math.sin((x + time * 60) * 0.08) * 5;
        
        if (x === 0) ctx.moveTo(xPos, y);
        else ctx.lineTo(xPos, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Waveform label
      ctx.fillStyle = '#00a8ff';
      ctx.font = '10px monospace';
      ctx.fillText('LIVE EEG', waveStartX, waveY - 30);

      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [size]);

  return (
    <div ref={containerRef} className="relative" style={{ width: size, height: size }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: size, height: size }}
      />
    </div>
  );
}
