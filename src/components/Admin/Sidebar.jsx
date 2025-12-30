// import { LayoutDashboard } from "lucide-react"
// import React from "react"
// import { NavLink } from "react-router-dom"

// const Sidebar = () => {
//   return (
//     <aside className="hidden md:block border-r bg-amber-50 border-pink-50 x-10 w-[300px] p-10 space-y-2 h-screen">
      
//       <div className="space-y-3">

//         <NavLink
//           to="/admin" className={({isActive})=>`text-xl ${isActive ? "bg-blue-600 text-gray-200":"bg-transparent"} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}>
//           <LayoutDashboard/>
//           <span className="text-sm font-medium">Dashboard</span>
//         </NavLink>

//       </div>
//     </aside>
//   )
// }

// export default Sidebar


import { LayoutDashboard, Package, PackagePlus } from "lucide-react"
import React from "react"
import { NavLink } from "react-router-dom"

const Sidebar = () => {
  return (
    <aside className="w-[300px] h-screen border-r bg-amber-50">
      <div className="space-y-2 p-4">

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition
            ${isActive
              ? "bg-blue-600 text-gray-200"
              : "text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
         <NavLink
          to="/admin/product/createProduct"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition
            ${isActive
              ? "bg-blue-600 text-gray-200"
              : "text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          <PackagePlus size={20} />
          <span>Product Management</span>
        </NavLink>
         <NavLink
          to="/admin/contact/getContact"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition
            ${isActive
              ? "bg-blue-600 text-gray-200"
              : "text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span>Contact Management</span>
        </NavLink>
         <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition
            ${isActive
              ? "bg-blue-600 text-gray-200"
              : "text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span>User Management</span>
        </NavLink>
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition
            ${isActive
              ? "bg-blue-600 text-gray-200"
              : "text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span>Order Management</span>
        </NavLink>
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition
            ${isActive
              ? "bg-blue-600 text-gray-200"
              : "text-gray-700 hover:bg-blue-100"
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span>Custom Order</span>
        </NavLink>

      </div>
    </aside>
  )
}

export default Sidebar


