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
import Profile from "./pages/Profile";
import PayoutDashboard from "./pages/PayoutDashboard";
import AdminRoute from "./routes/AdminRoutes";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsAndConditions from "./pages/legal/TermsAndConditions";
import RefundPolicy from "./pages/legal/RefundPolicy";
import Contact from "./pages/legal/Contact";
import About from "./pages/legal/About";

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
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<GoogleLogin />} />
            <Route path="/onboard" element={<Onboard />} />
            <Route path="/rooms/search" element={<Search />} />
            <Route path="/rooms/create" element={<Create />} />
            <Route path="/rooms" element={<MyRooms />} />
            <Route path="/rooms/:id" element={<Room />} />
            <Route path="/payout-dashboard" element={
              <AdminRoute>
                <PayoutDashboard />
              </AdminRoute>
            } />
            <Route path="*" element={<NotFound />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
