import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { Sun, Moon, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#technology', label: 'Technology' },
  { href: '#mindflux', label: 'MindFlux' },
  { href: '#research', label: 'Research' },
  { href: '#applications', label: 'Applications' },
  { href: '#company', label: 'Company' }
];

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const { scrollY } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrolled = scrollY > 10;

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      data-testid="navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-[rgba(10,10,15,0.85)] dark:bg-[rgba(10,10,15,0.85)] light:bg-[rgba(255,255,255,0.9)] border-b border-white/10 shadow-[0_0_30px_rgba(0,168,255,0.1)]'
          : 'backdrop-blur-md bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#"
            data-testid="nav-logo"
            className="flex items-center gap-2 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00a8ff] to-[#8b5cf6] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                <path d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white dark:text-white light:text-[#0a0a0f] font-['Space_Grotesk']">Cerefold</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                onClick={(e) => scrollToSection(e, link.href)}
                className="relative text-white/80 dark:text-white/80 light:text-[#0a0a0f]/80 hover:text-white dark:hover:text-white light:hover:text-[#0a0a0f] transition-colors duration-150 font-medium text-sm tracking-wide
                  after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-full after:origin-left after:scale-x-0 hover:after:scale-x-100 after:bg-[#00a8ff] after:transition-transform after:duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              data-testid="theme-toggle"
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/10 dark:bg-white/10 light:bg-black/5 hover:bg-white/20 dark:hover:bg-white/20 light:hover:bg-black/10 transition-colors duration-150"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-[#8b5cf6]" />
              )}
            </button>

            {/* Contact CTA */}
            <a
              href="#contact"
              data-testid="nav-contact-cta"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#00a8ff] text-[#0a0a0f] px-4 py-2 font-semibold text-sm tracking-wide shadow-[0_0_30px_rgba(0,168,255,0.25)] hover:bg-[#33bbff] transition-colors duration-150"
            >
              Contact
            </a>

            {/* Mobile Menu Toggle */}
            <button
              data-testid="nav-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-150"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-[rgba(10,10,15,0.95)] border-b border-white/10 transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="block px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-150 font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="block px-4 py-3 rounded-lg bg-[#00a8ff] text-[#0a0a0f] font-semibold text-center mt-4"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
