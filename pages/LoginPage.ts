import { type Page, type Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

/**
 * Page Object para la página de Login.
 *
 * Encapsula todos los selectores y acciones del login.
 * Si la UI cambia, solo actualizas este archivo — los tests no se tocan.
 */
export class LoginPage extends BasePage {
  // Selectores
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly lockoutMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = this.getByTestId("login-email");
    this.passwordInput = this.getByTestId("login-password");
    this.submitButton = this.getByTestId("login-submit");
    this.errorMessage = this.getByTestId("login-error");
    this.lockoutMessage = this.getByTestId("login-lockout");
  }

  get path(): string {
    return "/login";
  }

  /** Llena el formulario y hace clic en iniciar sesión. */
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  /** Devuelve el texto del mensaje de error visible. */
  async getErrorText(): Promise<string> {
    await this.errorMessage.waitFor({ state: "visible" });
    return this.errorMessage.innerText();
  }

  /** Devuelve true si el mensaje de bloqueo es visible. */
  async isLockedOut(): Promise<boolean> {
    return this.lockoutMessage.isVisible();
  }
}
