import React from 'react'
import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Login from './Login/Login'
import Header from './components/Header/Header'
import HeaderUser from './components/Header/HeaderUser'
import Footer from './components/Footer/Footer'
import LandingPage from './Pages/LandingPage/LandingPage'
import CustomizeRequest from './Pages/CustomizeRequest/CustomizeRequest'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          {/* <Route path='/Uheader' element={<HeaderUser />} /> */}
          {/* <Route path='/landing' element={<LandingPage />} /> */}

          <Route path='/' element={<LandingPage />} />
          <Route path='/header' element={<Header />} />
          <Route path='/footer' element={<Footer />} />
          <Route path='/custom' element={<CustomizeRequest />} />









        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
