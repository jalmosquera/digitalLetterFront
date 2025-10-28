# FORMATO DE COMMITS - OBLIGATORIO

## 🚨 REGLA CRÍTICA

**NUNCA aparecer como co-autor en los commits bajo ninguna circunstancia.**

## FORMATO ESTÁNDAR

Todos los commits deben seguir este formato:

```
tipo: emoji descripción breve en inglés

Sección Principal:
- Detalle 1
- Detalle 2
- Detalle 3

Sección Adicional (si aplica):
- Detalle 1
- Detalle 2

Breaking Changes (solo si aplica):
- Cambio que rompe compatibilidad

Migration Guide (solo si aplica):
1. Paso 1
2. Paso 2
3. Paso 3
```

## TIPOS DE COMMIT

- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bugs o seguridad
- `docs:` - Cambios en documentación
- `style:` - Cambios de formato (no afectan código)
- `refactor:` - Refactorización sin cambiar funcionalidad
- `test:` - Agregar o modificar tests
- `chore:` - Tareas de mantenimiento, dependencias, configuración

## EMOJIS RECOMENDADOS

- 🔒 Security
- ⚡ Performance
- 🎨 UI/Styles
- 🐛 Bug fix
- ✨ New feature
- 📝 Documentation
- 🔧 Configuration
- ♻️ Refactor
- ✅ Tests
- 🚀 Deployment
- 🔥 Remove code/files
- 💄 UI cosmetic
- 🌐 Internationalization
- ♿ Accessibility
- 🔊 Logging
- 🔇 Remove logging

## SECCIONES COMUNES

### Para `feat:` (Nueva funcionalidad)
```
feat: ✨ descripción breve

New Features:
- Feature 1
- Feature 2

Improvements:
- Improvement 1
- Improvement 2

Dependencies (si aplica):
- Dependency added/updated

Breaking Changes (solo si aplica):
- Breaking change description

Migration Guide (solo si aplica):
1. Step 1
2. Step 2
```

### Para `fix:` (Corrección)
```
fix: 🐛 descripción breve

Bug Fixes:
- Fix 1
- Fix 2

Security Fixes (si aplica):
- Security fix 1
- Security fix 2

Configuration Improvements (si aplica):
- Config change 1
- Config change 2

Breaking Changes (solo si aplica):
- Breaking change

Migration Guide (solo si aplica):
1. Step 1
2. Step 2
```

### Para `test:` (Tests)
```
test: ✅ descripción breve

Tests Added:
- Test 1
- Test 2

Coverage:
- Coverage percentage achieved

Test Improvements (si aplica):
- Improvement 1
```

### Para `docs:` (Documentación)
```
docs: 📝 descripción breve

Documentation Added:
- Doc 1
- Doc 2

Examples Added (si aplica):
- Example 1
- Example 2

Updates (si aplica):
- Update 1
```

### Para `refactor:` (Refactorización)
```
refactor: ♻️ descripción breve

Refactoring:
- Change 1
- Change 2

Improvements:
- Improvement 1
- Improvement 2

Breaking Changes (solo si aplica):
- Breaking change
```

### Para `chore:` (Mantenimiento)
```
chore: 🔧 descripción breve

Configuration:
- Config 1
- Config 2

Dependencies (si aplica):
- Dependency 1
- Dependency 2

Build (si aplica):
- Build change 1
```

## EJEMPLO COMPLETO (del backend Digital Letter)

```
fix: 🔒 critical security hardening and configuration improvements

Security Fixes (CRITICAL):
- Remove hardcoded SECRET_KEY from settings.py, use environment variable
- Change DEBUG to False by default, load from environment
- Fix ALLOWED_HOSTS to use environment variable instead of wildcard ['*']
- Add SECRET_KEY validation in production.py to prevent startup without key
- Enable IsAuthenticated as default DRF permission class

Configuration Improvements:
- Implement python-dotenv for environment variable management
- Add load_dotenv in settings.py for local .env file support
- Update SPECTACULAR_SETTINGS with proper project title and description in English
- Improve .env.example with correct production variables

Dependencies:
- python-dotenv already present in requirements.txt (v1.1.1)

Breaking Changes:
- Apps now require .env file in development or environment variables set
- Production deployments must have SECRET_KEY environment variable set

Migration Guide:
1. Copy .env.example to .env
2. Generate SECRET_KEY: python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
3. Set SECRET_KEY in .env file
4. Configure other variables as needed
```

## EJEMPLO: feat (Build Agent)
```
feat: ✨ add ProductCard component with hover effects

New Features:
- ProductCard component with image, name, and price display
- Hover state showing product details overlay
- Add to cart button with onClick handler

Improvements:
- Responsive design using Tailwind CSS breakpoints
- Accessible button with proper ARIA labels

Dependencies:
- No new dependencies required
```

## EJEMPLO: fix (Fix Agent)
```
fix: 🐛 prevent memory leak in Timer component

Bug Fixes:
- Add cleanup function to useEffect for interval clearing
- Prevent state updates on unmounted component
- Fix stale closure by using functional setState

Performance Improvements:
- Reduce unnecessary re-renders
- Optimize interval management

Breaking Changes:
- None
```

## EJEMPLO: test (Test Agent)
```
test: ✅ add ProductCard and useFetch tests

Tests Added:
- ProductCard render test
- ProductCard interaction test (add to cart)
- ProductCard hover state test
- useFetch successful fetch test
- useFetch error handling test

Coverage:
- ProductCard: 90%
- useFetch: 85%
- Overall project: 75%

Test Improvements:
- Use userEvent instead of fireEvent for better UX simulation
```

## EJEMPLO: docs (Doc Agent)
```
docs: 📝 add comprehensive project documentation

Documentation Added:
- Complete README.md with installation, usage, and examples
- COMPONENTS.md with all component props and usage
- CONTRIBUTING.md with contribution guidelines

Examples Added:
- Button component usage examples
- ProductCard integration examples
- API integration examples

Updates:
- Update outdated dependency versions in docs
- Fix broken links in navigation
```

## REGLAS IMPORTANTES

1. **Primera línea:** Máximo 72 caracteres
2. **Cuerpo:** Líneas de máximo 80 caracteres
3. **Idioma:** Inglés (a menos que el proyecto sea específicamente en español)
4. **Tiempo verbal:** Imperativo ("add" no "added" ni "adds")
5. **Claridad:** Ser específico sobre QUÉ cambió y POR QUÉ
6. **Sin co-autores:** NUNCA incluir "Co-Authored-By: Claude" ni similares

## RECUERDA

- Commits claros = historial útil
- Commits detallados = mejor debugging
- Commits consistentes = equipo feliz
- 🚨 NUNCA aparecer como co-autor
