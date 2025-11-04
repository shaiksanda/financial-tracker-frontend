import { BrowserRouter,Route,Routes } from "react-router-dom"

import Login from "./Components/Login"
import Home from "./Components/Home"
import Singup from "./Components/Signup"
const App=()=> {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup />} />
      </Routes>
   </BrowserRouter>
  )
}

export default App
