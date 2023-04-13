@echo off
set PORT=3000
start http://localhost:%PORT%/
call node app.js %PORT%
