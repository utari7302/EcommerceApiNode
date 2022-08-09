const express = require("express");
const auth = require("./../middlewares/auth");
const { addProduct, updateProduct, deleteProduct, getProduct, getProductWithNameSize } = require("./../controller/productController")
// Define routers
const productRouter = express.Router();


productRouter.post("/addProduct", auth, addProduct);
productRouter.put("/updateProduct/:id", auth, updateProduct);
productRouter.delete("/deleteProduct/:id", auth, deleteProduct);
productRouter.get("/getProduct", auth, getProduct);
productRouter.get("/getProductWithNameSize", auth, getProductWithNameSize);

module.exports = productRouter;