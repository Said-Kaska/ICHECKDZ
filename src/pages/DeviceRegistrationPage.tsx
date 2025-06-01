import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Upload, Phone, FileText, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useDevice } from '../contexts/DeviceContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import modelOptions from '../data/modelOptions';

const DeviceRegistrationPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addDevice } = useDevice();
  
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    otp: '',
    nationalId: '',
    deviceType: '',
    brand: '',
    customBrand: '',
    model: '',
    customModel: '',
    imeiSerial: '',
    condition: '',
    purchaseInvoice: null as File | null,
    boxImage: null as File | null
  });
  
  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
    otp: '',
    nationalId: '',
    deviceType: '',
    brand: '',
    customBrand: '',
    model: '',
    customModel: '',
    imeiSerial: '',
    condition: '',
    purchaseInvoice: '',
    boxImage: '',
    general: ''
  });
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);
  
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
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'purchaseInvoice' | 'boxImage') => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: file
      }));
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
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
    await new Promise(resolve => setTimeout(resolve, 1500));
    setOtpSent(true);
    setCountdown(60);
    setIsLoading(false);
  };
  
  const validateStep1 = () => {
    const newErrors = {
      fullName: '',
      phoneNumber: '',
      otp: '',
      nationalId: ''
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
    
    if (!otpSent) {
      newErrors.otp = 'Please verify your phone number';
      isValid = false;
    } else if (!formData.otp) {
      newErrors.otp = 'Please enter the verification code';
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
  
  const validateStep2 = () => {
    const newErrors = {
      deviceType: '',
      brand: '',
      customBrand: '',
      model: '',
      customModel: '',
      imeiSerial: '',
      condition: ''
    };
    
    let isValid = true;
    
    if (!formData.deviceType) {
      newErrors.deviceType = 'Please select device type';
      isValid = false;
    }
    
    if (!formData.brand) {
      newErrors.brand = 'Please select brand';
      isValid = false;
    }
    
    if (formData.brand === 'Other' && !formData.customBrand.trim()) {
      newErrors.customBrand = 'Please enter brand name';
      isValid = false;
    }
    
    if (!formData.model && formData.deviceType !== 'Laptop') {
      newErrors.model = 'Please select model';
      isValid = false;
    }
    
    if ((formData.deviceType === 'Laptop' || formData.model === 'Other') && !formData.customModel.trim()) {
      newErrors.customModel = 'Please enter model name';
      isValid = false;
    }
    
    if (!formData.imeiSerial.trim()) {
      newErrors.imeiSerial = `Please enter ${formData.deviceType === 'Laptop' ? 'serial number' : 'IMEI'}`;
      isValid = false;
    }
    
    if (!formData.condition) {
      newErrors.condition = 'Please select device condition';
      isValid = false;
    }
    
    setErrors(prev => ({
      ...prev,
      ...newErrors
    }));
    
    return isValid;
  };
  
  const validateStep3 = () => {
    const newErrors = {
      purchaseInvoice: '',
      boxImage: ''
    };
    
    let isValid = true;
    
    if (formData.condition === 'New') {
      if (!formData.purchaseInvoice) {
        newErrors.purchaseInvoice = 'Please upload purchase invoice';
        isValid = false;
      }
      
      if (!formData.boxImage) {
        newErrors.boxImage = 'Please upload box image';
        isValid = false;
      }
    }
    
    setErrors(prev => ({
      ...prev,
      ...newErrors
    }));
    
    return isValid;
  };
  
  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };
  
  const handleBack = () => {
    setStep(prev => prev - 1);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep3()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      addDevice({
        brand: formData.brand === 'Other' ? formData.customBrand : formData.brand,
        model: formData.model === 'Other' || formData.deviceType === 'Laptop' 
          ? formData.customModel 
          : formData.model,
        imei: formData.imeiSerial
      });
      
      navigate('/profile/dashboard/devices');
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: 'Failed to register device. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="page-container">
      <div className="page-header text-center">
        <h1 className="page-title">Register Your Device</h1>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Register your device in our national database for enhanced security and protection.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto mt-8">
        <div className="card p-8">
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>{errors.general}</span>
            </div>
          )}
          
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
              <span className="text-sm font-medium text-gray-500">User Info</span>
              <span className="text-sm font-medium text-gray-500">Device Info</span>
              <span className="text-sm font-medium text-gray-500">Documents</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
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
                    disabled={isLoading || otpSent && countdown > 0}
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
                  label="National ID Number"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleChange}
                  error={errors.nationalId}
                  placeholder="Enter your national ID number"
                />
                <div className="text-sm text-gray-500 -mt-4 mb-2">
                  📝 Note: If you've recently renewed your national ID card, make sure to enter the new number.
                  If the device is still registered under the old number, ownership verification may fail until records are updated.
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Device Type
                  </label>
                  <select
                    name="deviceType"
                    value={formData.deviceType}
                    onChange={handleChange}
                    className={`
                      form-input
                      ${errors.deviceType ? 'border-red-500' : 'border-gray-300'}
                    `}
                  >
                    <option value="">Select device type</option>
                    <option value="Phone">Phone</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Laptop">Laptop</option>
                  </select>
                  {errors.deviceType && (
                    <p className="mt-1 text-sm text-red-600">{errors.deviceType}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className={`
                      form-input
                      ${errors.brand ? 'border-red-500' : 'border-gray-300'}
                    `}
                  >
                    <option value="">Select brand</option>
                    {Object.keys(modelOptions).map((brand) => (
                      <option key={brand} value={brand}>{brand.trim()}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                  {errors.brand && (
                    <p className="mt-1 text-sm text-red-600">{errors.brand}</p>
                  )}
                </div>
                
                {formData.brand === 'Other' && (
                  <Input
                    label="Custom Brand"
                    name="customBrand"
                    value={formData.customBrand}
                    onChange={handleChange}
                    error={errors.customBrand}
                    placeholder="Enter brand name"
                  />
                )}
                
                {formData.deviceType !== 'Laptop' && formData.brand && formData.brand !== 'Other' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Model
                    </label>
                    <select
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      className={`
                        form-input
                        ${errors.model ? 'border-red-500' : 'border-gray-300'}
                      `}
                    >
                      <option value="">Select model</option>
                      {modelOptions[formData.brand as keyof typeof modelOptions]?.[formData.deviceType]?.map((model) => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                    {errors.model && (
                      <p className="mt-1 text-sm text-red-600">{errors.model}</p>
                    )}
                  </div>
                )}
                
                {(formData.deviceType === 'Laptop' || formData.model === 'Other') && (
                  <Input
                    label="Custom Model"
                    name="customModel"
                    value={formData.customModel}
                    onChange={handleChange}
                    error={errors.customModel}
                    placeholder="Enter model name"
                  />
                )}
                
                <Input
                  label={formData.deviceType === 'Laptop' ? 'Serial Number' : 'IMEI Number'}
                  name="imeiSerial"
                  value={formData.imeiSerial}
                  onChange={handleChange}
                  error={errors.imeiSerial}
                  placeholder={formData.deviceType === 'Laptop' ? 'Enter serial number' : 'Enter 15-digit IMEI number'}
                  leftIcon={<Smartphone className="h-5 w-5" />}
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Device Condition
                  </label>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="condition"
                        value="New"
                        checked={formData.condition === 'New'}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">New</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="condition"
                        value="Used"
                        checked={formData.condition === 'Used'}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">Used</span>
                    </label>
                  </div>
                  {errors.condition && (
                    <p className="mt-1 text-sm text-red-600">{errors.condition}</p>
                  )}
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-6">
                {formData.condition === 'New' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Purchase Invoice
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="invoice-upload"
                              className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                            >
                              <span>Upload invoice</span>
                              <input
                                id="invoice-upload"
                                name="invoice-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*,.pdf"
                                onChange={(e) => handleFileChange(e, 'purchaseInvoice')}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, PDF up to 10MB
                          </p>
                        </div>
                      </div>
                      {formData.purchaseInvoice && (
                        <p className="mt-2 text-sm text-gray-600">
                          Selected file: {formData.purchaseInvoice.name}
                        </p>
                      )}
                      {errors.purchaseInvoice && (
                        <p className="mt-1 text-sm text-red-600">{errors.purchaseInvoice}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Box Image
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="box-upload"
                              className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                            >
                              <span>Upload image</span>
                              <input
                                id="box-upload"
                                name="box-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'boxImage')}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG up to 10MB
                          </p>
                        </div>
                      </div>
                      {formData.boxImage && (
                        <p className="mt-2 text-sm text-gray-600">
                          Selected file: {formData.boxImage.name}
                        </p>
                      )}
                      {errors.boxImage && (
                        <p className="mt-1 text-sm text-red-600">{errors.boxImage}</p>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                          Used Device Registration
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>
                            For used devices, no additional documents are required at this time.
                            However, please ensure the IMEI/Serial number provided is accurate.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex justify-between pt-6">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}
              
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="ml-auto"
                >
                  Register Device
                </Button>
              )}
            </div>
          </form>
        </div>
        
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <FileText className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Why Register Your Device?
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Registering your device helps protect it from theft and unauthorized use.
                  In case your device is lost or stolen, having it registered will:
                </p>
                <ul className="list-disc ml-4 mt-2 space-y-1">
                  <li>Make it easier to prove ownership</li>
                  <li>Help authorities recover your device</li>
                  <li>Prevent unauthorized resale</li>
                  <li>Enable quick IMEI/Serial blocking if needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceRegistrationPage;