import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import toast from 'react-hot-toast';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user session from localStorage on initial mount
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (savedToken && savedUser && savedUser !== 'undefined') {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        if (import.meta.env.DEV) {
          console.log('AuthContext: User restored from localStorage');
        }
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('AuthContext: Failed to restore user session:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  }, []);

  // Login
  const login = useCallback(async (email, password, role) => {
    try {
      setLoading(true);
      const response = await authService.login(email, password, role);

      setToken(response.token);
      setUser(response.user);

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      toast.success(`Welcome back, ${response.user.name}!`);
    } catch (error) {
      toast.error(error.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  }, []);

  // Refresh user data
  const refreshUser = useCallback(
    async () => {
      if (!token) return;
      try {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        let response =
          currentUser.role === 'admin'
            ? await userService.getAdminProfile()
            : await userService.getProfile();

        const updatedUser = response.data || response;

        // Update only if data has changed
        if (JSON.stringify(updatedUser) !== JSON.stringify(user)) {
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }

        if (import.meta.env.DEV) {
          console.log(
            'AuthContext: User data refreshed from server',
            updatedUser
          );
        }
      } catch (error) {
        console.error('Failed to refresh user data:', error);
      }
    },
    [token, user]
  );

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      loading,
      refreshUser,
      isAuthenticated: Boolean(user && token),
    }),
    [user, token, loading, login, logout, refreshUser]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
