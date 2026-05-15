import Product from "../Models/ProductModel.js";
import Status from '../utilities/httpStatuesText.js'; //====>JSend

// GET ALL
export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find().populate("category", "name  -_id");

        return res.status(200).json({
            status: Status.SUCCESS,
            data: { products },
        });
    } catch (err) {
        return res.status(500).json({
            status: Status.ERROR,
            message: err.message,
            code: 500
        });
    }
};

// GET ONE
export const getProductById = async (req, res, next) => {
    try {

        const product = await Product.findById(req.params.id).populate("category", "name  description");

        if (!product) {
            return res.status(404).json({
                status: Status.FAIL,
                data: { product: "Product not found" }
            });
        }
        res.status(200).json({
            status: Status.SUCCESS,
            data: { product },
        });
    } catch (err) {
        next();
    }
};

// CREATE
export const addProduct = async (req, res, next) => {
    try {
        const { name, price, category } = req.body;

        if (!name || price === undefined || !category) {
            return res.status(400).json({
                status: Status.FAIL,
                data: { product: "Name, price, and category are required" }
            });
        }

        const product = await Product.create({ name, price: parseFloat(price), category });
        res.status(201).json({
            status: Status.SUCCESS,
            data: { product },
        });

    } catch (err) {
        next(err)
    }
};

//Patch
export const updateProduct = async (req, res, next) => {
    try {
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                status: Status.FAIL,
                data: { product: "Product not found" }
            });
        }

        res.status(200).json({
            status: Status.SUCCESS,
            data: { updated },
        });
    } catch (err) {
        next(err);
    }
};

//Put
export const replaceProduct = async (req, res, next) => {
    try {
        const { name, price, category } = req.body;

        if (!name || price === undefined || !category) {
            return res.status(400).json({
                status: Status.FAIL,
                data: { product: "Name , price and category are required" }
            });
        }

        const updated = await Product.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });

        if (!updated) {
            return res.status(404).json({
                status: Status.FAIL,
                data: { product: "Product not found" }
            });
        }

        res.status(200).json({
            status: Status.SUCCESS,
            data: { updated },
        });
    } catch (err) {
        next(err)
    }
};

// DELETE
export const deleteProduct = async (req, res, next) => {

    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({
                status: Status.FAIL,
                data: { product: "Product not found" }
            });
        }
        return res.status(200).json({
            status: Status.SUCCESS,
            data: null,
        });
    } catch (err) {
        next();
    }
};

export const getProductsByCategory = async (req, res, next) => {
    const { categoryId } = req.params;
    try {
        const products = await Product.find({ category: categoryId }).populate("category", "name");
        if (products.length === 0) {
            return res
                .status(404)
                .json({
                    status: Status.FAIL,
                    data: { product: "No products found for this category" }
                });
        }

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        next(error);
    }
}