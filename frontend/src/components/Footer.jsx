import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary-navy text-white py-12">
      <div className="max-w-content mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white via-[#2A6FF4] to-[#15d5d1] bg-clip-text text-transparent">
              Qelyx
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Modern data and insights consultancy helping organisations accelerate their digital and analytical maturity.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/why-qelyx" className="hover:text-white transition">Why Qelyx</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
              <li><Link to="/industries" className="hover:text-white transition">Industries</Link></li>
              <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/team" className="hover:text-white transition">Our Team</Link></li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/sudarshandamle" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 Qelyx. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


