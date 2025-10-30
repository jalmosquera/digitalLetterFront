import api from './api';
import axios from 'axios';
import { env } from '@/config/env';

/**
 * Authentication service for handling user registration, login, and token management
 */
const authService = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.username - Username
   * @param {string} userData.email - Email address
   * @param {string} userData.name - Full name
   * @param {string} userData.password - Password
   * @param {string} userData.phone - Phone number
   * @returns {Promise<Object>} User data
   */
  async register(userData) {
    const response = await axios.post(`${env.apiBaseUrl}/clients/`, userData);
    return response.data;
  },

  /**
   * Login user with username and password
   * @param {string} username - Username
   * @param {string} password - Password
   * @returns {Promise<Object>} Tokens and user data
   */
  async login(username, password) {
    // Get JWT tokens
    const tokenResponse = await axios.post(`${env.apiBaseUrl}/token/`, {
      username,
      password,
    });

    const { access, refresh } = tokenResponse.data;

    // Store tokens
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);

    // Get user data
    const userResponse = await api.get('/me/');
    const user = userResponse.data;

    // Store user data
    localStorage.setItem('user', JSON.stringify(user));

    return { user, access, refresh };
  },

  /**
   * Logout user and clear tokens
   */
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },

  /**
   * Get current user from localStorage
   * @returns {Object|null} User data or null if not logged in
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    return null;
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} True if user has valid tokens
   */
  isAuthenticated() {
    const token = localStorage.getItem('access_token');
    const user = this.getCurrentUser();
    return !!(token && user);
  },

  /**
   * Get access token
   * @returns {string|null} Access token or null
   */
  getAccessToken() {
    return localStorage.getItem('access_token');
  },

  /**
   * Get refresh token
   * @returns {string|null} Refresh token or null
   */
  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  },

  /**
   * Refresh access token
   * @returns {Promise<string>} New access token
   */
  async refreshToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post(`${env.apiBaseUrl}/token/refresh/`, {
      refresh: refreshToken,
    });

    const { access } = response.data;
    localStorage.setItem('access_token', access);

    return access;
  },
};

export default authService;
