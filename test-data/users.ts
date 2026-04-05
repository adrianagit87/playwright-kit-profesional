/**
 * Datos de prueba para los tests.
 *
 * Centralizar los datos aquí evita duplicación y facilita el mantenimiento.
 * Si un dato cambia (ej: el email de prueba), lo cambias en un solo lugar.
 */

export const VALID_USER = {
  name: "Ana Garcia",
  email: "ana.garcia@ejemplo.com",
  password: "Segura2026!",
  age: "28",
} as const;

export const INVALID_USERS = {
  /** Email sin dominio — debería ser rechazado. */
  badEmail: {
    name: "Test User",
    email: "usuario@",
    password: "Segura2026!",
    age: "25",
  },

  /** Password demasiado corta (7 chars, mínimo es 8). */
  shortPassword: {
    name: "Test User",
    email: "test@ejemplo.com",
    password: "Corta7!",
    age: "25",
  },

  /** Password en el límite máximo (64 chars — debería ser aceptada). */
  maxPassword: {
    name: "Test User",
    email: "test@ejemplo.com",
    password: "A".repeat(64),
    age: "25",
  },

  /** Password que excede el máximo (65 chars — debería ser rechazada). */
  overMaxPassword: {
    name: "Test User",
    email: "test@ejemplo.com",
    password: "A".repeat(65),
    age: "25",
  },

  /** Edad por debajo del mínimo (15, mínimo es 16). */
  tooYoung: {
    name: "Test User",
    email: "test@ejemplo.com",
    password: "Segura2026!",
    age: "15",
  },

  /** Edad en el límite mínimo (16 — debería ser aceptada). */
  minAge: {
    name: "Test User",
    email: "test@ejemplo.com",
    password: "Segura2026!",
    age: "16",
  },

  /** Edad por encima del máximo (100, máximo es 99). */
  tooOld: {
    name: "Test User",
    email: "test@ejemplo.com",
    password: "Segura2026!",
    age: "100",
  },
} as const;

export const LOGIN_CREDENTIALS = {
  valid: {
    email: "ana.garcia@ejemplo.com",
    password: "Segura2026!",
  },
  invalid: {
    email: "ana.garcia@ejemplo.com",
    password: "PasswordIncorrecto123",
  },
} as const;
