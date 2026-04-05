import { defineConfig, devices } from "@playwright/test";

/**
 * Configuracion de Playwright para el Kit de arranque profesional.
 *
 * Por defecto apunta a Academia sin Humo (playground.calidadsinhumo.com).
 * Puedes cambiarlo creando un archivo .env con tu propia BASE_URL.
 *
 * Mas info: https://calidadsinhumo.com/guias/guia-de-qa-manual-a-automatizacion
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { open: "never" }], ["list"]],

  use: {
    baseURL: process.env.BASE_URL || "https://playground.calidadsinhumo.com",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
