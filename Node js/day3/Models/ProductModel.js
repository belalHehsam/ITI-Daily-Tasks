import mongoose from "mongoose";

const { Schema } = mongoose

const schemaModel = new Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            minlength: [2, "Product name must be at least 2 characters"],
            trim: true,
        },
        price: {
            type: Schema.Types.Double,
            required: [true, "Product price is required"],
            min: [1, "Product price must be at least 1"],
        },
        category: {
            type: Schema.Types.ObjectId,
            required: [true, "Product category is required"],
            ref: "Category",
        },
    },
    { timestamps: true },

);

const Product = mongoose.model("Product", schemaModel);

export default Product;




