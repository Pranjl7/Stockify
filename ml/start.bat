@echo off
echo Installing Python dependencies...
pip install -r requirements.txt
echo.
echo Starting LSTM Stock Prediction Service on http://localhost:8000
echo This may take a moment on first run...
echo.
python app.py
pause
