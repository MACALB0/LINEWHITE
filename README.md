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

## Integración de IA Documentada

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