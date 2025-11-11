import { BrowserRouter, Route, Routes } from "react-router-dom"

import Login from "./Components/Login"
import Home from "./Components/Home"
import Singup from "./Components/Signup"
import Expenses from "./Components/Expenses"
import ProtectedRoute from "./Components/ProtectedRoute"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/expenses" element={<ProtectedRoute element={<Expenses />} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
