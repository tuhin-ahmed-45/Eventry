import mongoose from "mongoose";

export async function dbConnect() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("connected");
        return conn
    } catch (err) {
        console.log(err);
    }
}