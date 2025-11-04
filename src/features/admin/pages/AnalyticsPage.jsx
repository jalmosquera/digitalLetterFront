import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrophy,
  faListUl,
  faUser,
  faLayerGroup,
  faCalendarWeek,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import useFetch from '@shared/hooks/useFetch';
import { useLanguage } from '@shared/contexts/LanguageContext';

const AnalyticsPage = () => {
  const { getTranslation } = useLanguage();
  const [period, setPeriod] = useState('week'); // 'week' o 'month'

  const { data: ordersData, loading, error } = useFetch('/orders/');
  const orders = ordersData?.results || [];

  // Filtrar pedidos por período
  const filteredOrders = useMemo(() => {
    const today = new Date();
    const startDate = new Date(today);

    if (period === 'week') {
      startDate.setDate(today.getDate() - 7);
    } else {
      startDate.setDate(1); // Primer día del mes actual
    }

    return orders.filter(order => new Date(order.created_at) >= startDate);
  }, [orders, period]);

  // Calcular todas las métricas
  const analytics = useMemo(() => {
    const productMap = {};
    const categoryMap = {};
    const userPurchases = {};
    const comboMap = {};

    filteredOrders.forEach(order => {
      const userId = order.user;
      const userKey = order.user_name || order.user_email || `User #${userId}`;

      // Inicializar usuario si no existe
      if (!userPurchases[userKey]) {
        userPurchases[userKey] = { count: 0, total: 0 };
      }

      userPurchases[userKey].count += 1;
      userPurchases[userKey].total += parseFloat(order.total_price || 0);

      // Obtener items del pedido (asumiendo que vienen en la respuesta)
      if (order.items && Array.isArray(order.items)) {
        // Crear key para la combinación
        const comboKey = order.items
          .map(item => item.product_name)
          .sort()
          .join(' + ');

        if (order.items.length > 1) {
          comboMap[comboKey] = (comboMap[comboKey] || 0) + 1;
        }

        // Contar productos y categorías
        order.items.forEach(item => {
          const productName = item.product_name || 'Desconocido';
          const categoryName = item.category || 'Sin categoría';

          productMap[productName] = (productMap[productName] || 0) + item.quantity;
          categoryMap[categoryName] = (categoryMap[categoryName] || 0) + item.quantity;
        });
      }
    });

    // Convertir a arrays y ordenar
    const topProducts = Object.entries(productMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, quantity]) => ({ name, quantity }));

    const topCategories = Object.entries(categoryMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, quantity]) => ({ name, quantity }));

    const topUser = Object.entries(userPurchases)
      .sort((a, b) => b[1].count - a[1].count)[0];

    const topCombos = Object.entries(comboMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([combo, count]) => ({ combo, count }));

    return {
      topProducts,
      topCategories,
      topUser: topUser ? { name: topUser[0], ...topUser[1] } : null,
      topCombos,
    };
  }, [filteredOrders]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600 dark:text-text-secondary">Cargando analíticas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600 dark:text-red-400">Error al cargar analíticas</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-text-primary">
            Analíticas
          </h1>
          <p className="text-gray-600 dark:text-text-secondary">
            Análisis de ventas y comportamiento de clientes
          </p>
        </div>

        {/* Period Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setPeriod('week')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              period === 'week'
                ? 'bg-pepper-orange text-white'
                : 'bg-gray-200 dark:bg-dark-card text-gray-700 dark:text-text-secondary hover:bg-gray-300 dark:hover:bg-dark-border'
            }`}
          >
            <FontAwesomeIcon icon={faCalendarWeek} className="mr-2" />
            Última Semana
          </button>
          <button
            onClick={() => setPeriod('month')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              period === 'month'
                ? 'bg-pepper-orange text-white'
                : 'bg-gray-200 dark:bg-dark-card text-gray-700 dark:text-text-secondary hover:bg-gray-300 dark:hover:bg-dark-border'
            }`}
          >
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
            Este Mes
          </button>
        </div>
      </div>

      {/* Top Products */}
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-dark-card dark:border-dark-border">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faTrophy} className="mr-3 text-xl text-pepper-orange" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-text-primary">
              Top 5 Productos Más Vendidos
            </h2>
          </div>
          <div className="space-y-3">
            {analytics.topProducts.length === 0 ? (
              <p className="py-4 text-center text-gray-600 dark:text-text-secondary">
                No hay datos disponibles
              </p>
            ) : (
              analytics.topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-dark-bg"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full bg-pepper-orange">
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-text-primary">
                      {product.name}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-600 dark:text-text-secondary">
                    {product.quantity} vendidos
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Categories */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-dark-card dark:border-dark-border">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faListUl} className="mr-3 text-xl text-riday-blue" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-text-primary">
              Categorías Más Vendidas
            </h2>
          </div>
          <div className="space-y-3">
            {analytics.topCategories.length === 0 ? (
              <p className="py-4 text-center text-gray-600 dark:text-text-secondary">
                No hay datos disponibles
              </p>
            ) : (
              analytics.topCategories.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-dark-bg"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full bg-riday-blue">
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-text-primary">
                      {category.name}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-600 dark:text-text-secondary">
                    {category.quantity} productos
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Top User */}
      <div className="p-6 mb-6 bg-white border border-gray-200 rounded-lg dark:bg-dark-card dark:border-dark-border">
        <div className="flex items-center mb-4">
          <FontAwesomeIcon icon={faUser} className="mr-3 text-xl text-yellow-500" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-text-primary">
            Cliente Más Activo
          </h2>
        </div>
        {analytics.topUser ? (
          <div className="p-6 rounded-lg bg-yellow-500/10 dark:bg-yellow-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-2 text-2xl font-bold text-gray-900 dark:text-text-primary">
                  {analytics.topUser.name}
                </p>
                <p className="text-gray-600 dark:text-text-secondary">
                  {analytics.topUser.count} pedidos realizados
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-yellow-500">
                  €{analytics.topUser.total.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 dark:text-text-secondary">Total gastado</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="py-4 text-center text-gray-600 dark:text-text-secondary">
            No hay datos disponibles
          </p>
        )}
      </div>

      {/* Top Combos */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-dark-card dark:border-dark-border">
        <div className="flex items-center mb-4">
          <FontAwesomeIcon icon={faLayerGroup} className="mr-3 text-xl text-purple-500" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-text-primary">
            Combinaciones Más Compradas
          </h2>
        </div>
        <div className="space-y-3">
          {analytics.topCombos.length === 0 ? (
            <p className="py-4 text-center text-gray-600 dark:text-text-secondary">
              No hay datos disponibles
            </p>
          ) : (
            analytics.topCombos.map((combo, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-dark-bg"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-purple-500 rounded-full">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-text-primary">
                    {combo.combo}
                  </span>
                </div>
                <span className="font-semibold text-gray-600 dark:text-text-secondary">
                  {combo.count} veces
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
