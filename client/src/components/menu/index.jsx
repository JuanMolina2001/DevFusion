import { useContext, useEffect, useRef } from "preact/hooks"
import { AppContext } from "../../app"
import { Button, Item } from "./components"
import { validateApiKey } from "./utils"
export default ({ file, setCwd }) => {
  const { setFile, setPath, setApiKey } = useContext(AppContext)
  const ref = useRef(null)
  const modal = useRef(null)
  return (
    <nav className=''>
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
          <Button icon='key' onClick={() => {
            modal.current.showModal()
          }}>
            Api Key Gemini
          </Button>
          <Button icon='account_circle'>
            GitHub User
          </Button>
        </Item>
      </div>
      <dialog ref={modal} class="p-6 bg-[#252526] text-[#d4d4d4]  shadow-lg max-w-sm w-full z-40 border ">
        <p class="text-lg font-semibold mb-4">Please enter your Api key:</p>
        <form method="dialog" class="space-y-4" onSubmit={e => {
          e.preventDefault()
          const key = e.target.apiKey.value
          const { gemini } = pywebview.api
          validateApiKey(key)
          .then(() => {
            gemini.setApi_key(key).then(() => {
              setApiKey(key)
              e.target.reset()
            })
          }).catch(() => {
            alert('Invalid Api Key')
          })
          modal.current.close()
        }}>
          <input type="text" name="apiKey" placeholder="Your Key" class="w-full px-3 py-2 bg-[#3c3c3c] border border-[#555555] text-[#d4d4d4] focus:outline-none focus:ring-2 focus:ring-[var(--opacity-color)]" required />
          <div class="flex gap-2">
            <button class="px-4 py-2 bg-[#007acc] text-white rounded hover:bg-[#005a9e] transition">Submit</button>
            <button class="px-4 py-2 bg-[#3c3c3c] text-white rounded hover:bg-[#2c2c2c] transition" type="reset" onClick={(e) => {
              e.preventDefault()
              modal.current.close()
            }}>Cancel</button>
          </div>
        </form>
      </dialog>
    </nav>
  )
}
