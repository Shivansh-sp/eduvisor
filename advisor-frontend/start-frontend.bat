@echo off
echo Starting EduAdvisor Frontend...
cd /d "%~dp0"
echo Current directory: %CD%
echo Starting npm with Node.js compatibility...
set NODE_OPTIONS=--openssl-legacy-provider
npm start
pause
