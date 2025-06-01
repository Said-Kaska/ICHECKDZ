import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Phone, Mail, FileText, Upload, AlertTriangle } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const ServiceProviderRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    activityCode: '',
    activityType: '',
    customActivityType: '',
    phoneNumber: '',
    email: '',
    businessAddress: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    nationalId: '',
    commercialRegisterNumber: '',
    commercialRegisterFile: null as File | null
  });

  const [errors, setErrors] = useState({
    fullName: '',
    businessName: '',
    activityCode: '',
    activityType: '',
    customActivityType: '',
    phoneNumber: '',
    email: '',
    businessAddress: '',
    password: '',
    confirmPassword: '',
    acceptTerms: '',
    nationalId: '',
    commercialRegisterNumber: '',
    commercialRegisterFile: '',
    general: ''
  });

  const activityTypes = [
    'Mobile Store',
    'Internet Café',
    'Maintenance',
    'Wholesaler',
    'Other'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
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

  const validateStep1 = () => {
    const newErrors = {
      fullName: '',
      businessName: '',
      activityCode: '',
      activityType: '',
      customActivityType: '',
      phoneNumber: '',
      email: '',
      businessAddress: '',
      password: '',
      confirmPassword: '',
      acceptTerms: ''
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

    if (!formData.activityCode.trim()) {
      newErrors.activityCode = 'Activity code is required';
      isValid = false;
    }

    if (!formData.activityType) {
      newErrors.activityType = 'Activity type is required';
      isValid = false;
    }

    if (formData.activityType === 'Other' && !formData.customActivityType.trim()) {
      newErrors.customActivityType = 'Please specify activity type';
      isValid = false;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^(\+213|0)(5|6|7)[0-9]{8}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid Algerian phone number';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.businessAddress.trim()) {
      newErrors.businessAddress = 'Business address is required';
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
      newErrors.acceptTerms = 'You must accept the Terms of Service';
      isValid = false;
    }

    setErrors(prev => ({
      ...prev,
      ...newErrors
    }));

    return isValid;
  };

  const validateStep2 = () => {
    const newErrors = {
      nationalId: '',
      commercialRegisterNumber: '',
      commercialRegisterFile: ''
    };

    let isValid = true;

    if (!formData.nationalId.trim()) {
      newErrors.nationalId = 'National ID is required';
      isValid = false;
    }

    if (!formData.commercialRegisterNumber.trim()) {
      newErrors.commercialRegisterNumber = 'Commercial Register Number is required';
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

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setStep(1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/dashboard');
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: 'Registration failed. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Service Provider Registration</h1>
          <p className="mt-2 text-gray-600">Join our network of digital service providers</p>
        </div>

        {/* Progress steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -translate-y-1/2"></div>
            {[1, 2].map((number) => (
              <div
                key={number}
                className={`relative flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step >= number
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {number}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm font-medium text-gray-500">Account Info</span>
            <span className="text-sm font-medium text-gray-500">Business Verification</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                <Input
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  error={errors.fullName}
                  placeholder="Enter your full name"
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
                  label="Activity Code"
                  name="activityCode"
                  value={formData.activityCode}
                  onChange={handleChange}
                  error={errors.activityCode}
                  placeholder="Enter your activity code"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Activity Type
                  </label>
                  <select
                    name="activityType"
                    value={formData.activityType}
                    onChange={handleChange}
                    className={`
                      form-input
                      ${errors.activityType ? 'border-red-500' : 'border-gray-300'}
                    `}
                  >
                    <option value="">Select activity type</option>
                    {activityTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.activityType && (
                    <p className="mt-1 text-sm text-red-600">{errors.activityType}</p>
                  )}
                </div>

                {formData.activityType === 'Other' && (
                  <Input
                    label="Specify Activity Type"
                    name="customActivityType"
                    value={formData.customActivityType}
                    onChange={handleChange}
                    error={errors.customActivityType}
                    placeholder="Enter your activity type"
                  />
                )}

                <Input
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  error={errors.phoneNumber}
                  placeholder="+213 or 0"
                  leftIcon={<Phone className="h-5 w-5" />}
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
                  label="Business Address"
                  name="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleChange}
                  error={errors.businessAddress}
                  placeholder="Enter your business address"
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
                    <a href="#" className="font-medium text-black hover:text-gray-800">
                      Terms of Service
                    </a>
                  </label>
                </div>
                {errors.acceptTerms && (
                  <p className="text-sm text-red-600">{errors.acceptTerms}</p>
                )}

                <Button
                  type="button"
                  onClick={handleNext}
                  variant="black"
                  fullWidth
                >
                  Next
                </Button>
              </>
            ) : (
              <>
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
                  label="Commercial Register Number"
                  name="commercialRegisterNumber"
                  value={formData.commercialRegisterNumber}
                  onChange={handleChange}
                  error={errors.commercialRegisterNumber}
                  placeholder="Enter your commercial register number"
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
                    <p className="mt-2 text-sm text-gray-600">
                      Selected file: {formData.commercialRegisterFile.name}
                    </p>
                  )}
                  {errors.commercialRegisterFile && (
                    <p className="mt-1 text-sm text-red-600">{errors.commercialRegisterFile}</p>
                  )}
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
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
                    Complete Registration
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderRegistration;