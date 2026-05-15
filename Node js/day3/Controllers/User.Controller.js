import User from "../Models/userModel.js"
import Status from '../utilities/httpStatuesText.js'; //====>JSend
import AppError from "../utilities/appError.js";
import { asynWrapperFunction } from './../middlewares/aysnWrapper.js';
import genToken from './../utilities/genToken.js';

const getAllUsers = asynWrapperFunction(async (req, res, next) => {
    const page = req.query.page;  ///for pagination
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    const users = await User.find({}).limit(limit).skip(skip);
    res.status(200).json({
        status: Status.SUCCESS,
        data: { users },
    });
})

const register = asynWrapperFunction(async (req, res, next) => {
    const { userName, email, password, role } = req.body;

    if (!userName || !email || !password)
        next(AppError.create("UserName , email , password required", 404, Status.FAIL));

    const matched = await User.findOne({ email });

    if (matched) {
        return next(AppError.create("already have an account", 400, Status.FAIL));
    }

    const user = new User({ userName, email, password, role });
    await user.save();
    const token = genToken(user);

    res.status(201).json({
        status: Status.SUCCESS,
        data: { user, token }
    })
})


const login = asynWrapperFunction(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        return next(AppError.create("You must send Email And password", 404, Status.FAIL));

    const user = await User.findOne({ email }).select("+password");

    const matched = await user.comparePassword(password);
    if (!matched)
        return next(AppError.create("email or Password not correct", 404, Status.FAIL));

    const token = genToken(user);
    res.status(200).json({
        status: Status.SUCCESS,
        data: { user, token, message: "login successed" }
    })
})


export {
    getAllUsers,
    register,
    login
}
