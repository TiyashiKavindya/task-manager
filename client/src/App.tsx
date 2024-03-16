import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1 className="text-red-500">hello</h1>
      </div>
      <Routes>
        <Route path='/about' element={<h1>about</h1>} />
        <Route path='/contact' element={<h1>contact</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
