const express = require("express");
const auth = require("./../middlewares/auth");
const { addCart, updateCart, deleteCart, getCart ,getAllCart} = require("./../controller/cartController");
// Define routers
const cartRouter = express.Router();

cartRouter.post("/addCart", auth, addCart);
cartRouter.put("/updateCart/:id", auth, updateCart);
cartRouter.delete("/deleteCart/:id", auth, deleteCart);
cartRouter.get("/getCart/:userId", auth, getCart);
cartRouter.get("/getCart/", auth, getAllCart);

module.exports = cartRouter;