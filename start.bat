@echo off
echo Medical Tourism App Setup and Startup
echo =====================================
echo.

echo Installing dependencies...
call npm run install-all

echo.
echo Setting up environment...
if not exist "backend\.env" (
    echo Creating .env file from config.env...
    copy "backend\config.env" "backend\.env"
) else (
    echo .env file already exists.
)

echo.
echo Starting the application...
echo Backend will run on http://localhost:5000
echo Frontend will run on http://localhost:3000
echo.
echo Press any key to start both servers...
pause >nul

echo.
echo Starting servers...
call npm run dev

pause


