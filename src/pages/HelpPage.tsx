import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  HelpCircle, 
  Mail, 
  Phone, 
  Shield, 
  Smartphone,
  ArrowLeftRight,
  DollarSign,
  Crown,
  FileText
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
  category: string;
}

const HelpPage = () => {
  const { isAuthenticated } = useAuth();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRankInfo, setShowRankInfo] = useState(false);
  
  const faqItems: FAQItem[] = [
    {
      category: 'IMEI Verification',
      question: 'Why should I check an IMEI before buying a used phone?',
      answer: (
        <div className="space-y-3">
          <p>Checking an IMEI before purchasing a used device is crucial to protect yourself from:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Blacklisted devices that may be blocked by carriers</li>
            <li>Stolen phones that could be reported and disabled</li>
            <li>Cloned devices with duplicate IMEI numbers</li>
            <li>Counterfeit products that may not work as expected</li>
          </ul>
          <p>
            A clean IMEI check ensures that the device is legitimate and safe to purchase.
          </p>
        </div>
      )
    },
    {
      category: 'Device Registration',
      question: 'How do I register my device?',
      answer: (
        <div className="space-y-3">
          <p>To register your device, you'll need to provide:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Device type (Phone, Tablet, Laptop)</li>
            <li>Brand and model information</li>
            <li>IMEI number (15 digits)</li>
            <li>Device condition (New/Used)</li>
          </ul>
          <p className="font-medium mt-4">For new devices, additional requirements:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Purchase invoice (PDF or image)</li>
            <li>Box image showing IMEI number</li>
          </ul>
          <div className="mt-4">
            <Link to="/device-registration">
              <Button variant="black">Register Your Device</Button>
            </Link>
          </div>
        </div>
      )
    },
    {
      category: 'Ownership Transfer',
      question: 'Why is Ownership Transfer important?',
      answer: (
        <div className="space-y-3">
          <p>Ownership transfer provides several key benefits:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Legal clarity on device ownership</li>
            <li>Protection for both buyer and seller</li>
            <li>Clear record of ownership history</li>
            <li>Easier recovery if device is lost or stolen</li>
          </ul>
          <p className="font-medium mt-4">When to transfer ownership:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>After selling your device</li>
            <li>When giving away or donating a device</li>
            <li>When changing ownership within a business</li>
          </ul>
          <p className="mt-4 text-gray-700">
            Requirements: Device must have a clean status and the original owner's National ID must be verified.
          </p>
        </div>
      )
    },
    {
      category: 'Registration Process',
      question: 'Who can register a device?',
      answer: (
        <div className="space-y-3">
          <p>Device registration must be done through approved intermediaries:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Authorized mobile stores</li>
            <li>Registered internet cafés</li>
            <li>Certified agents</li>
            <li>Licensed service centers</li>
          </ul>
          <p className="mt-4 text-gray-700">
            This requirement ensures proper verification and helps prevent fraudulent registrations.
          </p>
        </div>
      )
    },
    {
      category: 'Platform Overview',
      question: 'How does the platform work?',
      answer: (
        <div className="space-y-3">
          <p>Our platform offers comprehensive device management services:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>IMEI verification against global databases</li>
            <li>Secure device registration system</li>
            <li>Ownership transfer management</li>
            <li>Real-time status tracking</li>
            <li>Integration with law enforcement databases</li>
          </ul>
          <p className="mt-4 text-gray-700">
            All services are designed to ensure device authenticity and protect users from fraud.
          </p>
        </div>
      )
    },
    {
      category: 'Credits & Ranks',
      question: 'How do credits and ranks work?',
      answer: (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">User Ranks</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Basic</span>
                <span className="text-gray-600">0-500 credits</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Premium</span>
                <span className="text-gray-600">501-750 credits (10% off)</span>
              </div>
              <div className="flex justify-between items-center">
                <span>VIP</span>
                <span className="text-gray-600">751-1000 credits (20% off)</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Enterprise</span>
                <span className="text-gray-600">1001+ credits (30% off)</span>
              </div>
            </div>
          </div>
          <p className="text-gray-700">
            Your rank is automatically determined by the total number of credits you've used.
            Higher ranks unlock better discounts on all services.
          </p>
          <div className="flex items-center mt-4">
            <Link to="/profile/credit-balance">
              <Button variant="black">View Credit Balance</Button>
            </Link>
          </div>
        </div>
      )
    }
  ];
  
  const filteredFAQs = searchQuery
    ? faqItems.filter(item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (typeof item.answer === 'string' && item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : faqItems;

  const groupedFAQs = filteredFAQs.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, FAQItem[]>);
  
  return (
    <div className="page-container">
      <div className="page-header text-center">
        <h1 className="page-title">Help & Support</h1>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions and learn how to make the most of our device verification service.
        </p>
      </div>

      {/* Quick Links */}
      <div className="max-w-3xl mx-auto mt-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            to="/help/privacy-policy"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-teal-500 transition-colors"
          >
            <div className="flex items-center">
              <div className="bg-teal-100 p-3 rounded-full mr-4">
                <FileText className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Privacy Policy</h3>
                <p className="text-sm text-gray-600">Learn how we protect your data</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/terms"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-teal-500 transition-colors"
          >
            <div className="flex items-center">
              <div className="bg-teal-100 p-3 rounded-full mr-4">
                <Shield className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Terms of Service</h3>
                <p className="text-sm text-gray-600">Review our terms and conditions</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Search bar */}
      <div className="max-w-3xl mx-auto mt-8 mb-12">
        <div className="relative">
          <Input
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="h-5 w-5" />}
          />
        </div>
      </div>
      
      {/* FAQ sections */}
      <div className="max-w-3xl mx-auto mb-12">
        {Object.entries(groupedFAQs).length > 0 ? (
          Object.entries(groupedFAQs).map(([category, items]) => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">{category}</h2>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      className="w-full flex justify-between items-center p-4 text-left font-medium hover:bg-gray-50 focus:outline-none"
                      onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    >
                      <span>{item.question}</span>
                      {activeIndex === index ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    
                    {activeIndex === index && (
                      <div className="p-4 bg-gray-50 border-t border-gray-200">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any FAQ entries matching your search.
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchQuery('')}
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
      
      {/* Contact section */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Need Support?</h2>
          <p className="text-blue-700 mb-6">
            If you couldn't find the answer you're looking for, our support team is ready to assist you.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Email Support</p>
                <p className="font-medium">support@icheckdz.com</p>
              </div>
            </div>
            
            {isAuthenticated && (
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Phone Support</p>
                  <p className="font-medium">+213 123 456 789</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;