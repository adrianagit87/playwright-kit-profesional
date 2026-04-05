# Playwright Kit Profesional

Kit de arranque para automatizacion de pruebas con [Playwright](https://playwright.dev/) y TypeScript. Estructura profesional lista para usar desde el dia 1.

Creado por [Adriana Troche Robles](https://calidadsinhumo.com/about) como parte del ecosistema de practica de [Calidad sin Humo](https://calidadsinhumo.com).

---

## Que incluye

- **Page Object Model** listo para usar (`pages/`)
- **Fixtures personalizados** que inyectan tus Page Objects automaticamente (`fixtures/`)
- **Tests de ejemplo** que funcionan contra [Academia sin Humo](https://playground.calidadsinhumo.com) (`tests/`)
- **Datos de prueba centralizados** (`test-data/`)
- **CI/CD con GitHub Actions** configurado y listo (`.github/workflows/`)
- **TypeScript** con configuracion estricta

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- [Git](https://git-scm.com/)
- Un editor de codigo (recomiendo [VS Code](https://code.visualstudio.com/) con la extension de Playwright)

## Instalacion

### Opcion 1: Usa este template (recomendado)

1. Haz clic en el boton **"Use this template"** de este repositorio
2. Ponle un nombre a tu repo y clonalo
3. Instala las dependencias:

```bash
npm install
npx playwright install
```

### Opcion 2: Clona directamente

```bash
git clone https://github.com/TU-USUARIO/playwright-kit-profesional.git
cd playwright-kit-profesional
npm install
npx playwright install
```

## Tu primer test

Ejecuta los tests de ejemplo para verificar que todo funciona:

```bash
npm test
```

Deberia correr los tests contra [Academia sin Humo](https://playground.calidadsinhumo.com) (nuestro playground de practica) y mostrarte los resultados.

Para ver el reporte HTML:

```bash
npm run report
```

## Conectar con tu app

Por defecto, los tests apuntan a `playground.calidadsinhumo.com`. Para testear tu propia aplicacion:

1. Copia el archivo de ejemplo:

```bash
cp .env.example .env
```

2. Edita `.env` con la URL de tu app:

```
BASE_URL=http://localhost:3000
```

3. Adapta los Page Objects en `pages/` a los selectores de tu app.

## Estructura del proyecto

```
playwright-kit-profesional/
├── pages/                    # Page Objects (un archivo por pagina)
│   ├── BasePage.ts           # Clase base con metodos comunes
│   ├── LoginPage.ts          # POM del login
│   └── RegisterPage.ts       # POM del registro
├── tests/                    # Tests organizados por funcionalidad
│   ├── login.spec.ts         # Tests de login
│   └── register.spec.ts      # Tests de registro
├── fixtures/                 # Fixtures personalizados
│   └── base.fixture.ts       # Inyecta Page Objects en tus tests
├── test-data/                # Datos de prueba centralizados
│   └── users.ts              # Usuarios validos e invalidos
├── .github/workflows/        # CI/CD
│   └── tests.yml             # GitHub Actions: ejecuta tests en cada push
├── playwright.config.ts      # Configuracion de Playwright
└── package.json              # Dependencias y scripts
```

## Comandos disponibles

| Comando | Que hace |
|---------|----------|
| `npm test` | Ejecuta todos los tests |
| `npm run test:headed` | Ejecuta con navegador visible |
| `npm run test:ui` | Abre la UI interactiva de Playwright |
| `npm run test:debug` | Ejecuta en modo debug (paso a paso) |
| `npm run report` | Abre el reporte HTML del ultimo test |

## Como agregar un test nuevo

1. **Crea el Page Object** en `pages/` (hereda de `BasePage`)
2. **Registra el fixture** en `fixtures/base.fixture.ts`
3. **Crea el test** en `tests/` importando desde `fixtures/base.fixture`
4. **Agrega datos** en `test-data/` si necesitas datos de prueba

## Aprende mas

Este Kit es parte del ecosistema de practica de [Calidad sin Humo](https://calidadsinhumo.com). Complementa estas guias:

- [De QA manual a automatizacion — Parte 1: por donde empezar](https://calidadsinhumo.com/guias/guia-de-qa-manual-a-automatizacion)
- [De QA manual a automatizacion — Parte 2: arquitectura y pipeline](https://calidadsinhumo.com/guias/guia-de-junior-a-qa-automation-engineer)
- [ISTQB con codigo: particion de equivalencia y valores limite](https://calidadsinhumo.com/istqb-sin-humo/istqb-con-codigo-parte-1)

## Practica con Academia sin Humo

[Academia sin Humo](https://playground.calidadsinhumo.com) es una app web disenada para que practiques automatizacion. Tiene escenarios reales con bugs intencionales para que los encuentres y automatices.

Los tests de este Kit ya apuntan a la Academia. Haz fork, ejecuta `npm test`, y empieza a practicar.

---

Hecho con cafe y testing por [Adriana Troche Robles](https://calidadsinhumo.com/about)
