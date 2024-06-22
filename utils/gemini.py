import google.generativeai as genai
import json
class Gemini:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-1.5-flash')
        self.chat = self.model.start_chat()
        self.api_key = None
    def getApi_key(self):
        try:
            genai.configure(api_key=self.api_key)
            with open('src\\user.json', 'r') as archivo:
                datos = json.load(archivo)
            self.api_key = datos['gemini']['api_key']
            return self.api_key
        except Exception as e:
            print(e)
            return None
    def setApi_key(self, api_key):
        try:
            genai.configure(api_key=self.api_key)
            with open('src\\user.json', 'r') as archivo:
                datos = json.load(archivo)
            datos['gemini']['api_key'] = api_key
            with open('src\\user.json', 'w') as archivo:
                json.dump(datos, archivo, indent=4)
            self.api_key = api_key
            return True
        except Exception as e:
            print(e)
            return False
    def close(self):
        self.setApi_key(None)
        self.chat = None
    def sendMessage(self, message):
        response = self.chat.send_message(message)
        return response.text
    def ask(self, query, content):
        prompt = f'''
You are sent a question and a code. I want you to answer me by separating the answer to the question and the code  whit a ##Answer y ##Code. The answer to the question should be as brief as possible.
##Question:
{query}
##Code:
{content}'''
        response = self.model.generate_content(prompt)
        new_response = response.text.split('##Answer:')[1].split('##Code:')
        return {
            'answer': new_response[0],
            'code': new_response[1]
        }
