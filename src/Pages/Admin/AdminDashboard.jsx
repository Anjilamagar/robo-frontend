import React, { useState } from 'react';
import { Menu, Search, Bell, Settings, LogOut, Package, Users, MessageSquare, LayoutDashboard, TrendingUp, ShoppingCart, DollarSign, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'orders', icon: Package, label: 'Order Management' },
    { id: 'users', icon: Users, label: 'User Management' },
    { id: 'contacts', icon: MessageSquare, label: 'Contact Management' },
  ];

  const stats = [
    { title: 'Total Orders', value: '2,543', change: '+12.5%', icon: ShoppingCart, color: 'bg-blue-500' },
    { title: 'Total Users', value: '8,249', change: '+8.2%', icon: Users, color: 'bg-green-500' },
    { title: 'Revenue', value: '$45,231', change: '+23.1%', icon: DollarSign, color: 'bg-purple-500' },
    { title: 'Active Robots', value: '156', change: '+5.4%', icon: Activity, color: 'bg-orange-500' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {/* <aside className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-gray-900 text-white transition-all duration-300 overflow-hidden`}>
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity size={24} />
            </div>
            <span className="text-xl font-bold">ROBOTICS</span>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div> */}
      {/* </aside> */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Left - Menu Toggle and Logo */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              >
                <Menu size={24} />
              </button>
            </div>

            {/* Center - Search */}
            <div className="flex-1 mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders, users, contacts.........."
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            {/* Right - Icons and Admin */}
            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell size={22} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Settings size={22} />
              </button>

              <div className="h-8 w-px bg-gray-300"></div>

              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                <span className="font-medium">Admin</span>
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your robotics platform today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <span className="text-green-600 text-sm font-semibold flex items-center">
                        <TrendingUp size={16} className="mr-1" />
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                );
              })}
            </div>




            {/* Charts and Tables Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Recent Orders */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-700">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Order ID</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Customer</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Product</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: '#ORD-001', customer: 'John Doe', product: 'Robot Arm X1', status: 'Completed', amount: '$1,299' },
                        { id: '#ORD-002', customer: 'Sarah Smith', product: 'Mobile Robot Pro', status: 'Processing', amount: '$2,499' },
                        { id: '#ORD-003', customer: 'Mike Johnson', product: 'Sensor Kit', status: 'Shipped', amount: '$399' },
                        { id: '#ORD-004', customer: 'Emily Brown', product: 'Controller Board', status: 'Pending', amount: '$199' },
                      ].map((order, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm font-medium text-gray-900">{order.id}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{order.customer}</td>
                          <td className="py-3 px-4 text-sm text-gray-600">{order.product}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm font-semibold text-gray-900">{order.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>





              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                <div className="space-y-3">
                  <Link to='/admin/product/createProduct'>
                  <button className="w-full flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    <Package className="text-blue-600" size={20} />
                    <span className="font-medium text-gray-900">Create New Product</span>
                  </button>
                  </Link>
                  <button className="w-full flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                    <Users className="text-green-600" size={20} />
                    <span className="font-medium text-gray-900">Add New User</span>
                  </button>
                  <Link to='/admin/contact/getContact'>
                  <button className="w-full flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                    <MessageSquare className="text-purple-600" size={20} />
                    <span className="font-medium text-gray-900">View Messages</span>
                  </button>
                  </Link>
                  <button className="w-full flex items-center space-x-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                    <Settings className="text-orange-600" size={20} />
                    <span className="font-medium text-gray-900">System Settings</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Activity Chart Placeholder */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Sales Activity</h2>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                  <div className="text-center">
                    <Activity size={48} className="text-blue-600 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium">Chart visualization</p>
                  </div>
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Top Products</h2>
                <div className="space-y-4">
                  {[
                    { name: 'Robot Arm X1', sales: 234, color: 'bg-blue-500' },
                    { name: 'Mobile Robot Pro', sales: 189, color: 'bg-green-500' },
                    { name: 'Sensor Kit Advanced', sales: 156, color: 'bg-purple-500' },
                    { name: 'Controller Board V2', sales: 142, color: 'bg-orange-500' },
                  ].map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className={`w-2 h-12 ${product.color} rounded-full`}></div>
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.sales} sales</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">{((product.sales / 234) * 100).toFixed(0)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}