import { Link } from 'react-router-dom';
import { ChevronLeft, Shield, AlertTriangle, UserCheck, FileText } from 'lucide-react';

const TermsOfServicePage = () => {
  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto">
        <Link to="/help" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Help Center
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Service Access and Usage</h2>
              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                  <div>
                    <p className="text-yellow-700">
                      Regular users can only check the IMEI status. Device registration and ownership transfers must be performed through authorized agents.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                By accessing our service, you agree to:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 mt-3">
                <li>Use the service only for legitimate purposes</li>
                <li>Provide accurate and truthful information</li>
                <li>Not attempt to bypass security measures</li>
                <li>Not use the service for any illegal activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Authorized Agents</h2>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <p className="text-blue-700">
                      Only authorized agents can register new devices or perform ownership transfers, after verifying the rightful owner's identity.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                Authorized agents must:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 mt-3">
                <li>Verify customer identity using valid government-issued ID</li>
                <li>Ensure all submitted information is accurate and complete</li>
                <li>Maintain confidentiality of customer information</li>
                <li>Follow all prescribed verification procedures</li>
                <li>Report any suspicious activities or fraud attempts</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex">
                  <UserCheck className="h-5 w-5 text-gray-600 mt-0.5 mr-3" />
                  <div>
                    <p className="text-gray-700">
                      Responsibility for the validity of the phone number and national ID lies with both the user and the agent.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">Users must:</p>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 mt-3">
                <li>Provide valid and current identification documents</li>
                <li>Report any unauthorized device registrations</li>
                <li>Keep account credentials secure</li>
                <li>Update personal information when it changes</li>
                <li>Use the service in compliance with local laws</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Legal Compliance</h2>
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <div className="flex">
                  <FileText className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                  <div>
                    <p className="text-green-700">
                      By using this service, you agree to comply with all consumer protection and data accuracy laws.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                Our service operates in accordance with:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 mt-3">
                <li>Algerian consumer protection laws</li>
                <li>Data protection regulations</li>
                <li>Electronic commerce regulations</li>
                <li>Anti-fraud legislation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Account Suspension</h2>
              <div className="bg-red-50 p-4 rounded-lg mb-6">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 mr-3" />
                  <div>
                    <p className="text-red-700">
                      The platform reserves the right to suspend any account found violating these terms or submitting false information.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                Accounts may be suspended for:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-gray-700 mt-3">
                <li>Providing false identification</li>
                <li>Attempting to register stolen devices</li>
                <li>Multiple failed verification attempts</li>
                <li>Suspicious activity patterns</li>
                <li>Violation of any terms of service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700">
                For questions about these terms or to report violations:
              </p>
              <div className="mt-3 text-gray-700">
                <p>Email: terms@icheckdz.com</p>
                <p>Phone: +213 123 456 789</p>
                <p>Address: 123 Legal Street, Algiers, Algeria</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;