import React from 'react'
import { BrowserRouter, Route,Routes } from "react-router-dom"
import Login from './Login/Login'
import Contact from './Pages/Contact/Contact'
import ContactFetch from './Pages/Admin/Contact/ContactFetch'
import ContactDetails from './Pages/Admin/Contact/ContactDetails'
import AdminLayout from './components/AdminLayout'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import Test from './Pages/Test'
import { Alert } from 'flowbite-react'
import AddtoCart from './Pages/AddtoCart/AddtoCart'
import AddProduct from './Pages/Admin/Product/AddProduct'
import ProductList from './Pages/Admin/Product/ProductList'
import CardProduct from './Pages/Product/CardProduct'
import ProductDetails from './Pages/Product/ProductDetails'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/contact' element={<Contact/>}/>
          

          <Route path='' element={<AdminLayout/>}>
          <Route path='/admin/product/createProduct' element={<AddProduct/>}/>
          <Route path='/admin/contact/getContact' element={<ContactFetch/>}/>
          <Route path='admin/contact/contactDetails/:id' element={<ContactDetails/>}/>
          <Route path='/admin' element={<AdminDashboard/>}/>
          </Route>
                    <Route path='/test' element={<Test/>}/>
                    <Route path='/addtocart' element={<AddtoCart/>}/>
                    <Route path='/viewProduct' element={<ProductList/>}/>
                     <Route path='/product' element={<CardProduct/>}/>
                      <Route path='/productDetails/:id' element={<ProductDetails/>}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
