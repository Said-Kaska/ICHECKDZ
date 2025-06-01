import { useState } from 'react';
import { Search, Clock, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';
import { useDevice } from '../../contexts/DeviceContext';
import Input from '../common/Input';
import Button from '../common/Button';

const SearchHistory = () => {
  const { searchHistory } = useDevice();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredHistory = searchTerm 
    ? searchHistory.filter(item => 
        item.imei.includes(searchTerm) || 
        item.result.includes(searchTerm)
      )
    : searchHistory;
  
  const getResultIcon = (result: string) => {
    switch (result) {
      case 'clean':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'blacklisted':
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      case 'unknown':
        return <HelpCircle className="h-6 w-6 text-yellow-500" />;
      default:
        return null;
    }
  };
  
  const getResultText = (result: string) => {
    switch (result) {
      case 'clean':
        return 'This device has not been reported as lost or stolen.';
      case 'blacklisted':
        return 'This device has been reported as lost or stolen. Purchasing this device is not recommended.';
      case 'unknown':
        return 'We could not find any information about this device.';
      default:
        return '';
    }
  };
  
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Search History</h1>
        <p className="text-gray-600 mt-2">
          View your previous IMEI verification searches
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-8 mb-6">
        <div className="relative w-full sm:w-64">
          <Input
            placeholder="Search by IMEI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="h-5 w-5" />}
          />
        </div>
        
        <Button
          variant="outline"
          leftIcon={<Clock className="h-5 w-5" />}
          disabled={searchHistory.length === 0}
        >
          Clear History
        </Button>
      </div>
      
      {filteredHistory.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IMEI
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Result
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHistory.map((search) => (
                  <tr key={search.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{search.imei}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{search.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="mr-2">{getResultIcon(search.result)}</span>
                        <span className={`
                          ${search.result === 'clean' ? 'text-green-600' : ''}
                          ${search.result === 'blacklisted' ? 'text-red-600' : ''}
                          ${search.result === 'unknown' ? 'text-yellow-600' : ''}
                          font-medium
                        `}>
                          {search.result.charAt(0).toUpperCase() + search.result.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{getResultText(search.result)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No search history found</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            {searchTerm ? 'No searches match your criteria.' : 'You haven\'t performed any IMEI checks yet.'}
          </p>
          {searchTerm ? (
            <Button 
              variant="outline" 
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </Button>
          ) : (
            <Button
              onClick={() => window.location.href = '/imei-check'}
            >
              Check an IMEI
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchHistory;