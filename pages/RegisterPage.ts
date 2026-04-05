import { type Page, type Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

/**
 * Page Object para la página de Registro.
 *
 * Los campos y validaciones de este formulario están diseñados
 * para practicar partición de equivalencia y valores límite.
 *
 * Aprende la técnica:
 * https://calidadsinhumo.com/istqb-sin-humo/istqb-con-codigo-parte-1
 */
export class RegisterPage extends BasePage {
  // Selectores del formulario
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly ageInput: Locator;
  readonly submitButton: Locator;

  // Mensajes de feedback
  readonly successMessage: Locator;
  readonly nameError: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly ageError: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = this.getByTestId("register-name");
    this.emailInput = this.getByTestId("register-email");
    this.passwordInput = this.getByTestId("register-password");
    this.ageInput = this.getByTestId("register-age");
    this.submitButton = this.getByTestId("register-submit");

    this.successMessage = this.getByTestId("register-success");
    this.nameError = this.getByTestId("register-name-error");
    this.emailError = this.getByTestId("register-email-error");
    this.passwordError = this.getByTestId("register-password-error");
    this.ageError = this.getByTestId("register-age-error");
  }

  get path(): string {
    return "/registro";
  }

  /** Llena el formulario completo de registro. */
  async register(data: {
    name: string;
    email: string;
    password: string;
    age: string;
  }): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.ageInput.fill(data.age);
    await this.submitButton.click();
  }

  /** Devuelve true si el mensaje de exito es visible. */
  async isSuccessVisible(): Promise<boolean> {
    return this.successMessage.isVisible();
  }

  /** Devuelve el texto de error de un campo específico. */
  async getFieldError(
    field: "name" | "email" | "password" | "age"
  ): Promise<string> {
    const errorLocator = {
      name: this.nameError,
      email: this.emailError,
      password: this.passwordError,
      age: this.ageError,
    }[field];

    await errorLocator.waitFor({ state: "visible" });
    return errorLocator.innerText();
  }

  /** Devuelve el valor actual del campo nombre (util para verificar limpieza). */
  async getNameValue(): Promise<string> {
    return this.nameInput.inputValue();
  }
}
