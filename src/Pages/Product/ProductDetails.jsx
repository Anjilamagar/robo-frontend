import { API_LINKS } from '@/lib/apiLinks';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ProductDetails = (productId) => {
  const navigate=useNavigate();
  const token=localStorage.getItem("token");
  
   const {id}=useParams()
   const[products,setProducts]=useState('')
  const [mainImage, setMainImage] = useState("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('black');

  const thumbnails = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHx8fDE3MjEzMDM2OTB8MA&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
    "https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
  ];

  const fetchDetails=async()=>{
    const result=await axios.get(API_LINKS.getProductDetail(id))
    setProducts(result.data.data)
  }
  useEffect(()=>{

    fetchDetails()
  },[])


  const addtocart =async ()=>{



    if(!token){
      navigate("/login",{state:{from:`product/${id}`}});
      return;
    }
    try{
    const result = await axios.post('http://localhost:5000/cart/add',{productId :products._id ,quantity : quantity},
      {
        headers:{
          Authorization:`Bearer ${token}`,
        },
      }

    );
    alert("Added to cart");
  }catch(error){
    console.error(error);
  }




//     if(response.status!==200){
//   toast.error('error occured to add to cart')
// }
// if(response.status==200){
//   toast.success("Successfully created")
// }
    


//     // fetchDetails()
    
  }



  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Side - Product Images */}
          <div className="flex-1">
            <img 
              src={mainImage} 
              alt="Product"
              className="w-full h-96 object-cover rounded-lg shadow-md mb-4 mt-8"
            />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {thumbnails.map((thumb, index) => (
                <img 
                  key={index}
                  src={thumb} 
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md cursor-pointer transition duration-300 ${
                    mainImage === thumb ? 'opacity-100 ring-2 ring-indigo-600' : 'opacity-60 hover:opacity-100'
                  }`}
                  onClick={() => setMainImage(thumb)}
                />
              ))}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Industry-leading noise cancellation</li>
                <li>30-hour battery life</li>
                <li>Touch sensor controls</li>
                <li>Speak-to-chat technology</li>
              </ul>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="flex-1 mt-8">
            <h2 className="text-3xl font-bold mb-2">{products.name}</h2>
            {/* <p className="text-gray-600 mb-4">SKU: WH1000XM4</p> */}
            
            <div className="mb-4">
              <span className="text-2xl font-bold mr-2">$349.99</span>
              <span className="text-gray-500 line-through">$399.99</span>
            </div>
            
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  className="w-6 h-6 text-yellow-500"
                >
                  <path 
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd" 
                  />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
            </div>
            
            <p className="text-gray-700 mb-6">
              Experience premium sound quality and industry-leading noise cancellation with
              these wireless headphones. Perfect for music lovers and frequent travelers.
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Color:</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedColor('black')}
                  className={`w-8 h-8 bg-black rounded-full focus:outline-none ${
                    selectedColor === 'black' ? 'ring-2 ring-offset-2 ring-black' : ''
                  }`}
                />
                <button
                  onClick={() => setSelectedColor('gray')}
                  className={`w-8 h-8 bg-gray-300 rounded-full focus:outline-none ${
                    selectedColor === 'gray' ? 'ring-2 ring-offset-2 ring-gray-300' : ''
                  }`}
                />
                <button
                  onClick={() => setSelectedColor('blue')}
                  className={`w-8 h-8 bg-blue-500 rounded-full focus:outline-none ${
                    selectedColor === 'blue' ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                  }`}
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity:
              </label>
              <input 
                type="number" 
                id="quantity" 
                name="quantity" 
                min="1" 
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-20 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2 border"
              />
            </div>

            <div className="flex space-x-4 mb-6">
              <Link to='/addtocart'>
              <button onClick={addtocart} className= "bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                  strokeWidth="1.5" 
                  stroke="currentColor" 
                  className="w-6 h-6"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" 
                  />
                </svg>
                Add to Cart
              </button>
              </Link>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;