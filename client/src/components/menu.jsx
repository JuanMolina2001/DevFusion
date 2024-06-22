import { useContext, useEffect, useRef } from "preact/hooks"
import { AppContext } from "../app"

const Item = ({ children, title, onClick }) => {
  return (
    <details
      onMouseEnter={(e) => {
        e.target.setAttribute('open', true)
      }}
      onMouseLeave={(e) => {
        e.target.removeAttribute('open')

      }}
      className="relative" onClick={onClick}>
      <summary className='p-1 rounded-md cursor-pointer hover:bg-[var(--primary-color)] transition-all list-none text-white text-left'>{title}</summary>
      <div className=' text-white absolute top-8 z-10 bg-[var(--bg)]  flex flex-col gap-1 w-48 rounded-md border border-[var(--opacity-color)]'>
        {children}
      </div>
    </details>
  )
}
const Button = ({ children, onClick, setElement, icon }) => {
  return <button className="w-full py-2 px-1 border-b border-[var(--opacity-color)] text-left flex gap-1 items-center transition-all hover:bg-[var(--primary-color)]" onClick={onClick}>
    <i className="material-icons">{icon}</i>
    {children
    }</button>
}

export default ({ file, setCwd }) => {
  const { setFile, setPath } = useContext(AppContext)
  const ref = useRef(null)
  return (
    <nav className=''>
      <div className='flex justify-between'>
        <div className=' flex gap-2' ref={ref}>
          <Item title='File' >
            <Button icon='folder' onClick={() => {
              pywebview.api.openFolder().then(path => {
                setPath(path[0])
              })
            }}>
              Open Folder
            </Button>
            <Button icon='note_add' onClick={() => {
              document.querySelector('#openFile').click()
            }} >
              Add File
            </Button>
            <Button icon='save' onClick={e => {
              if (file) {
                pywebview.api.file.save(file.path, file.content)
              }
            }}>
              Save
            </Button>
          </Item>
          <Item title='Edit' >
            <Button icon='undo'>
              Undo
            </Button>
            <Button icon='redo'>
              Redo
            </Button>
            <Button icon='content_cut'>
              Cut
            </Button>
            <Button icon='content_copy'>
              Copy
            </Button>
            <Button icon='content_paste'>
              Paste
            </Button>
            <Button icon='select_all'>
              Select All
            </Button>
          </Item>
          <Item title='View' >
            <Button icon='fullscreen' onClick={() => {
              pywebview.api.toggleFullscreen()
            }}>
              Toggle Fullscreen
            </Button>
          </Item>
          <Item title='Settings'>
          <Button icon='key'>
              Set Api Key
            </Button>
          </Item>
        </div>
        <div>

        </div>
      </div>
    </nav>
  )
}