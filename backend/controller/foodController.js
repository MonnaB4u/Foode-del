import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
    const image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food added" });
    } catch (error) {
        console.error("Error adding food:", error);
        res.json({ success: false, message: "Error adding food" });
    }
};

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error("Error fetching food list:", error);
        res.json({ success: false, message: "Error fetching food list" });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        // Find the food item by ID
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.json({ success: false, message: "Food not found" });
        }

        // Remove the associated image file
        const imagePath = `uploads/${food.image}`;
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Error removing image file:", err);
            }
        });

        // Remove the food item from the database
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food removed" });
    } catch (error) {
        console.error("Error removing food:", error);
        res.json({ success: false, message: "Error removing food" });
    }
};

export { addFood, listFood, removeFood };
