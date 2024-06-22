import { useEffect, useState } from "preact/hooks"

const File = ({ name, path, setFile }) => {
    const extension = name.split('.').pop()
    return (
        <div className="ms-1 text-white flex gap-1 items-center hover:bg-[var(--primary-color)] cursor-pointer" onClick={() => {
            pywebview.api.file.open(path).then(content => {
                console.log(typeof content)
                setFile({
                    path: path,
                    content: content
                })
            })
        }}>
            <i className={`bi bi-filetype-${extension} text-2xl`}></i>
            {name}
        </div>
    )
}
const Folder = ({ name, path, setFile }) => {
    const [files, setFiles] = useState([])
    useEffect(() => {
        pywebview.api.getFiles(path).then(files => {
            setFiles(files)
        })
    }, [])
    return (
        <details className="ms-1  ">
            <summary className="list-none cursor-pointer hover:bg-[var(--primary-color)]">
                <div className="flex gap-1 text-white">
                    <i className="bi bi-folder text-2xl"></i>
                    {name}
                </div>

            </summary>
            <div>
                {files.map(file => {
                    if (file.type === 'folder') {
                        return <Folder name={file.name} path={file.path} />
                    } else {
                        return <File setFile={setFile} name={file.name} path={file.path} />
                    }
                })}
            </div>
        </details>
    )
}

const FileExplorer = ({ path, setFile, hidden, setPath }) => {
    useEffect(() => {
        if (!path) return
        pywebview.api.getFiles(path).then(files => {
            setFiles(files)
        })
    }, [path])
    const [files, setFiles] = useState([])

    return (
        <div className={`${hidden ? 'hidden' : 'flex'} w-full h-full  flex-col gap-1`}>
            <div  className={`${files.length !== 0?  'hidden': 'flex'}  flex-col gap-5 items-center`}>
                <h1 className="text-2xl">
                    No Files
                </h1>
                <button className="bg-neutral-800 border  border-[var(--opacity-color)] p-1 rounded-md w-full" onClick={() => {
                    pywebview.api.openFolder().then(path => {
                        setPath(path[0])
                    })
                }}>
                    Open Folder
                </button>
                <button className="bg-neutral-800 border border-[var(--opacity-color)] p-1 rounded-md w-full" id="openFile" onClick={() => {
                    pywebview.api.openFile().then(path => {
                        setFiles([...files, { name: path[0].split('\\').pop(), type: 'file', path: path[0] }])
                    })
                }} >
                    Add File
                </button>
            </div>
            <div className={`${files.length === 0?  'hidden': 'flex'} flex-col`}>
                {
                    files.map(file => {
                        if (file.type === 'folder') {
                            return <Folder name={file.name} path={file.path} setFile={setFile} />
                        } else {
                            return <File setFile={setFile} name={file.name} path={file.path} />
                        }
                    })
                }
            </div>
        </div>
    )
}
export default FileExplorer