import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './demo/app'
import './styles/main.css'

const CONTAINER_SELECTOR = 'root'
const container = document.getElementById(CONTAINER_SELECTOR)

if (!container) {
  throw new Error(`문서에 #${CONTAINER_SELECTOR} 요소가 존재하지 않습니다.`)
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
)
