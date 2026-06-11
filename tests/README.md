# Tests

## 🐛 Algunos tests fallan a propósito (y está bien)

Este Kit apunta por defecto al playground [Academia sin Humo](https://playground.calidadsinhumo.com),
que tiene **bugs intencionales** para que practiques. Los tests de este Kit están
escritos contra la **especificación** (lo que la app DEBERÍA hacer), así que cuando
un test se pone rojo no significa que el Kit esté roto: significa que **acabás de
encontrar un bug real**. Ese es exactamente tu trabajo como QA.

Tests que fallan hoy contra el playground (etiquetados con `@revela-bug`):

| Test | Bug que revela | Técnica ISTQB |
|------|----------------|---------------|
| `register.spec.ts` → "rechaza password mayor a 64 caracteres" | **R-1**: la app acepta 65 caracteres | Valores límite |
| `register.spec.ts` → "rechaza email sin dominio" | **R-2**: la app acepta `usuario@` sin dominio | Partición de equivalencia |
| `register.spec.ts` → "limpia el formulario después de un registro exitoso" | **R-3**: el formulario no se limpia | Comportamiento del formulario |

```bash
# Correr SOLO los tests que revelan bugs (para estudiarlos)
npx playwright test --grep "@revela-bug"

# Correr todo MENOS esos (lo que hace el CI — debería dar verde)
npx playwright test --grep-invert "@revela-bug"
```

Cada rojo es una mini-lección: abrí el test, leé qué esperaba según la spec,
y compará con lo que la app hace de verdad. Después validá tu hallazgo en el
[modo desafío](https://playground.calidadsinhumo.com/desafio).

> 💡 Si apuntás `BASE_URL` a tu propia aplicación (una sin bugs intencionales),
> los tests deberían pasar todos. El Kit no está roto — el playground sí, a propósito.

## Organización

```
tests/
├── login.spec.ts       # Tests de login (valores límite)
├── register.spec.ts    # Tests de registro (partición de equivalencia)
└── README.md           # Este archivo
```

## Convenciones

- **Un archivo por página/funcionalidad.** No mezcles tests de login con tests de registro.
- **Usa `test.describe`** para agrupar tests relacionados dentro del mismo archivo.
- **Nombres descriptivos.** El nombre del test debe decir qué esperas que pase:
  - Bien: `"rechaza password menor a 8 caracteres"`
  - Mal: `"test password"`
- **Datos centralizados.** Usa `test-data/users.ts` en vez de hardcodear strings en los tests.
- **Page Objects siempre.** Nunca uses `page.locator()` directamente en un test. Usa el Page Object.

## Ejecutar tests

```bash
# Todos los tests
npm test

# Solo un archivo
npx playwright test tests/login.spec.ts

# Con navegador visible
npm run test:headed

# Modo debug (paso a paso)
npm run test:debug

# UI interactiva
npm run test:ui
```

## Agregar un test nuevo

1. Si es una página nueva, crea su Page Object en `pages/`
2. Agrega el fixture en `fixtures/base.fixture.ts`
3. Crea el archivo `.spec.ts` en este directorio
4. Importa `test` y `expect` desde `../fixtures/base.fixture`
