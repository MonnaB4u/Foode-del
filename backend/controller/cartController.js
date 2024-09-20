import userModel from "../models/userModel.js";

// ad items to user cart

const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        } else {
            cart[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added to cart" })
    } catch (error) {
        res.json({ success: false, message: "Error" })
    }
}

//remove items from user cart
const remmoveFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById   // find user\
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        res.json({ success: true, message: "Removed from cart" })
    } catch (error) {
        res.json({ success: false, message: "Error" })
    }
}


//fetch cart data

const getCart = async (req, res) => {

}

export { addToCart, remmoveFromCart, getCart }