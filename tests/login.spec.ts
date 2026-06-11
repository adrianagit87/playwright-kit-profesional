import { test, expect } from "../fixtures/base.fixture";
import { LOGIN_CREDENTIALS } from "../test-data/users";

/**
 * Tests para la página de Login.
 *
 * Estos tests demuestran:
 * - Cómo usar fixtures (loginPage se inyecta automáticamente)
 * - Cómo organizar tests con describe/test
 * - Cómo verificar casos válidos e inválidos
 *
 * Técnica ISTQB aplicada: valores límite (rate limiting).
 * Aprende más: https://calidadsinhumo.com/istqb-sin-humo/istqb-con-codigo-parte-1
 */
test.describe("Login", () => {
  test("permite iniciar sesión con credenciales válidas", async ({
    loginPage,
  }) => {
    await loginPage.login(
      LOGIN_CREDENTIALS.valid.email,
      LOGIN_CREDENTIALS.valid.password
    );

    // La app es una SPA: tras el login exitoso muestra la bienvenida
    // inline en /login, sin redirigir. Verificamos el estado visible,
    // no la URL — testea lo que el usuario VE, no la mecánica interna.
    const welcome = await loginPage.getWelcomeText();
    expect(welcome).toContain(LOGIN_CREDENTIALS.valid.name);
  });

  test("muestra error con password incorrecta", async ({ loginPage }) => {
    await loginPage.login(
      LOGIN_CREDENTIALS.invalid.email,
      LOGIN_CREDENTIALS.invalid.password
    );

    const errorText = await loginPage.getErrorText();
    expect(errorText).toBeTruthy();
  });

  test("muestra error con email vacio", async ({ loginPage }) => {
    await loginPage.login("", LOGIN_CREDENTIALS.valid.password);

    const errorText = await loginPage.getErrorText();
    expect(errorText).toBeTruthy();
  });

  test("bloquea despues de 5 intentos fallidos", async ({ loginPage }) => {
    // Intentar login 5 veces con password incorrecta
    for (let i = 0; i < 5; i++) {
      await loginPage.login(
        LOGIN_CREDENTIALS.invalid.email,
        LOGIN_CREDENTIALS.invalid.password
      );
    }

    // El sexto intento debería mostrar mensaje de bloqueo
    const isLocked = await loginPage.isLockedOut();
    expect(isLocked).toBe(true);
  });
});
