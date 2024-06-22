import { useEffect, useRef, useState } from "preact/hooks"
import { Editor } from "@monaco-editor/react"
import Query from "./query"

export default ({ file, setFile, hidden }) => {
    const [language, setLanguage] = useState('plaintext')
    const [value, setValue] = useState('')
    const query = useRef(null)
    useEffect(() => {
        console.log(query.current)
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
            <Query setValue={setValue} query={query} />
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