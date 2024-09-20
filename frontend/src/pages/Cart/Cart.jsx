import React from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../components/context/StoreContex'
import './Cart.css'
import { useNavigate } from 'react-router-dom'
function Cart() {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount,url } = useContext(StoreContext)

  let deleveryFee=0
  if(getTotalCartAmount()>=256){
    deleveryFee=0                                         
  }else if (getTotalCartAmount()>=180){
    deleveryFee=2
  }else{
    deleveryFee=5
  }

  const navigate=useNavigate()
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((items, index) => {
            if (cartItems[items._id] > 0) {
              return (
                <div className="">
                  <div className="cart-items-title cart-items-item">
                    <img src={url+'/images/'+items.image} alt="" />
                    <p>{items.name}</p>
                    <p>${items.price}</p>
                    <p>{cartItems[items._id]}</p>
                    <p>${items.price * cartItems[items._id]}</p>
                    <p onClick={() => removeFromCart(items._id)} className='cross'>X</p>
                  </div>
                  <hr />
                </div>
              )
            }
          })
        }
      </div>

      <div className="cart-bottom">

        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="">
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Deliver</p>
              <p>$ {getTotalCartAmount()>0?deleveryFee: 0}</p>
            </div>
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount()>0? getTotalCartAmount()+deleveryFee: 0}</p>
            </div>
          </div>
          {
            getTotalCartAmount()> 0 ?
            <button onClick={()=>navigate("/order")}>Proceed to checkout</button> : ""
          }
        </div>

        <div className="cart-promocode">
          <div className="">
            <p>if you have any promo code</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart
