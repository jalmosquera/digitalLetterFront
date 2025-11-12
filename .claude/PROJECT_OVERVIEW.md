# PROJECT OVERVIEW - Digital Letter Frontend

**Última actualización:** 2025-10-28
**Proyecto:** digitalLetterFrontEnd
**Tipo:** Frontend React + Vite + Tailwind CSS
**Deploy:** Vercel o GitHub Pages (por decidir)

---

## 🎯 OBJETIVO DEL PROYECTO

Crear un **frontend completo** para Digital Letter que incluye:

1. **PÁGINA PÚBLICA (Menú Digital)** → Estilo Pepper
   - Para clientes del restaurante
   - Ver menú, productos, categorías
   - NO requiere autenticación

2. **PANEL ADMINISTRATIVO (Dashboard)** → Estilo Riday
   - Para dueños/empleados del restaurante
   - CRUD de: Productos, Usuarios, Categorías, Ingredientes
   - SÍ requiere autenticación JWT

**Ambos en el MISMO proyecto React (Opción A)**

---

## 🏗️ ARQUITECTURA DEL PROYECTO

```
digitalLetterFrontEnd/
│
├── 🍽️ SECCIÓN PÚBLICA (/*)
│   └── Diseño: Pepper (https://pepper.framer.website/)
│       - Rutas: /, /contact, /privacy, etc.
│       - Usuarios: Clientes del restaurante
│       - Autenticación: NO
│
└── 🔐 SECCIÓN ADMIN (/admin/*)
    └── Diseño: Riday Dark Theme
        - Rutas: /admin, /admin/products, /admin/users, etc.
        - Usuarios: Dueños/empleados (roles: boss, employe)
        - Autenticación: SÍ (JWT)
```

---

## 🔗 BACKEND - Digital Letter API

### **Ubicación:**
- **Local:** `/Users/jalberth/Documents/py/projectsInProductions/digitalLetter`
- **GitHub:** https://github.com/jalmosquera/digitalLetter
- **Estado:** 75% completo, corriendo en producción

### **Stack Backend:**
- Django 5.2.3 + Django REST Framework 3.16.0
- JWT Authentication (Simple JWT)
- PostgreSQL (producción) / SQLite (desarrollo)
- django-parler (multilenguaje: ES, EN)

### **Apps del Backend:**
```
✅ categories  - Categorías de productos (CRUD completo)
✅ products    - Productos con relaciones ManyToMany (CRUD completo)
✅ users       - Sistema de usuarios con roles (client, employe, boss)
✅ ingredients - Ingredientes (CRUD completo)
✅ company     - Información de la empresa
```

### **Endpoints Principales:**

```bash
# Autenticación
POST   /api/token/                 → Login (JWT)
POST   /api/token/refresh/         → Refresh token

# Productos
GET    /api/products/              → Listar productos
POST   /api/products/              → Crear producto (auth required)
GET    /api/products/{id}/         → Detalle producto
PUT    /api/products/{id}/         → Actualizar producto (auth)
DELETE /api/products/{id}/         → Eliminar producto (auth)

# Categorías
GET    /api/categories/            → Listar categorías
POST   /api/categories/            → Crear categoría (auth)
GET/PUT/DELETE /api/categories/{id}/

# Ingredientes
GET    /api/ingredients/           → Listar ingredientes
POST   /api/ingredients/           → Crear ingrediente (auth)
GET/PUT/DELETE /api/ingredients/{id}/

# Usuarios
GET    /api/users/                 → Listar usuarios (auth)
POST   /api/register/employe/      → Registrar empleado (boss only)
POST   /api/register/clients/      → Registrar cliente
GET    /api/users/me/              → Usuario actual (auth)
POST   /api/users/change-password/ → Cambiar contraseña (auth)

# Empresa
GET    /api/company/               → Info de la empresa
POST/PUT /api/company/             → Actualizar empresa (auth)
```

### **Permisos del Backend:**
- `IsStaff` - Solo staff
- `IsBoss` - Solo jefes (role: boss)
- `IsEmploye` - Solo empleados (role: employe)
- `IsStaffOrEmploye` - Staff o empleados
- `IsAuthenticatedOrReadOnly` - Lectura pública, escritura autenticada

