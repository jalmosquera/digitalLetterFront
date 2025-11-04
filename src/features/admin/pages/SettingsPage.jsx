import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSave } from '@fortawesome/free-solid-svg-icons';
import api from '@shared/services/api';

const SettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const [formData, setFormData] = useState({
    whatsapp_phone: '',
    business_hours: '',
  });

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/company/');
      if (response.data.results && response.data.results.length > 0) {
        const company = response.data.results[0];
        setCompanyId(company.id);
        setFormData({
          whatsapp_phone: company.whatsapp_phone || '',
          business_hours: company.business_hours || '',
        });
      }
    } catch (err) {
      console.error('Error fetching company data:', err);
      setError('Error al cargar configuraciones');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      await api.patch(`/company/${companyId}/`, formData);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
      setError('Error al guardar configuraciones');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600 dark:text-text-secondary">Cargando configuraciones...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-text-primary flex items-center gap-3">
          <FontAwesomeIcon icon={faCog} />
          Configuraciones
        </h1>
        <p className="text-gray-600 dark:text-text-secondary">
          Configura el número de WhatsApp y horarios de atención
        </p>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg">
              Configuraciones guardadas correctamente
            </div>
          )}

          {/* WhatsApp Phone */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-text-secondary">
              Número de WhatsApp
            </label>
            <input
              type="text"
              name="whatsapp_phone"
              value={formData.whatsapp_phone}
              onChange={handleChange}
              placeholder="+34623736566"
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-pepper-orange focus:border-transparent dark:bg-dark-bg dark:text-text-primary"
              required
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-text-secondary">
              Número que recibirá los pedidos por WhatsApp (incluye código de país)
            </p>
          </div>

          {/* Business Hours */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-text-secondary">
              Horarios de Atención
            </label>
            <textarea
              name="business_hours"
              value={formData.business_hours}
              onChange={handleChange}
              placeholder="Lun-Dom: 08:00 - 23:00"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-pepper-orange focus:border-transparent dark:bg-dark-bg dark:text-text-primary resize-none"
              required
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-text-secondary">
              Horarios que se mostrarán en la página de inicio. Formato sugerido: "Lun-Dom: 08:00 - 23:00"
            </p>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-pepper-orange text-white rounded-lg hover:bg-pepper-orange-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faSave} />
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
