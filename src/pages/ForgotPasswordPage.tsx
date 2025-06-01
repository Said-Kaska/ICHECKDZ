import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, FileText, User, AlertTriangle, CheckCircle } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const ForgotPasswordPage = () => {
  const [userType, setUserType] = useState<'regular' | 'agent' | null>(null);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    // Regular user fields
    fullName: '',
    phoneNumber: '',
    email: '',
    otp: '',
    
    // Agent fields
    businessRegistrationNumber: '',
    nationalId: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    otp: '',
    businessRegistrationNumber: '',
    nationalId: '',
    general: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validatePhoneNumber = (phone: string) => {
    return /^(\+213|0)(5|6|7)[0-9]{8}$/.test(phone);
  };

  const handleSendOTP = async () => {
    if (!validatePhoneNumber(formData.phoneNumber)) {
      setErrors(prev => ({
        ...prev,
        phoneNumber: 'Please enter a valid Algerian phone number'
      }));
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOtpSent(true);
      setCountdown(60);
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        general: 'Failed to send OTP. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const validateRegularUserForm = () => {
    const newErrors = {
      fullName: '',
      phoneNumber: '',
      otp: ''
    };

    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid Algerian phone number';
      isValid = false;
    }

    if (!otpSent || !formData.otp) {
      newErrors.otp = 'Please verify your phone number';
      isValid = false;
    }

    setErrors(prev => ({
      ...prev,
      ...newErrors
    }));

    return isValid;
  };

  const validateAgentForm = () => {
    const newErrors = {
      email: '',
      phoneNumber: '',
      businessRegistrationNumber: '',
      nationalId: ''
    };

    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid Algerian phone number';
      isValid = false;
    }

    if (!formData.businessRegistrationNumber.trim()) {
      newErrors.businessRegistrationNumber = 'Business registration number is required';
      isValid = false;
    }

    if (!formData.nationalId.trim()) {
      newErrors.nationalId = 'National ID is required';
      isValid = false;
    }

    setErrors(prev => ({
      ...prev,
      ...newErrors
    }));

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userType === 'regular' && !validateRegularUserForm()) {
      return;
    }

    if (userType === 'agent' && !validateAgentForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: 'Failed to process request. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const renderUserTypeSelection = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Select Account Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => setUserType('regular')}
          className={`p-6 border rounded-lg text-left hover:border-black transition-colors ${
            userType === 'regular' ? 'border-black bg-gray-50' : 'border-gray-200'
          }`}
        >
          <User className="h-8 w-8 mb-4" />
          <h3 className="text-lg font-medium mb-2">Regular User</h3>
          <p className="text-gray-600 text-sm">
            Reset password with phone verification
          </p>
        </button>

        <button
          onClick={() => setUserType('agent')}
          className={`p-6 border rounded-lg text-left hover:border-black transition-colors ${
            userType === 'agent' ? 'border-black bg-gray-50' : 'border-gray-200'
          }`}
        >
          <Building2 className="h-8 w-8 mb-4" />
          <h3 className="text-lg font-medium mb-2">Authorized Agent</h3>
          <p className="text-gray-600 text-sm">
            Reset password with business verification
          </p>
        </button>
      </div>
    </div>
  );

  const renderRegularUserForm = () => (
    <div className="space-y-6">
      <Input
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        error={errors.fullName}
        placeholder="Enter your full name"
      />

      <div className="space-y-4">
        <Input
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
          placeholder="+213 or 0"
          leftIcon={<Phone className="h-5 w-5" />}
        />

        <Button
          type="button"
          variant="outline"
          onClick={handleSendOTP}
          disabled={isLoading || (otpSent && countdown > 0)}
          isLoading={isLoading}
        >
          {otpSent
            ? countdown > 0
              ? `Resend in ${countdown}s`
              : 'Resend Code'
            : 'Send Verification Code'
          }
        </Button>
      </div>

      <Input
        label="Verification Code"
        name="otp"
        value={formData.otp}
        onChange={handleChange}
        error={errors.otp}
        placeholder="Enter 6-digit code"
        maxLength={6}
      />

      <Input
        label="Email (Optional)"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="your.email@example.com"
        leftIcon={<Mail className="h-5 w-5" />}
        helperText="Enter your email to receive reset instructions"
      />
    </div>
  );

  const renderAgentForm = () => (
    <div className="space-y-6">
      <Input
        label="Registered Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="your.email@example.com"
        leftIcon={<Mail className="h-5 w-5" />}
      />

      <Input
        label="Registered Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        error={errors.phoneNumber}
        placeholder="+213 or 0"
        leftIcon={<Phone className="h-5 w-5" />}
      />

      <Input
        label="Business Registration Number"
        name="businessRegistrationNumber"
        value={formData.businessRegistrationNumber}
        onChange={handleChange}
        error={errors.businessRegistrationNumber}
        placeholder="Enter business registration number"
        leftIcon={<FileText className="h-5 w-5" />}
      />

      <Input
        label="National ID"
        name="nationalId"
        value={formData.nationalId}
        onChange={handleChange}
        error={errors.nationalId}
        placeholder="Enter national ID number"
        leftIcon={<FileText className="h-5 w-5" />}
      />
    </div>
  );

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Request Received</h2>
            {userType === 'regular' ? (
              <p className="text-gray-600 mb-8">
                If an account exists with the provided information, you will receive password reset instructions via email or SMS.
              </p>
            ) : (
              <p className="text-gray-600 mb-8">
                We've received your reset request. Your identity will be verified by our support team within 1 to 24 hours. You will receive a reset link via email once verified.
              </p>
            )}
            <Link to="/login">
              <Button variant="black" fullWidth>
                Return to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
          <p className="mt-2 text-gray-600">
            We'll help you get back into your account
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!userType && renderUserTypeSelection()}
            {userType === 'regular' && renderRegularUserForm()}
            {userType === 'agent' && renderAgentForm()}

            {userType && (
              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setUserType(null)}
                  fullWidth
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="black"
                  isLoading={isLoading}
                  fullWidth
                >
                  Reset Password
                </Button>
              </div>
            )}

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <Link to="/login" className="font-medium text-black hover:text-gray-800">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;