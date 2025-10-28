# React Agents - Sistema de Desarrollo Colaborativo

Sistema de agentes especializados para desarrollo React + Vite + Tailwind CSS.

## 📋 Agentes Disponibles

### 1. PROJECT-MANAGER
**Archivo:** `project-manager.md`

**Responsabilidades:**
- Entrevista inicial y recopilación de requisitos
- Análisis y planificación del proyecto
- Creación de roadmap detallado
- Generación de PROJECT_CONTEXT.md
- Seguimiento continuo del progreso

**Cuándo usar:**
- Al inicio del proyecto
- Para revisar progreso: "PM, ¿cómo vamos?"
- Para obtener siguiente tarea: "PM, ¿qué sigue?"

---

### 2. SETUP
**Archivo:** `setup-react.md`

**Responsabilidades:**
- Inicializar proyecto Vite + React
- Configurar Tailwind CSS
- Setup ESLint + Prettier
- Crear estructura de carpetas
- Configurar path aliases
- Setup testing (Vitest)
- Configurar variables de entorno

**Cuándo usar:**
- Al inicio del proyecto (después de PROJECT-MANAGER)
- Para configurar herramientas adicionales

**Commits:**
- Tipo: `chore:` con emoji 🔧

---

### 3. BUILD
**Archivo:** `build-react.md`

**Responsabilidades:**
- Crear nuevos componentes
- Implementar nuevas features
- Crear custom hooks
- Desarrollar páginas/vistas

**Modo de trabajo:**
- **Modo EJECUCIÓN:** Cuando las instrucciones son claras
- **Modo CONSULTOR:** Cuando la idea es vaga (hace preguntas)

**Git workflow:**
- SIEMPRE crea rama `feature/nombre-descriptivo`
- NUNCA trabaja directamente en main/develop
- Commits tipo: `feat:` con emoji ✨

**Cuándo usar:**
- Para crear nuevo código
- Para implementar funcionalidades nuevas

---

### 4. REVIEW
**Archivo:** `review-react.md`

**Responsabilidades:**
- Analizar código existente
- Detectar problemas (bugs, memory leaks, performance)
- Clasificar por severidad (🔴 CRÍTICO, 🟡 IMPORTANTE, 🟢 MENOR)
- Sugerir mejoras
- **NO implementa** (solo analiza)

**Áreas de revisión:**
- React Hooks (useEffect cleanup, dependencies, rules)
- Performance (re-renders, memo, callbacks)
- Estado y Props
- Código limpio
- Accesibilidad
- Tailwind CSS usage

**Cuándo usar:**
- Después de escribir código
- Antes de hacer PR
- Cuando sospechas problemas de performance

**Este agente NO crea commits** (solo analiza)

---

### 5. FIX
**Archivo:** `fix-react.md`

**Responsabilidades:**
- Corregir bugs
- Implementar mejoras sugeridas por REVIEW
- Refactorizar código
- Optimizar performance

**Git workflow:**
- SIEMPRE crea rama `fix/nombre-descriptivo`
- NUNCA trabaja directamente en main/develop
- Commits tipo: `fix:` con emoji 🐛

**Tipos de correcciones:**
- Memory leaks
- Infinite loops
- Props drilling
- Performance optimization
- Code refactoring

**Cuándo usar:**
- Después de un análisis de REVIEW
- Cuando encuentras bugs
- Para refactorizar código

---

### 6. TEST
**Archivo:** `test-react.md`

**Responsabilidades:**
- Crear tests con Vitest + Testing Library
- Tests de componentes
- Tests de hooks
- Tests de integración
- Medir cobertura (objetivo: 60-80%)

**Git workflow:**
- SIEMPRE crea rama `test/nombre-descriptivo`
- NUNCA trabaja directamente en main/develop
- Commits tipo: `test:` con emoji ✅

**Filosofía:**
- Cobertura 60-80% con tests de calidad
- NO busca 100% de cobertura
- 3-5 tests por componente/hook máximo
- Testear comportamiento, no implementación

**Cuándo usar:**
- Después de crear componentes
- Para validar funcionalidad
- Antes de deployment

---

### 7. DOC
**Archivo:** `doc-react.md`

**Responsabilidades:**
- Crear/actualizar README.md
- Documentar componentes (COMPONENTS.md)
- Guías de contribución (CONTRIBUTING.md)
- JSDoc inline
- Storybook (opcional)

**Git workflow:**
- SIEMPRE crea rama `docs/nombre-descriptivo`
- NUNCA trabaja directamente en main/develop
- Commits tipo: `docs:` con emoji 📝

**Cuándo usar:**
- Al final del desarrollo
- Cuando agregas nuevos componentes
- Antes de hacer release

---

## 🔄 Flujo de Trabajo Recomendado

