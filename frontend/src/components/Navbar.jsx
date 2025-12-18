import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/why-qelyx', label: 'Why Qelyx' },
    { path: '/services', label: 'Services' },
    { path: '/industries', label: 'Industries' },
    { path: '/team', label: 'Team' },
    { path: '/blog', label: 'Blog' },
    { path: '/q-hub', label: 'Q Hub' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(10,14,26,0.85)] backdrop-blur-[20px] border-b border-[rgba(255,255,255,0.1)]">
      <div className="max-w-content mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-[1.35rem] font-semibold text-white">
              <span className="bg-gradient-to-r from-[#00d9ff] via-[#00b8d4] to-[#6366f1] bg-clip-text text-transparent">
                Qelyx
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'text-[#00d9ff] bg-[rgba(0,217,255,0.1)]'
                    : 'text-[#a0aec0] hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="hidden md:inline-flex items-center justify-center rounded-[10px] px-4 py-2 text-sm font-medium text-[#a0aec0] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors"
            >
              Login
            </Link>
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center justify-center rounded-[10px] bg-gradient-to-r from-[#00d9ff] to-[#00b8d4] px-6 py-2 text-sm font-semibold text-[#0a0f1c] shadow-[0_4px_16px_rgba(0,217,255,0.3)] hover:shadow-[0_6px_20px_rgba(0,217,255,0.4)] transition-all"
            >
              Request a Demo
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[rgba(255,255,255,0.1)]">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'text-[#00d9ff] bg-[rgba(0,217,255,0.1)]'
                      : 'text-[#a0aec0] hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 inline-flex items-center justify-center rounded-[10px] px-4 py-2 text-sm font-medium text-[#a0aec0] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              >
                Login
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-[10px] bg-gradient-to-r from-[#00d9ff] to-[#00b8d4] px-6 py-2 text-sm font-semibold text-[#0a0f1c] shadow-[0_4px_16px_rgba(0,217,255,0.3)]"
              >
                Request a Demo
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
