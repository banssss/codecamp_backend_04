import mongoose from "mongoose";

const StarbucksSchema = new mongoose.Schema({
    name: String,
    img: Image
});

export const Starbucks = mongoose.model("Starbucks", StarbucksSchema);