const userModel = require("./../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { success, error, validation } = require("./../response/responseApi");
const dotenv = require("dotenv");

dotenv.config();

// Add Products
const addProduct = async (req, res) => { }

// Save Products
const updateProduct = async (req, res) => { }

// Delete Products
const deleteProduct = async (req, res) => { }

// Get Products
const getProduct = async (req, res) => { }

// Get Products By Name & Size
const getProductWithNameSize = async (req, res) => { }

module.exports = { addProduct, updateProduct, deleteProduct, getProduct, getProductWithNameSize }