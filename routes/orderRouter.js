const express = require("express");
const auth = require("./../middlewares/auth");
const { addOrder, updateOrder, deleteOrder, getOrder,getAllOrder ,getMonthlyIncome} = require("./../controller/orderController");
// Define routers
const orderRouter = express.Router();

orderRouter.post("/addOrder",auth,addOrder);
orderRouter.put("/updateOrder/:id",auth,updateOrder);
orderRouter.delete("/deleteOrder/:id",auth,deleteOrder);
orderRouter.get("/getOrder/:userId",auth,getOrder);
orderRouter.get("/getAllOrder",auth,getAllOrder);
orderRouter.get("/getMonthlyIncome",auth,getMonthlyIncome);


module.exports = orderRouter;