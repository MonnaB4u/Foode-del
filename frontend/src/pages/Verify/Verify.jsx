import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../components/context/StoreContex'
import axios from 'axios'
function Verify() {
  const [searchParams, setsearchParams] = useSearchParams()
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")
  console.log(orderId, success);

  const { url } = useContext(StoreContext)
  const navigate = useNavigate()

  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", { success, orderId });
    if (response.data.success) {
      navigate("/myOrders")
    } else {
      navigate("/")
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [])


  return (
    <div className="verify">
      <div className="spinner">

      </div>
    </div>
  )
}

export default Verify
