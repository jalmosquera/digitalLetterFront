# ARQUITECTURA DEL PROYECTO - Digital Letter Frontend

## 🏗️ Estructura Modular por Feature (Feature-Based)

Este proyecto utiliza una arquitectura modular organizada por dominio de negocio en lugar de por tipo de archivo.

---

## 📁 Estructura de Carpetas

```
src/
├── features/              # Módulos por dominio de negocio
│   ├── products/         # Feature: CRUD de Productos
│   │   ├── components/   # Componentes específicos de productos
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   ├── ProductList.jsx
│   │   │   └── ProductFilters.jsx
│   │   ├── hooks/        # Hooks específicos de productos
│   │   │   ├── useProducts.js
│   │   │   ├── useProductForm.js
│   │   │   └── useProductFilters.js
│   │   ├── services/     # API calls para productos
│   │   │   └── productService.js
│   │   ├── utils/        # Utilidades específicas de productos
│   │   │   └── productValidations.js
│   │   └── index.js      # Public API del feature
│   │
│   ├── users/            # Feature: CRUD de Usuarios
│   │   ├── components/
│   │   │   ├── UserCard.jsx
│   │   │   ├── UserForm.jsx
│   │   │   └── UserList.jsx
│   │   ├── hooks/
│   │   │   └── useUsers.js
│   │   ├── services/
│   │   │   └── userService.js
│   │   └── index.js
│   │
│   ├── categories/       # Feature: CRUD de Categorías
│   │   ├── components/
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── CategoryForm.jsx
│   │   │   ├── CategoryList.jsx
│   │   │   └── CategorySelector.jsx
│   │   ├── hooks/
│   │   │   └── useCategories.js
│   │   ├── services/
│   │   │   └── categoryService.js
│   │   └── index.js
│   │
│   └── ingredients/      # Feature: CRUD de Ingredientes
│       ├── components/
│       │   ├── IngredientCard.jsx
│       │   ├── IngredientForm.jsx
│       │   └── IngredientList.jsx
│       ├── hooks/
│       │   └── useIngredients.js
│       ├── services/
│       │   └── ingredientService.js
│       └── index.js
│
├── shared/               # Código compartido entre features
│   ├── components/       # Componentes reutilizables
│   │   ├── ui/          # UI Primitives
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── Dropdown.jsx
│   │   │   └── index.js
│   │   ├── layout/      # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── MainLayout.jsx
│   │   │   └── index.js
│   │   └── common/      # Common components
│   │       ├── LoadingSpinner.jsx
│   │       ├── ErrorMessage.jsx
│   │       ├── EmptyState.jsx
│   │       └── ConfirmDialog.jsx
│   │
│   ├── hooks/           # Custom hooks compartidos
│   │   ├── useFetch.js
│   │   ├── useAuth.js
│   │   ├── useDebounce.js
│   │   └── useLocalStorage.js
│   │
│   ├── services/        # API client base
│   │   ├── api.js       # Axios instance, interceptors
│   │   └── authService.js
│   │
│   ├── utils/           # Funciones auxiliares compartidas
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   └── helpers.js
│   │
│   ├── constants/       # Constantes globales
│   │   ├── routes.js
│   │   ├── api-endpoints.js
│   │   └── config.js
│   │
│   └── contexts/        # Context providers globales
│       └── AuthContext.jsx
│
├── pages/               # Page components (routes)
│   ├── HomePage.jsx
│   ├── DashboardPage.jsx
│   ├── ProductsPage.jsx
│   ├── UsersPage.jsx
│   ├── CategoriesPage.jsx
│   ├── IngredientsPage.jsx
│   └── NotFoundPage.jsx
│
├── assets/              # Archivos estáticos
│   ├── images/
│   │   └── logo.svg
│   └── icons/
│
├── styles/              # Estilos globales
│   └── index.css        # Tailwind imports + custom styles
│
├── config/              # Configuración de la app
│   └── env.js           # Environment variables
│
├── App.jsx              # Componente raíz
└── main.jsx             # Entry point
```

---

## 🎯 Ventajas de esta Arquitectura

### 1. **Organización por Dominio**
- El código está organizado por funcionalidad de negocio
- Cada feature es autocontenido y fácil de entender
- Reduce la complejidad cognitiva

### 2. **Escalabilidad**
- Agregar nuevo feature = crear nueva carpeta
- Fácil de crecer sin desorganización
- Estructura predecible

### 3. **Mantenibilidad**
- Todo lo relacionado a un feature está junto
- Fácil de encontrar código relacionado
- Eliminar feature = eliminar carpeta

### 4. **Trabajo en Equipo**
- Cada desarrollador puede trabajar en su feature sin conflictos
- Menos merge conflicts
- Ownership claro de código

### 5. **Separación Clara**
- Feature-specific vs Shared code claramente diferenciado
- Reutilización consciente (código en shared/)
- Evita duplicación accidental

---

## 📦 Path Aliases

Configurados en `vite.config.js` y `jsconfig.json`:

```javascript
{
  '@': './src',
  '@features': './src/features',
  '@shared': './src/shared',
  '@pages': './src/pages',
  '@assets': './src/assets',
  '@config': './src/config',
  '@styles': './src/styles'
}
```

