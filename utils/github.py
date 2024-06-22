import os
import subprocess
import shutil
from pathlib import Path
import json
class GitHub:
    def __init__(self):
        self.user = None
    def getUser(self):
        with open('src\\user.json', 'r') as archivo:
            datos = json.load(archivo)
        self.user = datos['gitHub']
        return json.dumps(self.user)
    def setUser(self, user):
        if isinstance(user, str):
            user = json.loads(user)

        with open('src\\user.json', 'r') as archivo:
            datos = json.load(archivo)
        datos['gitHub'] = user
        with open('src\\user.json', 'w') as archivo:
            json.dump(datos, archivo, indent=4)
        self.user = user
        return True
    def close(self):
        self.setUser(None)
    def download(self, url):
        if shutil.which('git') is None:
            return {
                'success': False,
                'message': 'Git no está instalado en tu sistema.',
                'code': 404
            }
        destination = os.path.join(Path.home(), 'DevFusion')
    
        os.makedirs(destination, exist_ok=True)
        
        process = subprocess.Popen(f'git clone {url}', cwd=destination, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
        stdout, stderr = process.communicate()
        
        if process.returncode != 0:
            return {
                'success': False,
                'message': 'No se pudo clonar el repositorio.',
                'code': 400
            }
        
        repo_name = url.split('/')[-1].replace('.git', '')
        return {
            'success': True,
            'message':os.path.join(destination, repo_name),
            'code': 200

        }