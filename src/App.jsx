import React from 'react'
import { BrowserRouter, Route, Router,Routes } from "react-router-dom"
import Login from './Login/Login'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
