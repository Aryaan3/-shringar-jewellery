@echo off
echo ========================================
echo   SHRINGAR - Starting All Servers
echo ========================================
echo.

:: Start Backend Server
echo [1/2] Starting Backend (port 5000)...
cd /d "%~dp0server"
start "Shringar-Backend" cmd /k "node server.js"

:: Wait a moment for backend to start
timeout /t 3 /nobreak >nul

:: Start Frontend Server
echo [2/2] Starting Frontend (port 3000)...
cd /d "%~dp0client"
start "Shringar-Frontend" cmd /k "npx vite --port 3000"

echo.
echo ========================================
echo   Both servers are starting!
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:5000
echo ========================================
echo.
echo You can close this window. The servers
echo will keep running in their own windows.
echo To stop them, close those windows.
pause
