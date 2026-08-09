/**
 * LABORATORIO 5.1 — IA integrada al Proyecto Integrador
 *
 * Prompt Estratégico #2
 *
 * Objetivo:
 * Generar pruebas unitarias con mocks para Passport.js,
 * PostgreSQL y Argon2.
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

describe("IA - Passport con mocks", () => {
  let passport;
  let verify;
  let consoleLogSpy;
  let consoleErrorSpy;

  beforeEach(() => {
    jest.clearAllMocks();

    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

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

  test("AI-PASSPORT-01 - Debe rechazar un usuario inexistente", async () => {
    pool.query.mockResolvedValue({
      rows: [],
    });

    const done = jest.fn();

    await verify("usuario-inexistente", "Clave123", done);

    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining("FN_CONSULTA_LOGIN"),
      ["usuario-inexistente"],
    );

    expect(done).toHaveBeenCalledWith(null, false, {
      message: "Usuario no encontrado",
    });
  });

  test("AI-PASSPORT-02 - Debe rechazar un usuario no autorizado por la base de datos", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          res_respuesta: "NO",
          res_respuesta_msg: "USUARIO BLOQUEADO",
          password_hash: "hash",
        },
      ],
    });

    const done = jest.fn();

    await verify("8-111-1111", "Clave123", done);

    expect(done).toHaveBeenCalledWith(null, false, {
      message: "USUARIO BLOQUEADO",
    });

    expect(argon2.verify).not.toHaveBeenCalled();
  });

  test("AI-PASSPORT-03 - Debe rechazar contraseña incorrecta", async () => {
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

    await verify("8-999-9999", "ClaveIncorrecta", done);

    expect(argon2.verify).toHaveBeenCalledWith(
      "hash_valido",
      "ClaveIncorrecta",
    );

    expect(done).toHaveBeenCalledWith(null, false, {
      message: "Contraseña incorrecta",
    });
  });

  test("AI-PASSPORT-04 - Debe autenticar correctamente un usuario válido", async () => {
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

    argon2.verify.mockResolvedValue(true);

    const done = jest.fn();

    await verify("8-999-9999", "Qa_pipeline_2026#", done);

    expect(done).toHaveBeenCalledWith(null, {
      id: 1,
      id_tipo_usuario: 0,
      cedula: "8-999-9999",
      nombre: "Usuario",
      apellidos: "Pipeline QA",
    });
  });

  test("AI-PASSPORT-05 - Debe enviar error cuando PostgreSQL falla", async () => {
    const errorBD = new Error("Error de conexión PostgreSQL");

    pool.query.mockRejectedValue(errorBD);

    const done = jest.fn();

    await verify("8-999-9999", "Clave123", done);

    expect(done).toHaveBeenCalledWith(errorBD);
  });

  test("AI-PASSPORT-06 - Debe serializar al usuario utilizando su ID", () => {
    const serializar = passport.serializeUser.mock.calls[0][0];

    const done = jest.fn();

    const usuario = {
      id: 25,
      nombre: "Marcos",
    };

    serializar(usuario, done);

    expect(done).toHaveBeenCalledWith(null, 25);
  });
// Before:
  //   test("AI-PASSPORT-07 - Debe deserializar correctamente un usuario", async () => {
  //     pool.query.mockResolvedValue({
  //       rows: [
  //         {
  //           id: 25,
  //           cedula: "8-123-4567",
  //           nombre: "Marcos",
  //           apellidos: "Castillo",
  //           id_tipo_usuario: 0,
  //         },
  //       ],
  //     });

  //     const deserializar =
  //       passport.deserializeUser.mock.calls[0][0];

  //     const done = jest.fn();

  //     await deserializar(
  //       25,
  //       done,
  //     );

  //     expect(pool.query).toHaveBeenCalledWith(
  //       expect.stringContaining(
  //         "FN_CONSULTA_LOGIN_SESION",
  //       ),
  //       [25],
  //     );

  //     expect(done).toHaveBeenCalledWith(
  //       null,
  //       {
  //         id: 25,
  //         id_tipo_usuario: 0,
  //         cedula: "8-123-4567",
  //         nombre: "Marcos",
  //         apellidos: "Castillo",
  //       },
  //     );
  //   });
  
// After
  test("AI-PASSPORT-07 - Debe deserializar correctamente un usuario", async () => {
    /*
     * CORRECCIÓN HUMANA:
     *
     * El output inicial generado con IA omitía los campos
     * res_respuesta y res_respuesta_msg que realmente devuelve
     * FN_CONSULTA_LOGIN_SESION.
     *
     * Se ajustó el mock para representar fielmente el contrato
     * de la función PostgreSQL utilizada por Passport.
     */

    pool.query.mockResolvedValue({
      rows: [
        {
          id: 25,
          cedula: "8-123-4567",
          nombre: "Marcos",
          apellidos: "Castillo",
          id_tipo_usuario: 0,
          res_respuesta: "SI",
          res_respuesta_msg: "USUARIO AUTORIZADO",
        },
      ],
    });

    const deserializar = passport.deserializeUser.mock.calls[0][0];

    const done = jest.fn();

    await deserializar(25, done);

    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining("FN_CONSULTA_LOGIN_SESION"),
      [25],
    );

    expect(done).toHaveBeenCalledWith(null, {
      id: 25,
      id_tipo_usuario: 0,
      cedula: "8-123-4567",
      nombre: "Marcos",
      apellidos: "Castillo",
    });
  });

  test("AI-PASSPORT-08 - Debe enviar error cuando falla la deserialización", async () => {
    const errorBD = new Error("Error consultando sesión");

    pool.query.mockRejectedValue(errorBD);

    const deserializar = passport.deserializeUser.mock.calls[0][0];

    const done = jest.fn();

    await deserializar(25, done);

    expect(done).toHaveBeenCalledWith(errorBD);
  });
});
