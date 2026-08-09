/**
 * LABORATORIO 5.1 — IA integrada al Proyecto Integrador
 *
 * Archivo generado a partir del Prompt Estratégico #1.
 * Objetivo: evaluar seguridad y robustez del módulo de login.
 *
 * Nota:
 * Esta primera versión representa el output inicial generado con IA.
 * Después de ejecutarla se documentarán las correcciones humanas.
 */

jest.mock("../../../DB/database", () => ({
  query: jest.fn(),
}));

jest.mock("argon2", () => ({
  verify: jest.fn(),
}));

jest.mock("passport-local", () => {
  const LocalStrategy = jest.fn(function (options, verify) {
    this.options = options;
    this.verify = verify;
  });

  return {
    Strategy: LocalStrategy,
  };
});

const pool = require("../../../DB/database");
const argon2 = require("argon2");
const configurePassport = require("../../../config/passport");

describe("IA - Seguridad del módulo de login", () => {
  let passport;
  let verify;
  let consoleLogSpy;
  let consoleErrorSpy;

  beforeEach(() => {
    jest.clearAllMocks();

    consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    passport = {
      use: jest.fn(),
      serializeUser: jest.fn(),
      deserializeUser: jest.fn(),
    };

    configurePassport(passport);

    const estrategia = passport.use.mock.calls[0][0];
    verify = estrategia.verify;
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  test("AI-LOGIN-01 - Debe autenticar un usuario con credenciales válidas", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          cedula: "8-999-9999",
          nombre: "Usuario",
          apellidos: "Pipeline QA",
          id_tipo_usuario: 0,
          password_hash: "hash_valido",
          res_respuesta: "SI",
          res_respuesta_msg: "USUARIO AUTORIZADO",
        },
      ],
    });

    argon2.verify.mockResolvedValue(true);

    const done = jest.fn();

    await verify(
      "8-999-9999",
      "Qa_pipeline_2026#",
      done,
    );

    expect(done).toHaveBeenCalledWith(null, {
      id: 1,
      id_tipo_usuario: 0,
      cedula: "8-999-9999",
      nombre: "Usuario",
      apellidos: "Pipeline QA",
    });
  });

  test("AI-LOGIN-02 - Debe rechazar una contraseña incorrecta", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          cedula: "8-999-9999",
          nombre: "Usuario",
          apellidos: "Pipeline QA",
          id_tipo_usuario: 0,
          password_hash: "hash_valido",
          res_respuesta: "SI",
        },
      ],
    });

    argon2.verify.mockResolvedValue(false);

    const done = jest.fn();

    await verify(
      "8-999-9999",
      "ClaveIncorrecta",
      done,
    );

    expect(done).toHaveBeenCalledWith(null, false, {
      message: "Contraseña incorrecta",
    });
  });

  test("AI-LOGIN-03 - Debe rechazar un usuario inexistente", async () => {
    pool.query.mockResolvedValue({
      rows: [],
    });

    const done = jest.fn();

    await verify(
      "usuario-inexistente",
      "Clave123",
      done,
    );

    expect(done).toHaveBeenCalledWith(null, false, {
      message: "Usuario no encontrado",
    });

    expect(argon2.verify).not.toHaveBeenCalled();
  });

  test("AI-LOGIN-04 - Debe rechazar usuario vacío", async () => {
    pool.query.mockResolvedValue({
      rows: [],
    });

    const done = jest.fn();

    await verify("", "Clave123", done);

    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining("FN_CONSULTA_LOGIN"),
      [""],
    );

    expect(done).toHaveBeenCalledWith(null, false, {
      message: "Usuario no encontrado",
    });
  });

  test("AI-LOGIN-05 - Debe rechazar contraseña vacía", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          cedula: "8-999-9999",
          nombre: "Usuario",
          apellidos: "Pipeline QA",
          id_tipo_usuario: 0,
          password_hash: "hash_valido",
          res_respuesta: "SI",
        },
      ],
    });

    argon2.verify.mockResolvedValue(false);

    const done = jest.fn();

    await verify(
      "8-999-9999",
      "",
      done,
    );

    expect(argon2.verify).toHaveBeenCalledWith(
      "hash_valido",
      "",
    );

    expect(done).toHaveBeenCalledWith(null, false, {
      message: "Contraseña incorrecta",
    });
  });

  test("AI-LOGIN-06 - Debe manejar usuario null sin autenticar", async () => {
    pool.query.mockResolvedValue({
      rows: [],
    });

    const done = jest.fn();

    await verify(null, "Clave123", done);

    expect(done).toHaveBeenCalledWith(null, false, {
      message: "Usuario no encontrado",
    });
  });

  test("AI-LOGIN-07 - Debe manejar contraseña null sin autenticar", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          cedula: "8-999-9999",
          nombre: "Usuario",
          apellidos: "Pipeline QA",
          id_tipo_usuario: 0,
          password_hash: "hash_valido",
          res_respuesta: "SI",
        },
      ],
    });

    argon2.verify.mockResolvedValue(false);

    const done = jest.fn();

    await verify(
      "8-999-9999",
      null,
      done,
    );

    expect(done).toHaveBeenCalledWith(null, false, {
      message: "Contraseña incorrecta",
    });
  });

  test("AI-LOGIN-08 - Debe impedir autenticación mediante SQL Injection", async () => {
    const payload =
      "' OR '1'='1' --";

    pool.query.mockResolvedValue({
      rows: [],
    });

    const done = jest.fn();

    await verify(
      payload,
      "cualquier-clave",
      done,
    );

    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining("FN_CONSULTA_LOGIN"),
      [payload],
    );

    expect(done).toHaveBeenCalledWith(null, false, {
      message: "Usuario no encontrado",
    });

    expect(argon2.verify).not.toHaveBeenCalled();
  });

  test("AI-LOGIN-09 - Debe manejar una entrada de usuario excesivamente larga", async () => {
    const usuarioLargo =
      "A".repeat(1500);

    pool.query.mockResolvedValue({
      rows: [],
    });

    const done = jest.fn();

    await verify(
      usuarioLargo,
      "Clave123",
      done,
    );

    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining("FN_CONSULTA_LOGIN"),
      [usuarioLargo],
    );

    expect(done).toHaveBeenCalledWith(null, false, {
      message: "Usuario no encontrado",
    });
  });

  test("AI-LOGIN-10 - Debe enviar a Passport un error de base de datos", async () => {
    const errorBD =
      new Error("Error PostgreSQL");

    pool.query.mockRejectedValue(
      errorBD,
    );

    const done = jest.fn();

    await verify(
      "8-999-9999",
      "Clave123",
      done,
    );

    expect(done).toHaveBeenCalledWith(
      errorBD,
    );
  });

  test("AI-LOGIN-11 - Debe manejar un error producido por Argon2", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          cedula: "8-999-9999",
          nombre: "Usuario",
          apellidos: "Pipeline QA",
          id_tipo_usuario: 0,
          password_hash: "hash_valido",
          res_respuesta: "SI",
        },
      ],
    });

    const errorArgon =
      new Error("Error Argon2");

    argon2.verify.mockRejectedValue(
      errorArgon,
    );

    const done = jest.fn();

    await verify(
      "8-999-9999",
      "Clave123",
      done,
    );

    expect(done).toHaveBeenCalledWith(
      errorArgon,
    );
  });

  test("AI-LOGIN-12 - No debe exponer password_hash en el usuario autenticado", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          cedula: "8-999-9999",
          nombre: "Usuario",
          apellidos: "Pipeline QA",
          id_tipo_usuario: 0,
          password_hash:
            "HASH_QUE_NO_DEBE_SALIR",
          res_respuesta: "SI",
        },
      ],
    });

    argon2.verify.mockResolvedValue(true);

    const done = jest.fn();

    await verify(
      "8-999-9999",
      "ClaveCorrecta",
      done,
    );

    const usuarioDevuelto =
      done.mock.calls[0][1];

    expect(usuarioDevuelto).toEqual({
      id: 1,
      id_tipo_usuario: 0,
      cedula: "8-999-9999",
      nombre: "Usuario",
      apellidos: "Pipeline QA",
    });

    expect(usuarioDevuelto).not.toHaveProperty(
      "password_hash",
    );
  });
});