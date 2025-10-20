@echo off
echo ========================================
echo Birthday Payment App - Setup
echo ========================================
echo.

echo Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to install dependencies!
    echo Please make sure Node.js is installed.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Installation complete!
echo Starting development server...
echo ========================================
echo.

call npm run dev

pause
