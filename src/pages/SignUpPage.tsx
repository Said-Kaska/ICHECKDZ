import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Phone, Mail, FileText, Upload, AlertTriangle, Calendar, MapPin, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();
  const [userType, setUserType] = useState<'regular' | 'agent' | null>(null);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const [formData, setFormData] = useState({
    // Regular user fields
  fullName: "",
  phoneNumber: "",
  email: "",
  password: "",
  confirmPassword: "",
  businessFile: null as File | null,
  otp: "",
    
    // Agent fields
    businessName: '',
    businessRegistrationNumber: '',
    businessAddress: '',
    nationalId: '',
    placeOfResidence: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    commercialRegisterFile: null as File | null,
     password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    nationalId: '',
    placeOfResidence: '',
    dateOfBirth: '',
    placeOfBirth: '',
    phoneNumber: '',
    email: '',
    otp: '',
    businessName: '',
    businessRegistrationNumber: '',
    businessAddress: '',
    password: '',
    confirmPassword: '',
    acceptTerms: '',
    commercialRegisterFile: '',
    general: ''
  });

  // Redirect if already logged in
  if (isAuthenticated) {
    navigate('/profile');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        commercialRegisterFile: file
      }));
      setErrors(prev => ({
        ...prev,
        commercialRegisterFile: ''
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
      nationalId: '',
      placeOfResidence: '',
      dateOfBirth: '',
      placeOfBirth: '',
      phoneNumber: '',
      otp: ''
    };

    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!formData.nationalId.trim()) {
      newErrors.nationalId = 'National ID is required';
      isValid = false;
    }

    if (!formData.placeOfResidence.trim()) {
      newErrors.placeOfResidence = 'Place of residence is required';
      isValid = false;
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
      isValid = false;
    }

    if (!formData.placeOfBirth.trim()) {
      newErrors.placeOfBirth = 'Place of birth is required';
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
      fullName: '',
      businessName: '',
      businessRegistrationNumber: '',
      businessAddress: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: '',
      commercialRegisterFile: ''
    };

    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
      isValid = false;
    }

    if (!formData.businessRegistrationNumber.trim()) {
      newErrors.businessRegistrationNumber = 'Business registration number is required';
      isValid = false;
    }

    if (!formData.businessAddress.trim()) {
      newErrors.businessAddress = 'Business address is required';
      isValid = false;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid Algerian phone number';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!/^(?=.*[A-Za-z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with one letter and one symbol';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the Terms of Service and Privacy Policy';
      isValid = false;
    }

    if (!formData.commercialRegisterFile) {
      newErrors.commercialRegisterFile = 'Commercial Register File is required';
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
      await signup(formData.fullName, formData.email || formData.phoneNumber, formData.password);
      navigate('/profile');
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: 'Registration failed. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const renderUserTypeSelection = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Choose Account Type</h2>
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
            For individuals who want to check device status and manage their own devices
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
            For businesses that provide device registration and verification services
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

      <Input
        label="National ID Number"
        name="nationalId"
        value={formData.nationalId}
        onChange={handleChange}
        error={errors.nationalId}
        placeholder="Enter your national ID number"
        leftIcon={<FileText className="h-5 w-5" />}
      />

      <Input
        label="Place of Residence"
        name="placeOfResidence"
        value={formData.placeOfResidence}
        onChange={handleChange}
        error={errors.placeOfResidence}
        placeholder="Enter your current address"
        leftIcon={<MapPin className="h-5 w-5" />}
      />

      <Input
        label="Date of Birth"
        name="dateOfBirth"
        type="date"
        value={formData.dateOfBirth}
        onChange={handleChange}
        error={errors.dateOfBirth}
        leftIcon={<Calendar className="h-5 w-5" />}
      />

      <Input
        label="Place of Birth"
        name="placeOfBirth"
        value={formData.placeOfBirth}
        onChange={handleChange}
        error={errors.placeOfBirth}
        placeholder="Enter your place of birth"
        leftIcon={<MapPin className="h-5 w-5" />}
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
      />
    </div>
  );

  const renderAgentForm = () => (
    <div className="space-y-6">
      <Input
        label="Responsible Person Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        error={errors.fullName}
        placeholder="Enter full name"
      />

      <Input
        label="Business Name"
        name="businessName"
        value={formData.businessName}
        onChange={handleChange}
        error={errors.businessName}
        placeholder="Enter your business name"
        leftIcon={<Building2 className="h-5 w-5" />}
      />

      <Input
        label="Business Registration Number"
        name="businessRegistrationNumber"
        value={formData.businessRegistrationNumber}
        onChange={handleChange}
        error={errors.businessRegistrationNumber}
        placeholder="Enter business registration number"
      />

      <Input
        label="Business Address"
        name="businessAddress"
        value={formData.businessAddress}
        onChange={handleChange}
        error={errors.businessAddress}
        placeholder="Enter business address"
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
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="your.email@example.com"
        leftIcon={<Mail className="h-5 w-5" />}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        helperText="Must be at least 8 characters with one letter and one symbol"
      />

      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Commercial Register File
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="commercial-register-upload"
                className="relative cursor-pointer rounded-md font-medium text-black hover:text-gray-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black"
              >
                <span>Upload file</span>
                <input
                  id="commercial-register-upload"
                  name="commercial-register-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              PDF or image up to 10MB
            </p>
          </div>
        </div>
        {formData.commercialRegisterFile && (
          <p className="mt-2 text-sm text-gray-500">
            Selected file: {formData.commercialRegisterFile.name}
          </p>
        )}
        {errors.commercialRegisterFile && (
          <p className="mt-1 text-sm text-red-600">{errors.commercialRegisterFile}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          id="acceptTerms"
          name="acceptTerms"
          type="checkbox"
          checked={formData.acceptTerms}
          onChange={handleCheckboxChange}
          className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
        />
        <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
          I agree to the{' '}
          <button
            type="button"
            onClick={() => setShowTermsModal(true)}
            className="font-medium text-black hover:text-gray-800 underline"
          >
            Terms of Service
          </button>
          {' '}and{' '}
          <button
            type="button"
            onClick={() => setShowPrivacyModal(true)}
            className="font-medium text-black hover:text-gray-800 underline"
          >
            Privacy Policy
          </button>
        </label>
      </div>
      {errors.acceptTerms && (
        <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Account</h1>
          <p className="mt-2 text-gray-600">Join our device verification network</p>
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
                  Create Account
                </Button>
              </div>
            )}

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-black hover:text-gray-800">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Terms of Service Modal */}
        <Modal
          isOpen={showTermsModal}
          onClose={() => setShowTermsModal(false)}
          title="Terms of Service"
        >
          <div className="prose prose-sm max-w-none">
            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-2">1. Service Access and Usage</h3>
              <p>Regular users can only check the IMEI status. Device registration and ownership transfers must be performed through authorized agents.</p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-2">2. Authorized Agents</h3>
              <p>Only authorized agents can register new devices or perform ownership transfers, after verifying the rightful owner's identity.</p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-2">3. User Responsibilities</h3>
              <p>Responsibility for the validity of the phone number and national ID lies with both the user and the agent.</p>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-2">4. Legal Compliance</h3>
              <p>By using this service, you agree to comply with all consumer protection and data accuracy laws.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">5. Account Suspension</h3>
              <p>The platform reserves the right to suspend any account found violating these terms or submitting false information.</p>
            </section>
          </div>
        </Modal>

        {/* Privacy Policy Modal */}
        <Modal
          isOpen={showPrivacyModal}
          onClose={() => setShowPrivacyModal(false)}
          title="Privacy Policy"
        >
          <div className="prose prose-sm max-w-none">
            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Information We Collect</h3>
              <ul className="list-disc pl-5">
                <li>Full name</li>
                <li>Phone number</li>
                <li>Email address</li>
                <li>National ID number (securely hashed)</li>
                <li>Business registration details (for service providers)</li>
              </ul>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-2">How We Use Your Information</h3>
              <ul className="list-disc pl-5">
                <li>Verify device ownership and registration status</li>
                <li>Process ownership transfers</li>
                <li>Prevent fraud and unauthorized device sales</li>
                <li>Improve our services and user experience</li>
              </ul>
            </section>

            <section className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Data Security</h3>
              <p>We implement appropriate technical and organizational measures to protect your personal information.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2">Your Rights</h3>
              <p>You have the right to access, correct, or delete your personal information at any time.</p>
            </section>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SignUpPage;