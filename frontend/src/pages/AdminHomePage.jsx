import React from 'react'

const AdminHomePage = () => {
    const orders=[
    {
        _id:123123,
        users:{
            name:"john doe",
        },
        totalPrice:110,
        status:"Processing",
    }
];
  return (
    <div className='max-w-7xl mx-auto p-6'>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div className="p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">Revenue</h2>
            <p className="text-2xl">$10000</p>
        </div>
      </div>
    </div>
  )
}

export default AdminHomePage