---

## 🎨 ANÁLISIS DE DISEÑO #1: PEPPER (Menú Público)

### **Referencia:** https://pepper.framer.website/

### **Paleta de Colores:**
```css
/* Colores principales */
--primary-orange: #ff9100;     /* Naranja principal (CTAs, botones) */
--secondary-yellow: #ffcc00;   /* Amarillo dorado (acentos) */
--accent-red: #ff003c;         /* Rojo/Magenta (ofertas especiales) */
--accent-green: #0a9900;       /* Verde (badges, disponibilidad) */
--accent-blue: #0080ff;        /* Azul (links, info) */

/* Neutrales */
--white: #ffffff;              /* Fondo principal */
--bg-light: #fafafa;          /* Fondo secundario */
--gray-light: #e6e6e6;        /* Bordes sutiles */
--gray-medium: #b3b3b3;       /* Texto secundario */
--charcoal: #1a1a1a;          /* Texto principal */
```

### **Tipografía:**
```css
/* Fuentes */
- Cherry Bomb One  → Títulos grandes (Hero)
- Gabarito (800, 900) → Subtítulos, precios
- Inter (300-700) → Texto body, UI

/* Jerarquía */
H1 (Hero): 56px desktop / 36px mobile (Cherry Bomb One)
H2 (Secciones): 40px desktop / 28px mobile (Gabarito 900)
H3 (Productos): 20px (Gabarito 800)
Body: 16px (Inter 400)
Precio: 20px (Gabarito 700, color #ff9100)
```

### **Estructura de la Home:**
```
┌─────────────────────────────────────────┐
│ NAVBAR (Sticky)                         │
│ - Logo | Home Menú Ubicación [Ordenar] │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ HERO SECTION (60-80vh)                  │
│ - Imagen grande de pizza                │
│ - Título (Cherry Bomb One, 56px)        │
│ - CTA "Ver Menú" / "Ordenar"           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ CATEGORÍAS (Horizontal)                 │
│ - Pizzas, Pastas, Ensaladas, Bebidas   │
│ - Filtros con iconos                    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ PRODUCTOS (Grid 3-4 cols)              │
│ - Cards con imagen + nombre + precio   │
│ - Badge: "Popular", "Nuevo"            │
│ - Botón: "+ Agregar"                   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ OFERTAS ESPECIALES                      │
│ - Slider de promociones                 │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ POSTRES                                 │
│ - Grid similar a productos              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ TESTIMONIOS                             │
│ - Slider de reseñas + avatares          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ UBICACIÓN / DELIVERY                    │
│ - Mapa + direcciones + horarios         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ FOOTER                                  │
│ - Links, redes sociales, newsletter     │
└─────────────────────────────────────────┘
```

### **Componentes Pepper:**
```jsx
// ProductCard
- Imagen: 100% width, aspect-ratio 16:9
- Border-radius: 12px
- Box-shadow: 0 2px 8px rgba(0,0,0,0.08)
- Hover: scale(1.02), shadow increase
- Badge: Position absolute, top-right

// Button Primary
- Background: #ff9100
- Color: #ffffff
- Padding: 12px 24px
- Border-radius: 8px
- Hover: darken + translateY(-2px)
- Shadow: 0 4px 12px rgba(255,145,0,0.3)

// CategoryCard
- Circular o rounded
- Border: 2px solid #ff9100 (active)
- Icon: 48x48px
- Hover: background naranja ligero
```

### **Responsive (Pepper):**
```
Desktop:  1200px+    → Grid 4 columnas
Tablet:   810-1199px → Grid 2-3 columnas
Mobile:   <810px     → Grid 1 columna, hamburger menu
```

### **Animaciones (Pepper):**
```css
- Hover cards: translateY(-4px) scale(1.02), 300ms ease
- Hover buttons: translateY(-2px), 200ms ease
- Scroll animations: fade-in-up
- Slideshows: smooth scroll, 500ms ease-in-out
```

---

## 🎨 ANÁLISIS DE DISEÑO #2: RIDAY (Panel Admin)

