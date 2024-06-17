import Editor from './ide'
import Chat from './chat'
import { useState } from 'preact/hooks'
export default ({ setFile, file }) => {
    const [hidden, setHidden] = useState(1)
    return (
        <div className='flex flex-col h-2/3 border border-[var(--opacity-color)] '>
            <div>
                <button onClick={() => setHidden(1)} className={`${hidden === 1 ? 'bg-[var(--primary-color)]' : ''} border-r border-[var(--opacity-color)] text-white w-16`}>Editor</button>
                <button onClick={() => setHidden(2)} className={`${hidden === 2 ? 'bg-[var(--primary-color)]' : ''} border-r border-[var(--opacity-color)] text-white w-16`}>Chat</button>
            </div>
            <Editor hidden={hidden !== 1} setFile={setFile} file={file} />
            <Chat hidden={hidden !== 2} />
        </div>
    )
}