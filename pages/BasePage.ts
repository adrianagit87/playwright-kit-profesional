import { type Page, type Locator } from "@playwright/test";

/**
 * Clase base para todos los Page Objects.
 *
 * Cada pagina de tu aplicacion hereda de BasePage.
 * Asi no repites la logica comun (navegar, esperar carga, etc.).
 *
 * Aprende mas sobre este patron:
 * https://calidadsinhumo.com/guias/guia-de-junior-a-qa-automation-engineer
 */
export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** URL relativa de la pagina (cada subclase la define). */
  abstract get path(): string;

  /** Navega a la pagina usando la baseURL del config. */
  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }

  /** Espera a que la pagina termine de cargar. */
  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
  }

  /** Obtiene el titulo de la pagina. */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /** Localiza un elemento por su data-testid. */
  protected getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }
}
