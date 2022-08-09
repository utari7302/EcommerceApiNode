const OrderModel = require("./../models/Order");
const { success, error, validation } = require("./../response/responseApi");
const dotenv = require("dotenv");

dotenv.config();

const addOrder = async (req, res) => {
    const { userId, products, amount, address, status } = req.body;
    try {

        // 0.Validations, perform later 

        // 1.Order creation
        const newOrder = await OrderModel.create({
            userId: userId,
            products: products,
            amount: amount,
            address: address,
            status: status
        });

        // 201 successfully record create
        res.status(201).json(success("Order added successfully!", newOrder, 201));
    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }
}

const updateOrder = async (req, res) => {
    const { userId, products, amount, address, status } = req.body;
    try {

        // 0.Validations, perform later 
        const id = req.params.id;
        // 1.Existing Order
        const existingOrder = await OrderModel.findById(id);
        if (!existingOrder) {
            return res.status(400).json(error("Order doesn't exist", 400));
        }

        // 3.Order update
        const updateOrder = {
            userId: userId,
            products: products,
            amount: amount,
            address: address,
            status: status
        };
        const updatedOrder = await OrderModel.findByIdAndUpdate(id, updateOrder, { new: true });
        // 201 successfully record create
        res.status(201).json(success("Order updated successfully!", updatedOrder, 201));
    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }
}

const deleteOrder = async (req, res) => {
    const { userId, products, amount, address, status } = req.body;
    try {
        const id = req.params.id;
        // 0.Validations, perform later 

        // 1.Existing Order
        const existingOrder = await OrderModel.findById(id);
        if (!existingOrder) {
            return res.status(400).json(error("Order doesn't exist", 400));
        }

        const deletedOrder = await OrderModel.findByIdAndRemove(id, { new: true });
        // 201 successfully record create
        res.status(201).json(success("Order deleted successfully!", deletedOrder, 201));
    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }
}
// Get User Order
const getOrder = async (req, res) => {
    try {
        const Order = await OrderModel.findOne({ userId: req.params.userId });
        res.status(200).json(success("Order List Fetched successfully", Order, 200));
    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }
}

// Get All User Order
const getAllOrder = async (req, res) => {
    try {
        const Order = await OrderModel.find();
        res.status(200).json(success("Order List Fetched successfully", Order, 200));
    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }
}

// Get Monthly income

const getMonthlyIncome = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await OrderModel.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },//last two months
            { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
            { $group: { _id: "$month", total: { $sum: "$sales" } } }
        ]);
        res.status(200).json(success("Monthly income Stats fetched successfully", income, 200));
    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }
}

module.exports = { addOrder, updateOrder, deleteOrder, getOrder, getAllOrder,getMonthlyIncome }