import google.generativeai as genai
import json
class Gemini:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-1.5-flash')
        self.chat = self.model.start_chat()
        self.api_key = self.getApi_key()
    def getApi_key(self):
        with open('src\\user.json', 'r') as archivo:
            datos = json.load(archivo)
        return datos['gemini']['api_key']
    def init(self):
        genai.configure(api_key=self.api_key)
    def setApi_key(self, api_key):
        with open('src\\user.json', 'r') as archivo:
            datos = json.load(archivo)
        datos['gemini']['api_key'] = api_key
        with open('src\\user.json', 'w') as archivo:
            json.dump(datos, archivo, indent=4)
        return True
    def close(self):
        del self.model
    def sendMessage(self, message):
        response = self.chat.send_message("Hello")
        return response.text