### **Referencia:** https://riday-admin-template.multipurposethemes.com/bs5/main-dark/index3.html

### **Paleta de Colores:**
```css
/* Colores principales */
--primary-green: #11c26d;      /* Color de acento principal (verde) */
--primary-blue: #1f92c4;       /* Color secundario (azul) */
--dark-header-bg: #333333;     /* Fondo del header oscuro */
--nav-text: #a9a9a9;           /* Texto de navegación (gris claro) */

/* Dark theme */
--dark-bg: #1a1a1a;           /* Fondo principal oscuro */
--dark-sidebar: #2d2d2d;      /* Fondo sidebar */
--dark-card: #232323;         /* Fondo cards */
--dark-border: #404040;       /* Bordes */
--text-primary: #ffffff;      /* Texto principal */
--text-secondary: #a9a9a9;    /* Texto secundario */
```

### **Tipografía (Riday):**
```css
/* Fuentes */
- Inter o System fonts
- Sans-serif moderna

/* Jerarquía */
H1: 32-36px, font-weight: 600-700
H2: 28-32px, font-weight: 600
H3: 24-28px, font-weight: 600
H4: 20-24px, font-weight: 500-600
Body: 14-16px, font-weight: 400
```

### **Layout (Riday):**
```
┌─────────────────────────────────────────────────────┐
│ TOPBAR (Fixed, #333333, ~60-70px)                  │
│ Logo | Fullscreen | Notifications | User Profile   │
└─────────────────────────────────────────────────────┘
┌──────────┬──────────────────────────────────────────┐
│ SIDEBAR  │ CONTENIDO PRINCIPAL                      │
│ (~250px) │                                          │
│          │ - Breadcrumb                            │
│ Menu     │ - Stats cards (4 columnas)              │
│ items    │ - Tables / Forms                        │
│ con      │ - CRUD components                        │
│ iconos   │                                          │
│          │ Padding: ~20-30px                        │
│ Colapsa  │ Max-width: container                     │
│ (~70px)  │                                          │
└──────────┴──────────────────────────────────────────┘
```

### **Componentes Riday:**
```jsx
// Sidebar
- Ancho: 250px (normal) | 70px (collapsed)
- Fondo: #2d2d2d
- Texto: #a9a9a9
- Hover: Ligero highlight
- Active: #11c26d
- Multinivel (hasta 3 niveles)
- Iconos: Font Awesome

// Topbar
- Altura: 60-70px
- Fondo: #333333
- Fixed top
- Elementos: Logo, Toggle, Notifications, Messages, User

// Cards
- Sombra sutil
- Border-radius: 8-12px
- Padding: 20-30px
- Fondo: #232323
- Border: 1px solid #404040

// Buttons
- Primary: #11c26d (verde)
- Secondary: #1f92c4 (azul)
- Padding: 10px 20px
- Border-radius: 6px

// Tables
- Zebra striping
- Hover row: background change
- Borders: 1px solid #404040
```

### **Responsive (Riday):**
```
xs: <576px   → Sidebar oculto, toggle visible
sm: ≥576px   → Sidebar oculto, toggle visible
md: ≥768px   → Sidebar colapsado (iconos only)
lg: ≥992px   → Sidebar completo visible
xl: ≥1200px  → Sidebar completo + layout expandido
```

### **Animaciones (Riday):**
```css
- Sidebar collapse/expand: 0.3s ease
- Dropdown menus: 0.2s ease
- Hover states: 0.2s ease
- Card hover: 0.2s ease
```

---

## 📁 ESTRUCTURA DE CARPETAS PROPUESTA

