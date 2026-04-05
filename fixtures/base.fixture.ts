import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

/**
 * Fixtures personalizados para el Kit de arranque.
 *
 * Los fixtures crean las instancias de tus Page Objects automaticamente.
 * En vez de escribir `new LoginPage(page)` en cada test, simplemente
 * pides `loginPage` como parametro y Playwright se encarga del resto.
 *
 * Aprende mas sobre fixtures:
 * https://calidadsinhumo.com/guias/guia-de-junior-a-qa-automation-engineer
 */

type KitFixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
};

export const test = base.extend<KitFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.waitForLoad();
    await use(loginPage);
  },

  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.waitForLoad();
    await use(registerPage);
  },
});

export { expect } from "@playwright/test";
