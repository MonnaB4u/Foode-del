import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId); // Get user data
        let cartData = userData.cartData; // Access cart data directly

        // If item is not in the cart, set its quantity to 1; otherwise, increment it
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1; // Fixed reference to cartData
        }

        // Update user's cart data in the database
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.json({ success: false, message: "Error adding to cart" });
    }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId); // Get user data
        let cartData = userData.cartData; // Access cart data

        // Ensure item exists in cart and reduce its quantity, or remove it if zero
        if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;

            // If the quantity becomes 0, remove the item from the cart
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }
        }

        // Update user's cart data in the database
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.json({ success: false, message: "Error removing from cart" });
    }
};

// Fetch cart data
const getCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId); // Get user data
        let cartData = userData.cartData; // Access cart data
        res.json({ success: true, cartData });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.json({ success: false, message: "Error fetching cart" });
    }
};

export { addToCart, removeFromCart, getCart };
