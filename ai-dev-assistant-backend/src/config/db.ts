import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI missing");

    await mongoose.connect(uri);
};
