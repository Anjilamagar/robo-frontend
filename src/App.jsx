import React from 'react'
import { BrowerRouter, Route, Router } from "react-router-dom"
import Login from './Login/Login'


function App() {
  return (
    <>
      <BrowerRouter>
        <Router>
          <Route path='/login' element={<Login />} />

        </Router>
      </BrowerRouter>
    </>
  )
}

export default App
