# LINEWHITE

Proyecto empresa LINEWHITE.

# Line White Services — Suite de Pruebas Automatizadas

## Descripción del sistema

**Line White Services** es una aplicación web desarrollada para apoyar la gestión
de los procesos operativos de una empresa de servicios técnicos.

El sistema permite administrar diferentes módulos, entre ellos:

- Autenticación de usuarios.
- Dashboard principal.
- Gestión de inventario.
- Gestión de facturas.
- Gestión de usuarios.
- Gestión de órdenes técnicas.
- Control de acceso mediante sesiones y tipos de usuario.

Como parte del Proyecto Integrador de Aseguramiento de Calidad, se implementó una
suite de pruebas automatizadas para validar aspectos funcionales, de integración,
seguridad, accesibilidad, compatibilidad y calidad del código.

La estrategia de QA incorpora pruebas unitarias, pruebas End-to-End, BDD,
Cross-Browser/Cross-Device Testing, análisis estático y ejecución automatizada
mediante integración continua.

---

## Tecnologías utilizadas

### Aplicación

- Node.js
- Express
- PostgreSQL
- Pug
- Passport
- Argon2
- express-session
- session-file-store
- AdminLTE

### Quality Assurance

- Jest — pruebas unitarias y coverage.
- Playwright — pruebas End-to-End.
- Playwright — Cross-Browser y Cross-Device Testing.
- Axe Core — pruebas automatizadas de accesibilidad.
- Cucumber — escenarios BDD.
- Allure Report — generación de reportes de pruebas.
- SonarQube Cloud — análisis estático y métricas de calidad.
- npm audit — análisis de vulnerabilidades en dependencias.
- OWASP ZAP — pruebas de seguridad dinámica.
- k6 — pruebas de rendimiento y carga.

### CI/CD

- GitHub
- GitHub Actions
- GitHub Pages
- SonarQube Cloud

---

## Estructura del proyecto

La estructura principal utilizada para las pruebas y automatización es:

```text
LINEWHITE/
│
├── .github/
│   └── workflows/
│       └── qa-pipeline.yml
│
├── config/
│   └── passport.js
│
├── controllers/
│   └── components/
│
├── middlewares/
│   └── auth.js
│
├── routes/
│
├── views/
│
├── public/
│
├── DB/
│   └── init-test-db.sql
│
├── tests/
│   ├── unit/
│   └── e2e/
│
├── reports/
│   ├── playwright-html/
│   ├── cross-browser-html/
│   └── allure-report/
│
├── allure-results/
│
├── app.js
├── package.json
├── package-lock.json
├── playwright.config.js
├── playwright.cross-browser.config.js
└── README.md
```

La carpeta `tests/unit` contiene las pruebas unitarias desarrolladas con Jest,
mientras que `tests/e2e` contiene los escenarios automatizados mediante
Playwright.

Los reportes generados por las diferentes herramientas son almacenados en la
carpeta `reports`.

---

## Requisitos previos

Para ejecutar el proyecto y su suite de pruebas se requiere:

- Node.js 22 o compatible.
- npm.
- PostgreSQL.
- Git.
- Navegadores de Playwright.
- Java 17 o superior para la generación de reportes Allure.
- Variables de entorno configuradas correctamente.

Para verificar las versiones instaladas:

```bash
node --version
npm --version
git --version
```

---

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/MACALB0/LINEWHITE
```

Ingresar al directorio de la aplicación:

```bash
cd LINEWHITE
```

Instalar las dependencias definidas en `package-lock.json`:

```bash
npm ci
```

Instalar los navegadores utilizados por Playwright:

```bash
npx playwright install
```

Para instalar también las dependencias requeridas en ambientes Linux/CI:

```bash
npx playwright install --with-deps
```

---

## Variables de entorno

La aplicación utiliza variables de entorno para manejar información de
configuración.

Ejemplo:

```env
PORT=7055
SESSION_SECRET=<session-secret>

DB_HOST=localhost
DB_PORT=5432
DB_NAME=<database-name>
DB_USER=<database-user>
DB_PASSWORD=<database-password>

