import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import Sidebar from './Admin/Sidebar'
import Navbar from './Navbar'

const AdminLayout = () => {

// const user=localStorage.getItem('user')
// const navigate=useNavigate()
// const checkLogin=()=>{

// if(!user){
//     toast.error("login required")
//      return<Navigate to='/login' replace/>
   
// }
// if(user?.data?.role!="ADMIN"){
//   toast.error("Error occured!")
//   return<Navigate to='/login' replace/>
// }
// }
// useEffect(()=>{
//     checkLogin()
// },[])

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1'>
        {/* <Navbar /> */}
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
