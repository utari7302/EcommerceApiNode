const cartModel = require("./../models/Cart");
const { success, error, validation } = require("./../response/responseApi");
const dotenv = require("dotenv");

dotenv.config();

const addCart = async (req, res) => {
    const { userId, products } = req.body;
    try {

        // 0.Validations, perform later 

        // 1.Cart creation
        const newCart = await cartModel.create({
            userId: userId,
            products: products
        });

        // 201 successfully record create
        res.status(201).json(success("Cart added successfully!", newCart, 201));
    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }
}

const updateCart = async (req, res) => {
    const { userId, products } = req.body;
    try {

        // 0.Validations, perform later 
        const id = req.params.id;
        // 1.Existing cart
        const existingCart = await cartModel.findById(id);
        if (!existingCart) {
            return res.status(400).json(error("Cart doesn't exist", 400));
        }

        // 3.Cart update
        const updateCart = {
            userId: userId,
            products: products
        };
        const updatedCart = await cartModel.findByIdAndUpdate(id, updateCart, { new: true });
        // 201 successfully record create
        res.status(201).json(success("Cart updated successfully!", updatedCart, 201));
    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }
}

const deleteCart = async (req, res) => {
    const { title, description, image, categories, size, color, price } = req.body;
    try {
        const id = req.params.id;
        // 0.Validations, perform later 

        // 1.Existing cart
        const existingCart = await cartModel.findById(id);
        if (!existingCart) {
            return res.status(400).json(error("Cart doesn't exist", 400));
        }

        const deletedCart = await cartModel.findByIdAndRemove(id,{new: true});
        // 201 successfully record create
        res.status(201).json(success("Cart deleted successfully!", deletedCart, 201));
    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }
}
// Get User CART
const getCart = async (req, res) => {
    try {
       const cart = await cartModel.findOne({userId:req.params.userId});
        res.status(200).json(success("Cart List Fetched successfully", cart, 200));
    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }
}

// Get All User CART
const getAllCart = async (req, res) => {
    try {
       const cart = await cartModel.find();
        res.status(200).json(success("Cart List Fetched successfully", cart, 200));
    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }
}


module.exports = { addCart, updateCart, deleteCart, getCart,getAllCart }