```
digitalLetterFrontEnd/
├── .claude/
│   ├── agents/                    # Agentes especializados
│   │   ├── README.md
│   │   ├── ARCHITECTURE.md
│   │   ├── COMMIT_FORMAT.md
│   │   ├── project-manager.md
│   │   ├── setup-react.md
│   │   ├── build-react.md
│   │   ├── review-react.md
│   │   ├── fix-react.md
│   │   ├── test-react.md
│   │   └── doc-react.md
│   └── PROJECT_OVERVIEW.md        # Este archivo
│
├── src/
│   ├── features/
│   │   ├── menu/                  # SECCIÓN PÚBLICA (Pepper)
│   │   │   ├── components/
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── CategoryFilter.jsx
│   │   │   │   ├── ProductGrid.jsx
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   ├── SpecialOffers.jsx
│   │   │   │   ├── Testimonials.jsx
│   │   │   │   └── LocationMap.jsx
│   │   │   ├── pages/
│   │   │   │   ├── HomePage.jsx
│   │   │   │   ├── ContactPage.jsx
│   │   │   │   ├── PrivacyPage.jsx
│   │   │   │   └── NotFoundPage.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useProducts.js
│   │   │   └── index.js
│   │   │
│   │   └── admin/                 # SECCIÓN ADMIN (Riday)
│   │       ├── products/
│   │       │   ├── components/
│   │       │   │   ├── ProductTable.jsx
│   │       │   │   ├── ProductForm.jsx
│   │       │   │   └── ProductFilters.jsx
│   │       │   ├── hooks/
│   │       │   │   └── useProducts.js
│   │       │   └── index.js
│   │       ├── users/
│   │       │   ├── components/
│   │       │   ├── hooks/
│   │       │   └── index.js
│   │       ├── categories/
│   │       │   ├── components/
│   │       │   ├── hooks/
│   │       │   └── index.js
│   │       └── ingredients/
│   │           ├── components/
│   │           ├── hooks/
│   │           └── index.js
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── menu/              # Componentes estilo Pepper
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   └── Badge.jsx
│   │   │   │
│   │   │   ├── admin/             # Componentes estilo Riday
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Topbar.jsx
│   │   │   │   ├── DashboardCard.jsx
│   │   │   │   ├── Table.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── Breadcrumb.jsx
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── MenuLayout.jsx      # Layout para Pepper
│   │   │   │   └── AdminLayout.jsx     # Layout para Riday
│   │   │   │
│   │   │   └── common/
│   │   │       ├── LoadingSpinner.jsx
│   │   │       ├── ErrorMessage.jsx
│   │   │       └── ConfirmDialog.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useFetch.js
│   │   │   ├── useDebounce.js
│   │   │   └── useSidebar.js
│   │   │
│   │   ├── services/
│   │   │   ├── api.js                  # Axios instance + interceptors
│   │   │   ├── authService.js          # JWT login/logout/refresh
│   │   │   ├── productService.js
│   │   │   ├── userService.js
│   │   │   ├── categoryService.js
│   │   │   └── ingredientService.js
│   │   │
│   │   ├── utils/
│   │   │   ├── formatters.js
│   │   │   ├── validators.js
│   │   │   └── helpers.js
│   │   │
│   │   ├── constants/
│   │   │   ├── routes.js
│   │   │   ├── api-endpoints.js
│   │   │   └── config.js
│   │   │
│   │   └── contexts/
│   │       └── AuthContext.jsx
│   │
│   ├── pages/
│   │   ├── menu/
│   │   │   ├── MenuHomePage.jsx
│   │   │   ├── MenuContactPage.jsx
│   │   │   └── MenuPrivacyPage.jsx
│   │   │
│   │   └── admin/
│   │       ├── DashboardPage.jsx
│   │       ├── ProductsPage.jsx
│   │       ├── UsersPage.jsx
│   │       ├── CategoriesPage.jsx
│   │       └── IngredientsPage.jsx
│   │
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── styles/
│   │   ├── index.css              # Tailwind imports + global
│   │   ├── pepper.css             # Estilos específicos Pepper
│   │   └── riday.css              # Estilos específicos Riday
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── public/
│   └── favicon.ico
│
├── .env.example
├── .env
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
├── jsconfig.json
└── README.md
```

---

## 🛠️ STACK TECNOLÓGICO

### **Frontend:**
- React 18
- Vite (build tool)
- TailwindCSS (styling)
- React Router (routing)
- Axios (HTTP client)
- React Hook Form (formularios)
- Vitest + Testing Library (testing)

