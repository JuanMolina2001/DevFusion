import { useEffect, useState } from "preact/hooks"
import { Editor } from "@monaco-editor/react"


export default ({  file,setFile,hidden }) => {
    const [language, setLanguage] = useState('javascript')
    useEffect(() => {
        if (file) {
            console.log(file)
            if (file.path.endsWith('.js')) {
                setLanguage('javascript')
            } else if (file.path.endsWith('.py')) {
                setLanguage('python')
            } else if (file.path.endsWith('.html')) {
                setLanguage('html')
            } else if (file.path.endsWith('.css')) {
                setLanguage('css')
            }
            else {
                setLanguage('plaintext')
            }

        }
    }, [file])
    return (
        <div className={`flex-1 border-t border-r relative border-[var(--opacity-color)] ${hidden? 'hidden': ''}`}   onKeyDownCapture={e=>{
            if(e.ctrlKey && e.key === 's'){
                e.preventDefault()
                if(file){
                pywebview.api.file.save(file.path, file.content)
                }
            }
        
        }}>
            <Editor
                className="absolute top-0 left-0 w-full h-full"
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue=""
                language={language}
                value={file? file.content: ''}
                onChange={(value) => setFile({ ...file, content: value })}
            />
        </div>
    )
}