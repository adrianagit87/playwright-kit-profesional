import { test, expect } from "../fixtures/base.fixture";
import { LOGIN_CREDENTIALS } from "../test-data/users";

/**
 * Tests para la pagina de Login.
 *
 * Estos tests demuestran:
 * - Como usar fixtures (loginPage se inyecta automaticamente)
 * - Como organizar tests con describe/test
 * - Como verificar casos validos e invalidos
 *
 * Tecnica ISTQB aplicada: valores limite (rate limiting).
 * Aprende mas: https://calidadsinhumo.com/istqb-sin-humo/istqb-con-codigo-parte-1
 */
test.describe("Login", () => {
  test("permite iniciar sesion con credenciales validas", async ({
    loginPage,
    page,
  }) => {
    await loginPage.login(
      LOGIN_CREDENTIALS.valid.email,
      LOGIN_CREDENTIALS.valid.password
    );

    // Despues del login exitoso, deberia redirigir al dashboard
    await expect(page).toHaveURL(/\/(dashboard|cursos)/);
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

    // El sexto intento deberia mostrar mensaje de bloqueo
    const isLocked = await loginPage.isLockedOut();
    expect(isLocked).toBe(true);
  });
});
