import React from "react";
import './App.css'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import setupInterceptors from "./api/setupInterceptors";
import { clearToken } from "./auth/tokenStore";
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import GoogleLogin from './pages/GoogleLogin'
import Onboard from './pages/Onboard'
import Search from './components/Search'
import Create from './components/Create'
import MyRooms from './components/MyRooms'
import Room from './components/Room'
import NotFound from './components/NotFound'

function InterceptorBoot() {
  const navigate = useNavigate();

  React.useEffect(() => {
    const onLogout = () => {
      clearToken();
    };
    setupInterceptors(navigate, onLogout);

    return () => { /* you may eject interceptors if desired */ };
  }, [navigate]);

  return null; // this component mounts purely to setup interceptors
}

function App() {
  return (
    <BrowserRouter>
      <InterceptorBoot />
      <div className="app-root">
        <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<GoogleLogin />} />
            <Route path="/onboard" element={<Onboard />} />
            <Route path="/rooms/search" element={<Search />} />
            <Route path="/rooms/create" element={<Create />} />
            <Route path="/rooms" element={<MyRooms />} />
            <Route path="/rooms/:id" element={<Room />} />
            <Route path="*" element={<NotFound />} />
          </Routes>


        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
