import Category from "../Models/CategoryModel.js"
import Status from "../utilities/httpStatuesText.js";


const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ status: Status.SUCCESS, data: { categories } });
    } catch (error) {
        next(error);
    }
}

const createCategory = async (req, res) => {
    const { name, description } = req.body;
    if (!name) {
        return res
            .status(400)
            .json({ status: Status.FAIL, data: { Category: "Name is required" } });
    }
    try {
        const newCategory = new Category({ ...req.body })
        await newCategory.save()
        res.status(201).json({
            status: Status.SUCCESS,
            data: { newCategory }
        })
    } catch (error) {
        next(error)
    }
}


export {
    getAllCategories,
    createCategory
}
