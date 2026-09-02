@echo off
cd /d "%~dp0"
start "Servidor do Site - Prosat" cmd /k npm run dev
timeout /t 6 /nobreak >nul
start "" http://localhost:3000
