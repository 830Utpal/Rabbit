import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'

const Home = () => {
  return (
    <div>
      <Hero/>
      <GenderCollectionSection />
      <NewArrivals/>
    </div>
  )
}

export default Home
