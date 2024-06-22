IF %1 EQU 'run' python app.py
IF %1 EQU 'save' pip freeze > requirements.txt
IF %1 EQU 'install' pip install -r requirements.txt
IF %1 EQU 'build' pyinstaller  --clean --noupx   --noconsole --icon=icon.ico --name=DevFusion  --add-data "src:src" --onefile app.py
IF %1 EQU 'activate' .env\Scripts\deactivate.bat
IF %1 EQU 'deactivate' .env\Scripts\activate.bat
