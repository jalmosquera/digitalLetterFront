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
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

        const config = {
          ...options,
          headers: getAuthHeaders(options.headers),
        };

        const response = await axios.get(`${baseURL}${url}`, config);

        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error al cargar datos');
        console.error('Error en useFetch:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  // Función para refetch manual
  const refetch = async () => {
    setLoading(true);
    setError(null);
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    const config = {
      ...options,
      headers: getAuthHeaders(options.headers),
    };

    try {
      const response = await axios.get(`${baseURL}${url}`, config);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error al cargar datos');
      console.error('Error en useFetch:', err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

export default useFetch;
