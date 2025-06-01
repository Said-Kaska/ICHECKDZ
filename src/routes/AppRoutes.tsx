import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import DashboardLayout from '../components/layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';

// Pages
import HomePage from '../pages/HomePage';
import ImeiCheckPage from '../pages/ImeiCheckPage';
import DeviceRegistrationPage from '../pages/DeviceRegistrationPage';
import TransferOwnershipPage from '../pages/TransferOwnershipPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import HelpPage from '../pages/HelpPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsOfServicePage from '../pages/TermsOfServicePage';
import ProfilePage from '../pages/ProfilePage';
import AboutPage from '../pages/AboutPage';

// Profile sections
import CreditBalance from '../components/profile/CreditBalance';
import Security from '../components/profile/Security';
import Documents from '../components/profile/Documents';
import Dashboard from '../components/profile/Dashboard';
import MyDevices from '../components/profile/MyDevices';
import ImeiStatusTracking from '../components/profile/ImeiStatusTracking';
import SearchHistory from '../components/profile/SearchHistory';
import TransactionsPage from '../pages/TransactionsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/imei-check" element={<ImeiCheckPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/help/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/about-us" element={<AboutPage />} />
        
        {/* Protected routes */}
        <Route path="/device-registration" element={
          <ProtectedRoute>
            <DeviceRegistrationPage />
          </ProtectedRoute>
        } />
        
        <Route path="/transfer-ownership" element={
          <ProtectedRoute>
            <TransferOwnershipPage />
          </ProtectedRoute>
        } />
        
        {/* Profile routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<ProfilePage />} />
          <Route path="credit-balance" element={<CreditBalance />} />
          <Route path="security" element={<Security />} />
          <Route path="documents" element={<Documents />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/devices" element={<MyDevices />} />
          <Route path="dashboard/imei-status" element={<ImeiStatusTracking />} />
          <Route path="dashboard/search-history" element={<SearchHistory />} />
          <Route path="transactions" element={<TransactionsPage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/\" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;