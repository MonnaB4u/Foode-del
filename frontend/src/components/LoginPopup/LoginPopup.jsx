import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../context/StoreContex';
import axios from "axios"

function LoginPopup({ setShowLogin }) {

    const [currentState, setCurrentState] = useState("Sign Up"); // Correct spelling of "currentState"
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { url, setToken } = useContext(StoreContext)

    const onChangeHandler = (e) => { // Fixed the function name
        let name = e.target.name;
        let value = e.target.value; // Corrected the typo from 'taget' to 'target'
        setData((prevData) => ({ ...prevData, [name]: value }));
    };
    
    const onLogin = async (e) => {
        e.preventDefault();

        let newUrl = url; // Assuming 'url' is properly defined
        if (currentState === "Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        try {
            const response = await axios.post(newUrl, data); // Fixed typo from 'responce' to 'response'

            if (response.data.success) {               
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error occurred during login/register:", error);
            alert("An error occurred. Please try again.");
        }
    };


    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">

                <div className="login-popup-title">
                    <h2>{currentState}</h2> {/* Use corrected currentState */}
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>

                <div className="login-popup-inputs">
                    {currentState === "Login" ? null : (
                        <input
                            name='name'
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            placeholder='Your name'
                            required
                        />
                    )}

                    <input
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder='Your email'
                    />
                    <input
                        name='password'
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder='Password'
                        required
                    />
                </div>

                <button type='submit'>{currentState === "Sign Up" ? "Create account" : "Login"}</button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>

                {currentState === "Login" ? (
                    <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
                )}
            </form>
        </div>
    );
}

export default LoginPopup;
