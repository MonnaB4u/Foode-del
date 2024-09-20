
import mongoose from "mongoose"
const uri = "mongodb+srv://FoodeDel:foodDel123@cluster0.doolq.mongodb.net/food-del?retryWrites=true&w=majority";

export const connectDb = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};


//FoodeDel
//foodDel123

// export const connectDb = async () => {
//     await mongoose.connect('mongodb+srv://FoodeDel:foodDel123@cluster0.doolq.mongodb.net/food-del').then(() => {
//         console.log("Db connect");
//     }
//   )}
  








