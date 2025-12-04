import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import QelyxLogoNew from '../assets/Qelyx Logo_New.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <nav className="max-w-content mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={QelyxLogoNew}
            alt="Qelyx logo"
            className="h-8 w-auto"
            loading="eager"
          />
          <span className="text-lg font-semibold tracking-tight bg-gradient-to-r from-primary-legacy via-[#2A6FF4] to-[#15d5d1] bg-clip-text text-transparent">
            Qelyx
          </span>
        </Link>

        <button
          className="lg:hidden p-2 rounded-md border border-gray-200"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="block w-5 h-0.5 bg-primary-navy mb-1" />
          <span className="block w-5 h-0.5 bg-primary-navy mb-1" />
          <span className="block w-5 h-0.5 bg-primary-navy" />
        </button>

        <div className="hidden lg:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium px-2 py-1 border-b-2 ${
                isActive ? 'border-secondary-bright text-secondary-bright' : 'border-transparent text-primary-navy hover:text-secondary-bright'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/why-qelyx"
            className={({ isActive }) =>
              `text-sm font-medium px-2 py-1 border-b-2 ${
                isActive ? 'border-secondary-bright text-secondary-bright' : 'border-transparent text-primary-navy hover:text-secondary-bright'
              }`
            }
          >
            Why Qelyx
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `text-sm font-medium px-2 py-1 border-b-2 ${
                isActive ? 'border-secondary-bright text-secondary-bright' : 'border-transparent text-primary-navy hover:text-secondary-bright'
              }`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/industries"
            className={({ isActive }) =>
              `text-sm font-medium px-2 py-1 border-b-2 ${
                isActive ? 'border-secondary-bright text-secondary-bright' : 'border-transparent text-primary-navy hover:text-secondary-bright'
              }`
            }
          >
            Industries
          </NavLink>
          <NavLink
            to="/team"
            className={({ isActive }) =>
              `text-sm font-medium px-2 py-1 border-b-2 ${
                isActive ? 'border-secondary-bright text-secondary-bright' : 'border-transparent text-primary-navy hover:text-secondary-bright'
              }`
            }
          >
            Team
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `text-sm font-medium px-2 py-1 border-b-2 ${
                isActive ? 'border-secondary-bright text-secondary-bright' : 'border-transparent text-primary-navy hover:text-secondary-bright'
              }`
            }
          >
            Blog
          </NavLink>
          <NavLink
            to="/q-hub"
            className={({ isActive }) =>
              `text-sm font-medium px-2 py-1 border-b-2 ${
                isActive ? 'border-secondary-bright text-secondary-bright' : 'border-transparent text-primary-navy hover:text-secondary-bright'
              }`
            }
          >
            Q Hub
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-sm font-medium px-2 py-1 border-b-2 ${
                isActive ? 'border-secondary-bright text-secondary-bright' : 'border-transparent text-primary-navy hover:text-secondary-bright'
              }`
            }
          >
            Contact
          </NavLink>

          <Link
            to="/login"
            className="ml-4 inline-flex items-center justify-center rounded-lg border border-secondary-bright px-5 py-2 text-sm font-semibold text-secondary-bright hover:bg-secondary-bright hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-tr from-secondary-bright to-accent-aqua px-5 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg transition"
          >
            Request a Demo
          </Link>
        </div>
      </nav>

      {isOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="max-w-content mx-auto px-6 py-4 flex flex-col gap-3">
            <NavLink to="/" onClick={() => setIsOpen(false)} className="text-sm font-medium text-primary-navy">
              Home
            </NavLink>
            <NavLink to="/why-qelyx" onClick={() => setIsOpen(false)} className="text-sm font-medium text-primary-navy">
              Why Qelyx
            </NavLink>
            <NavLink to="/services" onClick={() => setIsOpen(false)} className="text-sm font-medium text-primary-navy">
              Services
            </NavLink>
            <NavLink to="/industries" onClick={() => setIsOpen(false)} className="text-sm font-medium text-primary-navy">
              Industries
            </NavLink>
            <NavLink to="/team" onClick={() => setIsOpen(false)} className="text-sm font-medium text-primary-navy">
              Team
            </NavLink>
            <NavLink to="/blog" onClick={() => setIsOpen(false)} className="text-sm font-medium text-primary-navy">
              Blog
            </NavLink>
            <NavLink to="/q-hub" onClick={() => setIsOpen(false)} className="text-sm font-medium text-primary-navy">
              Q Hub
            </NavLink>
            <NavLink to="/contact" onClick={() => setIsOpen(false)} className="text-sm font-medium text-primary-navy">
              Contact
            </NavLink>
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-lg border border-secondary-bright px-4 py-2 text-sm font-semibold text-secondary-bright"
            >
              Login
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-lg bg-gradient-to-tr from-secondary-bright to-accent-aqua px-4 py-2 text-sm font-semibold text-white shadow-md"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