### **Backend:**
- Django 5.2.3
- Django REST Framework
- Simple JWT (autenticación)
- PostgreSQL/SQLite

### **Deploy:**
- Vercel o GitHub Pages (por decidir)

### **Librerías adicionales (a considerar):**
- Font Awesome (iconos)
- React Hot Toast (notificaciones)
- date-fns (fechas)
- Zustand o Context API (estado global)

---

## 🎯 CONFIGURACIÓN TAILWIND

```javascript
// tailwind.config.js
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pepper colors
        pepper: {
          orange: '#ff9100',
          yellow: '#ffcc00',
          red: '#ff003c',
          green: '#0a9900',
          blue: '#0080ff',
        },
        // Riday colors
        riday: {
          green: '#11c26d',
          blue: '#1f92c4',
        },
        // Dark theme (Riday)
        dark: {
          bg: '#1a1a1a',
          sidebar: '#2d2d2d',
          card: '#232323',
          header: '#333333',
          border: '#404040',
        },
        // Text colors
        text: {
          primary: '#ffffff',
          secondary: '#a9a9a9',
          muted: '#6b7280',
          charcoal: '#1a1a1a',
        }
      },
      fontFamily: {
        'cherry-bomb': ['Cherry Bomb One', 'sans-serif'],
        'gabarito': ['Gabarito', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        '250': '250ms',
      }
    }
  },
  plugins: [],
}
```

---

## 🔐 RUTAS DEL PROYECTO

```javascript
// React Router setup
const routes = [
  // SECCIÓN PÚBLICA (Pepper)
  {
    path: '/',
    element: <MenuLayout />,
    children: [
      { index: true, element: <MenuHomePage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'terms', element: <TermsPage /> },
    ]
  },

  // SECCIÓN ADMIN (Riday) - Requiere Auth
  {
    path: '/admin',
    element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'ingredients', element: <IngredientsPage /> },
    ]
  },

  // Login
  { path: '/login', element: <LoginPage /> },

  // 404
  { path: '*', element: <NotFoundPage /> },
];
```

---

## 👨‍💻 METODOLOGÍA DE TRABAJO

### **Flujo de Desarrollo:**

1. **PLANIFICACIÓN** (PROJECT-MANAGER)
   - Definir roadmap
   - Crear tareas
   - Generar PROJECT_CONTEXT.md

2. **SETUP** (SETUP Agent)
   - Inicializar Vite + React
   - Configurar Tailwind CSS
   - Setup React Router
   - Configurar path aliases
   - Setup testing (Vitest)
   - Variables de entorno

3. **DESARROLLO** (BUILD Agent)
   - Crear componentes
   - Implementar features
   - Trabajar en ramas: `feature/nombre`
   - Commits: `feat: ✨ descripción`

4. **REVISIÓN** (REVIEW Agent)
   - Analizar código
   - Detectar problemas
   - Clasificar por severidad

5. **CORRECCIÓN** (FIX Agent)
   - Corregir bugs
   - Implementar mejoras
   - Trabajar en ramas: `fix/nombre`
   - Commits: `fix: 🐛 descripción`

6. **TESTING** (TEST Agent)
   - Crear tests
   - Objetivo: 60-80% coverage
   - Trabajar en ramas: `test/nombre`
   - Commits: `test: ✅ descripción`

7. **DOCUMENTACIÓN** (DOC Agent)
   - Actualizar README
   - Documentar componentes
   - Trabajar en ramas: `docs/nombre`
   - Commits: `docs: 📝 descripción`

### **Git Workflow:**
- ✅ SIEMPRE trabajar en ramas (`feature/`, `fix/`, `test/`, `docs/`)
- ❌ NUNCA trabajar directamente en `main` o `develop`
- ✅ Commits con formato específico (ver COMMIT_FORMAT.md)
- ❌ **NUNCA aparecer como co-autor en commits**

### **Roles:**
- **Usuario (Jalberth):** Escribe el código, aprende
- **Claude (Yo):** Consultor, revisor, guía
- **Agentes:** Revisan y corrigen código

---

## 🚨 REGLAS CRÍTICAS

