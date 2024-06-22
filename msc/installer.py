import webview


window = webview.create_window('DevFusion', 'installer.html', width=800, height=480, resizable=False)
class api:
    def select_folder(self):
        return window.create_file_dialog(webview.FOLDER_DIALOG)
window._js_api = api()
webview.start(debug=True)