import React from 'react'
import { BrowserRouter, Route, Router,Routes } from "react-router-dom"
import Login from './Login/Login'
// import CartSection from './Pages/CartSection/CartSection'
// import CartPage from './Pages/cart/CartPage'
import CheckoutPage from './Pages/checkoutpage/checkoutPage'
import CartSection from './Pages/CartSection/CartSection'
import CartPage from './Pages/cart/cartPage'

import Product from './Pages/Product'
import ProductDetails from './Pages/ProductDetails'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          {/* <Route path='/Cart' element={<CartSection/>}/> */}
          <Route path='/cart' element={<CartPage/>}/>
          <Route path ='/checkout' element={<CheckoutPage/>}/>
          <Route path ='/cartsection' element={<CartSection/>}/>
          {/* <Route path ='/cartt' element={<CarttSection/>}/> */}
          <Route path='/product' element={<Product/>}/>
           <Route path='/productDetails/:id' element={<ProductDetails/>}/>
           <Route path='/cart' element={<CartPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
