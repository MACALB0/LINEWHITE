@REM ```bat
@REM @echo off
@REM title Line White Services - QA

@REM echo.
@REM echo ========================================
@REM echo       LINE WHITE SERVICES
@REM echo ========================================
@REM echo.

@REM REM ========================================
@REM REM Proyecto
@REM REM ========================================
@REM cd /d "C:\Proyectos\linewhite\app"

@REM if errorlevel 1 (
@REM     echo ERROR: No se pudo acceder al proyecto.
@REM     echo.
@REM     pause
@REM     exit /b 1
@REM )

@REM REM ========================================
@REM REM NVM / Node.js
@REM REM ========================================
@REM echo.
@REM echo #########################
@REM echo NVM - Node.js Version
@REM echo #########################

@REM call nvm use 24.18.1

@REM if errorlevel 1 (
@REM     echo.
@REM     echo ERROR: No se pudo activar Node.js 24.18.1
@REM     echo.
@REM     pause
@REM     exit /b 1
@REM )

@REM echo.
@REM echo Nodejs Version
@REM node -v

@REM echo.
@REM echo Npm Version
@REM call npm -v

@REM REM ========================================
@REM REM Variables de entorno
@REM REM ========================================
@REM set "DB_HOST=localhost"
@REM set "DB_PORT=5432"
@REM set "DB_NAME=line_white_service_test"
@REM set "DB_USER=postgres"
@REM set "DB_PASSWORD=156sdefrgtyh.*#"
@REM set "E2E_USERNAME=8-999-9999"
@REM set "E2E_PASSWORD=Qa_pipeline_2026#"
@REM set "SESSION_SECRET=qa-demo-secret"
@REM set "BASE_URL=http://127.0.0.1:7055"

@REM REM #########################
@REM REM Presentadores:
@REM REM #########################
@REM echo.
@REM echo #########################
@REM echo Presentadores:
@REM echo #########################
@REM echo Jorge Luis Perez
@REM echo Marcos Alberto Castillo
@REM echo #########################
@REM echo Line White Services

@REM echo.
@REM echo ========================================
@REM echo      CONFIGURACION COMPLETADA
@REM echo ========================================
@REM echo.

@REM npm test



@REM pause
@REM ```

```bat
@echo off
title Line White Services - QA

cd /d "C:\Proyectos\linewhite\app"

if errorlevel 1 (
    echo ERROR: No se pudo acceder al proyecto.
    cmd /k
    exit /b
)

REM #########################
REM NVM - Node.js Version
REM #########################
echo.
echo #########################
echo NVM - Node.js Version
echo #########################
call nvm use 24.18.1

echo.
echo Nodejs Version
node -v

echo.
echo Npm Version
call npm -v

REM #########################
REM Variables de entorno
REM #########################
set "DB_HOST=localhost"
set "DB_PORT=5432"
set "DB_NAME=line_white_service_test"
set "DB_USER=postgres"
set "DB_PASSWORD=AQUI_VA_LA_CONTRASEÑA"
set "E2E_USERNAME=8-999-9999"
set "E2E_PASSWORD=Qa_pipeline_2026#"
set "SESSION_SECRET=qa-demo-secret"
set "BASE_URL=http://127.0.0.1:7055"

REM #########################
REM Presentadores:
REM #########################
echo.
echo #########################
echo Presentadores:
echo #########################
echo Jorge Luis Perez
echo Marcos Alberto Castillo
echo #########################
echo Line White Services

REM #########################
REM Ejecutar pruebas
REM #########################
echo.
echo #########################
echo Ejecutando NPM TEST
echo #########################
echo.

call npm test

echo.
echo #########################
echo NPM TEST FINALIZADO
echo #########################
echo.

cmd /k
```
