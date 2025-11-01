import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faUtensils,
  faUsers,
  faEuroSign,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';

const DashboardPage = () => {
  // Mock data - replace with real API calls
  const stats = [
    {
      id: 1,
      title: 'Total Ventas',
      value: '€12,450',
      change: '+12.5%',
      isPositive: true,
      icon: faEuroSign,
      bgColor: 'bg-pepper-orange/10',
      iconColor: 'text-pepper-orange',
    },
    {
      id: 2,
      title: 'Pedidos',
      value: '156',
      change: '+8.2%',
      isPositive: true,
      icon: faShoppingCart,
      bgColor: 'bg-riday-blue/10',
      iconColor: 'text-riday-blue',
    },
    {
      id: 3,
      title: 'Productos',
      value: '42',
      change: '+5',
      isPositive: true,
      icon: faUtensils,
      bgColor: 'bg-yellow-500/10',
      iconColor: 'text-yellow-500',
    },
    {
      id: 4,
      title: 'Clientes',
      value: '89',
      change: '-2.1%',
      isPositive: false,
      icon: faUsers,
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-500',
    },
  ];

  const recentOrders = [
    { id: 1, customer: 'Juan Pérez', product: 'Pizza Margherita', amount: '€12.50', status: 'Entregado' },
    { id: 2, customer: 'María García', product: 'Hamburguesa Clásica', amount: '€8.90', status: 'En preparación' },
    { id: 3, customer: 'Carlos López', product: 'Ensalada César', amount: '€6.50', status: 'Pendiente' },
    { id: 4, customer: 'Ana Martínez', product: 'Pasta Carbonara', amount: '€10.20', status: 'Entregado' },
    { id: 5, customer: 'Pedro Sánchez', product: 'Tacos al Pastor', amount: '€9.80', status: 'En preparación' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Entregado':
        return 'bg-pepper-orange/10 text-pepper-orange';
      case 'En preparación':
        return 'bg-riday-blue/10 text-riday-blue';
      case 'Pendiente':
        return 'bg-yellow-500/10 text-yellow-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-text-primary mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-text-secondary">
          Bienvenido al panel de administración
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white dark:bg-dark-card rounded-lg p-6 border border-gray-200 dark:border-dark-border hover:border-pepper-orange/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <FontAwesomeIcon icon={stat.icon} className={`text-xl ${stat.iconColor}`} />
              </div>
              <div className={`flex items-center text-sm font-medium ${stat.isPositive ? 'text-pepper-orange' : 'text-red-500'}`}>
                <FontAwesomeIcon
                  icon={stat.isPositive ? faArrowUp : faArrowDown}
                  className="mr-1 text-xs"
                />
                {stat.change}
              </div>
            </div>
            <h3 className="text-gray-600 dark:text-text-secondary text-sm mb-1">{stat.title}</h3>
            <p className="text-gray-900 dark:text-text-primary text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border">
          <h2 className="text-xl font-bold text-gray-900 dark:text-text-primary">Pedidos Recientes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-bg">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                  Monto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-text-secondary uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-text-secondary">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-text-primary font-medium">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-text-primary">
                    {order.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-text-primary font-semibold">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
