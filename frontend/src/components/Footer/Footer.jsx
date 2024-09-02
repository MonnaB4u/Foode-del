import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'

function Footer() {

    return (
        <div>
            <div className="footer" id='footer'>
                <div className="footer-content">

                    <div className="foter-content-left">
                        <img src={assets.logo} alt="" />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error consectetur beatae hic ut ipsam natus et quo quia, excepturi odio minima explicabo, repudiandae minus laborum ex dolores molestiae dolore delectus?</p>
                        <div className="foter-social-icons">
                            <img src={assets.facebook_icon} alt="" />
                            <img src={assets.twitter_icon} alt="" />
                            <img src={assets.linkedin_icon} alt="" />
                        </div>
                    </div>

                    <div className="foter-content-center">
                        <h2>COMPANY</h2>
                        <ul>
                            <li>Home</li>
                            <li>About us</li>
                            <li>Delivery</li>
                            <li>Privacy policy</li>
                        </ul>
                    </div>

                    <div className="foter-content-right">
                        <h2>GET IN TOUCH</h2>
                        <ul>
                            <li>+65-123-134-5634</li>
                            <li>Moheuddin.Monnab4u@gmail.com</li>
                        </ul>
                    </div>

                </div>
            <hr />
            <p className='footer-copyright'>Copyright 2024 - All right reserved </p>
            </div>
        </div>
    )
}

export default Footer
