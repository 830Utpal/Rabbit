import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t py-12'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0'>
        <div>
            <h3 className='text-lg text-gray-800 mb-4 '>Newsletter</h3>
            <p className='text-gray-500 mb-4'>
                Be the first to hear about new products, exclusive events, and online offers.
            </p>
            <p>Sign Up and get 105 off on your first order.</p>
            {/**newsletter form */}
            <form className='flex'>
              <input type="email" placeholder="Enter your email" className="p-3 w-full text-sm border-t border-l border-b border-gray-300 eounded-l-md focus:outline-none focus:ring-2 focus:ring-grey-500 transition-all"
              reuired
              />
              <button type="submit" className='bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all'>Subscribe</button>
            </form>
        </div>
      </div>
    </footer>
  )
}

export default Footer
