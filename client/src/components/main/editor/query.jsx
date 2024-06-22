import { useContext, useRef } from "preact/hooks"
import { AppContext } from "../../../app"
export default ({ setValue, query }) => {
    const {apiKey} = useContext(AppContext)
    const { gemini } = pywebview.api
    if(!apiKey) return null
    return(
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
    )
}