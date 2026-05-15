import { getAllCategories, createCategory } from "../Controllers/Category.Controller.js"
import { getProductsByCategory } from "../Controllers/Product.Controller.js"
import express from 'express';

const route = express.Router();


route.get('/', getAllCategories)

route.post('/', createCategory)

route.get("/:categoryId/products", getProductsByCategory);

export default route;