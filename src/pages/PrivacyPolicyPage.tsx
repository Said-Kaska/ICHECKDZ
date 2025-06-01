import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto">
        <Link to="/help" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Help Center
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700">
                ICHECKDZ ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our IMEI verification and device registration services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Personal Information</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li>Full name</li>
                <li>Phone number</li>
                <li>Email address</li>
                <li>National ID number (securely hashed)</li>
                <li>Business registration details (for service providers)</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">Device Information</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li>IMEI numbers</li>
                <li>Device brand and model</li>
                <li>Device registration status</li>
                <li>Ownership transfer history</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li>Verify device ownership and registration status</li>
                <li>Process ownership transfers</li>
                <li>Prevent fraud and unauthorized device sales</li>
                <li>Improve our services and user experience</li>
                <li>Communicate important updates and notifications</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700">
                We implement appropriate technical and organizational measures to protect your personal information:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 mt-3">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Secure hashing of National ID numbers</li>
                <li>Regular security audits and updates</li>
                <li>Strict access controls and authentication</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-700">
                You have the right to:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 mt-3">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing of your information</li>
                <li>Receive a copy of your information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy or our practices, please contact us at:
              </p>
              <div className="mt-3 text-gray-700">
                <p>Email: privacy@icheckdz.com</p>
                <p>Phone: +213 123 456 789</p>
                <p>Address: 123 Privacy Street, Algiers, Algeria</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;