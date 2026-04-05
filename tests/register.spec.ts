import { test, expect } from "../fixtures/base.fixture";
import { VALID_USER, INVALID_USERS } from "../test-data/users";

/**
 * Tests para la página de Registro.
 *
 * Estos tests demuestran la técnica de partición de equivalencia:
 * dividir los datos de entrada en clases (válidas e inválidas)
 * y probar un representante de cada una.
 *
 * Técnica ISTQB aplicada: partición de equivalencia + valores límite.
 * Aprende más: https://calidadsinhumo.com/istqb-sin-humo/istqb-con-codigo-parte-1
 */
test.describe("Registro", () => {
  test.describe("Casos válidos", () => {
    test("permite registrarse con datos válidos", async ({
      registerPage,
    }) => {
      await registerPage.register(VALID_USER);
      const isSuccess = await registerPage.isSuccessVisible();
      expect(isSuccess).toBe(true);
    });

    test("acepta password en el límite máximo (64 chars)", async ({
      registerPage,
    }) => {
      await registerPage.register(INVALID_USERS.maxPassword);
      // 64 caracteres es el máximo válido — debería aceptarse
      const isSuccess = await registerPage.isSuccessVisible();
      expect(isSuccess).toBe(true);
    });

    test("acepta edad en el límite mínimo (16)", async ({
      registerPage,
    }) => {
      await registerPage.register(INVALID_USERS.minAge);
      const isSuccess = await registerPage.isSuccessVisible();
      expect(isSuccess).toBe(true);
    });
  });

  test.describe("Casos inválidos — email", () => {
    test("rechaza email sin dominio", async ({ registerPage }) => {
      await registerPage.register(INVALID_USERS.badEmail);
      const error = await registerPage.getFieldError("email");
      expect(error).toBeTruthy();
    });
  });

  test.describe("Casos inválidos — password", () => {
    test("rechaza password menor a 8 caracteres", async ({
      registerPage,
    }) => {
      await registerPage.register(INVALID_USERS.shortPassword);
      const error = await registerPage.getFieldError("password");
      expect(error).toBeTruthy();
    });

    test("rechaza password mayor a 64 caracteres", async ({
      registerPage,
    }) => {
      await registerPage.register(INVALID_USERS.overMaxPassword);
      const error = await registerPage.getFieldError("password");
      expect(error).toBeTruthy();
    });
  });

  test.describe("Casos inválidos — edad", () => {
    test("rechaza edad menor a 16", async ({ registerPage }) => {
      await registerPage.register(INVALID_USERS.tooYoung);
      const error = await registerPage.getFieldError("age");
      expect(error).toBeTruthy();
    });

    test("rechaza edad mayor a 99", async ({ registerPage }) => {
      await registerPage.register(INVALID_USERS.tooOld);
      const error = await registerPage.getFieldError("age");
      expect(error).toBeTruthy();
    });
  });

  test.describe("Comportamiento del formulario", () => {
    test("limpia el formulario después de un registro exitoso", async ({
      registerPage,
    }) => {
      await registerPage.register(VALID_USER);
      await registerPage.isSuccessVisible();

      // El campo nombre debería estar vacío después del registro
      const nameValue = await registerPage.getNameValue();
      expect(nameValue).toBe("");
    });
  });
});