### **1. COMMITS:**
```
🚨 NUNCA aparecer como co-autor en commits
🚨 NUNCA incluir "Co-Authored-By: Claude"
```

**Formato correcto:**
```
tipo: emoji descripción breve

Sección Principal:
- Detalle 1
- Detalle 2

Breaking Changes (si aplica):
- Cambio que rompe compatibilidad
```

### **2. GIT:**
- ✅ SIEMPRE crear rama antes de implementar
- ✅ NUNCA trabajar en `main` o `develop`
- ✅ Push de rama y preguntar si crear PR

### **3. CÓDIGO:**
- ✅ Código de CALIDAD pero ENTENDIBLE (usuario tiene nivel básico React)
- ✅ Explicar conceptos cuando sea necesario
- ✅ Preferir componentes funcionales
- ✅ Usar hooks de React correctamente

### **4. DISEÑO:**
- ✅ Replicar FIELMENTE Pepper y Riday
- ✅ Usar EXACTAMENTE las mismas paletas de colores
- ✅ Mantener estructura visual idéntica
- ❌ NO incluir Chart.js ni gráficos (hasta que se solicite)

---

## 📊 DIFERENCIAS CLAVE: Pepper vs Riday

| Aspecto | Pepper (Menú Público) | Riday (Panel Admin) |
|---------|----------------------|---------------------|
| **URL** | `/` | `/admin` |
| **Usuarios** | Clientes del restaurante | Dueños/empleados |
| **Auth** | NO | SÍ (JWT) |
| **Colores** | Naranja (#ff9100) vibrante | Verde (#11c26d) oscuro |
| **Layout** | Hero + Grid productos | Sidebar + Dashboard |
| **Tipografía** | Cherry Bomb One + Gabarito | Inter/System fonts |
| **Objetivo** | Atraer y mostrar | Gestionar datos |
| **Animaciones** | Muchas (experiencia) | Mínimas (funcionalidad) |
| **Complejidad** | Simple, directo | Complejo, tablas, forms |

---

## 📝 NOTAS IMPORTANTES

### **Usuario (Jalberth):**
- Nivel React: Básico
- Nivel Tailwind: Intermedio
- Objetivo: Aprender en el proceso
- Proyecto: Presentación a cliente real

### **Contexto del Proyecto:**
- Este frontend se conecta al backend Digital Letter
- Backend ya está en producción
- Frontend será desplegado en Vercel o GitHub Pages
- Proyecto serio para cliente real

### **Prioridades:**
1. Página pública (Menú Pepper) - Lo que ve el cliente
2. Panel admin (Riday) - Herramienta del dueño
3. Código de calidad pero entendible
4. Testing (60-80% coverage)
5. Documentación clara

---

## 🎯 PRÓXIMOS PASOS

1. **Ejecutar PROJECT-MANAGER** para crear roadmap detallado
2. **Ejecutar SETUP** para configurar proyecto base
3. **Desarrollo incremental** componente por componente
4. **Revisión continua** con agentes REVIEW y FIX
5. **Testing** con agente TEST
6. **Documentación** con agente DOC

---

## 📚 REFERENCIAS

### **Diseños:**
- Pepper: https://pepper.framer.website/
- Riday: https://riday-admin-template.multipurposethemes.com/bs5/main-dark/index3.html

### **Backend:**
- Local: `/Users/jalberth/Documents/py/projectsInProductions/digitalLetter`
- GitHub: https://github.com/jalmosquera/digitalLetter

### **Documentación:**
- React: https://react.dev/
- Vite: https://vitejs.dev/
- Tailwind: https://tailwindcss.com/
- Vitest: https://vitest.dev/
- Testing Library: https://testing-library.com/react

---

**Versión:** 1.0
**Creado:** 2025-10-28
**Proyecto:** digitalLetterFrontEnd
**Estado:** Análisis completo ✅ | Desarrollo pendiente ⏳


ambos proyectos estan en produccion ya hay que hay que ser sumamente cuidadosos (siempre trabajar sobre una rama nueva y al final si apruebo todo para produccion debes limpiar todo y dejar solo la rama main con ultimos cambios en local y en gh)