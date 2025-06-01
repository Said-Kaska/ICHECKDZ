import { Link } from 'react-router-dom';
import { Smartphone, Search, Clock, ChevronRight, DollarSign } from 'lucide-react';
import { useDevice } from '../../contexts/DeviceContext';

const Dashboard = () => {
  const { devices, searchHistory } = useDevice();
  
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Overview of your device registrations and IMEI checks
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-teal-500 text-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Registered Devices</h3>
            <Smartphone className="h-8 w-8 text-teal-200" />
          </div>
          <p className="text-3xl font-bold mb-4">{devices.length}</p>
          <Link to="/profile/dashboard/devices" className="text-teal-100 hover:text-white inline-flex items-center text-sm font-medium">
            View all devices
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="bg-teal-500 text-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">IMEI Checks</h3>
            <Search className="h-8 w-8 text-teal-200" />
          </div>
          <p className="text-3xl font-bold mb-4">{searchHistory.length}</p>
          <Link to="/profile/dashboard/search-history" className="text-teal-100 hover:text-white inline-flex items-center text-sm font-medium">
            View search history
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="bg-teal-500 text-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Pending Verifications</h3>
            <Clock className="h-8 w-8 text-teal-200" />
          </div>
          <p className="text-3xl font-bold mb-4">
            {devices.filter(device => device.status === 'pending').length}
          </p>
          <Link to="/profile/dashboard/imei-status" className="text-teal-100 hover:text-white inline-flex items-center text-sm font-medium">
            View status
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Recent devices */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Devices</h2>
            <Link to="/profile/dashboard/devices" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
              View all
            </Link>
          </div>
          
          {devices.length > 0 ? (
            <div className="space-y-4">
              {devices.slice(0, 3).map((device) => (
                <div key={device.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="bg-teal-100 p-2 rounded-lg mr-4">
                      <Smartphone className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium">{device.brand} {device.model}</p>
                      <p className="text-sm text-gray-500">IMEI: {device.imei}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${device.status === 'verified' ? 'bg-green-100 text-green-800' : ''}
                      ${device.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${device.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                    `}>
                      {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Smartphone className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No devices registered yet</p>
            </div>
          )}
        </div>
        
        {/* Recent searches */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent IMEI Checks</h2>
            <Link to="/profile/dashboard/search-history" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
              View all
            </Link>
          </div>
          
          {searchHistory.length > 0 ? (
            <div className="space-y-4">
              {searchHistory.slice(0, 3).map((search) => (
                <div key={search.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="bg-teal-100 p-2 rounded-lg mr-4">
                      <Search className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium">IMEI: {search.imei}</p>
                      <p className="text-sm text-gray-500">Date: {search.date}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${search.result === 'clean' ? 'bg-green-100 text-green-800' : ''}
                      ${search.result === 'blacklisted' ? 'bg-red-100 text-red-800' : ''}
                      ${search.result === 'unknown' ? 'bg-yellow-100 text-yellow-800' : ''}
                    `}>
                      {search.result.charAt(0).toUpperCase() + search.result.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No IMEI checks performed yet</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Quick actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/imei-check" className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="bg-teal-100 p-2 rounded-lg mr-4">
              <Search className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="font-medium">Check IMEI</p>
              <p className="text-sm text-gray-500">Verify a device's status</p>
            </div>
          </Link>
          
          <Link to="/device-registration" className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="bg-teal-100 p-2 rounded-lg mr-4">
              <Smartphone className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="font-medium">Register Device</p>
              <p className="text-sm text-gray-500">Add a new device</p>
            </div>
          </Link>
          
          <Link to="/profile/credit-balance" className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="bg-teal-100 p-2 rounded-lg mr-4">
              <DollarSign className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="font-medium">Add Credits</p>
              <p className="text-sm text-gray-500">Purchase more credits</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;