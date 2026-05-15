import mongoose from "mongoose";

const connectDBs = async function () {
    try {
        await mongoose.connect('mongodb://localhost:27017/')
    } catch (err) { console.log("error connecting to database", err); }
}

export default connectDBs;