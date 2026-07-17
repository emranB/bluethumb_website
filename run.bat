@echo off
setlocal

cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo Node.js is required. Install it from https://nodejs.org/
  exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
  echo npm is required. Install Node.js from https://nodejs.org/
  exit /b 1
)

if not exist "node_modules\" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 exit /b 1
)

echo Building site...
call npm run build
if errorlevel 1 exit /b 1

echo Starting preview at http://localhost:9000
call npm run preview -- --host 0.0.0.0 --port 9000
