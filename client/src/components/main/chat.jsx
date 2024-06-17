import { useEffect, useState } from "preact/hooks"
import { marked } from "marked"
export default ({ hidden }) => {
   const [messages, setMessages] = useState([])
   const handleMessage = (message) => {
      return marked(message)
   }
   const handleSubmit = (e) => {
      e.preventDefault()
      const data = new FormData(e.target)
      const message = data.get('message')
      e.target.children[0].value = ''
      if (message) {
         setMessages(prevMessages => [...prevMessages, { message, sender: 'You' }]);
         pywebview.api.gemini.send(message).then((response) => {
            setMessages(prevMessages => [...prevMessages, { message: response, sender: 'Gemini' }]);
         });
      }
   }
   return (
      <div className={`${hidden ? 'hidden' : 'flex'} flex-col h-full border-t border-[var(--opacity-color)] flex-1 relative`} >
         <div className="flex flex-col p-10 gap-2 h-3/4 overflow-y-auto" >
            {messages.length > 0 ? (
               messages.map(({ message, sender }, i) => (
                  <div key={i} className={`p-2 rounded-md bg-[var(--primary-color)]  flex flex-col gap-1 ${sender === 'You' ? 'items-end' : 'items-start'}`}>
                     <span className="text-xs font-semibold text-gray-400">{sender}</span>
                     <div className="text-sm text-gray-200" dangerouslySetInnerHTML={{ __html: handleMessage(message) }}></div>
                  </div>
               ))
            ) :
               (
               <div className="h-full w-full flex justify-center items-center">
                  <span className="text-gray-400">No messages yet</span>
               </div>
               )
            }
         </div>
         <form action="" onSubmit={handleSubmit} className=" px-5 h-1/4 flex items-center w-full">
            <input id="message" name="message" type="text" class=" w-full p-2  border border-[var(--opacity-color)] rounded-md bg-[var(--primary-color)] " />
         </form>

      </div>
   )
}