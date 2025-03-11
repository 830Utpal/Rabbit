import React, { useEffect, useState,useRef  } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {

     const scrollRef=useRef(null);
     const [isDragging,setIsDragging]=useState(false);
     const[startX,setStartX]=useState(0);
     const[scrollLeft,setScrollLeft]=useState(false);
     const[canScrollRight,setCanScrollRight] =useState(true);


  const newArrivals = [
    {
      _id: "1",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=1",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "2",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=2",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "3",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=3",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "4",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=4",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
        _id: "5",
        name: "Stylish Jacket",
        price: 120,
        images: [
          {
            url: "https://picsum.photos/500/500?random=5",
            altText: "Stylish Jacket",
          },
        ],
      },
      {
        _id: "6",
        name: "Stylish Jacket",
        price: 120,
        images: [
          {
            url: "https://picsum.photos/500/500?random=6",
            altText: "Stylish Jacket",
          },
        ],
      },
      {
        _id: "7",
        name: "Stylish Jacket",
        price: 120,
        images: [
          {
            url: "https://picsum.photos/500/500?random=7",
            altText: "Stylish Jacket",
          },
        ],
      },
      {
        _id: "8",
        name: "Stylish Jacket",
        price: 120,
        images: [
          {
            url: "https://picsum.photos/500/500?random=8",
            altText: "Stylish Jacket",
          },
        ],
      },
  ];//update scroll btn
  const updateScrollButtons=()=>{
    const container=scrollRef.current;
    console.log({
        scrollLeft:container.scrollLeft,
        clientWidth:container.clientWidth,
        containerScrollWidth: container.scrollWidth,
    })
  }

  useEffect(()=>{
    const container=scrollRef.current;
    if(container){
        container.addEventListener("Scroll",updateScrollButtons);
        updateScrollButtons();
    }
  })

  return (
    <section>
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals.</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* Scroll Buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button className="p-2 rounded border bg-white text-black">
            <FiChevronLeft className="text-2xl" />
          </button>
          <button className="p-2 rounded border bg-white text-black">
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/**scrollable content */}
      <div ref={scrollRef} className="container mx-auto overflow-x-scroll flex space-x-6 relative">
       {newArrivals.map((product)=>(
        <div key={product._id} className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative">
            <img 
            src={product.images[0]?.url}
            alt={product.images[0]?.altText || product.name} className="w-full h-[500px] object-cover rounded-lg"/>
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
                <Link to={`/product/${product._id}`} className="block">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">${product.price}</p>
                </Link>
            </div>
            </div>
       ))}
           
      </div>
    </section>
  );
};

export default NewArrivals;
