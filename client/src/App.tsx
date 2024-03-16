import { BrowserRouter, Route, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import Container from "./components/Container"
import { useEffect, useState } from "react"

function App() {
  const [showSidebar, setShowSidebar] = useState(true)

  const sidebarResize = () => {
    if (window.innerWidth < 768) {
      setShowSidebar(false)
    } else {
      setShowSidebar(true)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', sidebarResize)
    return () => {
      window.removeEventListener('resize', sidebarResize)
    }
  }, [])

  return (
    <BrowserRouter>
      <main className="relative h-screen">
        <Sidebar showSidebar={showSidebar} />
        <Container>
          <Header setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
          <Routes>
            <Route path='/about' element={<h1>about</h1>} />
            <Route path='/contact' element={<h1>contact</h1>} />
          </Routes>
        </Container>
      </main>
    </BrowserRouter>
  )
}

export default App
