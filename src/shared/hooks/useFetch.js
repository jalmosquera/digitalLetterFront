import { useState, useEffect } from 'react';
import axios from 'axios';

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
        const response = await axios.get(`${baseURL}${url}`, options);

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
  const refetch = () => {
    setLoading(true);
    setError(null);
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    axios
      .get(`${baseURL}${url}`, options)
      .then((response) => setData(response.data))
      .catch((err) => {
        setError(err.response?.data?.message || err.message || 'Error al cargar datos');
        console.error('Error en useFetch:', err);
      })
      .finally(() => setLoading(false));
  };

  return { data, loading, error, refetch };
};

export default useFetch;
