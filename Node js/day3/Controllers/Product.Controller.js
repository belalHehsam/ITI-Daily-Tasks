import Product from "../Models/ProductModel.js";
import Status from '../utilities/httpStatuesText.js'; //====>JSend
import AppError from "../utilities/appError.js";
import { asynWrapperFunction } from './../middlewares/aysnWrapper.js';
import User from "../Models/userModel.js"

// GET ALL
export const getAllProducts = asynWrapperFunction(async (req, res, next) => {
    const products = await Product.find().populate("category", "name  -_id");

    const currentEmail = req.user.email

    const currentUser = await User.findOne({ email: currentEmail })

    return res.status(200).json({
        status: Status.SUCCESS,
        user: {
            name: currentUser.userName,
            role: currentUser.role
        },
        data: { products },
    })
})

// GET ONE
export const getProductById = asynWrapperFunction(async (req, res, next) => {
    const product = await Category.findById(req.params.id).populate("category", "name  description");
    if (!product) {
        next(AppError.create("Product not found", 404, Status.FAIL));
    }
    res.status(200).json({
        status: Status.SUCCESS,
        data: { product },
    });
})

// CREATE
export const addProduct = asynWrapperFunction(async (req, res, next) => {
    const { name, price, category } = req.body;
    if (!name || price === undefined || !category) {
        next(AppError.create("Name, price, and category are required", 404, Status.FAIL))
    }
    const product = await Product.create({ name, price: parseFloat(price), category });
    res.status(201).json({
        status: Status.SUCCESS,
        data: { product },
    });
})

//Patch
export const updateProduct = asynWrapperFunction(async (req, res, next) => {
    const updated = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!updated) {
        next(AppError.create("Product not found", 404, Status.FAIL))
    }
    res.status(200).json({
        status: Status.SUCCESS,
        data: { updated },
    });
})

//Put
export const replaceProduct = asynWrapperFunction(async (req, res, next) => {

    const { name, price, category } = req.body;

    if (!name || price === undefined || !category) {
        next(AppError.create("Name , price and category are required", 404, Status.FAIL));
    }
    const updated = await Product.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
    if (!updated) {
        next(AppError.create("Product not found", 404, Status.FAIL));
    }
    res.status(200).json({
        status: Status.SUCCESS,
        data: { updated },
    });
})

// DELETE
export const deleteProduct = asynWrapperFunction(async (req, res, next) => {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
        next(AppError.create("Name , price and category are required", 404, Status.FAIL))
    }
    return res.status(200).json({
        status: Status.SUCCESS,
        data: null,
    });

})

export const getProductsByCategory = asynWrapperFunction(async (req, res, next) => {
    const { categoryId } = req.params;
    const products = await Product.find({ category: categoryId }).populate("category", "name");
    if (products.length === 0) {
        next(AppError.create("No products found for this category", 404, Status.FAIL))
    }
    res.status(200).json({ success: true, data: products });
}) 
