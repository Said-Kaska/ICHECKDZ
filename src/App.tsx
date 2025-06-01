import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';
import { DeviceProvider } from './contexts/DeviceContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DeviceProvider>
          <AppRoutes />
        </DeviceProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;