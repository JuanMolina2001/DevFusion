import { useEffect, useRef, useState } from "preact/hooks"

export default ({ hidden, setPath }) => {
    const [user, setUser] = useState()
    const [repos, setRepos] = useState([])
    const api = `https://api.github.com/users`
    const [repo, setRepo] = useState()
    const modal = useRef(null)
    useEffect(() => {
        pywebview.api.gitHub.getUser().then(response => {
            if (response !== '') {
                setUser(JSON.parse(response))
            }
        })
    }, [])
    useEffect(() => {
        if (user) {
            fetch(`${api}/${user.login}/repos`).then(response => response.json())
                .then(data => {
                    setRepos(data)
                })
        }
    }, [user])
    if (!user)
        return (
            <form className={`${hidden ? 'hidden' : 'flex'} flex-col items-center w-full h-full p-4`} onSubmit={(event) => {
                event.preventDefault()
                const username = new FormData(event.target).get('username')
                console.log(api)
                fetch(`${api}/${username}`).then(response => response.json())
                    .then(data => {
                        setUser(data)
                        pywebview.api.gitHub.setUser(JSON.stringify(data))
                    })
            }}>
                <i class="bi bi-github text-white text-7xl"></i>
                <div className="w-full">
                    <label for="Username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input id="Username" name="username" type="text" class="block w-full p-2  border border-[var(--opacity-color)] rounded-md bg-[var(--primary-color)]" />
                </div>
            </form>
        )
    return (
        <div className={`${hidden ? 'hidden' : 'flex'} flex-col p-2  w-full h-full gap-2`}>
            <button className="flex flex-col" onClick={() => {
                setUser(null)
                pywebview.api.gitHub.setUser('')
            }}>
                <i className="material-icons">
                    logout
                </i>
            </button>
            <details>
                <summary className="cursor-pointer">
                    Repositorios
                </summary>
                <div className="p-4 flex flex-col gap-2">
                    {
                        repos.map(repo => {
                            return (
                                <div className="text-white hover:bg-[var(--primary-color)] cursor-pointer flex gap-2 items-center text-nowrap p-1" onClick={() => {
                                    setRepo(repo.clone_url)
                                    modal.current.setAttribute('open', true)
                                }}>
                                    <img src={user.avatar_url} width='30' height='30' class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" alt="avatar" onClick={e => e.target.parentElement.click()} />
                                    <p onClick={e => e.target.parentElement.click()}>
                                        {user.login}/{repo.name}
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
            </details>
            <dialog ref={modal}  className="absolute z-40 bg-[var(--bg)] p-10 text-white border border-[var(--opacity-color)]">
               <p>
               Do you want to clone the repository? 
               </p>
                <form method="dialog" className="flex gap-1">
                    <button type="submit" class="bg-[var(--primary-color)] w-16 py-1 px-2 rounded-md">no</button>
                    <button class="bg-[var(--primary-color)] w-16 py-1 px-2 rounded-md" onClick={()=>{
                        pywebview.api.gitHub.download(repo).then(response=>{
                          if(response.success){
                            setPath(response.message)
                          }else{
                            alert(response.message)
                          }
                        })
                    }}>
                        yes
                    </button>
                </form>
            </dialog>
        </div>

    )
}