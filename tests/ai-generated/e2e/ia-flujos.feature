# language: es

# LABORATORIO 5.1 — IA integrada al Proyecto Integrador
# Prompt Estratégico #3
# Escenarios BDD generados inicialmente con IA y revisados por el equipo

Característica: Flujos críticos de Line White Services generados con IA

  Como usuario del sistema
  Quiero validar los principales flujos funcionales
  Para asegurar que la aplicación responda correctamente

  @alta
  Escenario: AI-BDD-01 - Iniciar sesión con credenciales válidas
    Dado que estoy en la página de inicio de sesión
    Cuando ingreso credenciales válidas
    Entonces debo acceder al dashboard

  @alta
  Escenario: AI-BDD-02 - Rechazar credenciales incorrectas
    Dado que estoy en la página de inicio de sesión
    Cuando intento iniciar sesión con un usuario inexistente
    Entonces debo permanecer en la página de inicio de sesión

  @alta
  Escenario: AI-BDD-03 - Impedir acceso al dashboard sin sesión
    Dado que no tengo una sesión autenticada
    Cuando intento acceder directamente al dashboard
    Entonces debo ser redirigido a la página de inicio de sesión

  @alta
  Escenario: AI-BDD-04 - Acceder al módulo de Inventario
    Dado que he iniciado sesión correctamente
    Cuando selecciono el módulo de Inventario
    Entonces debo visualizar la página de Inventario

  @media
  Escenario: AI-BDD-05 - Visualizar productos del inventario
    Dado que he iniciado sesión correctamente
    Cuando selecciono el módulo de Inventario
    Entonces debo visualizar la tabla de productos

  @alta
  Escenario: AI-BDD-06 - Acceder al módulo de Órdenes Técnicas
    Dado que he iniciado sesión correctamente
    Cuando selecciono el módulo de Órdenes Técnicas
    Entonces debo visualizar la página de Órdenes Técnicas

  @media
  Escenario: AI-BDD-07 - Visualizar órdenes técnicas registradas
    Dado que he iniciado sesión correctamente
    Cuando selecciono el módulo de Órdenes Técnicas
    Entonces debo visualizar la tabla de órdenes técnicas

  @baja
  Escenario: AI-BDD-08 - Cerrar sesión desde el sistema
    Dado que he iniciado sesión correctamente
    Cuando cierro la sesión
    Entonces debo regresar a la página de inicio de sesión