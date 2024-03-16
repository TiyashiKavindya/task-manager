import { BrowserRouter, Route, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import Content from "./components/Content"
import { useEffect, useState } from "react"
import { PAGE_TITLES } from "./constants"
import { ROUTES } from "./routes"
import ContextProvider from "./contexts"

function App() {
  const [pageTitle, setPageTitle] = useState<string>(PAGE_TITLES.DASHBOARD)


  useEffect(() => {
    const path = window.location.pathname
    switch (path) {
      case '/task':
        setPageTitle(PAGE_TITLES.TASK)
        break
      case '/activity':
        setPageTitle(PAGE_TITLES.ACTIVITY)
        break
      default:
        setPageTitle(PAGE_TITLES.DASHBOARD)
        break
    }
  }, [])

  return (
    <BrowserRouter>
      <ContextProvider>
        <main className="h-screen flex">
          <Sidebar />
          <Content>
            <Header title={pageTitle} />
            <Routes>
              {
                ROUTES.map((route, index) => (
                  <Route key={index} path={route.path} element={<route.component />} />
                ))
              }
            </Routes>
          </Content>
        </main>
      </ContextProvider>
    </BrowserRouter>
  )
}

export default App
