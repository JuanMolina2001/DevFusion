class File:
   def open(self, path):    
        with open(path, 'r', encoding='utf-8') as archivo:
            contenido = archivo.read()  
        return str(contenido)
   def save(self, path, content):
         with open(path, 'w', encoding='utf-8') as archivo:
              archivo.write(content)
         return True

