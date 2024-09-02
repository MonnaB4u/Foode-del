import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
function LoginPopup({setShowLogin}) {
    const [curentState, setCurentState] = useState("sign up")
    return (
        <div className='login-popup' >
            <div className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{curentState}</h2>
                    <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
            </div>
        </div>
    )
}

export default LoginPopup
