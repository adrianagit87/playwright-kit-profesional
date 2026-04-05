import { test, expect } from "../fixtures/base.fixture";
import { VALID_USER, INVALID_USERS } from "../test-data/users";

/**
 * Tests para la pagina de Registro.
 *
 * Estos tests demuestran la tecnica de particion de equivalencia:
 * dividir los datos de entrada en clases (validas e invalidas)
 * y probar un representante de cada una.
 *
 * Tecnica ISTQB aplicada: particion de equivalencia + valores limite.
 * Aprende mas: https://calidadsinhumo.com/istqb-sin-humo/istqb-con-codigo-parte-1
 */
test.describe("Registro", () => {
  test.describe("Casos validos", () => {
    test("permite registrarse con datos validos", async ({
      registerPage,
    }) => {
      await registerPage.register(VALID_USER);
      const isSuccess = await registerPage.isSuccessVisible();
      expect(isSuccess).toBe(true);
    });

    test("acepta password en el limite maximo (64 chars)", async ({
      registerPage,
    }) => {
      await registerPage.register(INVALID_USERS.maxPassword);
      // 64 caracteres es el maximo valido — deberia aceptarse
      const isSuccess = await registerPage.isSuccessVisible();
      expect(isSuccess).toBe(true);
    });

    test("acepta edad en el limite minimo (16)", async ({
      registerPage,
    }) => {
      await registerPage.register(INVALID_USERS.minAge);
      const isSuccess = await registerPage.isSuccessVisible();
      expect(isSuccess).toBe(true);
    });
  });

  test.describe("Casos invalidos — email", () => {
    test("rechaza email sin dominio", async ({ registerPage }) => {
      await registerPage.register(INVALID_USERS.badEmail);
      const error = await registerPage.getFieldError("email");
      expect(error).toBeTruthy();
    });
  });

  test.describe("Casos invalidos — password", () => {
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

  test.describe("Casos invalidos — edad", () => {
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
    test("limpia el formulario despues de un registro exitoso", async ({
      registerPage,
    }) => {
      await registerPage.register(VALID_USER);
      await registerPage.isSuccessVisible();

      // El campo nombre deberia estar vacio despues del registro
      const nameValue = await registerPage.getNameValue();
      expect(nameValue).toBe("");
    });
  });
});
