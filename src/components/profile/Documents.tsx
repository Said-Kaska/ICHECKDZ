import { useState } from 'react';
import { FileText, Upload, Check, X, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';

const Documents = () => {
  const { user, updateUser } = useAuth();
  
  const [nationalIdUploaded, setNationalIdUploaded] = useState(user?.hasNationalId || false);
  const [businessRegUploaded, setBusinessRegUploaded] = useState(user?.hasBusinessRegistration || false);
  const [uploading, setUploading] = useState<string | null>(null);
  
  const handleFileUpload = async (documentType: 'nationalId' | 'businessReg') => {
    setUploading(documentType);
    
    // Simulate file upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (documentType === 'nationalId') {
      setNationalIdUploaded(true);
      updateUser({ hasNationalId: true });
    } else {
      setBusinessRegUploaded(true);
      updateUser({ hasBusinessRegistration: true });
    }
    
    setUploading(null);
  };
  
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Documents</h1>
        <p className="text-gray-600 mt-2">
          Upload and manage your verification documents
        </p>
      </div>
      
      <div className="mt-8 space-y-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-blue-600 mr-4 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium text-blue-800 mb-2">Why We Need Your Documents</h3>
              <p className="text-blue-700 mb-2">
                To ensure the integrity of our platform and provide enhanced security features, we require verification of your identity.
              </p>
              <ul className="list-disc text-blue-700 ml-6 mb-2">
                <li>National ID or Passport is required for all users</li>
                <li>Business Registration is required for business accounts only</li>
                <li>Documents will be reviewed within 24-48 hours</li>
              </ul>
              <p className="text-blue-700">
                Your documents are stored securely and handled according to our privacy policy.
              </p>
            </div>
          </div>
        </div>
        
        {/* National ID */}
        <div className="card">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">National ID</h2>
              <p className="text-gray-600">
                Upload a clear copy of your national ID card or passport
              </p>
            </div>
          </div>
          
          {nationalIdUploaded ? (
            <div className="bg-green-50 p-4 rounded-lg mb-6 flex items-center">
              <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-800">Document Uploaded</p>
                <p className="text-sm text-green-700">Your national ID has been verified.</p>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-6">
              <div className="flex justify-center mb-4">
                <Upload className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Drag and drop your file here
              </p>
              <p className="text-gray-500 mb-6">
                Supported formats: JPG, PNG, PDF (max 5MB)
              </p>
              <Button
                variant="outline"
                onClick={() => handleFileUpload('nationalId')}
                isLoading={uploading === 'nationalId'}
              >
                Browse Files
              </Button>
            </div>
          )}
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Requirements:</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Both sides of ID must be visible
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                All corners must be visible
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Text must be clearly readable
              </li>
              <li className="flex items-center">
                <X className="h-4 w-4 text-red-600 mr-2" />
                No blurry images or partial scans
              </li>
            </ul>
          </div>
        </div>
        
        {/* Business Registration */}
        <div className="card">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Business Registration</h2>
              <p className="text-gray-600">
                Upload your business registration certificate
              </p>
            </div>
          </div>
          
          {businessRegUploaded ? (
            <div className="bg-green-50 p-4 rounded-lg mb-6 flex items-center">
              <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-800">Document Uploaded</p>
                <p className="text-sm text-green-700">Your business registration has been verified.</p>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-6">
              <div className="flex justify-center mb-4">
                <Upload className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Drag and drop your file here
              </p>
              <p className="text-gray-500 mb-6">
                Supported formats: JPG, PNG, PDF (max 10MB)
              </p>
              <Button
                variant="outline"
                onClick={() => handleFileUpload('businessReg')}
                isLoading={uploading === 'businessReg'}
              >
                Browse Files
              </Button>
            </div>
          )}
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Requirements:</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Document must show company name and registration number
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Document must be issued by an official government body
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                Document must be current and not expired
              </li>
              <li className="flex items-center">
                <X className="h-4 w-4 text-red-600 mr-2" />
                Invoices or unofficial documents are not accepted
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;