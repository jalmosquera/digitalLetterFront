/**
 * Verifica si un token JWT está expirado
 * @param {string} token - Token JWT
 * @returns {boolean} - true si está expirado o inválido, false si es válido
 */
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    // Decodificar el payload del JWT (segunda parte del token)
    const payload = JSON.parse(atob(token.split('.')[1]));

    // El campo 'exp' es un timestamp en segundos
    if (!payload.exp) return true;

    // Comparar con el tiempo actual (en segundos)
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    // Si hay error al decodificar, consideramos el token como inválido
    return true;
  }
};

/**
 * Obtiene el token válido de localStorage
 * Si el token está expirado, retorna null (pero NO lo elimina, para permitir que api.js intente refrescarlo)
 * @returns {string|null} - Token válido o null
 */
export const getValidToken = () => {
  const token = localStorage.getItem('access_token');

  // Verificar si el token está expirado
  if (token && isTokenExpired(token)) {
    // Si está expirado, retornar null pero NO eliminarlo
    // Dejamos que api.js se encargue de refrescar el token
    return null;
  }

  return token;
};

/**
 * Obtiene los headers de autenticación con token JWT válido
 * @param {object} additionalHeaders - Headers adicionales a incluir
 * @returns {object} - Headers con Authorization si hay token válido
 */
export const getAuthHeaders = (additionalHeaders = {}) => {
  const token = getValidToken();

  return {
    ...additionalHeaders,
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};
