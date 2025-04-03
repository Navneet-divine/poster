import mongoose from "mongoose";

export async function connectDB() {
    try {
        const uri = process.env.MONGO_URI!;
        if (!uri) {
            throw new Error("MONGO_URI is not defined in the environment variables");
        }
        console.log("Connecting to MongoDB with URI:", uri);
        await mongoose.connect(uri);
        const connection = mongoose.connection;

        connection.on("connection", () => {
            console.log("MONGODB CONNECTED");
        });

        connection.on("error", (err) => {
            console.log("MONGODB CONNECTION ERROR:", err);
        });

    } catch (error) {
        console.log("Something went wrong in connecting to DB!!!");
        console.log(error);
    }
}
