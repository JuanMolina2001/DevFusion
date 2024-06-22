export const Item = ({ children, title, onClick }) => {
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
export const Button = ({ children, onClick, setElement, icon }) => {
    return <button className="w-full py-2 px-1 border-b border-[var(--opacity-color)] text-left flex gap-1 items-center transition-all hover:bg-[var(--primary-color)]" onClick={onClick}>
      <i className="material-icons">{icon}</i>
      {children
      }</button>
  }
  