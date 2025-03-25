import React from 'react'
import { PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";


const PayPalButton = ({amount,onSuccess,onError}) => {
  return( 
     <PayPalScriptProvider options={{"client-id":"AaDKm-p4UAzfPQgvfQWgfV7qOrby3xhzzExaP9jfvvOx54Zh9z27NaSXcSJwfi8NjjZKtDITIwBhBUvW"}}>

    <PayPalButtons style={{layout:"vertical"}}
    createOrder={(data, actions)=>{
      return actions.order.create({
        purchase_units: [{amount:{value:amount}}]
      })
    }}
      onApprove={(data,actions)=>{
        return actions.order.capture().then(onSuccess)
      }}
      onError={onError} />
     </PayPalScriptProvider>
  )
}

export default PayPalButton
