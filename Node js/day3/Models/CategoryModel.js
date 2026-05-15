import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        minlength: [2, "Category name must be at least 2 characters"],
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        trim: true,
    },
})

export default mongoose.model("Category", categorySchema);