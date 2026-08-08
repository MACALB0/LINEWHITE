```bat
@echo off

REM ========================================================= 
REM MAXIMIZAR CMD 
REM ========================================================= 
if not "%1"=="MAX" start "" /MAX "%~f0" MAX & exit /b setlocal EnableDelayedExpansion

title Line White Services - QA
setlocal EnableDelayedExpansion

REM =========================================================
REM COLORES ANSI
REM =========================================================
for /F "delims=" %%A in ('echo prompt $E^| cmd') do set "ESC=%%A"

set "RESET=!ESC![0m"
set "RED=!ESC![91m"
set "GREEN=!ESC![92m"
set "YELLOW=!ESC![93m"
set "BLUE=!ESC![94m"
set "CYAN=!ESC![96m"
set "WHITE=!ESC![97m"

REM =========================================================
REM PROYECTO
REM =========================================================
cd /d "C:\Proyectos\linewhite\app"

if errorlevel 1 (
    echo.
    echo !RED!ERROR: No se pudo acceder al proyecto.!RESET!
    echo.
    cmd /k
    exit /b 1
)

REM =========================================================
REM ENCABEZADO
REM =========================================================
cls

REM =========================================================
REM PRESENTADORES
REM =========================================================
echo.
echo !CYAN!#########################!RESET!
echo !CYAN!Presentadores:!RESET!
echo !CYAN!#########################!RESET!
echo !WHITE!Jorge Luis Perez!RESET!
echo !WHITE!Marcos Alberto Castillo!RESET!
echo !CYAN!#########################!RESET!

pause >nul

echo.
echo !CYAN!=========================================================!RESET!
echo !CYAN!              LINE WHITE SERVICES                      !RESET!
echo !CYAN!=========================================================!RESET!
echo.

pause >nul

REM =========================================================
REM NVM / NODE.JS
REM =========================================================
echo !BLUE!#########################!RESET!
echo !BLUE!NVM - Node.js Version!RESET!
echo !BLUE!#########################!RESET!

call nvm use 24.18.1

pause >nul

if errorlevel 1 (
    echo.
    echo !RED!ERROR: No se pudo activar Node.js 24.18.1!RESET!
    echo.
    cmd /k
    exit /b 1
)

echo.
echo !YELLOW!Nodejs Version:!RESET!
node -v

pause >nul

echo.
echo !YELLOW!Npm Version:!RESET!
call npm -v

pause >nul

REM =========================================================
REM VARIABLES DE ENTORNO
REM =========================================================
set "PORT=7055"
set "DB_HOST=localhost"
set "DB_PORT=5432"
set "DB_NAME=line_white_service_test"
set "DB_USER=postgres"
set "DB_PASSWORD=AQUI_VA_LA_CONTRASEÑA"
set "E2E_USERNAME=8-999-9999"
set "E2E_PASSWORD=Qa_pipeline_2026#"
set "SESSION_SECRET=qa-demo-secret"
set "BASE_URL=http://127.0.0.1:7055"

echo.
echo !GREEN!Variables de entorno configuradas correctamente.!RESET!

REM =========================================================
REM NPM TEST:BDD
REM =========================================================
echo.
echo !YELLOW!=========================================================!RESET!
echo !YELLOW!                  EJECUTANDO NPM TEST:BDD                 !RESET!
echo !YELLOW!=========================================================!RESET!
echo.

call npm run test:bdd

if errorlevel 1 (
    echo.
    echo !RED!=========================================================!RESET!
    echo !RED!                 NPM TEST:BDD: ERROR                      !RESET!
    echo !RED!=========================================================!RESET!
) else (
    echo.
    echo !GREEN!=========================================================!RESET!
    echo !GREEN!                NPM TEST:BDD: OK                         !RESET!
    echo !GREEN!=========================================================!RESET!
)

echo.
echo !CYAN!Presiona una tecla para cerrar...!RESET!
pause >nul
exit
```
