import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import AdminForgotPassword from "./Pages/AdminForgotPassword/AdminForgotPassword";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Signup from "./Pages/Signup/Signup";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
