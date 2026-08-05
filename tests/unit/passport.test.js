jest.mock("../../DB/database", () => ({
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

const pool = require("../../DB/database");
const argon2 = require("argon2");
const { Strategy: LocalStrategy } = require("passport-local");
const configurePassport = require("../../config/passport");

describe("Configuración de Passport", () => {
  let passport;
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
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  function obtenerVerificadorLocal() {
    const estrategiaRegistrada =
      passport.use.mock.calls[0][0];

    return estrategiaRegistrada.verify;
  }

  function obtenerSerializador() {
    return passport.serializeUser.mock.calls[0][0];
  }

  function obtenerDeserializador() {
    return passport.deserializeUser.mock.calls[0][0];
  }

  test("Debe configurar la estrategia local con los campos usuario y contrasena", () => {
    expect(LocalStrategy).toHaveBeenCalledWith(
      {
        usernameField: "usuario",
        passwordField: "contrasena",
      },
      expect.any(Function),
    );

    expect(passport.use).toHaveBeenCalledTimes(1);

    const estrategiaRegistrada =
      passport.use.mock.calls[0][0];

    expect(estrategiaRegistrada.options).toEqual({
      usernameField: "usuario",
      passwordField: "contrasena",
    });
  });

  test("Debe rechazar el login cuando la consulta no devuelve filas", async () => {
    pool.query.mockResolvedValue({
      rows: [],
    });

    const verify = obtenerVerificadorLocal();
    const done = jest.fn();

    await verify(
      "usuario_inexistente",
      "Clave123",
      done,
    );

    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining("FN_CONSULTA_LOGIN"),
      ["usuario_inexistente"],
    );

    expect(done).toHaveBeenCalledWith(
      null,
      false,
      {
        message: "Usuario no encontrado",
      },
    );

    expect(argon2.verify).not.toHaveBeenCalled();
  });

  test("Debe rechazar el login cuando la función de base de datos niega el acceso", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: null,
          cedula: "usuario_inexistente",
          nombre: null,
          apellidos: null,
          id_tipo_usuario: null,
          password_hash: null,
          res_respuesta: "NO",
          res_respuesta_msg: "USUARIO NO EXISTE",
        },
      ],
    });

    const verify = obtenerVerificadorLocal();
    const done = jest.fn();

    await verify(
      "usuario_inexistente",
      "Clave123",
      done,
    );

    expect(done).toHaveBeenCalledWith(
      null,
      false,
      {
        message: "USUARIO NO EXISTE",
      },
    );

    expect(argon2.verify).not.toHaveBeenCalled();
  });

  test("Debe rechazar el login cuando la contraseña es incorrecta", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 25,
          id_tipo_usuario: 0,
          cedula: "8-123-4567",
          nombre: "Marcos",
          apellidos: "Castillo",
          password_hash: "hash_guardado",
          res_respuesta: "SI",
          res_respuesta_msg: "USUARIO AUTORIZADO",
        },
      ],
    });

    argon2.verify.mockResolvedValue(false);

    const verify = obtenerVerificadorLocal();
    const done = jest.fn();

    await verify(
      "8-123-4567",
      "ClaveIncorrecta",
      done,
    );

    expect(argon2.verify).toHaveBeenCalledWith(
      "hash_guardado",
      "ClaveIncorrecta",
    );

    expect(done).toHaveBeenCalledWith(
      null,
      false,
      {
        message: "Contraseña incorrecta",
      },
    );
  });

  test("Debe autenticar y devolver los datos públicos de un usuario válido", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 25,
          id_tipo_usuario: 0,
          cedula: "8-123-4567",
          nombre: "Marcos",
          apellidos: "Castillo",
          password_hash: "hash_valido",
          res_respuesta: "SI",
          res_respuesta_msg: "USUARIO AUTORIZADO",
        },
      ],
    });

    argon2.verify.mockResolvedValue(true);

    const verify = obtenerVerificadorLocal();
    const done = jest.fn();

    await verify(
      "8-123-4567",
      "ClaveValida123",
      done,
    );

    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining("FN_CONSULTA_LOGIN"),
      ["8-123-4567"],
    );

    expect(argon2.verify).toHaveBeenCalledWith(
      "hash_valido",
      "ClaveValida123",
    );

    expect(done).toHaveBeenCalledWith(
      null,
      {
        id: 25,
        id_tipo_usuario: 0,
        cedula: "8-123-4567",
        nombre: "Marcos",
        apellidos: "Castillo",
      },
    );
  });

  test("Debe convertir id_tipo_usuario de texto a número", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 25,
          id_tipo_usuario: "1",
          cedula: "8-123-4567",
          nombre: "Marcos",
          apellidos: "Castillo",
          password_hash: "hash_valido",
          res_respuesta: "SI",
          res_respuesta_msg: "USUARIO AUTORIZADO",
        },
      ],
    });

    argon2.verify.mockResolvedValue(true);

    const verify = obtenerVerificadorLocal();
    const done = jest.fn();

    await verify(
      "8-123-4567",
      "ClaveValida123",
      done,
    );

    expect(done).toHaveBeenCalledWith(
      null,
      expect.objectContaining({
        id_tipo_usuario: 1,
      }),
    );
  });

  test("Debe enviar el error a Passport cuando falla la consulta de login", async () => {
    const errorBaseDatos = new Error(
      "Error de conexión",
    );

    pool.query.mockRejectedValue(errorBaseDatos);

    const verify = obtenerVerificadorLocal();
    const done = jest.fn();

    await verify(
      "8-123-4567",
      "Clave123",
      done,
    );

    expect(done).toHaveBeenCalledWith(
      errorBaseDatos,
    );
  });

  test("Debe serializar al usuario utilizando su identificador", () => {
    const serializar = obtenerSerializador();
    const done = jest.fn();

    const usuario = {
      id: 25,
      id_tipo_usuario: 0,
      nombre: "Marcos",
    };

    serializar(usuario, done);

    expect(done).toHaveBeenCalledWith(
      null,
      25,
    );
  });

  test("Debe devolver false cuando la consulta de sesión no devuelve filas", async () => {
    pool.query.mockResolvedValue({
      rows: [],
    });

    const deserializar = obtenerDeserializador();
    const done = jest.fn();

    await deserializar(999, done);

    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining(
        "FN_CONSULTA_LOGIN_SESION",
      ),
      [999],
    );

    expect(done).toHaveBeenCalledWith(
      null,
      false,
    );
  });

  test("Debe devolver false cuando la función de sesión niega el acceso", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: null,
          cedula: null,
          nombre: null,
          apellidos: null,
          id_tipo_usuario: null,
          res_respuesta: "NO",
          res_respuesta_msg: "USUARIO NO EXISTE",
        },
      ],
    });

    const deserializar = obtenerDeserializador();
    const done = jest.fn();

    await deserializar(999, done);

    expect(done).toHaveBeenCalledWith(
      null,
      false,
    );
  });

  test("Debe restaurar correctamente un usuario durante la deserialización", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 25,
          id_tipo_usuario: 0,
          cedula: "8-123-4567",
          nombre: "Marcos",
          apellidos: "Castillo",
          res_respuesta: "SI",
          res_respuesta_msg: "USUARIO AUTORIZADO",
        },
      ],
    });

    const deserializar = obtenerDeserializador();
    const done = jest.fn();

    await deserializar(25, done);

    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining(
        "FN_CONSULTA_LOGIN_SESION",
      ),
      [25],
    );

    expect(done).toHaveBeenCalledWith(
      null,
      {
        id: 25,
        id_tipo_usuario: 0,
        cedula: "8-123-4567",
        nombre: "Marcos",
        apellidos: "Castillo",
      },
    );
  });

  test("Debe convertir a número el tipo de usuario durante la deserialización", async () => {
    pool.query.mockResolvedValue({
      rows: [
        {
          id: 25,
          id_tipo_usuario: "1",
          cedula: "8-123-4567",
          nombre: "Marcos",
          apellidos: "Castillo",
          res_respuesta: "SI",
          res_respuesta_msg: "USUARIO AUTORIZADO",
        },
      ],
    });

    const deserializar = obtenerDeserializador();
    const done = jest.fn();

    await deserializar(25, done);

    expect(done).toHaveBeenCalledWith(
      null,
      expect.objectContaining({
        id_tipo_usuario: 1,
      }),
    );
  });

  test("Debe enviar el error a Passport cuando falla la deserialización", async () => {
    const errorBaseDatos = new Error(
      "Error consultando la sesión",
    );

    pool.query.mockRejectedValue(errorBaseDatos);

    const deserializar = obtenerDeserializador();
    const done = jest.fn();

    await deserializar(25, done);

    expect(done).toHaveBeenCalledWith(
      errorBaseDatos,
    );
  });
});