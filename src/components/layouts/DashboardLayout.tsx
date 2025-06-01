import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  User, 
  CreditCard, 
  Shield, 
  FileText, 
  Smartphone, 
  Search, 
  Clock,
  LogOut,
  Menu,
  X,
  ChevronRight,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  const menuItems = [
    {
      name: 'Profile',
      path: '/profile',
      icon: <User className="h-5 w-5" />,
      exact: true
    },
    {
      name: 'Credit Balance',
      path: '/profile/credit-balance',
      icon: <CreditCard className="h-5 w-5" />
    },
    {
      name: 'Security',
      path: '/profile/security',
      icon: <Shield className="h-5 w-5" />
    },
    {
      name: 'Documents',
      path: '/profile/documents',
      icon: <FileText className="h-5 w-5" />
    },
    {
      name: 'Dashboard',
      path: '/profile/dashboard',
      icon: <Smartphone className="h-5 w-5" />,
      exact: true
    },
    {
      name: 'My Devices',
      path: '/profile/dashboard/devices',
      icon: <Smartphone className="h-5 w-5" />,
      indent: true
    },
    {
      name: 'IMEI Status',
      path: '/profile/dashboard/imei-status',
      icon: <Search className="h-5 w-5" />,
      indent: true
    },
    {
      name: 'Search History',
      path: '/profile/dashboard/search-history',
      icon: <Clock className="h-5 w-5" />,
      indent: true
    }
  ];
  
  return (
    <div className="flex-grow flex">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed bottom-4 right-4 z-20">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 rounded-full bg-teal-500 text-white shadow-lg hover:bg-teal-600 transition-colors"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Sidebar for mobile */}
      <div
        className={`
          lg:hidden fixed inset-0 z-10 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="relative h-full">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          ></div>
          
          {/* Sidebar content */}
          <div className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-8">
                <User className="h-10 w-10 text-teal-500 bg-teal-100 p-2 rounded-full" />
                <div>
                  <h3 className="font-medium text-gray-900">{user?.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center px-3 py-2 text-sm font-medium rounded-md
                      ${item.indent ? 'ml-4' : ''}
                      ${
                        (item.exact && location.pathname === item.path) || 
                        (!item.exact && isActive(item.path))
                          ? 'bg-teal-50 text-teal-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sidebar for desktop */}
      <div className="hidden lg:block w-64 border-r border-gray-200">
        <div className="h-full p-6">
          <div className="flex items-center space-x-3 mb-8">
            <User className="h-10 w-10 text-teal-500 bg-teal-100 p-2 rounded-full" />
            <div>
              <h3 className="font-medium text-gray-900">{user?.name}</h3>
              <p className="text-sm text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-md
                  ${item.indent ? 'ml-4' : ''}
                  ${
                    (item.exact && location.pathname === item.path) || 
                    (!item.exact && isActive(item.path))
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50"
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;