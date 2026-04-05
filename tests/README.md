# Tests

## Organizacion

```
tests/
├── login.spec.ts       # Tests de login (valores limite)
├── register.spec.ts    # Tests de registro (particion de equivalencia)
└── README.md           # Este archivo
```

## Convenciones

- **Un archivo por pagina/funcionalidad.** No mezcles tests de login con tests de registro.
- **Usa `test.describe`** para agrupar tests relacionados dentro del mismo archivo.
- **Nombres descriptivos.** El nombre del test debe decir que esperas que pase:
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

1. Si es una pagina nueva, crea su Page Object en `pages/`
2. Agrega el fixture en `fixtures/base.fixture.ts`
3. Crea el archivo `.spec.ts` en este directorio
4. Importa `test` y `expect` desde `../fixtures/base.fixture`
