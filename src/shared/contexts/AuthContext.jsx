import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import authService from '@shared/services/authService';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        const isAuth = authService.isAuthenticated();

        if (isAuth && currentUser) {
          setUser(currentUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Registered user data
   */
  const register = async (userData) => {
    try {
      const newUser = await authService.register(userData);
      return newUser;
    } catch (error) {
      const message = error.response?.data?.message ||
                     error.response?.data?.detail ||
                     'Error al registrar usuario';
      throw new Error(message);
    }
  };

  /**
   * Login user
   * @param {string} username - Username
   * @param {string} password - Password
   * @returns {Promise<void>}
   */
 const login = async (username, password) => {
  try {
    const { token, user: loggedUser } = await authService.login(username, password);

    // Guarda token y usuario en localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(loggedUser));

    // Actualiza estado global
    setUser(loggedUser);

    return loggedUser; // opcional, por si quieres usarlo en LoginPage
  } catch (error) {
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      'Error al iniciar sesión';
    throw new Error(message);
  }
};


  /**
   * Logout user
   */
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  /**
   * Update user data in state and localStorage
   * @param {Object} updatedUser - Updated user data
   */
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  /**
   * Check if user has specific role
   * @param {string} role - Role to check ('client', 'boss', 'employee')
   * @returns {boolean}
   */
  const hasRole = (role) => {
    return user?.role === role;
  };

  /**
   * Check if user is staff (boss or employee)
   * @returns {boolean}
   */
  const isStaff = () => {
    return user?.role === 'boss' || user?.role === 'employee';
  };

  /**
   * Check if user is client
   * @returns {boolean}
   */
  const isClient = () => {
    return user?.role === 'client';
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateUser,
    hasRole,
    isStaff,
    isClient,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