### Ejemplos de Uso

```jsx
// ✅ Importar desde features
import { ProductCard, ProductList } from '@features/products';
import { UserProfile } from '@features/users';
import { CategorySelector } from '@features/categories';

// ✅ Importar desde shared
import { Button, Input, Card } from '@shared/components/ui';
import { Header, Sidebar } from '@shared/components/layout';
import { useAuth, useFetch } from '@shared/hooks';
import { api } from '@shared/services';
import { formatDate, validateEmail } from '@shared/utils';

// ✅ Importar páginas
import DashboardPage from '@pages/DashboardPage';

// ✅ Importar assets
import logo from '@assets/images/logo.svg';

// ✅ Importar config
import { env } from '@config/env';
```

---

## 🧩 Public API de Features

Cada feature exporta su API pública desde `index.js`:

```javascript
// src/features/products/index.js
export { default as ProductCard } from './components/ProductCard';
export { default as ProductForm } from './components/ProductForm';
export { default as ProductList } from './components/ProductList';
export { useProducts } from './hooks/useProducts';
export { productService } from './services/productService';
```

**Beneficios:**
- Interfaz pública clara del feature
- Encapsulación (detalles internos ocultos)
- Fácil refactorización interna sin afectar consumidores

---

## 🔄 Flujo de Datos

```
User Interaction
      ↓
Component (UI)
      ↓
Custom Hook (lógica)
      ↓
Service (API call)
      ↓
Backend API (Digital Letter)
```

### Ejemplo: Listar Productos

```jsx
// 1. Component
function ProductList() {
  const { products, loading, error } = useProducts();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// 2. Hook
function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    productService.getAll()
      .then(setProducts)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}

// 3. Service
const productService = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};
```

---

## 🎨 Integración con Riday Template

El diseño visual está basado en el template Riday:
- **Colores:** Dark sidebar + Light content area
- **Layout:** Header + Sidebar + Content
- **Componentes:** Cards, Tables, Forms estilo Riday
- **Responsive:** Mobile-first approach

**Nota:** Copiaremos el **estilo visual** de Riday, pero la estructura del código seguirá nuestra arquitectura modular.

---

## 🔌 Integración con Backend (Digital Letter)

### Base URL
```
Development: http://localhost:8000/api
Production: https://api.digitalletter.com (por definir)
```

### Endpoints Principales

#### Products
- `GET /products` - Listar productos
- `GET /products/:id` - Detalle de producto
- `POST /products` - Crear producto
- `PUT /products/:id` - Actualizar producto
- `DELETE /products/:id` - Eliminar producto

#### Users
- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`

#### Categories
- `GET /categories`
- `GET /categories/:id`
- `POST /categories`
- `PUT /categories/:id`
- `DELETE /categories/:id`

#### Ingredients
- `GET /ingredients`
- `GET /ingredients/:id`
- `POST /ingredients`
- `PUT /ingredients/:id`
- `DELETE /ingredients/:id`

---

## 🔐 Autenticación

```javascript
// Headers para requests autenticados
{
  'Authorization': 'Bearer <token>',
  'Content-Type': 'application/json'
}
```

**Token storage:** localStorage (clave: `auth_token`)

---

## 📐 Convenciones de Código

### Nomenclatura

- **Componentes:** PascalCase (`ProductCard.jsx`)
- **Hooks:** camelCase con prefijo `use` (`useProducts.js`)
- **Services:** camelCase con sufijo `Service` (`productService.js`)
- **Utils:** camelCase (`formatDate.js`)
- **Constants:** UPPER_SNAKE_CASE

### Estructura de Componentes

```jsx
// 1. Imports
import { useState } from 'react';
import PropTypes from 'prop-types';

// 2. Component
const ComponentName = ({ prop1, prop2 }) => {
  // 3. Hooks
  const [state, setState] = useState();

  // 4. Handlers
  const handleClick = () => {};

  // 5. Render
  return <div>...</div>;
};

// 6. PropTypes
ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

// 7. Export
export default ComponentName;
```

---

## 🚀 Deployment

- **Platform:** Vercel o GitHub Pages (por definir)
- **Build:** `npm run build`
- **Preview:** `npm run preview`

---

## 📊 Integración con Linear

**Estado actual:** ❌ No configurado

**Plan futuro:** Opcional, si el equipo decide usar Linear para project management.

---

## 🎯 Features del Proyecto

### MVP (Minimum Viable Product)

1. **Products CRUD**
   - Listar productos
   - Crear producto
   - Editar producto
   - Eliminar producto

2. **Users CRUD**
   - Listar usuarios
   - Crear usuario
   - Editar usuario
   - Eliminar usuario

3. **Categories CRUD**
   - Listar categorías
   - Crear categoría
   - Editar categoría
   - Eliminar categoría

4. **Ingredients CRUD**
   - Listar ingredientes
   - Crear ingrediente
   - Editar ingrediente
   - Eliminar ingrediente

### Future Enhancements

- Autenticación con JWT
- Dashboard con estadísticas
- Búsqueda y filtros avanzados
- Paginación
- Dark mode
- Multi-idioma (i18n)

---

**Versión:** 1.0
**Última actualización:** 2025-10-28
**Proyecto:** Digital Letter Frontend
