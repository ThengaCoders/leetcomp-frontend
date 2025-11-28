import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Search from './components/Search'
import Create from './components/Create'
import MyRooms from './components/MyRooms'
import Room from './components/Room'
import NotFound from './components/NotFound'

function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        <Header />

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms/search" element={<Search />} />
            <Route path="/rooms/create" element={<Create />} />
            <Route path="/rooms" element={<MyRooms />} />
            <Route path="/rooms/:id" element={<Room />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
