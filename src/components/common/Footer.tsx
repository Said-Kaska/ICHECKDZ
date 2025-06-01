import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <img src="/dd.png" alt="ICHECKDZ" className="h-8 w-8" />
              <div className="ml-2 flex items-center">
                <span className="text-xl font-semibold text-[#D7262D]">I</span>
                <span className="text-xl font-semibold text-white">CHECK</span>
                <span className="text-xl font-semibold text-[#D7262D]">DZ</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Your trusted platform for IMEI verification and device management. Protect yourself from fraudulent devices.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/imei-check" className="text-gray-400 hover:text-blue-400 transition-colors">
                  IMEI Verification
                </Link>
              </li>
              <li>
                <Link to="/device-registration" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Device Registration
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Blacklist Checking
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Warranty Validation
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about-us" className="text-gray-400 hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/help/privacy-policy" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                <span>123 Verification St, Tech City, TC 10101</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-2" />
                <span>support@icheckdz.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} ICHECKDZ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;