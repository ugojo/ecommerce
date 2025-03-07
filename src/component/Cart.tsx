import { useState } from "react"
import useCart from "../hooks/useCart"
import CartLineItem from "./CartLineItem"

const Cart = () => {
  const [confirm, setConfirm] = useState<boolean>(false)
  const {dispatch,REDUCER_ACTIONS,totalItem,totalPrice,cart} = useCart()
  
  const onSubmitOrder = ()=>{
    dispatch({type: REDUCER_ACTIONS.SUBMIT})
    setConfirm(true)
  }

  const pageContent = confirm ? 
     <h2>Thanks you for your oder.</h2> : 
     <>
       <h2 className="offscreen">Cart</h2>
       <ul className="cart">
         {cart.map(item=>{
           return( <CartLineItem 
              key={item.sku}
              item={item}
              dispatch={dispatch}
              REDUCER_ACTIONS={REDUCER_ACTIONS} 
            />)
         })}
       </ul>
       <div className="cart__totals">
         <p>Total Items: {totalItem}</p>
         <p>Total Price: {totalPrice}</p>
         <button className="cart__submit" disabled={!totalItem}
          onClick={onSubmitOrder}>Place Order</button>
       </div>
     </> 
  
  return pageContent
}

export default Cart