# LINEWHITE
Proyecto empresa LINEWHITE
# Line White Services — Suite de Pruebas Automatizadas

## Descripción del sistema

## Tecnologías utilizadas

## Estructura del proyecto

## Requisitos previos

## Instalación

## Variables de entorno

## Ejecución de pruebas unitarias

## Ejecución de coverage

## Ejecución de Playwright

## Ejecución de Cucumber

## Generación del reporte Allure

## Pipeline CI/CD

## Uso de IA en este Proyecto
## Uso de IA en este Proyecto

| Herramienta IA | Tarea | Prompt utilizado | Resultado | Correcciones aplicadas |
|---|---|---|---|---|
| ChatGPT | Diseño de pruebas unitarias con Jest | “Actúa como Senior QA Engineer y genera pruebas unitarias para Passport, middleware de autenticación y controladores de Express” | Se generó una base de pruebas con mocks para PostgreSQL, Argon2 y Passport | Se ajustaron los objetos simulados, campos `id_tipo_usuario` y respuestas reales de las funciones PostgreSQL |
| ChatGPT | Creación de pruebas E2E y POM | “Genera Page Objects y escenarios Playwright para login, logout, inventario y órdenes técnicas” | Se generaron Page Objects y escenarios E2E | Se corrigieron selectores ambiguos, manejo de sesiones, timeouts y navegación |
| GitHub Copilot | Apoyo en autocompletado de Page Objects y configuración | “Create a Playwright Page Object for the inventory page” | Propuso métodos y selectores reutilizables | Se reemplazaron selectores genéricos por selectores específicos dentro del sidebar |
| ChatGPT | Pipeline de GitHub Actions | “Genera un pipeline con Jest, PostgreSQL temporal, Playwright, Allure, Cucumber y npm audit” | Se creó `qa-pipeline.yml` con tres jobs | Se actualizó Node.js a versión 22 y se agregó la base PostgreSQL temporal |
