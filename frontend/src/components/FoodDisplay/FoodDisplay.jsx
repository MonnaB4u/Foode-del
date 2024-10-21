import React, { useEffect, useState } from 'react'
import './FoodDisplay.css'
import { useContext } from 'react'
import { StoreContext } from '../context/StoreContex'
import FoodItem from '../FoodItem/FoodItem'

function FoodDisplay({ category }) {
    const { food_list } = useContext(StoreContext)

    const [timeLeft, setTimeLeft] = useState(10);  // Start from 10 seconds
    const [isTimeUp, setIsTimeUp] = useState(false);  // Flag to check if time is up

    useEffect(() => {
        if (timeLeft === 0) {
            setIsTimeUp(true);
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);





    return (

        <div className="food-display" id="food-display">
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {
                    !food_list ?
                        <p className='apiTimer'>{
                            timeLeft ===0 ? `please clink on api link first then api will work fine` : `Loading.........${timeLeft}`
                        }</p>
                     
                        :

                        food_list.map((item, index) => {
                            if (category === "All" || category === item.category) {
                                return (
                                    <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                                )
                            }

                        }
                        )

                }
            </div>
        </div>
    )
}

export default FoodDisplay
