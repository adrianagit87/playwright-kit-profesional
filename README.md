# Playwright Kit Profesional

Kit de arranque para automatización de pruebas con [Playwright](https://playwright.dev/) y TypeScript. Estructura profesional lista para usar desde el día 1.

Creado por [Adriana Troche Robles](https://calidadsinhumo.com/about) como parte del ecosistema de práctica de [Calidad sin Humo](https://calidadsinhumo.com).

---

## Qué incluye

- **Page Object Model** listo para usar (`pages/`)
- **Fixtures personalizados** que inyectan tus Page Objects automáticamente (`fixtures/`)
- **Tests de ejemplo** que funcionan contra [Academia sin Humo](https://playground.calidadsinhumo.com) (`tests/`)
- **Datos de prueba centralizados** (`test-data/`)
- **CI/CD con GitHub Actions** configurado y listo (`.github/workflows/`)
- **TypeScript** con configuración estricta

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- [Git](https://git-scm.com/)
- Un editor de código (recomiendo [VS Code](https://code.visualstudio.com/) con la extensión de Playwright)

## Instalación

### Opción 1: Usa este template (recomendado)

1. Haz clic en el botón **"Use this template"** de este repositorio
2. Ponle un nombre a tu repo y clónalo
3. Instala las dependencias:

```bash
npm install
npx playwright install
```

### Opción 2: Clona directamente

```bash
git clone https://github.com/adrianagit87/playwright-kit-profesional.git
cd playwright-kit-profesional
npm install
npx playwright install
```

## Tu primer test

Ejecuta los tests de ejemplo para verificar que todo funciona:

```bash
npm test
```

Debería correr los tests contra [Academia sin Humo](https://playground.calidadsinhumo.com) (nuestro playground de práctica) y mostrarte los resultados.

Para ver el reporte HTML:

```bash
npm run report
```

## Conectar con tu app

Por defecto, los tests apuntan a `playground.calidadsinhumo.com`. Para testear tu propia aplicación:

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
├── pages/                    # Page Objects (un archivo por página)
│   ├── BasePage.ts           # Clase base con métodos comunes
│   ├── LoginPage.ts          # POM del login
│   └── RegisterPage.ts       # POM del registro
├── tests/                    # Tests organizados por funcionalidad
│   ├── login.spec.ts         # Tests de login
│   └── register.spec.ts      # Tests de registro
├── fixtures/                 # Fixtures personalizados
│   └── base.fixture.ts       # Inyecta Page Objects en tus tests
├── test-data/                # Datos de prueba centralizados
│   └── users.ts              # Usuarios válidos e inválidos
├── .github/workflows/        # CI/CD
│   └── tests.yml             # GitHub Actions: ejecuta tests en cada push
├── playwright.config.ts      # Configuración de Playwright
└── package.json              # Dependencias y scripts
```

## Comandos disponibles

| Comando | Qué hace |
|---------|----------|
| `npm test` | Ejecuta todos los tests |
| `npm run test:headed` | Ejecuta con navegador visible |
| `npm run test:ui` | Abre la UI interactiva de Playwright |
| `npm run test:debug` | Ejecuta en modo debug (paso a paso) |
| `npm run report` | Abre el reporte HTML del último test |

## Cómo agregar un test nuevo

1. **Crea el Page Object** en `pages/` (hereda de `BasePage`)
2. **Registra el fixture** en `fixtures/base.fixture.ts`
3. **Crea el test** en `tests/` importando desde `fixtures/base.fixture`
4. **Agrega datos** en `test-data/` si necesitas datos de prueba

## Aprende más

Este Kit es parte del ecosistema de práctica de [Calidad sin Humo](https://calidadsinhumo.com). Complementa estas guías:

- [De QA manual a automatización — Parte 1: por dónde empezar](https://calidadsinhumo.com/guias/guia-de-qa-manual-a-automatizacion)
- [De QA manual a automatización — Parte 2: arquitectura y pipeline](https://calidadsinhumo.com/guias/guia-de-junior-a-qa-automation-engineer)
- [ISTQB con código: partición de equivalencia y valores límite](https://calidadsinhumo.com/istqb-sin-humo/istqb-con-codigo-parte-1)

## Practica con Academia sin Humo

[Academia sin Humo](https://playground.calidadsinhumo.com) es una app web diseñada para que practiques automatización. Tiene 17 bugs sembrados a propósito, cada uno con su técnica de diseño de pruebas detrás. Este Kit caza 3; los otros 14 están abiertos como tareas para que los caces tú.

Los tests de este Kit ya apuntan a la Academia. Haz fork, ejecuta `npm test`, y empieza a practicar.

## Tus tests se pusieron en rojo. ¿Y ahora?

Eso está bien: los tests de este Kit están escritos contra la especificación, así que un rojo es un bug encontrado, no un Kit roto. El detalle de cada uno está en [`tests/README.md`](tests/README.md).

Lo que sigue es la parte que casi nadie hace: entender **por qué** ese bug estaba ahí y cómo se busca esa familia de errores sin tropezársela de casualidad.

| Lo que encontraste | La técnica que lo caza | Léelo gratis en el blog |
|---|---|---|
| **R-1**: acepta un password de 65 caracteres cuando el límite es 64 | Valores límite | [Partición de equivalencia y valores límite, con ejemplos de código](https://calidadsinhumo.com/istqb-sin-humo/istqb-con-codigo-parte-1/) |
| **R-2**: acepta `usuario@` sin dominio | Partición de equivalencia | [Partición de equivalencia y valores límite, con ejemplos de código](https://calidadsinhumo.com/istqb-sin-humo/istqb-con-codigo-parte-1/) |
| **R-3**: el formulario no se limpia después de registrar | Comportamiento del formulario y estado | [Las cuatro técnicas ISTQB en un caso E2E real, con 30 tests](https://calidadsinhumo.com/istqb-sin-humo/istqb-con-codigo-parte-3/) |

Esos artículos son gratis y no piden correo. Si después quieres el método completo, con ejercicios corregidos y certificado, está en [Automatización con Playwright: de cero a cazador de bugs](https://playground.calidadsinhumo.com/catalogo/playwright-cazador-bugs).

## Los 14 bugs que este Kit todavía no caza

La Academia tiene **17 bugs sembrados**. Este Kit caza **3**: los de registro que ves en la tabla de arriba. Los otros 14 viven en `/login`, `/cursos`, `/api/enroll`, `/mi-progreso`, `/reserva`, `/estudiantes` y `/perfil`, y no tienen test.

No es un descuido, es tu ejercicio. **Cada uno está abierto como una tarea en [Issues](https://github.com/adrianagit87/playwright-kit-profesional/issues)**, y cada tarea te dice en qué página está el bug, con qué técnica se caza, qué dificultad tiene y qué leer si te trabas. Lo que no te dice es cuál es el bug: eso lo encuentras tú.

**Cómo usarlas**

1. Entra a [Issues](https://github.com/adrianagit87/playwright-kit-profesional/issues) y elige una. Si estás empezando, filtra por la etiqueta `good first issue`: son las de dificultad fácil y media.
2. Comenta en la tarea que la vas a hacer, para que nadie más la tome al mismo tiempo.
3. Haz fork del Kit, resuélvela y abre un Pull Request. Si el test se pone rojo contra el playground, lo hiciste bien: encontraste el bug.
4. Si prefieres practicar sin enviar nada, también está bien. La tarea te sirve igual como guía.

## Los cursos, si quieres seguir

El Kit te da la estructura. La Academia te da el método completo: hay seis cursos con cuenta propia, progreso por lección, quizzes y un certificado con código verificable al terminar. La inscripción es gratuita y abierta.

- [Programación básica para QA (que quiere automatizar) con IA](https://playground.calidadsinhumo.com/catalogo/programacion-qa) — si el código todavía te frena
- [Automatización con Playwright: de cero a cazador de bugs](https://playground.calidadsinhumo.com/catalogo/playwright-cazador-bugs) — el camino natural desde este Kit
- [API Testing con Playwright: caza bugs bajo la UI](https://playground.calidadsinhumo.com/catalogo/api-cazador-bugs)
- [CI/CD para QA con IA](https://playground.calidadsinhumo.com/catalogo/ci-cd-para-qa)
- [IA aplicada al testing](https://playground.calidadsinhumo.com/catalogo/ia-para-qa)
- [Testing de agentes de IA: evals, seguridad y regresión](https://playground.calidadsinhumo.com/catalogo/testing-agentes-ia)

El catálogo completo está en [playground.calidadsinhumo.com/catalogo](https://playground.calidadsinhumo.com/catalogo).

## Licencia

MIT. Úsalo, cámbialo y llévatelo a tu trabajo sin pedir permiso.

---

Hecho con café y testing por [Adriana Troche Robles](https://calidadsinhumo.com/about)
