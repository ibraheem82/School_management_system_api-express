import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { School, Users, GraduationCap, User } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  
  const { login, isAuthenticated, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Get default redirect path for a role
  const getDefaultRedirect = (userRole) => {
    switch (userRole) {
      case 'admin': return '/admin/dashboard';
      case 'teacher': return '/teacher';
      case 'student': return '/student';
      default: return '/login';
    }
  };

  // Handle redirect after authentication
  useEffect(() => {
    if (isAuthenticated && user) {
      // Use the actual user role from auth, not the form selection
      const from = location.state?.from?.pathname;
      
      // If there's a previous location and it's not the login page, go there
      // Otherwise, redirect to the user's role-based dashboard
      if (from && from !== '/login' && from !== '/') {
        navigate(from, { replace: true });
      } else {
        navigate(getDefaultRedirect(user.role), { replace: true });
      }
    }
  }, [isAuthenticated, user, location.state, navigate]);

  // Don't show login form if already authenticated
  if (isAuthenticated && user) {
    return null; // The useEffect will handle the redirect
  }

  // Handle login form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password, role);
      // Navigation will be handled by useEffect after successful login
    } catch (error) {
      // Error already handled in AuthContext toast
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'admin', label: 'Administrator', icon: Users, color: 'bg-red-500' },
    { value: 'teacher', label: 'Teacher', icon: User, color: 'bg-green-500' },
    { value: 'student', label: 'Student', icon: GraduationCap, color: 'bg-blue-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <School className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">EduSys</h1>
          <p className="text-gray-600">School Management System</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Login as
              </label>
              <div className="grid grid-cols-3 gap-2">
                {roleOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setRole(option.value)}
                      className={`
                        flex flex-col items-center p-3 rounded-lg border-2 transition-all
                        ${role === option.value 
                          ? 'border-blue-500 bg-blue-50 text-blue-700' 
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <div className={`w-8 h-8 ${option.color} rounded-full flex items-center justify-center mb-1`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-medium">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="lg"
            >
              Sign In as {roleOptions.find(r => r.value === role)?.label}
            </Button>
          </form>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Demo credentials: admin@school.com / teacher@school.com / student@school.com (password: 123456)
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;