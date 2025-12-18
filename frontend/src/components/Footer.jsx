import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0f1625] text-white py-12 border-t border-[rgba(255,255,255,0.1)]">
      <div className="max-w-content mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#00d9ff] via-[#00b8d4] to-[#6366f1] bg-clip-text text-transparent">
                Qelyx
              </span>
            </h3>
            <p className="text-body-small text-[#a0aec0] leading-relaxed max-w-md">
              Modern data and insights consultancy helping organisations accelerate their digital and analytical maturity.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-body-small text-[#a0aec0]">
              <li><Link to="/why-qelyx" className="hover:text-[#00d9ff] transition-colors">Why Qelyx</Link></li>
              <li><Link to="/services" className="hover:text-[#00d9ff] transition-colors">Services</Link></li>
              <li><Link to="/industries" className="hover:text-[#00d9ff] transition-colors">Industries</Link></li>
              <li><Link to="/blog" className="hover:text-[#00d9ff] transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Connect</h4>
            <ul className="space-y-2 text-body-small text-[#a0aec0]">
              <li><Link to="/contact" className="hover:text-[#00d9ff] transition-colors">Contact Us</Link></li>
              <li><Link to="/team" className="hover:text-[#00d9ff] transition-colors">Our Team</Link></li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/sudarshandamle" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#00d9ff] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[rgba(255,255,255,0.1)] mt-8 pt-8 text-center text-body-small text-[#718096]">
          <p>&copy; 2026 Qelyx. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;




