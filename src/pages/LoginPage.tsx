import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ general: '' }); // State for general error messages

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ general: '' }); // Clear any previous errors on new submission

    // Basic client-side validation
    if (!formData.email || !formData.password) {
      setErrors({ general: 'Please enter both email and password.' });
      setIsLoading(false);
      return; // Stop function execution if validation fails
    }

    // This is currently a fake login delay to simulate an API call.
    // In a real application, you would replace this `setTimeout`
    // with your actual authentication API call (e.g., fetch, axios, or a Supabase/Firebase auth method).
    setTimeout(() => {
      setIsLoading(false);

      // Simulate successful login
      navigate('/profile');

      // To simulate a failed login, you could uncomment the line below and comment out the navigate line:
      // setErrors({ general: 'Invalid email or password.' });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            id="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Display general errors if any */}
        {errors.general && (
          <p className="text-red-500 text-sm mb-4">{errors.general}</p>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;