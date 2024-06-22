from winpty import PtyProcess
from pathlib import Path
class  pty:
    def __init__(self):
        self.process = None
    def open(self, cwd):
        if cwd is None:
            cwd = Path.home()
        self.process = PtyProcess.spawn('cmd.exe', cwd=str(cwd))
    def onData(self):
        return self.process.read()
    def write(self, data):
        self.process.write(data)
    def close(self):
        if self.process is not None:
            self.process.terminate()