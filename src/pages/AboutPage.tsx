import { Shield, Users, Map, Target } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto">
        {/* Hero section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About ICHECKDZ</h1>
          <p className="text-xl text-gray-600">
            Enhancing security and transparency in Algeria's smartphone market
          </p>
        </div>

        {/* Main content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <strong>ICHECKDZ</strong> is an Algerian digital platform designed to enhance security 
              and transparency in the smartphone market. We offer reliable tools to verify device 
              authenticity via IMEI, register ownership, and legally transfer ownership in a simple, 
              secure process.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="flex items-start">
                <div className="bg-teal-100 p-3 rounded-lg mr-4">
                  <Shield className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Mission</h3>
                  <p className="text-gray-600">
                    To reduce mobile fraud, protect buyers from stolen or fake devices, and support 
                    a more transparent digital ecosystem across Algeria.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-teal-100 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Team</h3>
                  <p className="text-gray-600">
                    ICHECKDZ is backed by a growing team of developers, designers, legal advisors, 
                    and local partners, united by one goal: providing trustworthy mobile services.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-teal-100 p-3 rounded-lg mr-4">
                  <Map className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Geographic Coverage</h3>
                  <p className="text-gray-600">
                    We aim to serve users across all 58 wilayas, actively onboarding official agents 
                    and partners in each region to ensure wide accessibility and reliable support.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-teal-100 p-3 rounded-lg mr-4">
                  <Target className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Vision</h3>
                  <p className="text-gray-600">
                    To become Algeria's leading reference for mobile device legitimacy and ownership 
                    verification, with future plans to integrate with national services.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics section */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl shadow-lg p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">58</div>
                <div className="text-teal-100">Wilayas Covered</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-teal-100">Service Availability</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-teal-100">Secure Verification</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;