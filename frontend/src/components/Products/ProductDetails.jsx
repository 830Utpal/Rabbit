const selectedProduct={
    name:"Stylish jacket",
    price: 120,
    originalPrice: 150,
    description:"This is a stylish Jacket perfect for any occasion",
    brand: "FashionBrand",
    material:"Leather",
    sizes: ["S","M","L","XL"],
    colors: ["Red","Black"],
    images: [
        {
        url: "https://picsum.photos/500/500?random=1",
        altText:"Stlish Jacket"
    },
    {
        url: "https://picsum.photos/500/500?random=2",
        altText:"Stlish Jacket"
    }
   ]
}

const ProductDetails = () => {
  return (
    <div className="p-6">
     <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
       <div className="flex flex-col md:flex-row">
           {/**left thumnails */}
           <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index)=>(
                <img  
                key={index} src={image.url} alt={image.altText ||`Thumbnail ${index}`} className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
                />
            ))}
            </div>  
            {/** main image */}
            <div className="md:w-1/2">
            <div className="mb-4">
                <img src={selectedProduct.images[0]?.url} alt="Main Product"
                className="w-full h-auto object-cover rounded-lg"
                />
            </div>
            </div>
            {/**mobile thumbnail */}
            <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
            {selectedProduct.images.map((image, index)=>(
                <img  
                key={index} src={image.url} alt={image.altText ||`Thumbnail ${index}`} className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
                />
            ))} 
            </div>
       </div>  
     </div>
    </div>
  )
}

export default ProductDetails
