import React, { useContext } from 'react'
import { StoreContext } from '../../components/context/StoreContex'
import './PlaceOrder.css'
function PlaceOrder() {
  const { getTotalCartAmount } = useContext(StoreContext)
  let deleveryFee = 0
  if (getTotalCartAmount() >= 256) {
    deleveryFee = 0
  } else if (getTotalCartAmount() >= 180) {
    deleveryFee = 2
  } else {
    deleveryFee = 5
  }
  return (
    <div>
      <div className="place-order">

        <div className="place-order-left">
          <p className="title">Delevery information</p>
          <div className="multi-fields">
            <input type="text" placeholder='First name' />
            <input type="text" placeholder='Last name' />
          </div>
          <input type="email" placeholder='Email addres' />
          <input type="text" placeholder='Street' />
          <div className="multi-fields">
            <input type="text" placeholder='City' />
            <input type="text" placeholder='State' />
          </div>
          <div className="multi-fields">
            <input type="text" placeholder='Zip code' />
            <input type="text" placeholder='Country' />
          </div>
          <input type="text" placeholder='Phone' />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div className="">
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <div className="cart-total-details">
                <p>Deliver</p>
                <p>$ {getTotalCartAmount() > 0 ? deleveryFee : 0}</p>
              </div>
              <div className="cart-total-details">
                <p>Total</p>
                <p>${getTotalCartAmount() > 0 ? getTotalCartAmount() + deleveryFee : 0}</p>
              </div>
            </div>
            <button>Proceed to checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
