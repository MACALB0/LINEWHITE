# 🎓 Guía de Demostración – Line White Services

Este documento sirve como guía para preparar y realizar la demostración del proyecto **Line White Services** en aproximadamente **10 minutos**.

---

# 📋 Antes de la clase

## 1. Preparar el equipo

Antes de iniciar la demostración, verifica que tengas abierto lo siguiente:

* VS Code con el proyecto.
* CMD ubicado en:

```text
C:\Proyectos\linewhite\app
```

* Navegador con el repositorio de **[GitHub](https://github.com/MACALB0/LINEWHITE)**.
* Pestaña **[Actions](https://github.com/MACALB0/LINEWHITE/actions)** mostrando el pipeline en verde.
* Pestaña de **[SonarCloud](https://sonarcloud.io/organizations/macalb0/projects)**.
* Pestaña del reporte publicado de **[Allure](https://macalb0.github.io/LINEWHITE/)**.
* PostgreSQL y Docker cerrados (si no serán utilizados durante la demostración).

Finalmente, confirma que tienes conexión a Internet y acceso a GitHub.

---

## 2. Configurar las variables de entorno

En la consola CMD ejecuta:

```cmd
cd C:\Proyectos\linewhite\app

set "DB_HOST=localhost"
set "DB_PORT=5432"
set "DB_NAME=line_white_service_test"
set "DB_USER=postgres"
set "DB_PASSWORD=TU_PASSWORD_REAL_POSTGRES"

set "E2E_USERNAME=8-999-9999"
set "E2E_PASSWORD=Qa_pipeline_2026#"

set "SESSION_SECRET=qa-demo-secret"
set "BASE_URL=http://127.0.0.1:7055"
```

> ⚠️ **Importante:** configura la contraseña real de PostgreSQL antes de proyectar la pantalla para evitar mostrarla durante la presentación.

---

## 3. Verificar que todo funcione

Ejecutar las pruebas un día antes o algunas horas antes de la exposición.

## **[npm test](../DEMOSTRACION_CLASES/)** 

[📁 Abrir DEMOSTRACION_CLASES](./ir_carpeta.bat)


```bash
npm test
npm run test:coverage
npm run test:e2e
npm run test:bdd
```

> **Recomendación:** no realizar cambios en el código después de esta validación.

---

# ⏱️ Guion recomendado de la presentación

---

# Presentación del sistema

## Mostrar

* Aplicación funcionando o [README](https://github.com/MACALB0/LINEWHITE/blob/main/README.md) del proyecto.

## Explicar

> Nuestro proyecto se llama **Line White Services**. Es una aplicación web para la gestión de usuarios, inventario, órdenes técnicas y facturación. Está desarrollada con Node.js, Express, Pug y PostgreSQL, e incorpora Passport y Argon2 para la autenticación. Para asegurar su calidad implementamos pruebas con Jest, Playwright, Cucumber, Axe, Allure, SonarCloud, k6, OWASP ZAP y GitHub Actions.

---

# Estructura de pruebas

## Mostrar

## **[tests](https://github.com/MACALB0/LINEWHITE/tree/main/tests)**

## Mostrar:

## **[QA-PIPELINE.YML](https://github.com/MACALB0/LINEWHITE/blob/main/.github/workflows/qa-pipeline.yml)**
## **[sonar-project.properties](../sonar-project.properties)**
## **[DB/init-test-db.sql](https://github.com/MACALB0/LINEWHITE/blob/main/DB/init-test-db.sql)**

## Mostrar:

## **[LoginPage.js](../tests/e2e/pages/LoginPage.js)**
## **[login.spec.js](../tests/e2e/login.spec.js)**

## Explicar

> La suite está organizada por niveles. En **unit** se encuentran las pruebas con Jest; en **e2e** están Playwright, Page Object Model y los escenarios BDD; mientras que **performance** contiene las pruebas de k6.

> Los selectores se mantienen dentro de los Page Objects y no directamente en los tests, facilitando el mantenimiento cuando cambia la interfaz.

---

# Ejecutar pruebas unitarias

Ejecutar:

```bash
npm test
```

Resultado esperado:

```text
Test Suites: 5 passed
Tests: 32 passed
```

## Explicar

> Ejecutamos las pruebas unitarias utilizando Jest. Validamos Passport, el middleware de autenticación, los controladores y distintos escenarios exitosos y de error. Además, utilizamos mocks para PostgreSQL, Passport y Argon2.

---

# Mostrar cobertura

Ejecutar:

```bash
npm run test:coverage
```

Resultado esperado:

```text
All files
Statements: 100%
Branches: 73.07%
Functions: 100%
Lines: 100%
```

Abrir el reporte:

```bash
start coverage\lcov-report\index.html
```

## Explicar

> El proyecto supera el mínimo de cobertura requerido del 70 %. Obtuvimos 100 % en statements, funciones y líneas, y 73.07 % en branches. Además, el pipeline falla automáticamente si la cobertura baja del umbral configurado.

---

# Ejecutar E2E

## E2E

```bash
npm run test:e2e
```

Resultado esperado:

```text
Violaciones encontradas: 0
```

## Explicar

> Estas pruebas ejecutan Chromium en modo headless, realizan el inicio de sesión con un usuario de prueba, verifican la redirección al dashboard, comprueban el acceso a rutas protegidas y validan que no existan violaciones críticas.

> La suite completa contiene 13 pruebas E2E.

---

# Ejecutar pruebas BDD

Ejecutar:

```bash
npm run test:bdd
```

Resultado esperado:

```text
6 scenarios (6 passed)
35 steps (35 passed)
```

Mostrar rápidamente un archivo **[.feature](https://github.com/MACALB0/LINEWHITE/blob/main/tests/e2e/features/autenticacion.feature)** :

```gherkin
Característica:
Escenario:
Dado
Cuando
Entonces
```

## Explicar

> Implementamos seis escenarios BDD utilizando Cucumber y Gherkin. Estos escenarios describen el comportamiento esperado del sistema utilizando un lenguaje entendible tanto para perfiles técnicos como para usuarios del negocio.

---

# Mostrar el pipeline

Abrir:

 **[QA Pipeline](https://github.com/MACALB0/LINEWHITE/actions/runs/31071828243)** 


Los jobs deben verse en verde:

```text
Unit Tests
E2E Tests
Security Scan
SonarCloud Scan
Deploy Allure Report
```

Abrir el job **E2E** y mostrar:

```text
13 passed
6 scenarios (6 passed)
35 steps (35 passed)
```

Luego mostrar la sección **Artifacts**:

```text
coverage-report
e2e-allure-reports
```

## Explicar

> El pipeline se ejecuta automáticamente en cada push o pull request hacia la rama principal. Primero se ejecutan las pruebas unitarias y se calcula la cobertura; posteriormente levanta PostgreSQL temporalmente, carga los datos de prueba, instala Playwright y ejecuta las pruebas E2E, Axe y Cucumber. Finalmente genera los artefactos y publica el reporte Allure en GitHub Pages.

---

#  Cierre

## Mensaje final

> Como resultado, logramos **32 pruebas unitarias**, **13 pruebas E2E**, **6 escenarios BDD**, una cobertura superior al **70 %**, **cero violaciones críticas o serias de accesibilidad** detectadas por Axe y un **pipeline completamente automatizado**. Esto permite detectar errores antes de integrar cambios a la rama principal, mejorando la seguridad, mantenibilidad y confiabilidad del sistema.
