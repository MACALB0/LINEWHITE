# language: es

Característica: Acceso a módulos de negocio
  Como usuario autorizado de Line White Services
  Quiero navegar a los módulos principales
  Para gestionar la operación del sistema

  Antecedentes:
    Dado que he iniciado sesión correctamente

  Escenario: Acceder al módulo de Inventario
    Cuando selecciono el módulo de Inventario
    Entonces debo visualizar la página de Inventario
    Y debo visualizar la tabla de productos

  Escenario: Acceder al módulo de Órdenes Técnicas
    Cuando selecciono el módulo de Órdenes Técnicas
    Entonces debo visualizar la página de Órdenes Técnicas
    Y debo visualizar la tabla de órdenes técnicas