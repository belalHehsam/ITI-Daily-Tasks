import Counter from "../Models/CounterModel.js";

export async function getNextId() {
    const counter = await Counter.findOneAndUpdate(
        { name: "userId" },
        { $inc: { value: 1 } },
        { new: true, upsert: true }
    );
    return counter.value;
}

