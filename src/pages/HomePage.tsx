import { Link } from 'react-router-dom';
import { Smartphone, Shield, UserCheck, Search, ChevronRight } from 'lucide-react';
import Button from '../components/common/Button';

const HomePage = () => {
  return (
    <div>
      {/* Hero section */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0 relative">
              <img 
                src="/dd.png" 
                alt="ICHECK DZ" 
                className="absolute right-0 top-1/2 -translate-y-1/2 h-96 w-96 opacity-10 pointer-events-none"
              />
              <div className="relative z-10">
                <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                  Verify Device Authenticity with{' '}
                  <span className="inline-flex items-center">
                    <span className="text-[#D7262D]">I</span>
                    <span className="text-white">CHECK</span>
                    <span className="text-[#D7262D]">DZ</span>
                  </span>
                </h1>
                <p className="text-2xl mb-8 text-teal-100 max-w-xl">
                  Protect yourself from stolen or counterfeit devices. Check the IMEI status of any mobile device before you buy.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/imei-check">
                    <Button variant="black" size="lg">
                      Check IMEI Now
                    </Button>
                  </Link>
                  <Link to="/device-registration">
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                      Register Device
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-96 h-96 bg-teal-500 rounded-full absolute -top-6 -right-6 opacity-30"></div>
                <div className="w-72 h-72 bg-teal-400 rounded-full absolute -bottom-4 -left-4 opacity-20"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-xl">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col items-center p-4 bg-teal-50 rounded-lg">
                      <Search className="h-12 w-12 text-teal-500 mb-2" />
                      <span className="text-sm text-gray-700 font-medium text-center">IMEI Check</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-teal-50 rounded-lg">
                      <Shield className="h-12 w-12 text-teal-500 mb-2" />
                      <span className="text-sm text-gray-700 font-medium text-center">Device Security</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-teal-50 rounded-lg">
                      <Smartphone className="h-12 w-12 text-teal-500 mb-2" />
                      <span className="text-sm text-gray-700 font-medium text-center">Register Device</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-teal-50 rounded-lg">
                      <UserCheck className="h-12 w-12 text-teal-500 mb-2" />
                      <span className="text-sm text-gray-700 font-medium text-center">User Profile</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides comprehensive device verification services to protect buyers and sellers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">IMEI Verification</h3>
              <p className="text-gray-600 mb-4">
                Check if a device has been reported stolen, blacklisted, or has other issues before you purchase.
              </p>
              <Link to="/imei-check" className="text-teal-600 hover:text-teal-700 font-medium inline-flex items-center">
                Check IMEI
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Smartphone className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Device Registration</h3>
              <p className="text-gray-600 mb-4">
                Register your device in our database to help prevent theft and improve chances of recovery if stolen.
              </p>
              <Link to="/device-registration" className="text-teal-600 hover:text-teal-700 font-medium inline-flex items-center">
                Register Device
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Buyer Protection</h3>
              <p className="text-gray-600 mb-4">
                Get peace of mind when buying used devices with our comprehensive verification system.
              </p>
              <Link to="/help" className="text-teal-600 hover:text-teal-700 font-medium inline-flex items-center">
                Learn More
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-teal-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to verify your device?</h2>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto mb-8">
              Join thousands of users who protect themselves from fraudulent devices every day.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup">
                <Button variant="black" size="lg">
                  Create Account
                </Button>
              </Link>
              <Link to="/imei-check">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Check IMEI Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;