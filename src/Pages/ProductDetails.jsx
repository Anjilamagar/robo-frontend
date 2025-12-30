import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { MdDelete } from 'react-icons/md'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import ShoppingCart, { ShoppingCartIcon } from 'lucide-react'

const ProductDetails = () => {
const params=useParams()
const{id}=params
const token = localStorage.getItem('token')


const[products,setProducts]=useState(null)
const[loading,setLoading]=useState(true)
const[error,setError]=useState(null)
const navigate = useNavigate()
const fetchProduct=async()=>{
    try {
      console.log(token)
        const result=await axios.get(`http://localhost:5000/product/getProductById/${id}`,{
          headers : {
            authorization : `Bearer ${token}`
          }
        })
        setProducts(result.data.data)
        setLoading(false)
    } catch (err) {
        setError(err.message)
        setLoading(false)
    }
}
const handleAddToCart = async () => {
  if (!products) {
    alert("Product not loaded yet")
    return
  }
  try {
    await axios.post("http://localhost:5000/cart/add", {
      productId: products._id,
      quantity: 1,
    })

    alert("Product added to cart")
    navigate("/cart")
  } catch (error) {
    console.error(error)
    alert("Failed to add to cart")
  }
}


const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    )

    if (!confirmDelete) return

    try {
      await axios.delete(
        `http://localhost:5000/product/delete/${id}`
      )
      alert('Product deleted successfully')
      navigate('/product') // redirect to product list page
    } catch (error) {
      console.error(error)
      alert('Failed to delete product')
    }
  }
useEffect(()=>{
    fetchProduct()
},[]
)



  // if (loading) return <div>Loading...</div>
  // if (error) return <div>Error: {error}</div>
  // if (!products) return <div>Product not found</div>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">


      <div className="bg-white w-80 rounded-xl shadow-md p-5">

        {/* Product Image */}
        <img
          src="https://via.placeholder.com/300"
          alt="Product"
          className="w-full h-48 object-cover rounded-lg"
        />

        {/* Product Info */}
        <h2 className="text-xl font-semibold mt-4">
          {products?.name || 'Product Name'}
        </h2>

        <p className="text-purple-600 font-bold text-lg mt-1">
          ${products?.price || '0.00'}
        </p>

        <p className="text-gray-600 text-sm mt-2">
          {products?.description || 'High-quality product.'}
        </p>

      </div>
      <div className='flex justify-center align-bottom gap-1 ml-10'>

     <button>UPDATE</button>
     <Link to='/cart'>
     <button

  onClick={handleAddToCart}
  className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg "
>
 
  Add To Cart
</button>
</Link>


     {/* <Link to='/cartt'>
     <button onClick={handleAddToCart}>
      
      Add To cart</button>
      </Link> */}


    {/* <button onClick={handleDelete}>
      <MdDelete/>
    </button> */}
    </div>

    </div>
  )
}

export default ProductDetails