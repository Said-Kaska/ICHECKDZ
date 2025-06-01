import { useState } from 'react';
import { Shield, Lock, Smartphone, Mail, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';
import Input from '../common/Input';

const Security = () => {
  const { user } = useAuth();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [phoneSuccess, setPhoneSuccess] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [phoneForm, setPhoneForm] = useState({
    phone: user?.phone || ''
  });
  
  const [emailForm, setEmailForm] = useState({
    email: user?.email || ''
  });
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
  };
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneForm({
      ...phoneForm,
      [e.target.name]: e.target.value
    });
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailForm({
      ...emailForm,
      [e.target.name]: e.target.value
    });
  };
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPasswordSuccess(true);
    setShowPasswordForm(false);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setPasswordSuccess(false);
    }, 3000);
  };
  
  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPhoneSuccess(true);
    setShowPhoneForm(false);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setPhoneSuccess(false);
    }, 3000);
  };
  
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setEmailSuccess(true);
    setShowEmailForm(false);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setEmailSuccess(false);
    }, 3000);
  };
  
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Security Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your password, phone number, and security preferences
        </p>
      </div>
      
      <div className="mt-8 space-y-8">
        {/* Password section */}
        <div className="card">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Lock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Password</h2>
              <p className="text-gray-600">
                Manage your account password
              </p>
            </div>
          </div>
          
          {passwordSuccess && (
            <div className="mb-6 bg-green-50 text-green-800 p-4 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>Your password has been successfully updated.</span>
            </div>
          )}
          
          {showPasswordForm ? (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                label="Current Password"
                name="currentPassword"
                type="password"
                placeholder="Enter your current password"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                required
              />
              
              <Input
                label="New Password"
                name="newPassword"
                type="password"
                placeholder="Enter your new password"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                helperText="Password must be at least 8 characters long"
                required
              />
              
              <Input
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
              
              <div className="flex space-x-4">
                <Button type="submit">
                  Update Password
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowPasswordForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => setShowPasswordForm(true)}
            >
              Change Password
            </Button>
          )}
        </div>
        
        {/* Phone number section */}
        <div className="card">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Smartphone className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Phone Number</h2>
              <p className="text-gray-600">
                Manage your phone number for account recovery
              </p>
            </div>
          </div>
          
          {phoneSuccess && (
            <div className="mb-6 bg-green-50 text-green-800 p-4 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>Your phone number has been successfully updated.</span>
            </div>
          )}
          
          {!showPhoneForm && (
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500">Current Phone</p>
                <p className="font-medium">{user?.phone || 'Not set'}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowPhoneForm(true)}
              >
                {user?.phone ? 'Update' : 'Add Phone'}
              </Button>
            </div>
          )}
          
          {showPhoneForm && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="+1 (123) 456-7890"
                value={phoneForm.phone}
                onChange={handlePhoneChange}
                required
              />
              
              <div className="flex space-x-4">
                <Button type="submit">
                  Save Phone Number
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowPhoneForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
        
        {/* Email section */}
        <div className="card">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Email Address</h2>
              <p className="text-gray-600">
                Manage your email address for account notifications
              </p>
            </div>
          </div>
          
          {emailSuccess && (
            <div className="mb-6 bg-green-50 text-green-800 p-4 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>Your email address has been successfully updated.</span>
            </div>
          )}
          
          {!showEmailForm && (
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500">Current Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowEmailForm(true)}
              >
                Update
              </Button>
            </div>
          )}
          
          {showEmailForm && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={emailForm.email}
                onChange={handleEmailChange}
                required
              />
              
              <div className="flex space-x-4">
                <Button type="submit">
                  Save Email Address
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowEmailForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
        
        {/* Two-factor authentication section */}
        <div className="card">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Two-Factor Authentication</h2>
              <p className="text-gray-600">
                Add an extra layer of security to your account
              </p>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg mb-6">
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-yellow-800">
                Two-factor authentication is not enabled. Enable it to add an extra layer of security to your account.
              </p>
            </div>
          </div>
          
          <Button variant="outline">
            Enable Two-Factor Authentication
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Security;