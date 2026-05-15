import express from "express";
import { getAllUsers, login, register } from "../Controllers/User.Controller.js"
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.route('/')
    .get(verifyToken, getAllUsers)

router.post('/register', register)
router.post('/login', login)

export default router;