E2E_USERNAME=<test-username>
E2E_PASSWORD=<test-password>
```

Las credenciales y secretos reales **no deben almacenarse directamente en el
repositorio**.

En GitHub Actions, los valores sensibles utilizados por las pruebas son
administrados mediante **GitHub Actions Secrets**.

---

## Ejecución de pruebas unitarias

Las pruebas unitarias fueron desarrolladas utilizando Jest.

Para ejecutar todas las pruebas:

```bash
npm test
```

La suite valida componentes críticos como:

- Configuración principal de Express.
- Autenticación.
- Passport.
- Middleware de autorización.
- Controladores.
- Vistas.
- Inventario.
- Manejo de sesiones.

La suite actual contiene más de 40 pruebas unitarias automatizadas.

---

## Ejecución de coverage

Para ejecutar Jest generando el reporte de cobertura:

```bash
npm run test:coverage
```

Jest genera los reportes dentro de:

```text
coverage/
```

Se generan reportes en los formatos:

- Text
- LCOV
- HTML

El proyecto establece un umbral global mínimo de:

```text
Statements: >= 70%
Branches:   >= 70%
Functions:  >= 70%
Lines:      >= 70%
```

La cobertura es utilizada adicionalmente por SonarQube Cloud durante el análisis
estático del proyecto.

---

## Ejecución de Playwright

Las pruebas End-to-End fueron implementadas mediante Playwright.

Ejecutar la suite:

```bash
npm run test:e2e
```

Ejecutar las pruebas mostrando el navegador:

```bash
npm run test:e2e:headed
```

Ejecutar mediante la interfaz de Playwright:

```bash
npm run test:e2e:ui
```

Visualizar el reporte generado:

```bash
npm run report:e2e
```

Los reportes HTML son almacenados en:

```text
reports/playwright-html/
```

Las pruebas E2E permiten validar flujos reales de la aplicación, incluyendo
autenticación, navegación y comportamiento de los principales módulos.

### Cross-Browser y Cross-Device

También se implementó una configuración específica para ejecutar pruebas en
diferentes navegadores y dispositivos emulados:

```bash
npm run test:cross-browser
```

La matriz automatizada incluye:

- Chromium / Desktop Chrome.
- Firefox / Desktop Firefox.
- WebKit / Desktop Safari.
- Pixel 7 / Mobile Chrome.
- iPhone 14 / Mobile Safari.
- iPad Pro 11 / Tablet.

Para visualizar el reporte:

```bash
npm run report:cross-browser
```

El reporte se almacena en:

```text
reports/cross-browser-html/
```

---

## Ejecución de Cucumber

Se utiliza Cucumber para implementar escenarios basados en
**Behavior-Driven Development (BDD)**.

Ejecutar todos los escenarios BDD:

```bash
npm run test:bdd
```

El comando utiliza `start-server-and-test` para:

1. Iniciar la aplicación.
2. Esperar a que esté disponible en el puerto `7055`.
3. Ejecutar los escenarios de Cucumber.
4. Finalizar el servidor después de las pruebas.

También puede ejecutarse específicamente la configuración de login:

```bash
npm run test:bdd:login
```

Los resultados pueden almacenarse como evidencia dentro de:

```text
reports/cucumber-report.json
```

---

## Generación del reporte Allure

Allure se utiliza para generar un reporte consolidado y visual de los resultados
de las pruebas automatizadas.

Ejecutar las pruebas E2E y generar los resultados:

```bash
npm run test:e2e:allure
```

Generar manualmente el reporte:

```bash
npm run allure:generate
```

Abrir el reporte:

```bash
npm run allure:open
```

El reporte generado se encuentra en:

```text
reports/allure-report/
```

En el pipeline CI/CD, el reporte Allure también es publicado automáticamente
mediante GitHub Pages después de una ejecución satisfactoria.

---

## Pipeline CI/CD

El proyecto implementa integración continua mediante **GitHub Actions**.

El workflow principal se encuentra en:

```text
.github/workflows/qa-pipeline.yml
```

El pipeline ejecuta diferentes capas de aseguramiento de calidad.

### Jobs principales

**1. Unit Tests**

Ejecuta:

```bash
npm run test:coverage
```

Valida las pruebas unitarias y genera el reporte de cobertura.

**2. E2E Tests**

Configura una base de datos PostgreSQL temporal y ejecuta:

- Playwright.
- Axe.
- Pruebas E2E.
- Cucumber.
- Allure.

**3. Security Scan**

Ejecuta:

```bash
npm audit --audit-level=high
```

para detectar vulnerabilidades conocidas en las dependencias del proyecto.

**4. SonarCloud Scan**

Ejecuta el análisis estático mediante SonarQube Cloud, incluyendo:

- Seguridad.
- Reliability.
- Maintainability.
- Coverage.
- Duplicaciones.
- Issues del código.

**5. Cross-Browser Tests**

Ejecuta Playwright sobre diferentes navegadores y perfiles de dispositivos para
comprobar la compatibilidad de la aplicación.

**6. Deploy Allure Report**

Publica automáticamente el reporte de Allure mediante GitHub Pages después de
una ejecución satisfactoria de las pruebas.

### Criterio de calidad del pipeline

El objetivo es mantener el pipeline completamente verde antes de integrar
cambios en la rama principal.

La ejecución automatizada permite detectar regresiones, vulnerabilidades,
problemas de cobertura, errores funcionales e incompatibilidades antes de que
los cambios sean considerados aptos para integración.

---

## Integración de IA Documentada

Durante el desarrollo del Proyecto Integrador se utilizaron herramientas de
Inteligencia Artificial como apoyo al proceso de QA.

Las herramientas principales utilizadas fueron:

- ChatGPT (OpenAI).
- GitHub Copilot Chat.

La IA fue utilizada para análisis de requisitos, diseño y revisión de casos de
prueba, apoyo con Jest y Playwright, configuración de GitHub Actions,
SonarQube Cloud, OWASP ZAP, k6, Cucumber, Page Objects, Cross-Browser Testing
y elaboración de documentación técnica.

---

## Estado del proyecto

El Proyecto Integrador incorpora diferentes niveles de aseguramiento de calidad:

- Pruebas unitarias.
- Coverage automatizado.
- Pruebas E2E.
- BDD.
- Pruebas de accesibilidad.
- Cross-Browser Testing.
- Cross-Device Testing.
- Análisis estático.
- Análisis de dependencias.
- Pruebas de seguridad.
- Pruebas de rendimiento.
- Pipeline CI/CD.
- Reportes automatizados.
- Integración de IA documentada.

El objetivo final es mantener una suite reproducible y automatizada que permita
evaluar continuamente la calidad de **Line White Services**.

Durante el desarrollo del proyecto integrador Line White Services se utilizaron
herramientas de Inteligencia Artificial como apoyo en diferentes actividades de
aseguramiento de calidad. La IA fue utilizada como asistente técnico para análisis,
automatización, documentación y resolución de problemas, manteniendo siempre la
validación humana antes de incorporar los resultados al proyecto.

### Herramientas de IA utilizadas

| Orden | Herramienta | Problema o tarea | Resultado obtenido | Tiempo/beneficio |
|------:|-------------|------------------|-------------------|------------------|
| 1 | ChatGPT (OpenAI) | Análisis de requisitos y planificación del proyecto | Permitió estructurar las actividades y entregables del curso | Reducción del tiempo de análisis inicial |
| 2 | ChatGPT | Generación y revisión de casos de prueba | Generación inicial de escenarios y casos de prueba | Diseño de pruebas: de 8 h a 3 h |
| 3 | ChatGPT | Desarrollo de pruebas Jest y Playwright | Facilitó la construcción y ampliación de la suite automatizada | Menor tiempo de implementación y depuración |
| 4 | ChatGPT | Configuración del Pipeline CI/CD con GitHub Actions | Pipeline automatizado con pruebas, coverage y análisis de calidad | Configuración: de 5 h a 2 h |
| 5 | ChatGPT | Configuración y corrección de SonarQube Cloud | Análisis estático integrado al pipeline y corrección de hallazgos | Reducción del tiempo de investigación y configuración |
| 6 | ChatGPT | Análisis de OWASP ZAP y pruebas de rendimiento con k6 | Interpretación de resultados y documentación de hallazgos | Apoyo en análisis de seguridad y rendimiento |
| 7 | GitHub Copilot Chat | Generación inicial de Page Objects | Creación de una base reutilizable posteriormente revisada manualmente | Creación de Page Objects: de 3 h a 1 h |
| 8 | ChatGPT | Configuración y corrección de escenarios BDD con Cucumber | Corrección de Steps e integración con la aplicación | Escenarios BDD: de 4 h a 1.5 h |
| 9 | ChatGPT | Pruebas Cross-Browser y Cross-Device | Apoyo en configuración de Playwright para Chromium, Firefox, WebKit y dispositivos emulados | Reducción del tiempo de configuración e investigación |
| 10 | ChatGPT | Generación y revisión de documentación técnica | Apoyo en informes ISO, OWASP, QA y Reporte Ejecutivo | Documentación: de 12 h a 5 h |
| 11 | ChatGPT | Investigación y resolución de errores | Análisis de errores encontrados durante pruebas e integración | Investigación: de 8 h a 3 h |

### Tiempo aproximado ahorrado

La utilización de IA permitió reducir el tiempo estimado de varias actividades:

| Actividad | Sin IA | Con IA |
|-----------|-------:|-------:|
| Diseño de pruebas | 8 h | 3 h |
| Configuración del Pipeline CI/CD | 5 h | 2 h |
| Generación de documentación | 12 h | 5 h |
| Investigación de errores | 8 h | 3 h |
| Creación de Page Objects | 3 h | 1 h |
| Generación de escenarios BDD | 4 h | 1.5 h |
| **Total** | **40 h** | **15.5 h** |

El ahorro aproximado fue de **24.5 horas**, equivalente aproximadamente a un
**61 % del tiempo estimado**.

### Validación y correcciones realizadas

Las respuestas generadas por las herramientas de IA no fueron incorporadas
automáticamente al proyecto. Cada propuesta fue revisada, ejecutada y adaptada
al entorno real de Line White Services.

Entre las principales correcciones realizadas por el equipo estuvieron:

- Ajuste de mocks utilizados en las pruebas unitarias con Jest.
- Corrección de campos como `id_tipo_usuario` utilizados en autenticación y autorización.
- Ajuste de selectores utilizados por Playwright.
- Corrección del manejo de sesiones durante las pruebas E2E.
- Ajuste de timeouts y navegación en las pruebas Cross-Browser.
- Corrección de Steps utilizados por Cucumber.
- Ajustes en la configuración de SonarQube Cloud.
- Mejoras en el pipeline CI/CD hasta conseguir la ejecución correcta de sus jobs.
- Validación manual de Page Objects inicialmente sugeridos por GitHub Copilot.
- Revisión de los resultados de seguridad y rendimiento antes de documentarlos.

### Reflexión crítica grupal

La integración de herramientas de Inteligencia Artificial durante el desarrollo
del proyecto permitió acelerar significativamente tareas relacionadas con la
generación de casos de prueba, configuración de herramientas, elaboración de
documentación técnica y resolución de problemas de integración.

Sin embargo, la experiencia también demostró que la IA no reemplaza el criterio
técnico del ingeniero de calidad. En diferentes etapas fue necesario validar,
corregir y adaptar las soluciones propuestas antes de incorporarlas al proyecto.

La principal contribución de la IA fue reducir el tiempo dedicado a investigación,
documentación y generación de soluciones iniciales. La revisión humana continuó
siendo indispensable para garantizar la calidad, seguridad y mantenibilidad del
software.

Como resultado, el equipo considera recomendable utilizar IA en procesos de QA
como un asistente técnico especializado. Su efectividad depende del conocimiento
del profesional, su capacidad crítica y la validación de los resultados obtenidos.

### Evidencia documental

El uso de Inteligencia Artificial durante el proyecto también se encuentra
documentado en el archivo:

**ENTREGABLE 4 — Integración de IA Documentada.pdf**

Este documento contiene la recopilación formal del uso de IA realizado durante
el proyecto, incluyendo herramientas utilizadas, problemas resueltos, resultados,
estimación del tiempo ahorrado y reflexión crítica grupal.