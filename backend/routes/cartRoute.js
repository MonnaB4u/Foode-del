import express from "express"
import { addToCart, getCart, remmoveFromCart } from "../controller/cartController.js"
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add",  authMiddleware,addToCart)
cartRouter.post("/remove",  authMiddleware,remmoveFromCart)
cartRouter.post("/get",  authMiddleware,getCart)


export default cartRouter