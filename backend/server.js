import express from "express"
import cors from "cors"
import { connectDb } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRouter.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"



// app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//db Connection
connectDb()

//api endPoint
app.use("/api/food", foodRouter)
app.use('/images',express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/", (req, res) => {

    res.send("api is working")
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`);

})
