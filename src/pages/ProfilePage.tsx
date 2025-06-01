import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Phone, Calendar, Edit, Upload } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';

const ProfilePage = () => {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  if (!user) {
    return <div>Loading...</div>;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">My Profile</h1>
        <p className="text-gray-600 mt-2">
          Manage your personal information and account settings
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Profile card */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden mb-4">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-12 w-12 text-blue-500" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer">
                  <Upload className="h-4 w-4 text-gray-600" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-500">Account ID: {user.id}</p>
              
              <div className="w-full mt-6 border-t border-gray-100 pt-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{user.phone || 'Not set'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-medium">March 2023</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Account Type</p>
                      <p className="font-medium">Free</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="mt-6"
                leftIcon={<Edit className="h-4 w-4" />}
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
        
        {/* Quick links */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/profile/credit-balance" className="card hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-2">Credit Balance</h3>
              <p className="text-gray-600 mb-4">
                Manage your credit balance and payment methods
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Current Balance</p>
                  <p className="text-2xl font-semibold text-blue-600">{user.creditBalance} DZA</p>
                </div>
                <Button variant="outline" size="sm">
                  Recharge
                </Button>
              </div>
            </Link>
            
            <Link to="/profile/security" className="card hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-2">Security</h3>
              <p className="text-gray-600 mb-4">
                Update your password and security settings
              </p>
              <div className="text-sm">
                <div className="flex justify-between items-center mb-2">
                  <span>Password</span>
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">Set</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Two-factor authentication</span>
                  <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs font-medium">Not Set</span>
                </div>
              </div>
            </Link>
            
            <Link to="/profile/documents" className="card hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-2">Documents</h3>
              <p className="text-gray-600 mb-4">
                Upload and manage your verification documents
              </p>
              <div className="text-sm">
                <div className="flex justify-between items-center mb-2">
                  <span>National ID</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    user.hasNationalId 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.hasNationalId ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Business Registration</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    user.hasBusinessRegistration 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.hasBusinessRegistration ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
              </div>
            </Link>
            
            <Link to="/profile/dashboard" className="card hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium mb-2">Dashboard</h3>
              <p className="text-gray-600 mb-4">
                View your registered devices and IMEI searches
              </p>
              <div className="flex flex-col space-y-2">
                <Link to="/profile/dashboard/devices" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  My Devices
                </Link>
                <Link to="/profile/dashboard/imei-status" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  IMEI Status Tracking
                </Link>
                <Link to="/profile/dashboard/search-history" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Search History
                </Link>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;