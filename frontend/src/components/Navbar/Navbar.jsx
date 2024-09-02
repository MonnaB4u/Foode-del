import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'

const Navbar = ({setShowLogin}) => {

    const [menu,setMenu]=useState("")

    return (
        <div>
            <div className="navbar">

                <img src={assets.logo} alt="" className='logo'/>

                <ul className="navbar-menu">
                    <Link to='/' className={menu==="home"?"active":""} onClick={()=>setMenu("home")}>home</Link>
                    <a href='#explore-menu'  className={menu==="menu"?"active":""} onClick={()=>setMenu("menu")}>menu</a>
                    <a href='#app-download'  className={menu==="mobile-app"?"active":""} onClick={()=>setMenu("mobile-app")}>monile-app</a>
                    <a  href='#footer' className={menu==="contact-us"?"active":""} onClick={()=>setMenu("contact-us")}>contact us</a>
                </ul>

                <div className="navbar-right">
                    <img src={assets.search_icon} alt="" />
                    <div className="navbar-search-icon">
                        <img src={assets.basket_icon} alt="" />
                        <div className="dot"></div>
                    </div>
                    <button onClick={()=>setShowLogin(true)}>sign in</button>
                </div>
                
            </div>
        </div>
    )
}

export default Navbar
