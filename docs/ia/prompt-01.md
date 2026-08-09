# Prompt 01 — Seguridad del módulo de autenticación

## Objetivo

Generar casos de prueba de seguridad y robustez para el endpoint POST /api/login.

## Herramienta

ChatGPT

## Prompt completo

Actúa como un Senior QA Security Engineer especializado en aplicaciones Node.js, Express, Passport.js y PostgreSQL. Estoy probando Line White Services, una aplicación web que utiliza POST /api/login para autenticación. El endpoint recibe un JSON con los campos usuario y contrasena. Passport Local valida las credenciales, PostgreSQL consulta el usuario mediante una función parametrizada y Argon2 verifica el hash de la contraseña. Cuando la autenticación es válida se crea una sesión mediante express-session. Genera exactamente 12 casos de prueba automatizables con Jest orientados exclusivamente a la seguridad y robustez del login. Incluye casos positivos, negativos y edge cases. Para cada caso indica: ID, nombre descriptivo, objetivo, datos de entrada, resultado esperado y riesgo OWASP relacionado. Considera credenciales incorrectas, usuario inexistente, campos vacíos, null, SQL injection, entrada excesivamente larga, contraseña incorrecta, errores de base de datos, errores de Argon2, información sensible en respuestas y manejo de sesión. No inventes endpoints adicionales ni cambies la arquitectura descrita.


## Output obtenido

Pendiente de registrar.

## Evaluación crítica

Pendiente de ejecutar los casos.

## Métricas

- Casos generados: 12
- Funcionaron sin cambios: pendiente
- Requirieron modificaciones: pendiente
- Descartados: pendiente