const checkout={
    _id:"12323",
    createdAt:new Date(),
    checkoutItems:[
        {
            productId:"1",
            name:"Jacket",
            color:"black",
            size:"A",
            price:150,
            quantity:1,
            image:"https://picsum.photos/150?random=1",
        },
        {
            productId:"2",
            name:"T-shirt",
            color:"black",
            size:"M",
            price:120,
            quantity:2,
            image:"https://picsum.photos/150?random=2",
        },
    ],
    shippingAddress:{
        address:"123 Fashion Street",
        city:"New York",
        country:"USA",
    }
}

const OrderConfirmationPage = () => {

   const calculatEstimateDelivery=(createdAt)=>{
       const orderDate= new Date(createdAt);
       orderDate.setDate(orderDate.getDate()+10);//add 10 days to the order
       return orderDate.toLocaleDateString();
   };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">Thank You for Your Order!</h1>

      {checkout && (
        <div className="p-6 rounded-lg border">
            <div className="flex justify-between mb-20">
                {/**order id and date */}
                <div className="">
                    <h2 className="text-xl font-semibold">Order ID:{checkout._id}</h2>
                    <p className="text-gray-500">Order date:{new Date(checkout.createdAt).toLocaleDateString()}</p>
                </div>
                {/**estimated delivery */}
                <div className="">
                <p className="text-emerald-700 text-sm">Estimated Delivery:{calculatEstimateDelivery(checkout.createdAt)}</p>
                </div>
            </div>
        </div>
      )}
    </div>
  )
}

export default OrderConfirmationPage
