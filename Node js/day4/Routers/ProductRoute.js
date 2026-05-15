import express from 'express'
import {
    getAllProducts,
    getProductById,
    addProduct,
    replaceProduct,
    updateProduct,
    deleteProduct,
} from "../Controllers/Product.Controller.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", addProduct);
router.patch("/:id", updateProduct);
router.put("/:id", replaceProduct);
router.delete("/:id", deleteProduct);

export default router;