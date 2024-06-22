@echo off

IF "%1" EQU "start" (
    python app.py
) ELSE IF "%1" EQU "save" (
    pip freeze > requirements.txt
) ELSE IF "%1" EQU "install" (
    pip install -r requirements.txt
) ELSE IF "%1" EQU "build" (
    pyinstaller --clean --noupx --noconsole --icon=icon.ico --name=DevFusion --add-data "src:src" --onefile app.py
) ELSE IF "%1" EQU "activate" (
    .env\Scripts\activate.bat
) ELSE IF "%1" EQU "deactivate" (
    .env\Scripts\deactivate.bat
)  ELSE IF "%1" EQU "npm" (
    IF "%2" NEQ "" (
        npm --prefix client %2 %3 %4 %5 %6 %7 %8 %9
    ) ELSE (
        echo No se ha especificado un comando para npm.
    )
) ELSE (
    echo Comando no reconocido. Por favor, usa uno de los siguientes:
    echo start - Para ejecutar app.py
    echo save - Para guardar las dependencias en requirements.txt
    echo install - Para instalar las dependencias de requirements.txt
    echo build - Para construir la aplicacion con PyInstaller
    echo activate - Para activar el entorno virtual
    echo deactivate - Para desactivar el entorno virtual
)