import { BrowserRouter, Route, Routes } from "react-router-dom"

import Login from "./Components/Login"
import Home from "./Components/Home"
import Singup from "./Components/Signup"
import Dashboard from "./Components/Dashboard"
import History  from "./Components/History"
import DeliveryTracker from "./Components/DeliveryTracker"
import DeliveryAnalytics from "./Components/DeliveryAnalytics"
import ProductTour from "./Components/ProductTour"
import Profile from "./Components/Profile"
import ProtectedRoute from "./Components/ProtectedRoute"
import MainHomePage from "./Components/MainHomePage"

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
        <Route path="/home" element={<MainHomePage />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/history" element={<ProtectedRoute element={<History />} />} />
        <Route path="/delivery-tracker" element={<ProtectedRoute element={<DeliveryTracker />} />} />
        <Route path="/delivery-analytics" element={<ProtectedRoute element={<DeliveryAnalytics />} />} />
        <Route path="/product-tour" element={<ProtectedRoute element={<ProductTour />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
