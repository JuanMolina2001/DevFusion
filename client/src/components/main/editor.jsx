import { useEffect, useRef, useState } from "preact/hooks"
import { Editor } from "@monaco-editor/react"


export default ({ file, setFile, hidden }) => {
    const [language, setLanguage] = useState('plaintext')
    const [value, setValue] = useState('')
    const { gemini } = pywebview.api
    const query = useRef(null)
    useEffect(() => {
        if (file) {
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
            setValue(file.content)

        }
    }, [file])
    if (!file) {
        return <div className={`flex-1 border-t border-r relative border-[var(--opacity-color)] ${hidden ? 'hidden' : ''}`}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">No file selected</div>
        </div>
    }
    return (
        <div className={`flex-1 border-t border-r relative border-[var(--opacity-color)] ${hidden ? 'hidden' : ''}`} onKeyDownCapture={e => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault()
                if (file) {
                    pywebview.api.file.save(file.path, value)
                    setFile({ ...file, content: value })
                }
            }
            if (e.ctrlKey && e.key === 'q') {
                e.preventDefault()
                const { offsetTop, offsetLeft } = document.querySelector('.inputarea.monaco-mouse-cursor-text')
                query.current.style.display = 'flex'
                query.current.style.top = offsetTop + 'px'
                query.current.style.left = offsetLeft + 'px'
                query.current.querySelector('input').focus()
            }
        }}>
            <form ref={query} className="absolute z-40 hidden rounded-md bg-[var(--bg)] flex-col p-2 gap-2 border-[var(--opacity-color)] border w-[500px]" onKeyDown={e => {
                if (e.key === 'Escape') {
                    query.current.style.display = 'none'
                    query.current.querySelector('#answer').innerText = ''
                    
                }
            }} onSubmit={(e) => {
                e.preventDefault()
                gemini.ask(e.target.query.value, value).then((response) => {
                    e.target.querySelector('#answer').innerText =  response.answer
                    setValue(response.code)
                })
            }}>
                <div className="flex gap-2 w-full">
                    <input className="bg-[var(--primary-color)] px-1 w-full" placeholder="Ask gemini" name="query" type="text" />
                    <button className="material-icons">
                        send
                    </button>
                </div>
                <div id="answer">

                </div>

            </form>
            <Editor
                className="absolute top-0 left-0 w-full h-full"
                theme="vs-dark"
                language={language}
                value={value}
                onChange={(value) => setValue(value)}

            />
        </div>
    )
}