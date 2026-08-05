# language: es

Característica: Autenticación de usuarios
  Como usuario autorizado de Line White Services
  Quiero iniciar sesión en el sistema
  Para acceder a los módulos administrativos

  Escenario: Mostrar correctamente la página de inicio de sesión
    Dado que estoy en la página de inicio de sesión
    Entonces debo visualizar el campo de usuario
    Y debo visualizar el campo de contraseña
    Y debo visualizar el botón de iniciar sesión

  Escenario: Rechazar el inicio de sesión con campos vacíos
    Dado que estoy en la página de inicio de sesión
    Cuando presiono iniciar sesión sin escribir credenciales
    Entonces debo visualizar la alerta "Debe ingresar usuario y contraseña"
    Y debo permanecer en la página de inicio de sesión

  Escenario: Rechazar un usuario inexistente
    Dado que estoy en la página de inicio de sesión
    Cuando intento iniciar sesión con un usuario inexistente
    Entonces debo visualizar la alerta "USUARIO NO EXISTE"
    Y debo permanecer en la página de inicio de sesión

  Escenario: Permitir el inicio de sesión con credenciales válidas
    Dado que estoy en la página de inicio de sesión
    Cuando ingreso credenciales válidas
    Entonces debo acceder al dashboard