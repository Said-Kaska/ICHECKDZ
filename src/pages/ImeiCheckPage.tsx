import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, AlertTriangle, CheckCircle, HelpCircle, MapPin, Phone, Lock } from 'lucide-react';
import { useDevice } from '../contexts/DeviceContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const ImeiCheckPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [imei, setImei] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [result, setResult] = useState<{
    imei: string;
    status: 'clean' | 'blacklisted' | 'unknown';
    details?: string;
  } | null>(null);
  const [error, setError] = useState('');
  
  const { verifyImei, verifyOwnership } = useDevice();
  const { isAuthenticated, user } = useAuth();
  const isAgent = user?.type === 'agent';

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (failedAttempts >= 3) {
      setIsBlocked(true);
      // Reset block after 30 minutes
      const timer = setTimeout(() => {
        setIsBlocked(false);
        setFailedAttempts(0);
      }, 30 * 60 * 1000);
      return () => clearTimeout(timer);
    }
  }, [failedAttempts]);

  const validateImei = (value: string) => {
    return /^\d{15}$/.test(value);
  };

  const validatePhoneNumber = (phone: string) => {
    return /^(\+213|0)(5|6|7)[0-9]{8}$/.test(phone);
  };

  const handleImeiSubmit = () => {
    setError('');
    if (!validateImei(imei)) {
      setError('Please enter a valid 15-digit IMEI number');
      return;
    }
    setStep(2);
  };

  const handleSendOTP = async () => {
    setError('');
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid Algerian phone number');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOtpSent(true);
      setCountdown(60);
      setStep(3);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError('');
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      setVerificationComplete(true);
      setStep(4);
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImeiCheck = async () => {
    if (isBlocked) {
      setError('Too many failed attempts. Please try again later.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await verifyImei(imei);
      setResult({
        imei: response.imei,
        status: response.result,
        details: getStatusDetails(response.result)
      });
    } catch (err) {
      setError('Failed to check IMEI. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOwnershipVerification = async () => {
    if (isBlocked) {
      setError('Too many failed attempts. Please try again later.');
      return;
    }

    if (!nationalId.trim()) {
      setError('Please enter the National ID');
      return;
    }

    setIsLoading(true);
    try {
      const isOwner = await verifyOwnership(imei, nationalId);
      if (!isOwner) {
        setFailedAttempts(prev => prev + 1);
        setError('The National ID does not match the registered owner.');
      }
    } catch (err) {
      setError('Failed to verify ownership. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusDetails = (status: 'clean' | 'blacklisted' | 'unknown') => {
    if (status === 'clean') {
      return isAgent 
        ? 'This device has not been reported as lost or stolen.'
        : 'This device has not been reported as lost or stolen. Please visit a verified agent for ownership transfer.';
    }
    
    if (status === 'blacklisted') {
      return 'This device has been reported as lost or stolen. Purchasing this device is not recommended.';
    }
    
    // Updated logic for unregistered devices
    return isAgent
      ? 'This device is not registered. You can register it now if you are the owner or have consent from the owner.'
      : 'This device is not registered in our system. Please visit a nearby authorized agent to register it.';
  };

  const renderUnregisteredDeviceActions = () => {
    if (isAgent) {
      return (
        <Link to="/device-registration" className="w-full">
          <Button fullWidth>
            Register This Device Now
          </Button>
        </Link>
      );
    }

    return (
      <Link to="/agents-map" className="w-full">
        <Button fullWidth>
          Find a trusted agent near you
        </Button>
      </Link>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Enter Device IMEI</h2>
              <p className="text-sm text-gray-600">
                You can find the IMEI by dialing *#06# on the device
              </p>
            </div>

            <Input
              label="IMEI Number"
              placeholder="Enter 15-digit IMEI number"
              value={imei}
              onChange={(e) => setImei(e.target.value.replace(/\D/g, ''))}
              maxLength={15}
              error={error}
              leftIcon={<Search className="h-5 w-5" />}
            />

            <Button
              onClick={handleImeiSubmit}
              fullWidth
            >
              Continue
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Phone Verification Required</h2>
              <p className="text-sm text-gray-600">
                Please verify your phone number to proceed
              </p>
            </div>

            <Input
              label="Phone Number"
              placeholder="+213 or 0"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              error={error}
              leftIcon={<Phone className="h-5 w-5" />}
            />

            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                fullWidth
              >
                Back
              </Button>
              <Button
                onClick={handleSendOTP}
                isLoading={isLoading}
                fullWidth
              >
                Send OTP
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Verify Phone Number</h2>
              <p className="text-sm text-gray-600">
                Enter the verification code sent to {phoneNumber}
              </p>
            </div>

            <Input
              label="Verification Code"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              maxLength={6}
              error={error}
              leftIcon={<Lock className="h-5 w-5" />}
            />

            {countdown > 0 && (
              <p className="text-sm text-gray-600">
                Resend code in {countdown}s
              </p>
            )}

            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                fullWidth
              >
                Back
              </Button>
              <Button
                onClick={handleVerifyOTP}
                isLoading={isLoading}
                fullWidth
              >
                Verify Code
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">IMEI Check</h2>
              <p className="text-sm text-gray-600">
                Phone number verified successfully. You can now check the IMEI status.
              </p>
            </div>

            <Button
              onClick={handleImeiCheck}
              isLoading={isLoading}
              fullWidth
              disabled={!verificationComplete}
            >
              Check IMEI Status
            </Button>

            {result && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  {result.status === 'clean' && <CheckCircle className="h-12 w-12 text-green-500" />}
                  {result.status === 'blacklisted' && <AlertTriangle className="h-12 w-12 text-red-500" />}
                  {result.status === 'unknown' && <HelpCircle className="h-12 w-12 text-yellow-500" />}
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">
                      IMEI: {result.imei}
                    </h3>
                    <p className={`
                      ${result.status === 'clean' ? 'text-green-600' : ''}
                      ${result.status === 'blacklisted' ? 'text-red-600' : ''}
                      ${result.status === 'unknown' ? 'text-yellow-600' : ''}
                    `}>
                      Status: {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                    </p>
                  </div>
                </div>

                <div className={`
                  p-4 rounded-lg
                  ${result.status === 'clean' ? 'bg-green-50' : ''}
                  ${result.status === 'blacklisted' ? 'bg-red-50' : ''}
                  ${result.status === 'unknown' ? 'bg-yellow-50' : ''}
                `}>
                  <p className="text-gray-800">
                    {result.details}
                  </p>
                </div>

                {result.status === 'clean' && (
                  <div className="space-y-4">
                    <Input
                      label="National ID"
                      placeholder="Enter National ID to verify ownership"
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                      error={error}
                    />
                    <div className="text-sm text-gray-500 -mt-4 mb-2">
                      📝 Note: If you've recently renewed your national ID card, make sure to enter the new number.
                      If the device is still registered under the old number, ownership verification may fail until records are updated.
                    </div>
                    <Button
                      onClick={handleOwnershipVerification}
                      isLoading={isLoading}
                      fullWidth
                      disabled={isBlocked}
                    >
                      Verify Ownership
                    </Button>

                    {isAgent && (
                      <div className="flex space-x-4">
                        <Link to="/device-registration" className="w-full">
                          <Button variant="outline" fullWidth>
                            Register Device
                          </Button>
                        </Link>
                        <Link to={`/transfer-ownership?imei=${result.imei}`} className="w-full">
                          <Button variant="outline" fullWidth>
                            Transfer Ownership
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {result.status === 'unknown' && (
                  <div className="mt-4">
                    {renderUnregisteredDeviceActions()}
                  </div>
                )}

                {isBlocked && (
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
                      <div>
                        <p className="text-red-700 font-medium">Too many failed attempts</p>
                        <p className="text-red-600 text-sm mt-1">
                          Please try again later or contact support for assistance.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <div className="page-header text-center">
        <h1 className="page-title">IMEI Verification</h1>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Check if a device has been reported as lost, stolen, or has other issues before you make a purchase.
        </p>
      </div>

      <div className="max-w-lg mx-auto mt-8">
        <div className="card p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default ImeiCheckPage;