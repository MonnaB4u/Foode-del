import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const frontend_url = "http://localhost:5173";

// Function to calculate the delivery fee based on the amount
const calculateDeliveryFee = (amount) => {
    let deliveryFee = 0;
    if (amount >= 256) {
        deliveryFee = 0;
    } else if (amount >= 180) {
        deliveryFee = 2;
    } else {
        deliveryFee = 5;
    }
    return deliveryFee;
};

// Function to create Stripe line items based on order items
const createLineItems = (items, deliveryFee) => {
    const line_items = items.map((item) => ({
        price_data: {
            currency: "sgd",
            product_data: {
                name: item.name,
            },
            unit_amount: item.price * 100 * 80, // Correct spelling of unit_amount
        },
        quantity: item.quantity,
    }));

    // Add delivery fee as a line item
    line_items.push({
        price_data: {
            currency: "sgd",
            product_data: {
                name: "Delivery Charges",
            },
            unit_amount: deliveryFee * 100 * 80, // Delivery fee
        },
        quantity: 1,
    });

    return line_items;
};

// Function to place an order
const placeOrder = async (req, res) => {
    try {
        const { amount, userId, items, address } = req.body;

        // Calculate delivery fee
        const deliveryFee = calculateDeliveryFee(amount);

        // Create a new order with the calculated delivery fee
        const newOrder = new orderModel({
            userId,
            items,
            amount: amount + deliveryFee,
            address,
        });

        // Save the order and update the user's cart data
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Create line items for Stripe checkout session
        const line_items = createLineItems(items, deliveryFee);

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        // Return the session URL to frontend
        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};


// Function to verify the order after payment
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    if (!orderId) {
        return res.json({ success: false, message: "Order ID is required" });
    }
    try {
        if (success === "true") {
            // Update the order with payment status as true
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment successful" });
        } else {
            // If payment failed, delete the order
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment failed" });
        }
    } catch (error) {
        console.error("Error verifying order:", error);
        res.json({ success: false, message: `Error processing order: ${error.message}` });
    }
};


//user orders for frontend

const userOrders = async (req,res) => {
    try {
        const orders=await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message:"Error"});
        
    }
}



export { placeOrder, verifyOrder,userOrders };
