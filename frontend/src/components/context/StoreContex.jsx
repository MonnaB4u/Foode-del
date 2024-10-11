import { createContext, useEffect, useState } from "react";
import { food_list } from "../../assets/frontend_assets/assets";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setcartItems] = useState({})

    // Add to cart function
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setcartItems((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 })) //if already have the product , then item will be increase with previus item
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }

    // remove cart cart function
    const removeFromCart = async (itemId) => {
        setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    }
    // Calculate all datass function
    const getTotalCartAmount = () => {
        let totalAmount = 0
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount = totalAmount + itemInfo.price * cartItems[item]
            }
        }
        return totalAmount;
    }

    const url = 'http://localhost:4000';

    // Food list state
    const [food_list, setFoodList] = useState([]); // Initialize as an array
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`); // Fixed typo 'responce' to 'response'
            setFoodList(response.data.data); // Assuming response.data.data contains the food list array
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
        setcartItems(response.data.cartData)
    }

    // Token management
    const [token, setToken] = useState("");

    // useEffect to fetch food list and token on component mount
    useEffect(() => {
        async function loadData() {
            // Fetch food list
            await fetchFoodList();
            // Check for token in localStorage and set it if it exists
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(localStorage.getItem("token"))
            }
        }
        // Load data on component mount
        loadData();
    }, []); // Empty dependency array ensures this runs only once



    const contextValue = {
        food_list,
        cartItems,
        setcartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url, token, setToken,

    }
    return (
        <StoreContext.Provider value={contextValue}>

            {props.children}

        </StoreContext.Provider>
    )


}


export default StoreContextProvider;