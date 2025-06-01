import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Search, Plus } from 'lucide-react';
import { useDevice } from '../../contexts/DeviceContext';
import Button from '../common/Button';
import Input from '../common/Input';

const MyDevices = () => {
  const { devices } = useDevice();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredDevices = searchTerm 
    ? devices.filter(device => 
        device.imei.includes(searchTerm) || 
        device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.brand.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : devices;
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Verified
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Rejected
          </span>
        );
      default:
        return null;
    }
  };
  
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">My Devices</h1>
        <p className="text-gray-600 mt-2">
          Manage your registered devices
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-8 mb-6">
        <div className="relative w-full sm:w-64">
          <Input
            placeholder="Search devices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="h-5 w-5" />}
          />
        </div>
        
        <Link to="/device-registration">
          <Button
            leftIcon={<Plus className="h-5 w-5" />}
          >
            Register New Device
          </Button>
        </Link>
      </div>
      
      {filteredDevices.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IMEI
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Checked
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDevices.map((device) => (
                  <tr key={device.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Smartphone className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{device.brand}</div>
                          <div className="text-sm text-gray-500">{device.model}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{device.imei}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{device.registrationDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(device.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{device.lastChecked || 'Never'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {device.status !== 'blacklisted' && device.status !== 'rejected' && (
                        <Link to={`/imei-check?imei=${device.imei}&transfer=true`}>
                          <Button variant="outline" size="sm">
                            Transfer
                          </Button>
                        </Link>
                      )}
                      {(device.status === 'blacklisted' || device.status === 'rejected') && (
                        <p className="text-sm text-red-600">
                          Transfer not allowed
                        </p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
          <Smartphone className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No devices found</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            {searchTerm ? 'No devices match your search criteria.' : 'You haven\'t registered any devices yet.'}
          </p>
          {searchTerm ? (
            <Button 
              variant="outline" 
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </Button>
          ) : (
            <Link to="/device-registration">
              <Button>
                Register Your First Device
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default MyDevices;