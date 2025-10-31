# Digital Letter - Restaurant Menu System

> Modern web application for restaurant menu display with multi-language support, ingredient customization, and WhatsApp ordering integration.

[![React](https://img.shields.io/badge/React-19.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-4.0-6E9F18.svg)](https://vitest.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Key Features](#key-features)
- [Component Documentation](#component-documentation)
- [Context API](#context-api)
- [Services](#services)
- [Testing](#testing)
- [Contributing](#contributing)

## Features

- **Modern UI** - Clean design built with Tailwind CSS and custom theme (Pepper)
- **Fast Development** - Powered by Vite with HMR
- **Multi-language Support** - Spanish and English with custom LanguageContext
- **Dark Mode** - Full dark theme support with ThemeContext
- **Ingredient Customization** - Users can select/deselect ingredients for their orders
- **Shopping Cart** - Complete cart system with localStorage persistence
- **WhatsApp Integration** - Direct order placement via WhatsApp
- **Responsive Design** - Mobile-first approach for all screen sizes
- **Testing Ready** - 29 tests with Vitest + Testing Library
- **CI/CD Ready** - GitHub Actions workflow configured
- **Type Safe** - PropTypes validation across components

## Tech Stack

**Frontend:**
- [React 19.1](https://reactjs.org/) - UI Library with latest features
- [Vite 7.1](https://vitejs.dev/) - Next generation build tool
- [Tailwind CSS 3.4](https://tailwindcss.com/) - Utility-first CSS
- [React Router 7.9](https://reactrouter.com/) - Client-side routing
- [FontAwesome 7.1](https://fontawesome.com/) - Icon library

**State Management:**
- React Context API - AuthContext, CartContext, LanguageContext, ThemeContext

**Data Fetching:**
- [Axios 1.13](https://axios-http.com/) - HTTP client
- Custom useFetch hook - Simplified data fetching

**Forms:**
- [React Hook Form 7.65](https://react-hook-form.com/) - Form validation

**Testing:**
- [Vitest 4.0](https://vitest.dev/) - Unit testing framework
- [Testing Library 16.3](https://testing-library.com/) - Component testing
- [jsdom 27.0](https://github.com/jsdom/jsdom) - DOM implementation

**Code Quality:**
- [ESLint 9.36](https://eslint.org/) - Code linting
- [Prettier 3.6](https://prettier.io/) - Code formatting

## Installation

### Prerequisites

- Node.js 18+ (recommended: Node.js 20+)
- npm or yarn
- Backend API running (see backend repository)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/digitalLetterFrontEnd.git
cd digitalLetterFrontEnd
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

4. **Start development server**
```bash
npm run dev
```

5. **Open browser**
Navigate to [http://localhost:5173](http://localhost:5173)

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=Digital Letter

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true

# Environment
VITE_NODE_ENV=development
```

See `.env.example` for all available variables.

## Project Structure

```
src/
├── features/               # Feature-based modules
│   ├── auth/              # Authentication
│   │   ├── pages/         # Login, Register
│   │   └── components/    # Auth-specific components
│   ├── menu/              # Public menu
│   │   ├── pages/         # HomePage, ProductDetailPage, ContactPage, PrivacyPage
│   │   ├── components/    # ProductCard, ProductGrid, CategoryFilter
│   │   └── hooks/         # useProducts, useCategories
│   ├── cart/              # Shopping cart
│   │   ├── pages/         # CartPage, CheckoutPage
│   │   └── components/    # Cart-specific components
│   └── admin/             # Admin panel
│       ├── products/      # Product management
│       ├── categories/    # Category management
│       ├── ingredients/   # Ingredient management
│       └── users/         # User management
├── shared/                # Shared resources
│   ├── components/        # Reusable components
│   │   ├── layout/        # MenuLayout
│   │   └── menu/          # Navbar, Footer
│   ├── contexts/          # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── LanguageContext.jsx
│   │   └── ThemeContext.jsx
│   ├── services/          # API services
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── whatsappService.js
│   ├── hooks/             # Custom hooks
│   │   └── useFetch.js
│   └── utils/             # Utility functions
├── config/                # App configuration
├── test/                  # Test setup and utilities
├── App.jsx                # Root component with routing
└── main.jsx               # Application entry point
```

## Available Scripts

```bash
# Development
npm run dev              # Start dev server (port 5173)
npm run dev -- --port 3000  # Start on custom port

# Building
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format with Prettier

# Testing
npm run test             # Run tests once
npm run test:watch       # Run tests in watch mode
npm run test:ui          # Open Vitest UI
npm run test:coverage    # Generate coverage report
```

## Key Features

### 1. Ingredient Customization System

Users can customize their orders by selecting/deselecting ingredients and adding special requests:

**Implementation:**
- Checkbox-based ingredient selection in ProductDetailPage
- Additional ingredients text field
- Customization stored with cart items
- Displayed in checkout and WhatsApp order

**Usage Example:**
```jsx
import { useCart } from '@shared/contexts/CartContext';

function ProductDetail() {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const customization = {
      selectedIngredients: [1, 2, 3], // IDs of selected ingredients
      additionalNotes: 'Extra cheese please'
    };
    addToCart(product, quantity, customization);
  };
}
```

### 2. Shopping Cart with localStorage

Complete cart system with persistence across browser sessions:

**Features:**
- Add/remove items
- Update quantities
- Custom items (with ingredient customization) stored separately
- Automatic localStorage sync
- Cart count badge in navbar

**Usage Example:**
```jsx
import { useCart } from '@shared/contexts/CartContext';

function MyComponent() {
  const {
    items,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    getTotalPrice,
    getItemCount
  } = useCart();

  return (
    <div>
      <p>Cart Items: {getItemCount()}</p>
      <p>Total: €{getTotalPrice().toFixed(2)}</p>
    </div>
  );
}
```

### 3. WhatsApp Integration

Direct order placement via WhatsApp with formatted bilingual messages:

**Features:**
- Bilingual order messages (Spanish/English)
- Complete order details including customizations
- Customer and delivery information
- Price breakdown

**Implementation:**
```jsx
import { sendOrderViaWhatsApp } from '@shared/services/whatsappService';
import { useLanguage } from '@shared/contexts/LanguageContext';

function CheckoutPage() {
  const { language, getTranslation } = useLanguage();

  const handleOrder = () => {
    const orderData = {
      items: cartItems,
      deliveryInfo: formData,
      user: currentUser,
      totalPrice: total
    };

    sendOrderViaWhatsApp(orderData, language, getTranslation);
  };
}
```

### 4. Multi-language Support

Complete Spanish/English translation system:

**Features:**
- Dynamic language switching
- Translation function for API data
- Stored in localStorage
- Affects all UI text and WhatsApp messages

**Usage Example:**
```jsx
import { useLanguage } from '@shared/contexts/LanguageContext';

function MyComponent() {
  const { t, language, switchLanguage, getTranslation } = useLanguage();

  return (
    <div>
      <h1>{t('menu.title')}</h1>
      <button onClick={() => switchLanguage('es')}>Español</button>
      <button onClick={() => switchLanguage('en')}>English</button>
    </div>
  );
}
```

### 5. Checkout with Separated Address Fields

Enhanced checkout form with specific address fields:

**Features:**
- Separate fields: Street, House Number
- Location dropdown: Ardales, Carratraca
- Phone number field
- Optional notes
- Form validation

## Component Documentation

For detailed component documentation, see [COMPONENTS.md](./COMPONENTS.md)

**Key Components:**
- `ProductCard` - Display product with image, name, price, badges
- `ProductGrid` - Grid layout for products with loading states
- `CategoryFilter` - Filter products by category
- `MenuLayout` - Main layout with Navbar and Footer
- `CartPage` - Shopping cart with item management
- `CheckoutPage` - Checkout form with WhatsApp integration
- `ProductDetailPage` - Product details with ingredient customization

## Context API

For detailed context documentation, see [CONTEXTS.md](./CONTEXTS.md)

### Available Contexts

#### AuthContext
Manages user authentication and authorization.

```jsx
import { useAuth } from '@shared/contexts/AuthContext';

const { user, isAuthenticated, login, logout, register } = useAuth();
```

#### CartContext
Manages shopping cart state with localStorage persistence.

```jsx
import { useCart } from '@shared/contexts/CartContext';

const {
  items,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getTotalPrice,
  getItemCount
} = useCart();
```

**Cart Item Structure:**
```javascript
{
  id: unique_id,           // Unique cart item ID
  product: {...},          // Product object
  quantity: 2,             // Quantity
  customization: {         // Optional
    selectedIngredients: [1, 2, 3],
    additionalNotes: 'Extra cheese'
  }
}
```

#### LanguageContext
Manages application language (Spanish/English).

```jsx
import { useLanguage } from '@shared/contexts/LanguageContext';

const { language, switchLanguage, t, getTranslation } = useLanguage();
```

#### ThemeContext
Manages dark/light theme.

```jsx
import { useTheme } from '@shared/contexts/ThemeContext';

const { theme, toggleTheme, isDark } = useTheme();
```

## Services

### API Service (`api.js`)
Centralized Axios instance with interceptors for authentication and error handling.

```javascript
import api from '@shared/services/api';

const response = await api.get('/products');
```

### Auth Service (`authService.js`)
Authentication operations (login, register, logout, token refresh).

```javascript
import { login, register, logout } from '@shared/services/authService';

const userData = await login(email, password);
```

### WhatsApp Service (`whatsappService.js`)
Generate and send orders via WhatsApp.

```javascript
import { sendOrderViaWhatsApp } from '@shared/services/whatsappService';

sendOrderViaWhatsApp(orderData, language, getTranslation);
```

**Functions:**
- `generateOrderMessage(orderData, language, getTranslation)` - Create formatted message
- `sendWhatsAppMessage(message)` - Open WhatsApp with message
- `sendOrderViaWhatsApp(orderData, language, getTranslation)` - Complete flow

## Testing

We use Vitest and Testing Library for comprehensive testing coverage.

**Test Coverage:**
- 29 tests passing
- CartContext: Add, remove, update, persistence
- WhatsApp Service: Message generation, bilingual support
- LanguageContext: Language switching, translations
- ThemeContext: Theme toggling
- ProductCard: Rendering, interactions

**Run Tests:**
```bash
npm run test              # Run all tests
npm run test:watch        # Watch mode
npm run test:ui           # Interactive UI
npm run test:coverage     # Coverage report
```

**Example Test:**
```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  it('renders product name', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Pizza Margherita')).toBeInTheDocument();
  });
});
```

## Styling with Tailwind

### Custom Theme - Pepper

The project uses a custom "Pepper" theme for the public menu:

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      pepper: {
        orange: '#F76511',
        yellow: '#ffcc00',
        red: '#ff003c',
        green: '#0a9900',
        charcoal: '#1a1a1a',
        light: '#fafafa',
      }
    },
    fontFamily: {
      'gabarito': ['Gabarito', 'sans-serif'],
      'inter': ['Inter', 'sans-serif'],
    }
  }
}
```

### Custom CSS Classes

```css
/* Container */
.container-pepper {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* Buttons */
.btn-pepper-primary {
  @apply bg-pepper-orange text-white px-6 py-3 rounded-lg
         font-gabarito font-semibold hover:bg-opacity-90
         transition-all duration-200;
}

/* Cards */
.card-pepper {
  @apply bg-white rounded-lg shadow-pepper
         hover:shadow-pepper-hover transition-shadow duration-250;
}
```

### Responsive Design

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid */}
</div>
```

## Contributing

We welcome contributions! Please follow these guidelines:

### Git Workflow

1. Create a feature branch from `main`:
```bash
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:
```bash
git add .
git commit -m "feat: add new feature"
```

3. Push and create Pull Request:
```bash
git push origin feature/your-feature-name
```

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks
- `ci:` - CI/CD changes

**Example:**
```bash
git commit -m "feat: add ingredient customization to product detail page"
```

### Code Standards

- Use ESLint and Prettier configurations
- Write PropTypes for all components
- Add tests for new features
- Follow existing project structure
- Use functional components with hooks
- Keep components small and focused

### Pull Request Process

1. Update documentation if needed
2. Add/update tests
3. Ensure all tests pass: `npm run test`
4. Ensure linting passes: `npm run lint`
5. Request review from maintainers
6. Address review feedback
7. Merge after approval

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors

- **Your Name** - [GitHub Profile](https://github.com/yourusername)

## Acknowledgments

- Built with [Vite](https://vitejs.dev/) for blazing fast development
- Styled with [Tailwind CSS](https://tailwindcss.com/) for rapid UI development
- Tested with [Vitest](https://vitest.dev/) for reliable test coverage
- Icons by [FontAwesome](https://fontawesome.com/)

## Support

For support, email your-email@example.com or open an issue in the repository.

---

Made with ❤️ for restaurants
