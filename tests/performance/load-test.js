import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

/*
 * Métricas personalizadas.
 *
 * errors:
 *   Porcentaje de inicios de sesión que no fueron satisfactorios.
 *
 * login_duration:
 *   Duración específica del endpoint POST /api/login.
 */
const errorRate = new Rate('errors');
const loginDuration = new Trend('login_duration', true);

/*
 * Los valores se reciben mediante variables de entorno para evitar
 * colocar credenciales locales o direcciones fijas en el script.
 */
const baseUrl = __ENV.BASE_URL || 'http://127.0.0.1:7055';
const username = __ENV.K6_USERNAME;
const password = __ENV.K6_PASSWORD;

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
  ],

  thresholds: {
    // El 95 % de todas las solicitudes debe terminar antes de 2 segundos.
    http_req_duration: ['p(95)<2000'],

    // Menos del 1 % de las solicitudes debe presentar error HTTP.
    http_req_failed: ['rate<0.01'],

    // Menos del 1 % de los logins debe fallar funcionalmente.
    errors: ['rate<0.01'],

    // El 95 % de las solicitudes de login debe responder antes de 2 segundos.
    login_duration: ['p(95)<2000'],
  },
};

export function setup() {
  if (!username || !password) {
    throw new Error(
      'Debes configurar K6_USERNAME y K6_PASSWORD antes de ejecutar la prueba.'
    );
  }

  /*
   * Verificación inicial con una sola petición.
   * Evita comenzar la carga si las credenciales o el servidor son incorrectos.
   */
  const response = http.post(
    `${baseUrl}/api/login`,
    JSON.stringify({
      usuario: username,
      contrasena: password,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
      tags: {
        endpoint: 'login_setup',
      },
    }
  );

  let body = {};

  try {
    body = response.json();
  } catch {
    body = {};
  }

  if (response.status !== 200 || body.ok !== true) {
    throw new Error(
      `La verificación inicial del login falló. HTTP ${response.status}. ` +
      `Respuesta: ${response.body}`
    );
  }

  console.log('Verificación inicial del login completada correctamente.');

  return {
    loginVerified: true,
  };
}

export default function (data) {
  if (!data.loginVerified) {
    return;
  }

  const response = http.post(
    `${baseUrl}/api/login`,
    JSON.stringify({
      usuario: username,
      contrasena: password,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },

      tags: {
        endpoint: 'login',
      },
    }
  );

  let body = {};

  try {
    body = response.json();
  } catch {
    body = {};
  }

  const successfulLogin =
    response.status === 200 &&
    body.ok === true &&
    body.user !== undefined;

  check(response, {
    'login devuelve HTTP 200': (r) => r.status === 200,

    'login responde antes de 2 segundos': (r) =>
      r.timings.duration < 2000,

    'login confirma autenticación': () =>
      body.ok === true,

    'login devuelve información del usuario': () =>
      body.user !== undefined,
  });

  loginDuration.add(response.timings.duration);
  errorRate.add(!successfulLogin);

  sleep(1);
}