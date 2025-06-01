import { createContext, useContext, useState, ReactNode } from 'react';
import SHA256 from 'crypto-js/sha256';

interface Device {
  id: string;
  imei: string;
  brand: string;
  model: string;
  type: 'Smartphone' | 'Tablet' | 'Laptop';
  status: 'verified' | 'pending' | 'rejected' | 'blacklisted';
  registrationDate: string;
  lastChecked?: string;
  hashedNationalId: string;
  phoneNumber: string;
}

interface ImeiSearch {
  id: string;
  imei: string;
  date: string;
  result: 'clean' | 'blacklisted' | 'unknown';
  deviceInfo?: {
    brand: string;
    model: string;
    type: string;
  };
}

interface DeviceContextType {
  devices: Device[];
  searchHistory: ImeiSearch[];
  addDevice: (device: Omit<Device, 'id' | 'registrationDate' | 'status'>) => void;
  verifyImei: (imei: string) => Promise<ImeiSearch>;
  getDeviceByImei: (imei: string) => Device | undefined;
  addSearchToHistory: (search: Omit<ImeiSearch, 'id' | 'date'>) => void;
  verifyOwnership: (imei: string, nationalId: string) => Promise<boolean>;
}

const DeviceContext = createContext<DeviceContextType | null>(null);

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
};

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      imei: '123456789012345',
      brand: 'Apple',
      model: 'iPhone 13',
      type: 'Smartphone',
      status: 'verified',
      registrationDate: '2025-05-15',
      lastChecked: '2025-05-20',
      hashedNationalId: SHA256('100200300').toString(),
      phoneNumber: '0551000001'
    },
    {
      id: '2',
      imei: '987654321098765',
      brand: 'Samsung',
      model: 'Galaxy S22',
      type: 'Smartphone',
      status: 'blacklisted',
      registrationDate: '2025-05-16',
      hashedNationalId: SHA256('200300400').toString(),
      phoneNumber: '0551000002'
    },
    {
      id: '3',
      imei: '357951456852789',
      brand: 'Huawei',
      model: 'MatePad 11',
      type: 'Tablet',
      status: 'verified',
      registrationDate: '2025-05-17',
      hashedNationalId: SHA256('300400500').toString(),
      phoneNumber: '0551000003'
    },
    {
      id: '4',
      imei: '852456963741258',
      brand: 'Lenovo',
      model: 'ThinkPad X1',
      type: 'Laptop',
      status: 'rejected',
      registrationDate: '2025-05-18',
      hashedNationalId: SHA256('400500600').toString(),
      phoneNumber: '0551000004'
    },
    {
      id: '5',
      imei: '789456123789456',
      brand: 'Xiaomi',
      model: 'Redmi Note 11',
      type: 'Smartphone',
      status: 'verified',
      registrationDate: '2025-05-19',
      hashedNationalId: SHA256('500600700').toString(),
      phoneNumber: '0551000005'
    }
  ]);
  
  const [searchHistory, setSearchHistory] = useState<ImeiSearch[]>([]);
  
  const addDevice = (deviceData: Omit<Device, 'id' | 'registrationDate' | 'status'>) => {
    const newDevice: Device = {
      ...deviceData,
      id: Math.random().toString(36).substring(2, 9),
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    
    setDevices(prev => [...prev, newDevice]);
  };
  
  const verifyImei = async (imei: string): Promise<ImeiSearch> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const device = devices.find(d => d.imei === imei);
    
    if (device) {
      const result: ImeiSearch = {
        id: Math.random().toString(36).substring(2, 9),
        imei,
        date: new Date().toISOString().split('T')[0],
        result: device.status === 'verified' ? 'clean' : 
               device.status === 'blacklisted' ? 'blacklisted' : 'unknown',
        deviceInfo: {
          brand: device.brand,
          model: device.model,
          type: device.type
        }
      };
      
      setSearchHistory(prev => [result, ...prev]);
      return result;
    }
    
    // Unknown device (not found)
    const result: ImeiSearch = {
      id: Math.random().toString(36).substring(2, 9),
      imei,
      date: new Date().toISOString().split('T')[0],
      result: 'unknown'
    };
    
    setSearchHistory(prev => [result, ...prev]);
    return result;
  };
  
  const getDeviceByImei = (imei: string) => {
    return devices.find(device => device.imei === imei);
  };
  
  const addSearchToHistory = (search: Omit<ImeiSearch, 'id' | 'date'>) => {
    const newSearch: ImeiSearch = {
      ...search,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString().split('T')[0]
    };
    
    setSearchHistory(prev => [newSearch, ...prev]);
  };

  const verifyOwnership = async (imei: string, nationalId: string): Promise<boolean> => {
    const device = devices.find(d => d.imei === imei);
    if (!device) return false;

    // Hash the provided National ID
    const hashedInput = SHA256(nationalId).toString();
    
    // Compare with stored hash
    return hashedInput === device.hashedNationalId;
  };
  
  return (
    <DeviceContext.Provider value={{
      devices,
      searchHistory,
      addDevice,
      verifyImei,
      getDeviceByImei,
      addSearchToHistory,
      verifyOwnership
    }}>
      {children}
    </DeviceContext.Provider>
  );
};