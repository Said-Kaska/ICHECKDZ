import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Phone, FileText, Upload, AlertTriangle, CheckCircle } from 'lucide-react';
import { useDevice } from '../contexts/DeviceContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

interface DeviceInfo {
  id: string;
  imei: string;
  type: 'Phone' | 'Tablet' | 'Laptop';
  brand: string;
  model: string;
  owner: {
    name: string;
    phone: string;
  };
}

const mockDevices: DeviceInfo[] = [
  {
    id: '1',
    imei: '123456789012345',
    type: 'Phone',
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    owner: {
      name: 'Ahmed Benali',
      phone: '+213555123456'
    }
  },
  {
    id: '2',
    imei: '987654321098765',
    type: 'Phone',
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    owner: {
      name: 'Karim Medjadi',
      phone: '+213666789012'
    }
  }
];

const TransferOwnershipPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const [formData, setFormData] = useState({
    imei: '',
    newOwnerName: '',
    newOwnerPhone: '',
    otp: '',
    nationalId: '',
    proofOfSale: null as File | null
  });

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateImei = (imei: string) => {
    return /^\d{15}$/.test(imei);
  };

  const validatePhoneNumber = (phone: string) => {
    return /^(\+213|0)(5|6|7)[0-9]{8}$/.test(phone);
  };

  const handleImeiCheck = async () => {
    if (!validateImei(formData.imei)) {
      setError('Please enter a valid 15-digit IMEI number');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const device = mockDevices.find(d => d.imei === formData.imei);
      
      if (!device) {
        setError('Device not found or not registered in the system.');
        setDeviceInfo(null);
        return;
      }

      setDeviceInfo(device);
      setStep(2);
    } catch (err) {
      setError('Failed to verify IMEI. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = async () => {
    if (!validatePhoneNumber(formData.newOwnerPhone)) {
      setError('Please enter a valid Algerian phone number');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOtpSent(true);
      setCountdown(60);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        proofOfSale: file
      }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.newOwnerName || !formData.newOwnerPhone || !formData.nationalId) {
      setError('Please fill in all required fields');
      return;
    }

    if (!otpSent || !formData.otp) {
      setError('Please verify the phone number');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/profile/dashboard/devices');
      }, 3000);
    } catch (err) {
      setError('Failed to transfer ownership. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header text-center">
        <h1 className="page-title">Transfer Device Ownership</h1>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Transfer ownership of your registered device to a new owner
        </p>
      </div>

      <div className="max-w-2xl mx-auto mt-8">
        <div className="card p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -translate-y-1/2"></div>
              {[1, 2, 3].map((number) => (
                <div
                  key={number}
                  className={`relative flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    step >= number
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {number}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm font-medium text-gray-500">IMEI Check</span>
              <span className="text-sm font-medium text-gray-500">New Owner</span>
              <span className="text-sm font-medium text-gray-500">Confirm</span>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Transfer Successful</h3>
              <p className="mt-2 text-gray-500">
                The device ownership has been successfully transferred to the new owner.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {step === 1 && (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Enter Device IMEI</h2>
                    <p className="text-sm text-gray-600">
                      Enter the IMEI number of the device you want to transfer
                    </p>
                  </div>

                  <Input
                    label="IMEI Number"
                    placeholder="Enter 15-digit IMEI number"
                    value={formData.imei}
                    onChange={(e) => setFormData(prev => ({ ...prev, imei: e.target.value.replace(/\D/g, '') }))}
                    maxLength={15}
                    leftIcon={<Smartphone className="h-5 w-5" />}
                  />

                  <Button
                    onClick={handleImeiCheck}
                    isLoading={isLoading}
                    fullWidth
                  >
                    Verify IMEI
                  </Button>
                </>
              )}

              {step === 2 && deviceInfo && (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Device Information</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <dl className="grid grid-cols-1 gap-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">IMEI</dt>
                          <dd className="mt-1 text-sm text-gray-900">{deviceInfo.imei}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Device</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {deviceInfo.brand} {deviceInfo.model}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Current Owner</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {deviceInfo.owner.name} ({deviceInfo.owner.phone})
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Input
                      label="New Owner's Full Name"
                      value={formData.newOwnerName}
                      onChange={(e) => setFormData(prev => ({ ...prev, newOwnerName: e.target.value }))}
                      placeholder="Enter full name"
                    />

                    <Input
                      label="New Owner's Phone Number"
                      value={formData.newOwnerPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, newOwnerPhone: e.target.value }))}
                      placeholder="+213 or 0"
                      leftIcon={<Phone className="h-5 w-5" />}
                    />

                    <div className="flex space-x-4">
                      <Input
                        label="Verification Code"
                        value={formData.otp}
                        onChange={(e) => setFormData(prev => ({ ...prev, otp: e.target.value }))}
                        placeholder="Enter OTP"
                        disabled={!otpSent}
                      />
                      <Button
                        onClick={handleSendOTP}
                        disabled={isLoading || (otpSent && countdown > 0)}
                        className="self-end"
                      >
                        {otpSent && countdown > 0 ? `${countdown}s` : 'Send OTP'}
                      </Button>
                    </div>

                    <Input
                      label="National ID Number"
                      value={formData.nationalId}
                      onChange={(e) => setFormData(prev => ({ ...prev, nationalId: e.target.value }))}
                      placeholder="Enter national ID number"
                      leftIcon={<FileText className="h-5 w-5" />}
                    />
                    <div className="text-sm text-gray-500 -mt-4 mb-2">
                      📝 Note: If you've recently renewed your national ID card, make sure to enter the new number.
                      If the device is still registered under the old number, ownership verification may fail until records are updated.
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Proof of Sale (Optional)
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="proof-upload"
                              className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="proof-upload"
                                name="proof-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*,.pdf"
                                onChange={handleFileChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, PDF up to 10MB
                          </p>
                        </div>
                      </div>
                      {formData.proofOfSale && (
                        <p className="mt-2 text-sm text-gray-500">
                          Selected file: {formData.proofOfSale.name}
                        </p>
                      )}
                    </div>

                    <div className="flex space-x-4 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setStep(1)}
                        fullWidth
                      >
                        Back
                      </Button>
                      <Button
                        onClick={() => setStep(3)}
                        fullWidth
                        disabled={!formData.newOwnerName || !formData.newOwnerPhone || !formData.nationalId || !otpSent || !formData.otp}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {step === 3 && deviceInfo && (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Confirm Transfer</h2>
                    <p className="text-sm text-gray-600">
                      Please review the transfer details before confirming
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <dl className="grid grid-cols-1 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Device</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {deviceInfo.brand} {deviceInfo.model}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">IMEI</dt>
                        <dd className="mt-1 text-sm text-gray-900">{deviceInfo.imei}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Current Owner</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {deviceInfo.owner.name}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">New Owner</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {formData.newOwnerName}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">New Owner Phone</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {formData.newOwnerPhone}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                    <div className="flex">
                      <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 mr-3" />
                      <div>
                        <h3 className="text-sm font-medium text-yellow-800">
                          Important Notice
                        </h3>
                        <p className="mt-2 text-sm text-yellow-700">
                          By confirming this transfer, you acknowledge that:
                        </p>
                        <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside">
                          <li>You are the current legal owner of this device</li>
                          <li>The transfer cannot be undone</li>
                          <li>The new owner will have full control of the device registration</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep(2)}
                      fullWidth
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      isLoading={isLoading}
                      fullWidth
                    >
                      Confirm Transfer
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransferOwnershipPage;