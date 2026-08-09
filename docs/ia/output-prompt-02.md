# Output Prompt 02 — Pruebas unitarias de Passport

## Objetivo

Generar pruebas unitarias utilizando Jest y mocks para las
dependencias externas del módulo Passport.js de Line White Services.

## Herramienta

ChatGPT

## Tests generados

La IA generó ocho pruebas:

1. Usuario inexistente.
2. Usuario no autorizado.
3. Contraseña incorrecta.
4. Autenticación válida.
5. Error de PostgreSQL.
6. Serialización del usuario.
7. Deserialización correcta.
8. Error durante la deserialización.

## Primera ejecución

Resultado inicial:

- Tests generados: 8
- Tests aprobados: 7
- Tests fallidos: 1

El test que presentó fallo fue:

AI-PASSPORT-07 - Debe deserializar correctamente un usuario.

El resultado esperado era la restauración del objeto de usuario,
pero Passport devolvió `done(null, false)`.

## Análisis del fallo

Durante la revisión humana se identificó que el mock generado
por IA no representaba completamente el contrato real de la
función PostgreSQL `FN_CONSULTA_LOGIN_SESION`.

La función devuelve adicionalmente:

- `RES_RESPUESTA`
- `RES_RESPUESTA_MSG`

Estos campos no fueron incluidos en la respuesta simulada
generada originalmente por IA.

Como consecuencia, la implementación real interpretó el
registro simulado como un usuario no autorizado.

## Corrección aplicada

Se agregaron al mock:

```javascript
res_respuesta: "SI",
res_respuesta_msg: "USUARIO AUTORIZADO"