import express from 'express'
import mongoose from 'mongoose'
import productRouter from "./Routers/ProductRoute.js"
import categoryRouter from "./Routers/CategoryRoute.js"
import errorMiddleware from "./middlewares/error.middleware.js"
import userRouter from "./Routers/UserRoute.js";
import connectDBs from "./config/DbConfig.js";
import dotenv from 'dotenv'
const Port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

connectDBs();

dotenv.config();

app.use("/products", productRouter)

app.use("/category", categoryRouter)

app.use("/auth", userRouter);

app.use(errorMiddleware)

app.listen(Port, () => {
    console.log(`server is running on Port ${Port}`);
})