### Setup Inicial
```
1. PROJECT-MANAGER → Planificación y roadmap
2. SETUP → Configurar proyecto base
```

### Ciclo de Desarrollo
```
3. BUILD → Crear código nuevo (feature/xxx)
4. REVIEW → Analizar código
5. FIX → Corregir problemas (fix/xxx)
6. TEST → Crear tests (test/xxx)
7. DOC → Documentar (docs/xxx)
```

### Repetir ciclo 3-7 para cada feature

---

## 🚨 REGLAS CRÍTICAS

### Formato de Commits
**Ver:** `COMMIT_FORMAT.md` para detalles completos

**Regla #1:** NUNCA aparecer como co-autor en commits

**Formato estándar:**
```
tipo: emoji descripción breve

Sección Principal:
- Detalle 1
- Detalle 2

Breaking Changes (si aplica):
- Cambio que rompe compatibilidad

Migration Guide (si aplica):
1. Paso 1
2. Paso 2
```

### Git Workflow

**NUNCA trabajar directamente en `main` o `develop`**

**Siempre:**
1. Crear rama específica (`feature/`, `fix/`, `test/`, `docs/`)
2. Implementar cambios
3. Commit con formato correcto
4. Push de la rama
5. Preguntar al usuario si crear PR

---

## 📝 Comandos de Proyecto Manager

```bash
# Ver progreso
PM, ¿cómo vamos?

# Marcar tarea completa
PM, terminé [tarea]

# Obtener siguiente tarea
PM, ¿qué sigue?

# Reportar bloqueo
PM, bloqueo en [tarea]
```

---

## 📊 Ejemplo de Flujo Completo

### 1. Inicio del Proyecto
```
Usuario: "Necesito un dashboard React para gestión de productos"
        ↓
PROJECT-MANAGER: Entrevista → Roadmap → PROJECT_CONTEXT.md
        ↓
SETUP: Vite + React + Tailwind + estructura
```

### 2. Desarrollo de Feature
```
BUILD: Crear ProductCard component (feature/product-card)
        ↓
REVIEW: Analizar ProductCard → detectar problema de re-renders
        ↓
FIX: Optimizar con memo + useCallback (fix/product-card-performance)
        ↓
TEST: Tests para ProductCard (test/product-card)
        ↓
DOC: Documentar ProductCard en COMPONENTS.md (docs/product-card)
        ↓
PR → Merge a develop
```

### 3. Repetir para cada feature

---

## 🎯 Tips de Uso

### Para el Usuario (Developer)

1. **Empieza siempre con PROJECT-MANAGER** para tener un plan claro
2. **Usa BUILD en modo consultor** cuando no estés seguro de la arquitectura
3. **Ejecuta REVIEW antes de hacer PR** para detectar problemas temprano
4. **No omitas TEST** - 60-80% de cobertura es profesional
5. **Documenta al final** con DOC para futuro mantenimiento

### Para Claude (asistente)

1. **Lee el agente específico** antes de actuar
2. **Sigue el formato de commits** de COMMIT_FORMAT.md
3. **NUNCA aparezcas como co-autor**
4. **Trabaja en ramas separadas** siempre
5. **Sé incremental** - una cosa a la vez

---

## 📂 Estructura de .claude/agents/

```
.claude/agents/
├── README.md              # Este archivo
├── ARCHITECTURE.md        # 🏗️ Arquitectura del proyecto (Feature-Based)
├── COMMIT_FORMAT.md       # Formato de commits (CRÍTICO)
├── project-manager.md     # Agente 1: Planificación
├── setup-react.md         # Agente 2: Setup
├── build-react.md         # Agente 3: Build
├── review-react.md        # Agente 4: Review
├── fix-react.md           # Agente 5: Fix
├── test-react.md          # Agente 6: Test
└── doc-react.md           # Agente 7: Doc
```

## 🏗️ Arquitectura del Proyecto

Este proyecto usa **estructura modular por feature (Feature-Based Architecture)**.

**Lee ARCHITECTURE.md para detalles completos.**

**Resumen:**
```
src/
├── features/        # Por dominio: products, users, categories, ingredients
├── shared/          # Código compartido: components, hooks, services
├── pages/           # Route components
└── assets/          # Static files
```

**Integración con Linear:** ❌ No configurado (opcional para futuro)

---

## ⚠️ Importante

- Estos agentes son **guías**, no scripts automáticos
- Claude debe **leer y entender** cada agente antes de actuar
- El **usuario tiene control total** sobre qué y cuándo se hace
- Los agentes trabajan **incrementalmente** - una tarea a la vez
- **Comunicación clara** entre usuario y Claude es esencial

---

## 🔗 Referencias

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/react)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Versión:** 1.0
**Última actualización:** 2025-10-28
**Proyecto:** digitalLetterFrontEnd
