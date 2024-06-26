import { BrowserRouter, Route, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Content from "./components/Content"
import { ROUTES } from "./routes"
import ContextProvider from "./contexts"
import Toast from "./components/Toast"
import Confirm from "./components/Confirm"
import SingleActiviy from "./pages/SingleActivity"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <main className="h-screen flex">
          <Sidebar />
          <Content>
            <Routes>
              {
                ROUTES.map((route, index) => (
                  <Route key={index} path={route.path} element={<route.component />} />
                ))
              }
              <Route path="/activity/:id" element={<SingleActiviy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Content>
          <Confirm />
          <Toast />
        </main>
      </ContextProvider>
    </BrowserRouter>
  )
}

export default App
