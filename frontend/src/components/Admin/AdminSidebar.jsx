import React from 'react'
import { FaUser } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <div className='p-6'>
     <div className="mb-6">
        <Link to="/admin" className='text-2xl font-medium'>Rabbit</Link>
     </div>
     <h2 className="text-xl font-medium mb-6 text-center">Admin Dashboard</h2>
     <nav className='flex flex-col space-y-2'>
        <NavLink to="/admin/users" className={({isActive})=>isActive?"bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2":"text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}>
        <FaUser/>
        <span>Users</span>
       </NavLink>
     </nav>
    </div>
  )
}

export default AdminSidebar
