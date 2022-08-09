const productModel = require("./../models/Product");
const { success, error, validation } = require("./../response/responseApi");
const dotenv = require("dotenv");

dotenv.config();

// Add Products
const addProduct = async (req, res) => {
    const { title, description, image, categories, size, color, price } = req.body;
    try {

        // 0.Validations, perform later 

        // 1.Existing product
        const existingProduct = await productModel.findOne({ title: title });
        if (existingProduct) {
            return res.status(400).json(error("Product already exist", 400));
        }

        // 2.Product creation
        const newProduct = await productModel.create({
            title: title,
            description: description,
            image: image,
            categories: categories,
            size: size,
            color: color,
            price: price
        });

        // 201 successfully record create
        res.status(201).json(success("Product added successfully!", newProduct, 201));
    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }
}

// Update Products
const updateProduct = async (req, res) => {
    const { title, description, image, categories, size, color, price } = req.body;
    try {

        // 0.Validations, perform later 

        // 1.Existing product
        const existingProduct = await productModel.findOne({ title: title });
        if (!existingProduct) {
            return res.status(400).json(error("Product doesn't exist", 400));
        }

        // 3.User creation
        const updateProduct = {
            title: title,
            description: description,
            image: image,
            categories: categories,
            size: size,
            color: color,
            price: price
        };
        const id = req.params.id;
        const updatedProduct = await productModel.findByIdAndUpdate(id, updateProduct, { new: true });
        // 201 successfully record create
        res.status(201).json(success("Product updated successfully!", updatedProduct, 201));
    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }
}

// Delete Products
const deleteProduct = async (req, res) => {
    const { title, description, image, categories, size, color, price } = req.body;
    try {
        const id = req.params.id;
        // 0.Validations, perform later 

        // 1.Existing product
        const existingProduct = await productModel.findById(id);
        if (!existingProduct) {
            return res.status(400).json(error("Product doesn't exist", 400));
        }

        const deletedProduct = await productModel.findByIdAndRemove(id,{new: true});
        // 201 successfully record create
        res.status(201).json(success("Product deleted successfully!", deletedProduct, 201));
    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }
}

// Get Products
const getProduct = async (req, res) => { 
    const query = req.query.new;
    try {
        const productList = query ? await productModel.find().sort({ _id: -1 }).limit(5) : await productModel.find();
        if (!productList) {
            return res.status(404).json(error("No user found", 400));
        }
        res.status(200).json(success("Product List Fetched successfully", productList, 200));
    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }
}

// Get Products By Name & Size
const getProductWithNameSize = async (req, res) => { 
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        
        let products;
        if(qNew){
            products = await productModel.find().sort({createdAt: -1}).limit(5);
        }else if(qCategory){
            products = await productModel.find({
                categories:{
                    $in: [qCategory]
                }
            });
        }else{
            products = await productModel.find();
        }

        res.status(200).json(success("List Fetched successfully", products, 200));
    } catch (error) {
        console.log(error);
        res.status(500).json(error("Something went wrong", 500));
    }
}

module.exports = { addProduct, updateProduct, deleteProduct, getProduct, getProductWithNameSize }