import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        let mongodb_uri = process.env.MONGODB_URI as string
        await mongoose.connect(mongodb_uri)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error)
    }
}