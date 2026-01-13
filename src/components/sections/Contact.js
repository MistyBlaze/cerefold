import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { useIntersection } from '../../hooks/useIntersection';
import { toast } from 'sonner';
import { Send, CheckCircle } from 'lucide-react';

const interestOptions = [
  { value: '', label: 'Select interest area' },
  { value: 'research', label: 'Research' },
  { value: 'clinical', label: 'Clinical' },
  { value: 'consumer', label: 'Consumer' },
  { value: 'investment', label: 'Investment' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'other', label: 'Other' }
];

// Neural background for left side
function NeuralBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let w = canvas.width = 400;
    let h = canvas.height = 500;

    const nodes = Array.from({ length: 30 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      pulsePhase: Math.random() * Math.PI * 2
    }));

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);

          if (d < 100) {
            const alpha = (1 - d / 100) * 0.2;
            ctx.strokeStyle = `rgba(0, 168, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      const time = Date.now() * 0.001;
      for (const n of nodes) {
        const pulse = Math.sin(time * 2 + n.pulsePhase) * 0.3 + 1;
        
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 168, 255, 0.6)';
        ctx.shadowColor = 'rgba(0, 168, 255, 0.4)';
        ctx.shadowBlur = 8;
        ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-50"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default function Contact() {
  const { ref, hasIntersected } = useIntersection({ threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    interest: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!hasIntersected) return;

    anime({
      targets: '.contact-content',
      translateY: [40, 0],
      opacity: [0, 1],
      filter: ['blur(10px)', 'blur(0px)'],
      duration: 800,
      easing: 'easeOutExpo',
      delay: anime.stagger(100)
    });
  }, [hasIntersected]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    toast.success('Request submitted successfully!', {
      description: 'We\'ll be in touch within 24-48 hours.',
      duration: 5000
    });

    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        interest: '',
        message: ''
      });
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const inputClasses = (hasError) =>
    `w-full px-4 py-3 rounded-lg bg-white/5 border ${
      hasError ? 'border-red-500' : 'border-white/10'
    } text-white placeholder-white/40 focus:outline-none focus:border-[#00a8ff] focus:ring-1 focus:ring-[#00a8ff] focus:shadow-[0_0_20px_rgba(0,168,255,0.15)] transition-all duration-200`;

  return (
    <section
      ref={ref}
      id="contact"
      data-testid="contact-section"
      className="relative py-20 lg:py-32 bg-[#050508]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,168,255,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content with neural background */}
          <div className="contact-content relative opacity-0">
            {/* Neural background */}
            <div className="absolute inset-0 -m-8 overflow-hidden rounded-3xl">
              <NeuralBackground />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-[#050508]" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00a8ff]/10 border border-[#00a8ff]/20 mb-6">
                <span className="text-xs font-semibold text-[#00a8ff] uppercase tracking-wider">Early Access</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-['Space_Grotesk'] leading-tight">
                Join the Neural Revolution
              </h2>

              <p className="mt-6 text-white/70 text-lg leading-relaxed">
                MindFlux is currently in development. Join our early access program to be among 
                the first to experience full-spectrum neural intelligence.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  'Priority access to beta hardware',
                  'Direct line to our research team',
                  'Shape the future of neural interfaces'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-7 h-7 rounded-full bg-[#00ff88]/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#00ff88]/30 transition-all">
                      <CheckCircle className="w-4 h-4 text-[#00ff88]" />
                    </div>
                    <span className="text-white/80 group-hover:text-white transition-colors">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-white/50 text-sm">Contact us directly:</p>
                <a
                  href="mailto:research@cerefold.com"
                  className="text-[#00a8ff] hover:text-[#33bbff] transition-colors font-medium text-lg hover:underline"
                >
                  research@cerefold.com
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-content opacity-0">
            <form
              data-testid="early-access-form"
              onSubmit={handleSubmit}
              className="relative p-6 lg:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden"
            >
              {/* Form glow effect */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,168,255,0.1),transparent_60%)]" />

              {isSubmitted ? (
                <div className="relative text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-[#00ff88]/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-[#00ff88]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Thank You!</h3>
                  <p className="text-white/60">We'll be in touch soon.</p>
                </div>
              ) : (
                <div className="relative">
                  <h3 className="text-xl font-semibold text-white mb-6">Request Early Access</h3>

                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        data-testid="early-access-name-input"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClasses(errors.name)}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        data-testid="early-access-email-input"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClasses(errors.email)}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClasses(false)}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    {/* Organization */}
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Organization</label>
                      <input
                        type="text"
                        name="organization"
                        data-testid="early-access-company-input"
                        value={formData.organization}
                        onChange={handleChange}
                        className={inputClasses(false)}
                        placeholder="Company or Institution"
                      />
                    </div>

                    {/* Interest Area */}
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Interest Area</label>
                      <select
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className={`${inputClasses(false)} cursor-pointer`}
                      >
                        {interestOptions.map(opt => (
                          <option key={opt.value} value={opt.value} className="bg-[#0a0a0f]">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Message</label>
                      <textarea
                        name="message"
                        data-testid="early-access-usecase-textarea"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className={`${inputClasses(false)} resize-none`}
                        placeholder="Tell us about your use case..."
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      data-testid="early-access-submit-button"
                      disabled={isSubmitting}
                      className="w-full mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#00a8ff] text-[#0a0a0f] px-6 py-4 font-semibold text-base tracking-wide shadow-[0_0_30px_rgba(0,168,255,0.25)] hover:bg-[#33bbff] hover:shadow-[0_0_50px_rgba(0,168,255,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Request Early Access</span>
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
