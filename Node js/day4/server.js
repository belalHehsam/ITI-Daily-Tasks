import express from 'express'
import mongoose from 'mongoose'
import productRouter from "./Routers/ProductRoute.js"
import categoryRouter from "./Routers/CategoryRoute.js"
import errorMiddleware from "./middlewares/error.middleware.js"
const Port = 5000;

const app = express();

app.use(express.json());

app.use("/products", productRouter)
app.use("/category", categoryRouter)

mongoose.connect('mongodb://localhost:27017/').then(() => {
    console.log("connected to database");
}).catch(() => {
    console.log("error connecting to database", err);
})

app.listen(Port, () => {
    console.log(`server is running on Port ${Port}`);
})


app.use(errorMiddleware)

