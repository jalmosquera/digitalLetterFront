import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSave } from '@fortawesome/free-solid-svg-icons';
import api from '@shared/services/api';

const COUNTRY_CODES = [
  { code: '+34', country: 'España' },
  { code: '+1', country: 'USA/Canadá' },
  { code: '+52', country: 'México' },
  { code: '+54', country: 'Argentina' },
  { code: '+56', country: 'Chile' },
  { code: '+57', country: 'Colombia' },
  { code: '+58', country: 'Venezuela' },
];

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const SettingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const [countryCode, setCountryCode] = useState('+34');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [schedule, setSchedule] = useState(
    DAYS.map(day => ({ day, open: '08:00', close: '23:00', closed: false }))
  );

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

        // Parse WhatsApp phone
        const phone = company.whatsapp_phone || '+34623736566';
        const matchedCode = COUNTRY_CODES.find(c => phone.startsWith(c.code));
        if (matchedCode) {
          setCountryCode(matchedCode.code);
          setPhoneNumber(phone.substring(matchedCode.code.length));
        }

        // Parse business hours
        if (company.business_hours) {
          const parsedSchedule = parseBusinessHours(company.business_hours);
          setSchedule(parsedSchedule);
        }
      }
    } catch (err) {
      console.error('Error fetching company data:', err);
      setError('Error al cargar configuraciones');
    } finally {
      setLoading(false);
    }
  };

  const parseBusinessHours = (hoursString) => {
    // Simple parser: "Lun: 08:00 - 23:00" per day
    const lines = hoursString.split('\n');
    const newSchedule = DAYS.map(day => ({ day, open: '08:00', close: '23:00', closed: false }));

    lines.forEach(line => {
      DAYS.forEach((day, idx) => {
        if (line.includes(day)) {
          const timeMatch = line.match(/(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})/);
          if (timeMatch) {
            newSchedule[idx] = { day, open: timeMatch[1], close: timeMatch[2], closed: false };
          } else if (line.toLowerCase().includes('cerrado')) {
            newSchedule[idx] = { day, open: '08:00', close: '23:00', closed: true };
          }
        }
      });
    });

    return newSchedule;
  };

  const handleScheduleChange = (index, field, value) => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = value;
    setSchedule(newSchedule);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyId) {
      setError('No se encontró la configuración de la empresa. Por favor, contacta al administrador.');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      // Generate business_hours string
      const businessHours = schedule
        .map(({ day, open, close, closed }) =>
          closed ? `${day}: Cerrado` : `${day}: ${open} - ${close}`
        )
        .join('\n');

      // Generate whatsapp_phone
      const whatsappPhone = `${countryCode}${phoneNumber}`;

      await api.patch(`/company/${companyId}/`, {
        whatsapp_phone: whatsappPhone,
        business_hours: businessHours,
      });

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
        <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-card rounded-lg shadow-md p-4 md:p-6">
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
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="px-3 sm:px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-pepper-orange focus:border-transparent dark:bg-dark-bg dark:text-text-primary text-sm sm:text-base"
                required
              >
                {COUNTRY_CODES.map(({ code, country }) => (
                  <option key={code} value={code}>
                    {code} ({country})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="623736566"
                className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-pepper-orange focus:border-transparent dark:bg-dark-bg dark:text-text-primary text-sm sm:text-base"
                required
              />
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-text-secondary">
              Número que recibirá los pedidos por WhatsApp
            </p>
          </div>

          {/* Business Hours */}
          <div className="mb-6">
            <label className="block mb-3 text-sm font-medium text-gray-700 dark:text-text-secondary">
              Horarios de Atención
            </label>
            <div className="space-y-2 sm:space-y-3">
              {schedule.map((item, index) => (
                <div key={item.day} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-2 sm:p-0 bg-gray-50 dark:bg-dark-bg sm:bg-transparent rounded-lg">
                  <div className="flex items-center gap-3 sm:gap-2">
                    <div className="w-10 sm:w-12 font-semibold text-gray-700 dark:text-text-secondary text-sm">
                      {item.day}
                    </div>
                    <input
                      type="checkbox"
                      checked={!item.closed}
                      onChange={(e) => handleScheduleChange(index, 'closed', !e.target.checked)}
                      className="w-4 h-4 text-pepper-orange focus:ring-pepper-orange"
                    />
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-text-secondary w-14 sm:w-16">
                      {item.closed ? 'Cerrado' : 'Abierto'}
                    </span>
                  </div>
                  {!item.closed && (
                    <div className="flex items-center gap-2 sm:gap-3 pl-0 sm:pl-2">
                      <input
                        type="time"
                        value={item.open}
                        onChange={(e) => handleScheduleChange(index, 'open', e.target.value)}
                        className="px-2 sm:px-3 py-1 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-pepper-orange focus:border-transparent dark:bg-dark-bg dark:text-text-primary text-sm"
                      />
                      <span className="text-gray-500 text-sm">-</span>
                      <input
                        type="time"
                        value={item.close}
                        onChange={(e) => handleScheduleChange(index, 'close', e.target.value)}
                        className="px-2 sm:px-3 py-1 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-pepper-orange focus:border-transparent dark:bg-dark-bg dark:text-text-primary text-sm"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-text-secondary">
              Selecciona los días abiertos y configura los horarios
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
