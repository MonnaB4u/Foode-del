import React, { useContext, useState } from 'react';
import { StoreContext } from '../../components/context/StoreContex';
import './PlaceOrder.css';
import axios from 'axios';

function PlaceOrder() {
  const { getTotalCartAmount, token, food_list, cartItems, url, userId } = useContext(StoreContext);

  let deliveryFee = getTotalCartAmount() >= 256 ? 0 : (getTotalCartAmount() >= 180 ? 2 : 5);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    // Iterate over each item in the food list
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item }; // Create a shallow copy to avoid mutating the original item
        itemInfo.quantity = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + deliveryFee, // Use the delivery fee
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        console.error("Order placement error:", response.data);
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (

    <form onSubmit={placeOrder} className="place-order">

      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name="zipCode" onChange={onChangeHandler} value={data.zipCode} type="text" placeholder='Zip code' />
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
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
              <p>Delivery</p>
              <p>${getTotalCartAmount() > 0 ? deliveryFee : 0}</p> {/* Corrected */}
            </div>
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount() > 0 ? getTotalCartAmount() + deliveryFee : 0}</p> {/* Corrected */}
            </div>
          </div>
          <button type='submit'>Proceed to checkout</button>
        </div>
      </div>

    </form>
  );
}

export default PlaceOrder;
