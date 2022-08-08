const express = require("express");
const auth = require("./../middlewares/auth");
const { addProduct, updateProduct, deleteProduct, getProduct, getProductWithNameSize } = require("./../controller/productController")
// Define routers
const productRouter = express.Router();


productRouter.post("/addProduct", auth, addProduct);
productRouter.put("/updateProduct/:id", auth, updateProduct);
productRouter.post("/deleteProduct/:id", auth, deleteProduct);
productRouter.post("/getProduct", auth, getProduct);
productRouter.post("/getProductWithNameSize/:name/:size", auth, getProductWithNameSize);

module.exports = productRouter;