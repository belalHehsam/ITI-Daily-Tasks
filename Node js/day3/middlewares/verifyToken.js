import { asynWrapperFunction } from './aysnWrapper.js';
import AppError from '../utilities/appError.js'
import Status from './../utilities/httpStatuesText.js';
import jwt from "jsonwebtoken"
const verifyToken = asynWrapperFunction(async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return next(AppError.create("Token is required", 401, Status.FAIL));
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return next(AppError.create("Token expired", 403, Status.FAIL));
        }
        return next(AppError.create("Invalid token", 401, Status.FAIL));
    }
});



export default verifyToken;