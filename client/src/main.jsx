import { render } from 'preact'
import { App } from './app.jsx'
import './index.css'
window.addEventListener('pywebviewready', () => {
render(<App />, document.getElementById('app'))
})