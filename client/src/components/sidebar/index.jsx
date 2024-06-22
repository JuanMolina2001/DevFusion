import { useState } from 'preact/hooks'
import FileExplorer from './fileExplorer'
import Github from './github'
export default ({ setFile, path, setPath }) => {
    const [hidden, setHidden] = useState(1)

    return (
        <div className='w-1/4 overflow-x-hidden h-full flex flex-col border border-[var(--opacity-color)]'>
            <div>
                <button onClick={() => setHidden(1)} className={`${hidden === 1 ? 'bg-[var(--primary-color)]' : ''} border-r border-[var(--opacity-color)] text-white w-16`}>Files</button>
                <button onClick={() => setHidden(2)} className={`${hidden === 2 ? 'bg-[var(--primary-color)]' : ''} border-r border-[var(--opacity-color)] text-white w-16`}>Git</button>
            </div>
            <div className='flex-1 border-t border-[var(--opacity-color)] overflow-x-hidden overflow-y-auto p-2'>
                <FileExplorer setPath={setPath} hidden={hidden !== 1} path={path} setFile={setFile} />
                <Github setPath={setPath} hidden={hidden !== 2} />
            </div>
        </div>
    )
} 