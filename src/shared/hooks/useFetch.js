import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthHeaders } from '@shared/utils/auth';

/**
 * Hook personalizado para hacer fetch de datos desde la API
 * @param {string} url - URL del endpoint a consumir
 * @param {object} options - Opciones adicionales para axios
 * @returns {object} - { data, loading, error, refetch }
 */
const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si no hay URL, no hacer nada
    if (!url) {
      setLoading(false);
      setData(null);
      setError(null);
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

        // Obtener headers
        const headers = getAuthHeaders(options.headers);

        const config = {
          ...options,
          headers,
        };

        const response = await axios.get(`${baseURL}${url}`, config);

        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage =
            err.response?.data?.message ||
            err.response?.data?.detail ||
            err.message ||
            'Error al cargar datos';
          setError(errorMessage);
          setData(null);
          console.error('Error en useFetch:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [url]); // ← SOLO url como dependencia, NO options

  // Función para refetch manual
  const refetch = async () => {
    if (!url) return;

    try {
      setLoading(true);
      setError(null);

      const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const headers = getAuthHeaders(options.headers);

      const config = {
        ...options,
        headers,
      };

      const response = await axios.get(`${baseURL}${url}`, config);
      setData(response.data);
      setError(null);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.detail ||
        err.message ||
        'Error al cargar datos';
      setError(errorMessage);
      console.error('Error en refetch:', err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

export default useFetch;
