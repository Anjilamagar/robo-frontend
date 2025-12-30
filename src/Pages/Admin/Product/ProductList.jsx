import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ProductList = () => {
    const[products,setProducts]=useState([])
    const navigate=useNavigate()
    const fetchProduct=async()=>{
        try{
            const result=await axios.get('http://localhost:5000/product/getAllProducts')
            setProducts(result.data.data)
        }catch(error){
            console.error(error)
        }
    }
    const handleDelete=async(id)=>{
        const confirmDelete=window.confirm('Are you sure you want to delete this product?')
        if(!confirmDelete)
            return
        try{
            await axios.delete(`http://localhost:5000/product/deleteProduct/${id}`)
            alert('Message Deleted Successfully')
            fetchProduct()
        }catch(error){
            console.error(error)
            alert('Failed to delete message')
        }
    }
    useEffect(()=>{
        fetchProduct()
    },[])
  return (
   <div className="contact-fetch-container">
      <div className="contact-fetch-card">
        <h2 className="contact-fetch-title text-center">Product List</h2>

        <div className="contact-fetch-table-container">
          <table className="contact-fetch-table">
            <thead>
              <tr>
                <th scope="col">
                  Product_Name
                </th>
                <th scope="col">
                  Category
                </th>
                <th scope="col">
                  Brand
                </th>
                <th scope="col">
                  Price
                </th>
                <th scope="col">
                  Description
                </th>
                <th scope="col">
                  Update
                </th>
                <th scope="col">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id}>
                    <th scope="row">
                      {product.name}
                    </th>
                    <td>
                      {product.categpry}
                    </td>
                    <td>
                    {product.brand}
                    </td>
                    <td>
                        {product.price}
                      
                      </td>
                      <td>
                        {product.description}
                     
                    </td>
                    <td>
                        <Link>
                    Update
                    </Link>

                    </td>
                    <td>
                         <button
                        onClick={() => handleDelete(product._id)}
                       
                      >
                        Delete
                      </button>

                    </td>
                    
                  </tr>
                ))
            ): ( 
                <tr>
                  <td
              
                    colSpan="5"
                    className="contact-fetch-no-data"
                  >
                    No Products  found
                  </td>
                </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProductList
