import webview
from pathlib import Path
import subprocess
import shutil
import os
import google.generativeai as genai
from winpty import PTY

current_dir = os.path.dirname(os.path.abspath(__file__))
path = os.path.join(current_dir, 'src\\index.html')
url = f'file:///{path}'
window = webview.create_window('DevFusion','http://localhost:5173/',maximized=True,resizable=True,min_size=(900,700))

class File:
   def open(self, path):    
        with open(path, 'r') as archivo:
            contenido = archivo.read()  
        return str(contenido)
   def save(self, path, content):
         with open(path, 'w') as archivo:
              archivo.write(content)
         return True
class Terminal:
    def __init__(self):
        self.process = None
    def create(self, cols, rows, cwd):
        if cwd is None: cwd = Path.home()
        self.process = PTY(cols, rows)
        self.process.spawn(appname='C:\\windows\\system32\\cmd.exe', cwd=str(cwd))
    def write(self, data):
        self.process.write(data)
        return data
    def close(self):
        self.process = None
    def onData(self):
        return self.process.read()
class Gemini:
    def __init__(self):
        self.model = None
    def send(self, message):
        response = self.model.generate_content(message)
        return response.text
    def init(self, api_key):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash')
        return True
    def close(self):
        self.model = None
class GitHub:
    def getUser(self):
        with open('src\\user.json', 'r') as archivo:
            user = archivo.read()
        return user
    def setUser(self, user):
        with open('src\\user.json', 'w') as archivo:
            archivo.write(user)
        return True
    def download(self, url):
        if shutil.which('git') is None:
            return {
                'success': False,
                'message': 'Git no está instalado en tu sistema.'
            }
        destination = os.path.join(Path.home(), 'DevFusion')
    
        os.makedirs(destination, exist_ok=True)
        
        process = subprocess.Popen(f'git clone {url}', cwd=destination, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
        stdout, stderr = process.communicate()
        
        if process.returncode != 0:
            return {
                'success': False,
                'message': 'No se pudo clonar el repositorio.'
            }
        
        repo_name = url.split('/')[-1].replace('.git', '')
        return {
            'success': True,
            'message':os.path.join(destination, repo_name)
        }
class Api:
    def __init__(self):
        self.file = File()
        self.gitHub = GitHub()
        self.gemini = Gemini()
        self.terminal = Terminal()
    def defaultPath(self):
        return str(Path.home())
    def openFolder(self, path):
        return
    def toggleFullscreen(self):
        window.toggle_fullscreen()
    def getFiles(self, path):
        files = []
        for file in Path(path).iterdir():
            file_info = {
                'name': file.name,
                'type': 'file' if file.is_file() else 'folder',
                'path': str(file),
            }
            files.append(file_info)
        return files
    def openFile(self):
        file_types = ( 'All files (*.*)',)
        result = window.create_file_dialog(
            webview.OPEN_DIALOG, allow_multiple=False, file_types=file_types
        )
        return result
    def openFolder(self):
        result = window.create_file_dialog(webview.FOLDER_DIALOG, allow_multiple=False)
        return result

window._js_api = Api()

webview.start(debug=True) 