import { useEffect, useState } from 'preact/hooks'
import { Main, Terminal, Sidebar, Menu } from './components'
import '@tabler/icons-webfont/dist/tabler-icons.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createContext } from 'preact'
import { use } from 'marked'
export const AppContext = createContext()
export function App() {
  const [file, setFile] = useState(null)
  const [path, setPath] = useState(null)
  const [apiKey, setApiKey] = useState(null)
  useEffect(() => {
    pywebview.api.gemini.getApi_key().then((key) => {
      setApiKey(key)
    })
  }, [])
  return (
    <AppContext.Provider value={{
      file, setFile,
      path, setPath,
      apiKey, setApiKey
    }}>
      <div className='flex flex-col h-screen'>
        <Menu file={file} setCwd={setPath} />
        <div className='flex h-[95vh]'>
          <Sidebar file={file} setFile={setFile} path={path} setPath={setPath} />
          <div className='flex flex-col flex-1'>
            <Main setFile={setFile} file={file} />
            <Terminal path={path} />
          </div>
        </div>
      </div>
    </AppContext.Provider>
  )
}
