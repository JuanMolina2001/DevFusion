import webview
from pathlib import Path
import os
from utils.github import GitHub
from utils.gemini import Gemini
from utils.pty import pty
from utils.file import File
dirname = os.path.dirname(os.path.abspath(__file__))
url = f'file:///{os.path.join(dirname, 'src\\index.html')}'
window = webview.create_window('DevFusion','http://localhost:5173/',maximized=True,resizable=True,min_size=(900,700))
class Api:
    def __init__(self):
        self.file = File()
        self.gitHub = GitHub()
        self.gemini = Gemini()
        self.pty = pty()
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