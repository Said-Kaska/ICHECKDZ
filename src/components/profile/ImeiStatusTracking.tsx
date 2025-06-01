import { useState } from 'react';
import { Smartphone, Search, AlertTriangle, Clock, CheckCircle, X } from 'lucide-react';
import { useDevice } from '../../contexts/DeviceContext';
import Input from '../common/Input';

const ImeiStatusTracking = () => {
  const { devices } = useDevice();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredDevices = searchTerm 
    ? devices.filter(device => 
        device.imei.includes(searchTerm) || 
        device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : devices;
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'pending':
        return <Clock className="h-8 w-8 text-yellow-500" />;
      case 'rejected':
        return <X className="h-8 w-8 text-red-500" />;
      default:
        return <AlertTriangle className="h-8 w-8 text-gray-400" />;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified':
        return 'This device has been verified and is registered in our system.';
      case 'pending':
        return 'This device is pending verification. This process usually takes 24-48 hours.';
      case 'rejected':
        return 'This device registration has been rejected. Please contact support for more information.';
      default:
        return 'Unknown status.';
    }
  };
  
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">IMEI Status Tracking</h1>
        <p className="text-gray-600 mt-2">
          Track the verification status of your registered devices
        </p>
      </div>
      
      <div className="mt-8 mb-6">
        <div className="max-w-md">
          <Input
            placeholder="Search by IMEI, brand, or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="h-5 w-5" />}
          />
        </div>
      </div>
      
      {filteredDevices.length > 0 ? (
        <div className="space-y-6">
          {filteredDevices.map((device) => (
            <div key={device.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  {getStatusIcon(device.status)}
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {device.brand} {device.model}
                      </h3>
                      <p className="text-gray-500">IMEI: {device.imei}</p>
                    </div>
                    
                    <div className="mt-2 sm:mt-0">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${device.status === 'verified' ? 'bg-green-100 text-green-800' : ''}
                        ${device.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${device.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                        {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg mb-4
                    ${device.status === 'verified' ? 'bg-green-50' : ''}
                    ${device.status === 'pending' ? 'bg-yellow-50' : ''}
                    ${device.status === 'rejected' ? 'bg-red-50' : ''}
                  `}>
                    <p className="text-sm">
                      {getStatusText(device.status)}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Registration Date</p>
                      <p className="font-medium">{device.registrationDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Last Checked</p>
                      <p className="font-medium">{device.lastChecked || 'Never'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
          <Smartphone className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No devices found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {searchTerm ? 'No devices match your search criteria.' : 'You haven\'t registered any devices yet.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImeiStatusTracking;