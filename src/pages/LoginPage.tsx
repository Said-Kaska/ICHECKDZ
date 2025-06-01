import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ general: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ general: '' });

    if (!formData.email || !formData.password) {
      setErrors({ general: 'يرجى إدخال البريد وكلمة المرور.' });
      setIsLoading(false);
      return;
    }

    // 👇 نحا التنقل المكرر وخلي غير هذا
    setTimeout(() => {
      setIsLoading(false);

      // ✅ هنا ندير التنقل الحقيقي بعد التحقق (وهمي حاليا)
      navigate('/profile');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4">تسجيل الدخول</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            البريد الإلكتروني
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
            كلمة المرور
          </label>
          <input
            type="password"
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

        {errors.general && (
          <p className="text-red-500 text-sm mb-4">{errors.general}</p>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md"
          disabled={isLoading}
        >
          {isLoading ? 'جارٍ الدخول...' : 'دخول'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
