import React, { useContext, useEffect, useState } from 'react'
import './Myorders.css'
import { StoreContext } from '../../components/context/StoreContex'
import axios from 'axios'
import { assets } from '../../assets/frontend_assets/assets'


function Myorders() {
    const [data, setData] = useState([])
    const { url, token } = useContext(StoreContext)

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders()
        } else {

        }
    }, [token])

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {
                    data.map((orders, index) => {
                        return (
                            <div className="my-orders-order" key={index}>
                                <img src={assets.parcel_icon} alt="" />

                                <p>   {orders.items.map((item, index) => {
                                    if (index === orders.items.length - 1) {
                                        return item.name + " X " + item.quantity
                                    } else {
                                        return item.name + " X " + item.quantity + "," // if we are in the last items we dont have the ,
                                    }
                                })}
                                </p>

                                <p>${orders.amount}</p>
                                <p>Items: {orders.items.length}</p>
                                <p><span>&#x25cf;</span><b>{orders.status}</b></p>
                                <button onClick={fetchOrders}>Track Order</button>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default Myorders
