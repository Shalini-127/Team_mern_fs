import React from 'react'
import Home from "./pages/home"
import { BrowserRouter,Routes,Route } from 'react-router-dom'
function App() {
  return (
    <div>

<BrowserRouter>
<Routes>
  <Route path='/home' element={< Home />}></Route>
</Routes>


</BrowserRouter>

    </div>
  )
}

export default App