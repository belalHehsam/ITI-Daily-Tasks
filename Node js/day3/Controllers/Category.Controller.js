import Category from "../Models/CategoryModel.js"
import Status from "../utilities/httpStatuesText.js";
import AppError from "../utilities/appError.js";
import { asynWrapperFunction } from './../middlewares/aysnWrapper.js';

const getAllCategories = asynWrapperFunction(async (req, res) => {
    const categories = await Category.find();
    res.status(200).json({ status: Status.SUCCESS, data: { categories } });
})


const createCategory = asynWrapperFunction(async (req, res, next) => {
    const { name, description } = req.body;
    if (!name) {
        const err = AppError.create("Name is required", 400, Status.FAIL);
        next(err);
    }
    const newCategory = new Category({ ...req.body })
    await newCategory.save()
    res.status(201).json({
        status: Status.SUCCESS,
        data: { newCategory }
    })
})

export {
    getAllCategories,
    createCategory
}
