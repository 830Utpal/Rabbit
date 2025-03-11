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
        </div>
      </div>
    </footer>
  )
}

export default Footer
